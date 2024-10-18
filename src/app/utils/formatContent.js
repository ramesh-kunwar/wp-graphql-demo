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

export { formatContent };
