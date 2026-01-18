<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class NewsApiController extends Controller
{
    public function index() {
        $news = Article::latest('published_at')
        ->take(10)
        ->get()
        ->makeHidden(['created_at', 'updated_at', 'url']);

        return response()->json($news);
    }
}
