"use client"
import Image from "next/image";
import React from "react";

const PopularPosts = ({ popularPosts }) => {
  console.log("hello world from popular posts")
  console.log(popularPosts, "pop");
  return <div>

<div className="space-y-4 grid grid-cols-4 gap-5">

  {popularPosts.map(post => {
    return (
      <div className="border-b pb-4 shadow-lg p-4 rounded-md">
        <Image src={post.featuredImage.node.mediaItemUrl} width={200} height={200} className="" />
        <h3 className="text-xl font-bold my-5">{post.title}</h3>
        <p className="text-gray-600">Date: {post.date}</p>
        <p className="text-amber-800 font-bold">
          Author Name: {post?.author?.node?.name}
        </p>
        <p>
        {formatContent(post.excerpt)}
        </p>
      </div>
    )
  })}

</div>
  </div>;
};

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



export default PopularPosts;
