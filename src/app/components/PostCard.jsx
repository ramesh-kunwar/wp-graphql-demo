// app/components/PostCard.js
import Link from "next/link";
import Image from "next/image";
import { formatContent } from "../utils/formatContent";


export default function PostCard({ post }) {
  return (
    <li className="border-b pb-4 shadow-lg p-4 rounded-md">
      <Link href={`/post/${post.slug}`}>
        <Image
          src={post.featuredImage.node.mediaItemUrl}
          width={200}
          height={200}
          alt={post.title}
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
  );
}