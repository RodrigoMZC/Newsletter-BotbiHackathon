<?php

use App\Http\Controllers\MarketApiController;
use App\Http\Controllers\NewsApiController;
use App\Http\Controllers\SubscriberApiController;
use Illuminate\Support\Facades\Route;

Route::get('/news', [NewsApiController::class, 'index']);
Route::get('/news/top', [NewsApiController::class, 'topHeadlines']);
Route::post('/subscribe', [SubscriberApiController::class, 'store']);
Route::post('/news/refresh', [NewsApiController::class, 'refresh']);
Route::get('/markets', [MarketApiController::class, 'index']);
