<?php

use App\Http\Controllers\NewsApiController;
use App\Http\Controllers\SubscriberApiController;
use Illuminate\Support\Facades\Route;

Route::get('/news', [NewsApiController::class, 'index']);
Route::post('/subscribe', [SubscriberApiController::class, 'store']);
