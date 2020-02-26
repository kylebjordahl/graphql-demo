import { Component, OnInit, OnDestroy } from '@angular/core';
import { GraphService } from './services/graph.service';
import { Post } from '../../generated/graph';
import gql from 'graphql-tag';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  posts: Post[] = [];

  private unsubscribe$ = new Subject<void>();

  constructor(private graph: GraphService) { }

  ngOnInit() {
    this.graph.watchQuery.posts({}, gql`
    fragment PostData on Post {
      id
      title
      author {
        name
      }
    }
    `as any)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(p => this.posts = p);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
