import { Routes } from '@angular/router';
import {Posts} from './posts';
import {PostDetails} from './post-details/post-details';

export const POSTS_ROUTES: Routes = [
  { path: '', component: Posts },
  {
    path: ':id',
    component: PostDetails,
  }
];
