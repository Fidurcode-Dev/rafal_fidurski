import {Component, input, InputSignal} from '@angular/core';
import {Author} from '../interfaces/author.model';

@Component({
  selector: 'app-post-author',
  imports: [],
  templateUrl: './post-author.html',
  styleUrl: './post-author.css'
})
export class PostAuthor {
  author: InputSignal<Author | undefined> = input<Author | undefined>();
}
