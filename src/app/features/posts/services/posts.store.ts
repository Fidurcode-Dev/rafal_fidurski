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
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, postService = inject(PostsService)) => ({
    loadPosts(): void {
      patchState(store, { loading: true });

      postService
        .get()
        .pipe(
          tap((data: Post[]): void => patchState(store, { posts: data })),
          finalize((): void => patchState(store, { loading: false }))
        )
        .subscribe({
          error: (): void => this.showMessage('Error while fetching posts.'),
        });
    },

    showMessage(msg: string): void {
      patchState(store, { message: msg });
      setTimeout(() => patchState(store, { message: null }), 3000);
    },
  }))
);
