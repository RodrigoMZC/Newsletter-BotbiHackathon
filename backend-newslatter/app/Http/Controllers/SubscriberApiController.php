<?php

namespace App\Http\Controllers;

use App\Mail\Welcome;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class SubscriberApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $avatar = 'https://ui-avatars.com/api/?name=' . urlencode($request->name) . '&background=random&color=fff&size=128&bold=true';
        $subscriber = Subscriber::create([
            'name' => $request->name,
            'email' => $request->email,
            'avatar' => $avatar
            // 'google_id' => $request->google_id
        ]);

        try {
            Mail::to($subscriber->email)->send(new Welcome($subscriber));
        } catch (\Exception $e) {
            Log::error("Error enviando correo de bienvenida: " . $e->getMessage());
        }

        return response()->json($subscriber, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscriber $subscriber)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscriber $subscriber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subscriber $subscriber)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscriber $subscriber)
    {
        //
    }
}
