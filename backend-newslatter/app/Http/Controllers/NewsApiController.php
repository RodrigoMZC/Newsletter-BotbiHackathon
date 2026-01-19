<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class NewsApiController extends Controller
{
    public function index(Request $request) {
        $query = Article::latest('published_at');

        if ($request->has('search') && $request->filled('search')) {

            $query->where('title', 'like', '%' . $request->search . '%');
        }

        $news = $query->simplePaginate(10);

        return response()->json($news);
    }

    public function refresh() {
        try {
            Artisan::call('news:fetch');

        } catch (Exception $e) {
            return response()->json(['error' => 'Error al actualizar las noticias'], 500);
        }
    }

    public function topHeadlines() {
        $news = Article::whereDate('published_at', Carbon::today())
            ->orderBy('published_at', 'desc') // O 'views' desc
            ->take(10)
            ->get();

        if ($news->isEmpty()) {
            $news = Article::orderBy('published_at', 'desc')->take(10)->get();
        }

        return response()->json($news);
    }
}
