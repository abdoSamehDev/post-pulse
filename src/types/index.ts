export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  views: number;
  reactions: {
    likes: number;
    dislikes: number;
  };
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UpdatePostForm {
  title: string;
  body: string;
  tags: string;
}
