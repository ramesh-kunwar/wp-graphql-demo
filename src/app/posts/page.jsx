import Link from "next/link";
import { getAllCategories, getAllPosts, getPopularPosts } from "../lib/api";
import Image from "next/image";
import PopularPosts from "../components/PopularPosts";
import { formatContent } from "../utils/formatContent";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Posts() {
  const [posts, categories] = await Promise.all([getAllPosts()]);
  console.log(posts);
  // Make a copy of the array before sorting
  // if there is no visit count then default visitCount to 0
  const popularPosts = posts.length
    ? posts
    : [...posts]
        .sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0))
        .slice(0, 6);

  console.log(popularPosts, "sorted products");

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      <ul className="space-y-4 grid grid-cols-4 gap-5">
        {posts.map((post) => (
          <li key={post.id} className="border-b pb-4 shadow-lg p-4 rounded-md">
            <Link href={`/post/${post.slug}`}>
              <Image
                src={post.featuredImage.node.mediaItemUrl}
                width={200}
                height={200}
                className="w-full"
              />
              <h3 className="text-xl font-bold my-5">{post.title}</h3>
              <p className="text-gray-600">Date: {post.date}</p>
              <p className="text-amber-800 font-bold">
                Author Name: {post.author.node.name}
              </p>
              <p className="text-gray-600 mt-2">
                {formatContent(post.excerpt)}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="text-6xl font-bold text-center my-8">Tredning Posts</h2>

      <PopularPosts popularPosts={popularPosts} />
    </div>
  );
}
