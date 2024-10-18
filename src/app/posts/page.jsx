import Link from "next/link";
import { getAllCategories, getAllPosts, getPopularPosts } from "../lib/api";
// import { getAllPosts, getAllCategories } from "./lib/api";
import Image from "next/image";
import PopularPosts from "../components/PopularPosts";

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Posts() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    // getAllCategories(),
    // getPopularPosts(),
  ]);
  const popularPosts = await getPopularPosts();

  // console.log(posts, 'posts from posts page')
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

function formatContent(htmlContent) {
  // Step 1: Remove <p> and </p> tags using regex
  const cleanedContent = htmlContent.replace(/<\/?p>/g, "");

  // Step 2: Split content into words
  const words = cleanedContent.split(/\s+/);

  // Step 3: Check if the content has more than 50 words
  if (words.length > 20) {
    // Step 4: Trim to 50 words and add '...'
    return words.slice(0, 20).join(" ") + "...";
  }

  // If content is less than or equal to 50 words, return it as it is
  return cleanedContent;
}
