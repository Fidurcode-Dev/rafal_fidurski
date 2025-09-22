import {Component, inject, OnInit} from '@angular/core';
import {PostsStore} from './services/posts.store';
import {CommonModule} from '@angular/common';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {PostItem} from './post-item/post-item';
import {Loader} from '../../shared/loader/loader';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    Loader
  ],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts implements OnInit {
  store = inject(PostsStore);

  ngOnInit(): void {
    this.store.loadPosts();
  }
}
