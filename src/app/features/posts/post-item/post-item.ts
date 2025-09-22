import {Component, input, InputSignal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post} from '../interfaces/post.model';

@Component({
  selector: 'app-post-item',
  imports: [CommonModule],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css'
})
export class PostItem {
  post: InputSignal<Post | null | undefined> = input<Post | null>();
}
