"use client";
import { useParams } from "next/navigation";
import { getPostBySlug } from "../lib/api";
import Image from "next/image";

const Post = () => {
  const params = useParams();
  //   console.log(params.slug);
  const slug = params.slug;
  const [post] = Promise.all([getPostBySlug(slug)]);
  console.log(post)
  console.log(slug)
  return (
    <div>

      <Image
        src={post.featuredImage.node.mediaItemUrl}
        width={200}
        height={200}
      />
      <h3 className="text-xl font-bold">{post.title}</h3>
      <h3>Author : {post.author.node.name}</h3>
      <p>{post.excerpt}a</p>
      <p>{post.id} b</p>
    </div>
  );
};

export default Post;
