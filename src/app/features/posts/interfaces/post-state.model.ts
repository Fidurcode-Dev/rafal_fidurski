import { Post } from './post.model';

export interface PostState {
  posts: Post[];
  loading: boolean;
  message: string | null;
  favorites: Post[];
}
