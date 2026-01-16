<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title')->notNullable();
            $table->string('category')->notNullable()->index();
            $table->text('description')->notNullable();
            $table->longText('content')->notNullable();
            $table->text('url'); // url a la noticia original
            $table->text('image');
            $table->dateTimeTz('published_at')->index();
            $table->decimal('score', 2, 1)->unsigned();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
