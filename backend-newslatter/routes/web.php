<?php

use App\Mail\DailyNews;
use App\Models\Article;
use App\Services\GNewsService;
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

Route::get('/send-test', function () {
    $news = Article::latest('published_at')->take(3)->get();

    $address = '...';

    try {
        Mail::to($address)->send(new DailyNews($news));
        return "Correo enviado a $address.";
    } catch (Exception $e) {
        return "Error: " . $e->getMessage();
    }
});
