import { PostState } from '../interfaces/post-state.model';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { finalize, tap } from 'rxjs/operators';
import { Post } from '../interfaces/post.model';
import { PostsService } from './posts';

const initialState: PostState = {
  posts: [],
  loading: false,
  message: null,
  favorites: []
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, postService = inject(PostsService)) => {
    const cachedPostsByUser: Record<string, Post[] | undefined> = {};

    return {
      loadPosts(userId?: number | null, forceRefresh = false): void {
        const key = userId?.toString() ?? 'all';

        if (cachedPostsByUser[key] && !forceRefresh) {
          patchState(store, { posts: cachedPostsByUser[key]! });
          return;
        }

        patchState(store, { loading: true });

        postService
          .list(userId!)
          .pipe(
            tap((data: Post[]) => {
              cachedPostsByUser[key] = data;
              patchState(store, { posts: data });
            }),
            finalize(() => patchState(store, { loading: false }))
          )
          .subscribe({
            error: () => this.showMessage('Error while fetching posts.'),
          });
      },

      refreshPosts(userId?: number | null): void {
        const key = userId?.toString() ?? 'all';
        cachedPostsByUser[key] = undefined;
        this.loadPosts(userId, true);
      },

      toggleFavorite(post: Post): void {
        const currentFavorites = store.favorites();
        const isFavorite = currentFavorites.some(p => p.id === post.id);

        patchState(store, {
          favorites: isFavorite
            ? currentFavorites.filter(p => p.id !== post.id)
            : [...currentFavorites, post],
        });

        this.showMessage(
          isFavorite ? 'Post removed from favorites.' : 'Post added to favorites.'
        );
      },

      isFavorite(post: Post): boolean {
        return store.favorites().some(p => p.id === post.id);
      },

      showMessage(msg: string): void {
        patchState(store, { message: msg });
        setTimeout(() => patchState(store, { message: null }), 3000);
      },
    };
  })
);
