import { Component, inject, OnInit, signal } from '@angular/core';
import { PostsStore } from './services/posts.store';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PostItem } from './post-item/post-item';
import { Loader } from '../../shared/loader/loader';
import { Filters } from '../../shared/filters/filters';
import { Post } from './interfaces/post.model';

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
  selectedUserId = signal<number | null>(null);

  enterClass = signal('enter-animation');

  ngOnInit(): void {
    this.loadPosts();
  }

  private loadPosts(userId: number | null = null): void {
    this.store.loadPosts(userId);
  }

  filteredPosts(): Post[] {
    return this.store.posts()
      .filter(post => this.matchesTerm(post))
      .filter(post => this.matchesFavorites(post));
  }

  private matchesTerm(post: Post): boolean {
    const term = this.filterTerm().toLowerCase();
    return !term || post.title.toLowerCase().includes(term) || post.body.toLowerCase().includes(term);
  }

  private matchesFavorites(post: Post): boolean {
    return !this.showFavoritesPosts() || this.store.isFavorite(post);
  }

  onFilterChanged(filter: { term: string; favorites: boolean; userId: number | "" }): void {
    this.filterTerm.set(filter.term);
    this.showFavoritesPosts.set(filter.favorites);
    this.selectedUserId.set(Number(filter.userId));

    const userId = filter.userId !== '' ? Number(filter.userId) : null;
    this.store.loadPosts(userId);
  }
}
