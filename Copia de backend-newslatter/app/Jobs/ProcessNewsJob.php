<?php

namespace App\Jobs;

use App\Models\Article;
use App\Services\AiService;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class ProcessNewsJob implements ShouldQueue
{
    use Queueable;

    protected $article;
    protected $category;

    /**
     * Create a new job instance.
     */
    public function __construct($article, $category)
    {
        $this->article = $article;
        $this->category = $category;
    }

    /**
     * Execute the job.
     */
    public function handle(AiService $aiService): void
    {
        try {
            // enviamos los datos al servicoo de ia para ser procesados
            $processedData = $aiService->process($this->article['title'], $this->article['content']);
            // si no falla y regresa los datos procedemos a guardar el articulo en la bd
            if($processedData) {
                Article::create([
                    'title' => $processedData['title'],
                    'category' => $this->category,
                    'description' => $processedData['description'],
                    'content' => $processedData['content'],
                    'url' => $this->article['url'],
                    'image' => $this->article['image'],
                    'published_at' => Carbon::parse($this->article['publishedAt'])->setTimezone('UTC'),
                    'score' => $processedData['score'],
                ]);
                Log::info("Articulo procesado y guardado: " . $processedData['title']);
            }

        } catch (Exception $e) {
            Log::error("Error al procesar la noticia: " . $e->getMessage());
        }
    }
}
