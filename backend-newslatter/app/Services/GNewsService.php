<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class GNewsService {
    public function fetchNews($category) {
        $key = getenv('GNEWS_API_KEY');
        $url = 'https://gnews.io/api/v4/top-headlines';
        //$url = 'https://gnews.io/api/v4/search?q';

        $response = Http::get($url, [
            'category' => $category,
            'lang' => 'es',
            'max' => 5,
            'apikey' => $key
        ]);

        if ($response->failed()) return [];

        return $response->json()['articles'];
    }
}
