<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MarketApiController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type', 'stocks');

        if ($type === 'crypto') {
            return response()->json($this->getCrypto());
        }

        return response()->json($this->getStocks());
    }

    private function getStocks()
    {
        return Cache::remember('market_stocks_alpha_v1', 3600, function () {
            $apiKey = env('ALPHA_VANTAGE_KEY');

            try {
                $response = Http::timeout(10)->get("https://www.alphavantage.co/query", [
                    'function' => 'TOP_GAINERS_LOSERS',
                    'apikey' => $apiKey
                ]);

                if ($response->successful()) {
                    $json = $response->json();

                    if (isset($json['top_gainers'])) {
                        return collect($json['top_gainers'])
                            ->take(10)
                            ->map(function ($item) {
                                return [
                                    'id'     => $item['ticker'],
                                    'name'   => $item['ticker'],
                                    'symbol' => $item['ticker'],
                                    'price'  => floatval($item['price']),
                                    'change' => floatval($item['change_percentage']),
                                    // Truco: Usamos el CDN de imágenes de FMP que suele funcionar sin key
                                    'logo'   => "https://financialmodelingprep.com/image-stock/{$item['ticker']}.png"
                                ];
                            })
                            ->values()
                            ->all();
                    }
                }
            } catch (\Exception $e) {
                Log::error("AlphaVantage Error: " . $e->getMessage());
            }
        });
    }

    private function getCrypto() {
        return Cache::remember('market_crypto', 600, function () {

            $apiKey = env('COINGECKO_API_KEY');

            /** @var \Illuminate\Http\Client\Response $response */
            $response = Http::withHeaders([
                'x-cg-demo-api-key' => $apiKey,
                'accept' => 'application/json'
            ])->get('https://api.coingecko.com/api/v3/coins/markets', [
                'vs_currency' => 'usd',
                'order'       => 'market_cap_desc',
                'per_page'    => 10,
                'page'        => 1,
                'sparkline'   => 'false'
            ]);

            if ($response->failed()) {
                return [];
            }

            return collect($response->json())
                ->map(function ($item) {
                    return [
                        'id'     => strtoupper($item['symbol']),
                        'name'   => $item['name'],
                        'symbol' => strtoupper($item['symbol']),
                        'price'  => floatval($item['current_price']),
                        'change' => floatval($item['price_change_percentage_24h']),
                        'logo'   => $item['image']
                    ];
                })
                ->values()
                ->all();
        });
    }
}
