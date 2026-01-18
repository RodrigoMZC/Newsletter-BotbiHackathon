<?php

namespace App\Console\Commands;

use App\Mail\DailyNews;
use App\Models\Article;
use App\Models\Subscriber;
use Carbon\Carbon;
use Exception;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class DailyMail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:daily-mail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send daily news email to subscribers';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Envinado Mails');

        $news = Article::query()
            ->whereDate('published_at', Carbon::today())
            ->orderBy('score', 'desc')
            ->orderBy('published_at', 'desc')
            ->take(5)
            ->get();

        $subscribers = Subscriber::all();

        foreach ($subscribers as $sub) {
            Mail::to($sub->email)->send(new DailyNews($news));
        }
        $this->info('Mails Enviados');
    }
}
