import { TestBed } from '@angular/core/testing';
import { PostsStore } from './posts.store';
import { PostsService } from './posts';
import { of, throwError } from 'rxjs';
import { Post } from '../interfaces/post.model';

describe('PostsStore', () => {
  let store: InstanceType<typeof PostsStore>;
  let postService: jasmine.SpyObj<PostsService>;

  const mockPosts: Post[] = [
    { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
    { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
  ];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PostsService', ['list']);

    TestBed.configureTestingModule({
      providers: [
        PostsStore,
        { provide: PostsService, useValue: spy },
      ],
    });

    store = TestBed.inject(PostsStore);
    postService = TestBed.inject(PostsService) as jasmine.SpyObj<PostsService>;
  });

  it('should load posts from API and cache them', () => {
    postService.list.and.returnValue(of(mockPosts));

    store.loadPosts(1);

    expect(store.posts()).toEqual(mockPosts);

    store.loadPosts(1);
    expect(postService.list.calls.count()).toBe(1);
  });

  it('should force refresh posts from API', () => {
    postService.list.and.returnValue(of(mockPosts));

    store.loadPosts(1);
    store.loadPosts(1, true);

    expect(postService.list.calls.count()).toBe(2);
  });

  it('should refresh posts and clear cache', () => {
    postService.list.and.returnValue(of(mockPosts));

    store.loadPosts(1);
    store.refreshPosts(1);

    expect(postService.list.calls.count()).toBe(2);
  });

  it('should toggle favorite correctly', () => {
    const post = mockPosts[0];

    expect(store.isFavorite(post)).toBe(false);

    store.toggleFavorite(post);
    expect(store.isFavorite(post)).toBe(true);

    store.toggleFavorite(post);
    expect(store.isFavorite(post)).toBe(false);
  });

  it('should show and clear message', (done) => {
    store.showMessage('Test message');
    expect(store.message()).toBe('Test message');

    setTimeout(() => {
      expect(store.message()).toBeNull();
      done();
    }, 3100);
  });

  it('should handle API error gracefully', (done) => {
    spyOn(store, 'showMessage');
    postService.list.and.returnValue(throwError(() => new Error('API Error')));

    store.loadPosts(1);

    setTimeout(() => {
      expect(store.showMessage).toHaveBeenCalledWith('Error while fetching posts.');
      done();
    }, 0);
  });
});
