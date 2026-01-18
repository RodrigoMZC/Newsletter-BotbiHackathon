<?php

namespace App\Console\Commands;

use App\Jobs\ProcessNewsJob;
use App\Models\Article;
use App\Services\GNewsService;
use Illuminate\Console\Command;

class GetNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Busca noticias y la envia a la queue procesamiento';

    /**
     * Execute the console command.
     */
    public function handle(GNewsService $gNewsService) {
        $this->info('En proceso de buscar noticias');

        $categories = ['technology', 'business'];

        foreach ($categories as $category) {
            $this->info('Buscando categoria: ' . $category);

            $articles = $gNewsService->fetchNews($category);

            if (empty($articles)) {
                $this->info('No se encontraron noticias para la categoria: ' . $category);
                continue;
            }

            // Cadauno de los articilos encontrados y que sean validos se envairan a la queue para ser procesados
            foreach ($articles as $article) {
                // Buscar repetidos por url para saber si pasa o no
                if (Article::where('url', $article['url'])->exists()) continue;

                // Enviar a la queue para procesamiento
                ProcessNewsJob::dispatch($article, $category);
            }
        }
        $this->info('Proceso de busqueda de noticias finalizado');
    }
}
