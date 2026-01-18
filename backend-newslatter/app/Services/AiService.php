<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;
use OpenAI\Laravel\Facades\OpenAI;

class AiService
{
    public function process ($title /*, $description*/ , $content) {
        $input = "Titular: $title . Contenido: $content";

        // Prompt: No se si pedirle que me genere la descripción o que la procese??

        $prompt = "Eres un profesional prodesional especializado en redacción digital de noticias.
        Tu tarea es reescribir la noticia.
        Reglas:
        1. Generar un titulo atractivo y persuasivo, con clickbait que de verdad capte la atención.
        2. Redacta una descripción del articulo, esta se le enviara a los suscriptores por correo para dar un avance del contenido.
        3. Escribe el contenido completo.
        4. Asigna un puntaje de relevancia del 1 a 10, según el impacto informativo que pueda tener la noticia.
        5. Manten un tono periodístico profesional, claro y neutro.
        6. Importante: Devuelve SOLO un JSON con formato:
            {
                \"title\": \"...\",
                \"description\": \"...\",
                \"content\": \"...\",
                \"score\": ...
            }";

        try {
            $response = OpenAI::chat()->create([
                'model' => 'llama-3.3-70b-versatile',

                'messages' => [
                    ['role' => 'system', 'content' => $prompt],
                    ['role' => 'user', 'content' => $input]
                ],

                'response_format' => ['type' => 'json_object']
            ]);

            return json_decode($response->choices[0]->message->content, true);

        } catch (Exception $e) {
            Log::error("Error en el servicio de procesado: " . $e->getMessage());
            return null;
        }

    }
}
