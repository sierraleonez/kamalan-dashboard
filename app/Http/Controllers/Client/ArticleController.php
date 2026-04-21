<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of articles.
     */
    public function index()
    {
        return Inertia::render('client/articles/index', [
            'articles' => Inertia::scroll(fn() => Article::with('author')
                ->orderBy('created_at', 'desc')
                ->paginate(15)),
        ]);
    }

    /**
     * Display the specified article.
     */
    public function show(Article $article)
    {
        $article->load('author');
        
        return Inertia::render('client/articles/show', [
            'article' => $article,
        ]);
    }
}
