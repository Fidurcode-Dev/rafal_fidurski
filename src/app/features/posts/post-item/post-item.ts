import {Component, inject, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post} from '../interfaces/post.model';
import {PostsStore} from '../services/posts.store';

@Component({
  selector: 'app-post-item',
  imports: [CommonModule],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css'
})
export class PostItem {
  post: InputSignal<Post | null | undefined> = input<Post | null>();

  public store = inject(PostsStore);
}
