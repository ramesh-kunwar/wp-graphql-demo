// app/components/PostGrid.js
import PostCard from "./PostCard";

export default function PostGrid({ posts }) {
  return (
    <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}