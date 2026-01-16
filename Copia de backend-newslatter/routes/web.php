<?php

use App\Services\GNewsService;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/prueba', function () {
    $service = new GNewsService();

    $news = $service->fetchNews('technology');

    return $news;
});
