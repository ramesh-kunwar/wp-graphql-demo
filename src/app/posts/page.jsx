// app/posts/page.js
import PostGrid from "../components/PostGrid";
import { formatContent } from "../utils/formatContent";
import PopularPosts from "../components/PopularPosts";
import { getAllPosts } from "../lib/api";

export const revalidate = 60;

export default async function Posts() {
  const [posts] = await Promise.all([getAllPosts()]);

  const popularPosts = posts.length
    ? [...posts]
        .sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))
        .slice(0, 6)
    : [];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      <PostGrid posts={posts} />

      <h2 className="text-6xl font-bold text-center my-8">Trending Posts</h2>
      <PopularPosts posts={popularPosts} />
    </div>
  );
}
