import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, HttpParams, httpResource, HttpResourceRef, HttpResourceRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../interfaces/post.model';
import {Comment} from '../interfaces/comment.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly http: HttpClient = inject(HttpClient);
  public readonly API_URL: string = 'https://jsonplaceholder.typicode.com/';

  list(userId?: number): Observable<Post[]> {
    const url = userId != null
      ? `${this.API_URL}posts?userId=${userId}`
      : `${this.API_URL}posts`;

    return this.http.get<Post[]>(url);
  }

  get(postId: Signal<string | undefined>): HttpResourceRef<Post | undefined> {
    return httpResource<Post>(() => {
      const id = postId();
      return id
        ? { url: `${this.API_URL}/posts/${id}` } as HttpResourceRequest
        : undefined;
    });
  }

  getPostComments(postId: Signal<string | undefined>): HttpResourceRef<Comment[] | undefined> {
    return httpResource<Comment[]>(() => {
      const id = postId();
      return id
        ? {url: `${this.API_URL}comments?postId=${postId()}`} as HttpResourceRequest
        : undefined;
    });
  }
}
