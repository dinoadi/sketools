"use client";

import { useState } from "react";
import { InstagramLogo } from "@/components/logos/instagram-logo";
import { ThemeToggle } from "@/components/theme-toggle";

interface InstagramPost {
  id: string;
  thumbnail: string;
  videoUrl: string;
  downloadUrl: string;
  caption: string;
  username: string;
  type: 'reel' | 'video' | 'image';
  stats?: {
    views: string;
    likes: string;
    comments: string;
  };
}

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadResult, setDownloadResult] = useState<InstagramPost | null>(null);

  const handleSingleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setIsLoading(true);
    setError(null);
    setDownloadResult(null);
    try {
      const res = await fetch("/api/downloader/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type: "single" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunduh");
      setDownloadResult(data.data);
      setUrl("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    setIsLoading(true);
    setError(null);
    setPosts([]);
    setSelectedPost(null);
    setDownloadResult(null);
    try {
      const res = await fetch(`/api/downloader/instagram?username=${username}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengambil data");
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = async (post: InstagramPost) => {
    setSelectedPost(post);
    setIsLoading(true);
    setError(null);
    setDownloadResult(null);
    try {
      const res = await fetch("/api/downloader/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: post.videoUrl, type: "single" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunduh");
      setDownloadResult(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFile = (downloadUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-pink-900/20 dark:to-cyan-900/20 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-pink-200/50 dark:border-pink-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 shadow-lg shadow-pink-500/30">
                <InstagramLogo className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">SkeTools</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg shadow-pink-500/30 animate-float">
            <InstagramLogo className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
            Instagram <span className="gradient-text">Downloader</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Download reels, videos, and images from Instagram with ease
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Single URL Download */}
          <div className="rounded-3xl border-2 border-pink-200/50 dark:border-pink-800/50 bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 shadow-lg shadow-pink-500/30">
                <InstagramLogo className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Single URL Download
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download from Instagram URL
                </p>
              </div>
            </div>

            <form onSubmit={handleSingleDownload} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Instagram URL
                </label>
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reels/..."
                  className="w-full rounded-xl border-2 border-pink-200/50 dark:border-pink-800/50 bg-white/50 dark:bg-gray-900/50 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/20 backdrop-blur-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-3 font-semibold text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105 hover:shadow-pink-500/50 disabled:opacity-50"
              >
                {isLoading ? "Downloading..." : "Download Now"}
              </button>
            </form>

            {/* Download Result */}
            {downloadResult && (
              <div className="mt-6 rounded-2xl border-2 border-emerald-200/50 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20 p-4 backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      Download Ready!
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {downloadResult.caption}
                    </p>
                    <button
                      onClick={() => handleDownloadFile(downloadResult.downloadUrl, `instagram_${downloadResult.id}.mp4`)}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Save to Device</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Username Search */}
          <div className="rounded-3xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/30">
                <InstagramLogo className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Browse by Username
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View and download posts from any Instagram account
                </p>
              </div>
            </div>

            <form onSubmit={handleFetchUsername} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Instagram Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                  <input
                    type="text"
                    placeholder="username"
                    className="w-full rounded-xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-gray-900/50 py-3 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-400 outline-none transition-all duration-300 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-sm"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50 disabled:opacity-50"
              >
                {isLoading ? "Searching..." : "Browse Posts"}
              </button>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 rounded-2xl border-2 border-red-200/50 dark:border-red-800/50 bg-red-50/50 dark:bg-red-900/20 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30">
                <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">
                  Error
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 && (
          <div className="mt-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Found {posts.length} Posts
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click any post to download
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post)}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-purple-200/50 dark:border-purple-800/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-500/60"
                >
                  <img
                    src={post.thumbnail}
                    alt={post.caption}
                    className="aspect-[9/16] w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Type Badge */}
                  <div className="absolute left-2 top-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-2 py-1 text-xs font-semibold text-white shadow-lg shadow-pink-500/30">
                    {post.type.toUpperCase()}
                  </div>

                  {/* Stats Overlay */}
                  {post.stats && (
                    <div className="absolute right-2 top-2 flex flex-col gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                      <span>👁 {post.stats.views}</span>
                      <span>❤️ {post.stats.likes}</span>
                    </div>
                  )}

                  {/* Caption Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="line-clamp-3 text-xs text-white font-medium">
                      {post.caption}
                    </p>
                  </div>

                  {/* Download Icon */}
                  <div className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Post Download */}
        {selectedPost && downloadResult && (
          <div className="mt-8 rounded-3xl border-2 border-emerald-200/50 dark:border-emerald-800/50 bg-emerald-50/50 dark:bg-emerald-900/20 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-4">
              <img
                src={selectedPost.thumbnail}
                alt={selectedPost.caption}
                className="h-24 w-24 flex-shrink-0 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Ready to Download!
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                  {selectedPost.caption}
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleDownloadFile(downloadResult.downloadUrl, `instagram_${selectedPost.id}.mp4`)}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Save to Device</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      setDownloadResult(null);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-300/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
