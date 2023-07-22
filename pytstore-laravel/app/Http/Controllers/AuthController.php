<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegistroRequest;

class AuthController extends Controller
{
    public function register(RegistroRequest $request)
    {
        // Validar el registro de usuarios
        $data = $request->validated();
        // Crear el usuario
        $users = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data["password"])
        ]);
        return [
            'token' => $users->createToken('token')->plainTextToken,
            'user' => $users,
            'message' => 'Usuario creado correctamente'
        ];
    }

    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        // Revisar el password
        if (!Auth()->attempt($data)) {
            return response([
                'errors' => ['El email o la contraseña son incorrectos']
            ], 422);
        }
        // Autenticar al usuario
        $user = Auth::user();
        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user,
            'message' => 'Sesión iniciada correctamente'
        ];
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return [
            'user' => null
        ];
    }
}
