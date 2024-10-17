import { getPostBySlug } from "@/app/lib/api";
import Image from "next/image";
export default async function Post({ params }) {
  const { category, slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return <div className="container mx-auto px-4 py-8">Post not found</div>;
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <Image
        src={post.featuredImage.node.mediaItemUrl}
        width={200}
        height={200}
      />
      <p>Author : {post.author.node.name}</p>
      <Image src={post.author.node.avatar.url} height={50} width={50} />
      <p className="text-sm text-gray-500 mb-4">
        Category: {category} | Published on:{" "}
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
