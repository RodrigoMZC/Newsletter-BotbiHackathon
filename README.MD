

# News & Markets Aggregator App

Una aplicación móvil moderna para la agregación de noticias y seguimiento de mercados financieros en tiempo real. Construida con una arquitectura robusta que separa el Frontend en React Native (Expo) y el Backend en Laravel API.

## Características Principales

### Noticias (News Feed)

* **Top 10 Diario:** Sección destacada con las 10 noticias más importantes del día, visualizadas con un ranking numérico.
* **Categorías Dinámicas:** Navegación fluida entre pestañas (Tecnología, Negocios, General).
* **Infinite Scroll:** Carga ilimitada de noticias con paginación optimizada.
* **Detalle de Artículo:** Vista completa de la noticia con imágenes y descripción.

### Mercados (Financial Markets)

* **Datos en Tiempo Real:** Precios actualizados de Acciones (Stocks) y Criptomonedas.
* **Indicadores Visuales:** Colores dinámicos (Verde/Rojo) según la variación del precio.
* **Top Tab Navigation:** Deslizamiento suave (Swipe) entre Acciones y Cripto con sincronización de pestañas.
* **Smart Caching:** Sistema de caché en Backend (Redis/File) para evitar límites de API y mejorar la velocidad.
* *Acciones:* Alpha Vantage API (Cache: 60 min).
* *Cripto:* CoinGecko API (Cache: 10 min).


* **Fallback System:** Sistema de respaldo que muestra datos offline si las APIs externas fallan.

### UI/UX

* **Diseño Moderno:** Estilizado con NativeWind (Tailwind CSS).
* **Navegación:** Expo Router v3 con Bottom Tabs y Stack Navigation.

---

## Tech Stack

### Frontend (Mobile)

* **Framework:** React Native (Expo SDK)
* **Lenguaje:** TypeScript
* **Estilos:** NativeWind (Tailwind CSS)
* **Navegación:** Expo Router
* **Iconos:** Tabler Icons / Ionicons

### Backend (API)

* **Framework:** Laravel 12
* **Lenguaje:** PHP 8.4+
* **Base de Datos:** MySQL
* **Http Client:** Guzzle (Laravel Http Wrapper)
* **Cache:** File / Redis

---

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local.

### Prerrequisitos

* Node.js (v24+)
* PHP (v8.4) y Composer
* MySQL
* Expo Go en tu celular o Simulador (iOS/Android)

### 1. Configuración del Backend (Laravel)

```bash
# 1. Clona el repositorio y ve a la carpeta del backend
cd backend-newsletter

# 2. Instala dependencias de PHP
composer install

# 3. Copia el archivo de entorno
cp .env.example .env

# 4. Genera la llave de la aplicación
php artisan key:generate

# 5. Configura tu base de datos en el archivo .env
# DB_DATABASE=tu_base_de_datos
# DB_USERNAME=root
# DB_PASSWORD=

# 6. Ejecuta las migraciones
php artisan migrate

# 7. Levanta el servidor
php artisan serve

```

### 2. Configuración de APIs Externas (Backend)

Para que la sección de Mercados funcione, necesitas obtener API Keys gratuitas y agregarlas a tu archivo `.env` en Laravel:

| Servicio | Variable `.env` | Obtener Key |
| --- | --- | --- |
| **Alpha Vantage** | `ALPHA_VANTAGE_KEY` | [Link](https://www.google.com/search?q=https://www.alphavantage.co/support/%23api-key) |
| **CoinGecko** | `COINGECKO_API_KEY` | [Link](https://www.coingecko.com/en/api) |

```env
# Ejemplo en tu .env
ALPHA_VANTAGE_KEY=W8S7xxxxxxxx
COINGECKO_API_KEY=CG-xxxxxxxxxxxx

```

> **Nota:** Después de editar el `.env`, recuerda reiniciar el servidor (`Ctrl+C` y `php artisan serve`) y limpiar caché con `php artisan cache:clear`.

---

### 3. Configuración del Frontend (React Native)

```bash
# 1. Ve a la carpeta del frontend
cd frontend-app

# 2. Instala dependencias
npm install

# 3. Configura la URL de tu API
# Crea un archivo .env en la raíz del frontend

```

**Archivo `.env` (Frontend):**
Cambia la IP por la de tu máquina local (no uses localhost si pruebas en celular físico).

```env
EXPO_PUBLIC_API_URL=http://192.168.1.XX:8000/api

```

```bash
# 4. Inicia la aplicación
npx expo start

```

---

## Documentación de API (Interna)

El backend expone los siguientes endpoints principales:

### Mercados

* `GET /api/markets?type=stocks` - Obtiene Top 10 Acciones (con caché de 1h).
* `GET /api/markets?type=crypto` - Obtiene Top 10 Criptomonedas (con caché de 10m).

### Noticias

* `GET /api/news` - Obtiene noticias generales paginadas.
* `GET /api/news/top` - Obtiene el Top 10 de noticias más importantes del día.

---

## Estructura del Proyecto (Frontend)

```
app/
├── (tabs)/
│   ├── index.tsx       # Home (Noticias)
│   ├── markets.tsx     # Mercados (Stocks/Crypto)
│   ├── explore.tsx     # Búsqueda
│   └── profile.tsx     # Perfil Usuario
├── _layout.tsx         # Root Layout
components/
├── ArticleCard.tsx     # Tarjeta de noticia (con soporte de ranking)
├── MarketRow.tsx       # Fila de mercado (con indicador verde/rojo)
├── TopTab.tsx          # Componente de pestañas superior reutilizable
services/
├── marketService.ts    # Conexión con Laravel para Mercados
├── newsService.ts      # Conexión con Laravel para Noticias
constants/
└── icons.ts            # Mapeo de iconos

```