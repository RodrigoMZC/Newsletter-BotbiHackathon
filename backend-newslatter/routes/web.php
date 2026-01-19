<?php

use App\Mail\DailyNews;
use App\Mail\Welcome;
use App\Models\Article;
use App\Services\GNewsService;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    $service = new GNewsService();

    $news = $service->fetchNews('technology');

    return $news;
});


Route::get('/preview-news', function () {
    $news = Article::latest('published_at')->take(3)->get();

    return view('emails.dailyNews', ['news' => $news]);
});

Route::get('/preview-news', function () {
    $news = Article::latest('published_at')->take(3)->get();

    return view('emails.welcome', ['news' => $news]);
});

Route::get('/send-test', function () {
    $news = Article::latest('published_at')->take(3)->get();

    $address = '...';

    try {
        Mail::to($address)->send(new Welcome($news));
        return "Correo enviado a $address.";
    } catch (Exception $e) {
        return "Error: " . $e->getMessage();
    }
});

Route::get('/debug-fmp', function () {
    $apiKey = env('FMP_API_KEY');

    if (empty($apiKey)) {
        return "ERROR: No se encontró FMP_API_KEY en el archivo .env";
    }

    $url = "https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey={$apiKey}";

    try {
        $response = Http::withoutVerifying()->timeout(10)->get($url);

        return [
            'status' => $response->status(),
            'body' => $response->json(),
            'key_used' => $apiKey
        ];
    } catch (\Exception $e) {
        return "ERROR DE CONEXIÓN: " . $e->getMessage();
    }
});
