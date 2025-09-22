import {Component, inject, OnInit, signal} from '@angular/core';
import {PostsStore} from './services/posts.store';
import {CommonModule} from '@angular/common';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {PostItem} from './post-item/post-item';
import {Loader} from '../../shared/loader/loader';
import {Filters} from '../../shared/filters/filters';
import {Post} from './interfaces/post.model';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    Loader,
    Filters,
    PostItem
  ],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  store = inject(PostsStore);
  filterTerm = signal('');

  filteredPosts(): Post[] {
    const searchTerm: string = this.filterTerm().toLowerCase();
    return this.store.posts().filter(
      ({ title, body }) =>
        title.toLowerCase().includes(searchTerm) || body.toLowerCase().includes(searchTerm)
    );
  }

  onFilterChanged(term: string): void {
    this.filterTerm.set(term);
  }

  ngOnInit(): void {
    this.store.loadPosts();
  }
}
