import {Component, inject, input, InputSignal, signal, Signal} from '@angular/core';
import { Loader } from '../../../shared/loader/loader';
import {PostsService} from '../services/posts';
import {HttpResourceRef} from '@angular/common/http';
import {Post} from '../interfaces/post.model';
import {toSignal} from '@angular/core/rxjs-interop';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {PostAuthor} from '../post-author/post-author';
import {Author} from '../interfaces/author.model';
import {PostComment} from '../post-comment/post-comment';
import {Comment} from '../interfaces/comment.model';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [Loader, PostAuthor, PostComment],
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

  enterClass = signal('enter-animation');

  postDetails: HttpResourceRef<Post | undefined> = this.postsService.get(this.postId);

  author: HttpResourceRef<Author | undefined> = this.postsService.getPostAuthor(this.postId);

  postComments: HttpResourceRef<Comment[] | undefined> = this.postsService.getPostComments(this.postId);
}
