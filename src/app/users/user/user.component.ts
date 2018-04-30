import 'rxjs/add/operator/takeUntil';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  user: { id: number; name: string };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['userId'],
      name: this.route.snapshot.params['userName']
    };

    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        paramData =>
          (this.user = { id: paramData['userId'], name: paramData['userName'] })
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
