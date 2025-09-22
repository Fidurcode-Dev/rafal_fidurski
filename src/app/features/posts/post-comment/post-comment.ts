import {Component, input, InputSignal, signal} from '@angular/core';
import {Comment} from '../interfaces/comment.model';

@Component({
  selector: 'app-post-comment',
  imports: [],
  standalone: true,
  templateUrl: './post-comment.html',
  styleUrl: './post-comment.css'
})
export class PostComment {
  comments: InputSignal<Comment[] | undefined> = input<Comment[] | undefined>();

  enterClass = signal('enter-animation');
}
