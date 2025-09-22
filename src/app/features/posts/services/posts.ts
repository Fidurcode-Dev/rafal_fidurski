import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../interfaces/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly API_URL: string = 'https://jsonplaceholder.typicode.com/';

  get(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}posts`);
  }
}
