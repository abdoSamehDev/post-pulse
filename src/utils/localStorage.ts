import { Post } from "../types";

const POSTS_KEY = "blog_posts";

export const getPosts = (): Post[] => {
  const postsJson = localStorage.getItem(POSTS_KEY);

  return postsJson ? JSON.parse(postsJson) : [];
};

export const savePosts = (posts: Post[]): void => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

export const addPost = (post: Post): void => {
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
};

// export const updatePost = (updatePost: Post): void => {
//     const posts = getPosts();
//     const index = posts.findIndex(post => post.id === updatePost.id);
//     if (index !== -1) {
//         posts[index] = updatePost;
//         savePosts(posts);
//     }
// }

// export const deletePost = (id: number): void => {
//     const posts = getPosts();
//     const updatedPosts = posts.filter(post => post.id !== id);
//     savePosts(updatedPosts);
// }
