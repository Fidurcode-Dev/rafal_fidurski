import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef, HttpResourceRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../interfaces/post.model';
import {Author} from '../interfaces/author.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = 'https://jsonplaceholder.typicode.com/';

  list(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}posts`);
  }

  get(postId: Signal<string | undefined>): HttpResourceRef<Post | undefined> {
    return httpResource<Post>(() => {
      const id = postId();
      return id
        ? { url: `${this.API_URL}/posts/${id}` } as HttpResourceRequest
        : undefined;
    });
  }

  getPostAuthor(postId: Signal<string | undefined>): HttpResourceRef<Author | undefined> {
    return httpResource<Author>(() => {
      const id = postId();
      return id
        ? { url: `${this.API_URL}/users/${id}` } as HttpResourceRequest
        : undefined;
    });
  }
}
