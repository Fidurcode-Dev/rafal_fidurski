import {Component, inject, input, InputSignal, Signal} from '@angular/core';
import { Loader } from '../../../shared/loader/loader';
import {PostsService} from '../services/posts';
import {HttpResourceRef} from '@angular/common/http';
import {Post} from '../interfaces/post.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [Loader],
  templateUrl: './post-details.html',
  styleUrls: ['./post-details.css'],
})
export class PostDetails {
  private route: ActivatedRoute = inject(ActivatedRoute);
  postsService: PostsService = inject(PostsService);
  postId: Signal<string> = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id') ?? '')),
    { initialValue: '' }
  );

  postDetails: HttpResourceRef<Post | undefined> = this.postsService.get(this.postId);
}
