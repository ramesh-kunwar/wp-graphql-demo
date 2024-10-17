import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.SITE_URL_ENDPOINT,
  cache: new InMemoryCache(),
});

export async function getAllPosts() {
  try {
    const { data } = await client.query({
      query: gql`
        query AllPosts {
          posts(first: 5) {
            nodes {
              author {
                node {
                  name
                }
              }
              date
              title
              excerpt
              modified
              id
              slug
              featuredImage {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      `,
    });

    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const { data } = await client.query({
      query: gql`
        query PostBySlug($slug: ID!) {
          post(id: $slug, idType: SLUG) {
            authorId
            date
            title
            featuredImage {
              node {
                id
                mediaItemUrl
              }
            }
            author {
              node {
                name
                avatar {
                  url
                }
              }
            }
            content
          }
        }
      `,
      variables: { slug },
    });

    return data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export async function getAllCategories() {
  try {
    const { data } = await client.query({
      query: gql`
        query AllCategories {
          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      `,
    });

    return data.categories.nodes;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getCategoryBySlug(slug) {
  try {
    const { data } = await client.query({
      query: gql`
        query CategoryBySlug($slug: ID!) {
          category(id: $slug, idType: SLUG) {
            name
          }
        }
      `,
      variables: { slug },
    });

    return data.category;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

async function getPostsByCategoryInternal(slug) {
  try {
    const { data } = await client.query({
      query: gql`
        query PostsByCategory($categorySlug: String!) {
          posts(where: { categoryName: $categorySlug }, first: 100) {
            nodes {
              id
              title
              slug
              excerpt
              date
              categories {
                nodes {
                  name
                  slug
                }
              }
            }
          }
        }
      `,
      variables: { categorySlug: slug },
    });

    return data.posts.nodes;
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export async function getPostsByCategory(slug) {
  // Fetch posts for the category
  const posts = await getPostsByCategoryInternal(slug);

  // Fetch the category name based on the slug
  const categoryData = await getCategoryBySlug(slug);
  const categoryName = categoryData ? categoryData.name : null;

  console.log("API - Category slug:", slug);
  console.log("API - Fetched category name:", categoryName);

  return { posts, categoryName };
}
