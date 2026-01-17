<x-main-view>
    <x-slot name='subject'>Lo más importante de hoy en Tech, Negocios</x-slot>
    <x-slot name='slot'>

        <h2 style='color: #111827; font-size: 20px; margin-top: 0; text-align: center;'>
        Hola, aquí tienes tu resumen diario
    </h2>

    <p style='text-align: center; color: #6b7280; margin-bottom: 30px;'>
        Seleccionamos las {{ count($news) }} noticias más importantes para ti.
    </p>

    <hr style='border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 30px;'>

    @foreach ($news as $article)
    <div style='margin-bottom: 30px; padding-bottom: 30px; border-bottom: 1px solid #f3f4f6;'>

        <span style='background-color: #E11D480A; color: #E11D48; font-size: 11px; font-weight: 700; padding: 4px 8px; border-radius: 4px; text-transform: uppercase;'>
            {{ $article['category'] ?? 'GENERAL' }}
        </span>

        <h3 style='margin: 10px 0 8px 0; font-size: 18px; line-height: 1.4;'>
            <a href="{{ $article['url'] }}" style='color: #111827; text-decoration: none;'>
                {{ $article['title'] }}
            </a>
        </h3>

        @if(!empty($article['image']))
        <img src="{{ $article['image'] }}" style='width: 100%; height: 180px; object-fit: cover; border-radius: 8px; margin: 10px 0;'>
        @endif

        <p style='color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;'>
            {{ Str::limit($article['description'] ?? '', 120) }}
        </p>
    </div>
    @endforeach

    <div style='text-align: center; margin-top: 20px;'>
        <a href="#" style='background-color: #E11D48; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;'>
            Ver todas las noticias en la App
        </a>
    </div>
    </x-slot>
</x-main-view>
