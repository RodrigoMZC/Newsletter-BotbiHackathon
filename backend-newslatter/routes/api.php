<?php

use App\Http\Controllers\NewsApiController;
use Illuminate\Support\Facades\Route;

Route::get('/news', [NewsApiController::class, 'index']);
