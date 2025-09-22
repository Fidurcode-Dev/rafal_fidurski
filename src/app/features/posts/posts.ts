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
  showFavoritesPosts = signal(false);

  ngOnInit(): void {
    this.store.loadPosts();
  }

  filteredPosts(): Post[] {
    let posts: Post[] = this.store.posts();

    const term = this.filterTerm().toLowerCase();
    if (term) {
      posts = posts.filter(p =>
        p.title.toLowerCase().includes(term) || p.body.toLowerCase().includes(term)
      );
    }

    if (this.showFavoritesPosts()) {
      posts = posts.filter(p => this.store.isFavorite(p));
    }

    return posts;
  }

  onFilterChanged(filter: { term: string; favorites: boolean }): void {
    this.filterTerm.set(filter.term);
    this.showFavoritesPosts.set(filter.favorites);
  }
}
