<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class NewsApiController extends Controller
{
    public function index() {
        $news = Article::latest('published_at')
        ->take(10)
        ->get()
        ->makeHidden(['created_at', 'updated_at', 'url']);

        return response()->json($news);
    }

    public function refresh() {
        try {
            Artisan::call('news:fetch');

        } catch (Exception $e) {
            return response()->json(['error' => 'Error al actualizar las noticias'], 500);
        }
    }
}
