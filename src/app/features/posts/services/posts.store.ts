import {PostState} from '../interfaces/post-state.model';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { finalize, tap } from 'rxjs/operators';
import {Post} from '../interfaces/post.model';
import {PostsService} from './posts';

const initialState: PostState = {
  posts: [],
  loading: false,
  message: null,
  favorites: []
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, postService = inject(PostsService)) => ({
    loadPosts(userId?: number | null): void {
      patchState(store, { loading: true });

      postService
        .list(userId!)
        .pipe(
          tap((data: Post[]): void => patchState(store, { posts: data })),
          finalize((): void => patchState(store, { loading: false }))
        )
        .subscribe({
          error: (): void => this.showMessage('Error while fetching posts.'),
        });
    },

    toggleFavorite(post: Post): void {
      const currentFavorites = store.favorites();
      const isFavorite = currentFavorites.some(p => p.id === post.id);

      patchState(store, {
        favorites: isFavorite
          ? currentFavorites.filter(p => p.id !== post.id)
          : [...currentFavorites, post],
      });

      const message = isFavorite
        ? 'Post removed from favorites.'
        : 'Post added to favorites.';

      this.showMessage(message);
    },

    isFavorite(post: Post): boolean {
      return store.favorites().some(p => p.id === post.id);
    },

    showMessage(msg: string): void {
      patchState(store, { message: msg });
      setTimeout(() => patchState(store, { message: null }), 3000);
    },
  }))
);
