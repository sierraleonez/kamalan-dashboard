<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = Article::with('author')->orderBy('created_at', 'desc')->get();
        return inertia('admin/articles/index', [
            'articles' => $articles,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('admin/articles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:articles,title',
            'description' => 'nullable|string',
            'body' => 'required|string',
        ]);

        $validated['author_id'] = $request->user()->id;

        Article::create($validated);

        return redirect()->route('admin.articles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        $article->load('author');
        return inertia('admin/articles/show', [
            'article' => $article,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Article $article)
    {
        $article->load('author');
        return inertia('admin/articles/edit', [
            'article' => $article,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:articles,title,' . $article->id,
            'description' => 'nullable|string',
            'body' => 'required|string',
        ]);

        $article->update($validated);

        return redirect()->route('admin.articles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return redirect()->route('admin.articles.index');
    }
}
