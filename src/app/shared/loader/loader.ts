import { Component } from '@angular/core';
import {NgxSkeletonLoaderComponent} from "ngx-skeleton-loader";

@Component({
  selector: 'app-loader',
    imports: [
        NgxSkeletonLoaderComponent
    ],
  template: `
    <ngx-skeleton-loader
      count="30"
      appearance="line"
      [theme]="{height: '20', background: 'gray'}"/>
  `,
})
export class Loader {

}
