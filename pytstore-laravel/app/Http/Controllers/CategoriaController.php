<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use App\Http\Resources\CategoriaCollection;

class CategoriaController extends Controller
{
    public function index()
    {
      //return response()->json(['categorias' => Categoria::all()]);
    return new CategoriaCollection(Categoria::all());
    }
}
