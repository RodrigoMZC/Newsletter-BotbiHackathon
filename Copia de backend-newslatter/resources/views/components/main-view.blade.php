<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $subject }}</title>
</head>
<style>
        body {
            margin: 0; padding: 0;
            font-family: 'Rubik', system-ui, sans-serif;
            background-color: #f3f4f6;
            color: #374151;
        }
        .main-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        /* HEADER */
        .header {
            background-color: #E11D48;
            padding: 30px 20px;
            text-align: center;
        }
        .name {
            color: #ffffff;
            margin: 0;
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -1px;
            text-transform: uppercase;
        }
        .tagline {
            color: #fefefe;
            margin: 5px 0 0 0;
            font-size: 13px;
            font-weight: 500;
        }

        /* CONTENT SLOT */
        .content-body {
            padding: 30px;
        }

        /* FOOTER */
        .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }
        .footer-text {
            font-size: 12px;
            color: #9ca3af;
            margin: 5px 0;
            line-height: 1.5;
        }
    </style>
<body>
    <div class="wrapper">
        <br>
        <div class="main-container">

            <div class="header">
                <h1 class="name">NovaSide</h1>
                <p class="tagline">Menos ruido. Más visión.</p>
            </div>

            <div class="content-body">
                {{ $slot }}
            </div>

            <div class="footer">
                <p class="footer-text">
                    © {{ date('Y') }} NovaSide Inc.<br>
                </p>

            </div>
        </div>
        <br>
    </div>
</body>
</html>
