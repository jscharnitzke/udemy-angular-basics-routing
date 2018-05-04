import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const serverId = this.route.snapshot.params.serverId;
    this.server = this.serversService.getServer(serverId ? +serverId : 1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.allowEdit = this.route.snapshot.queryParams.allowEdit === 'true';

    this.route.params.subscribe(serverParams => {
      this.server = this.serversService.getServer(
        serverParams.serverId ? +serverParams.serverId : 1
      );
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams.allowEdit === 'true';
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus
    });

    this.changesSaved = true;

    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if (
      (this.serverName !== this.server.name ||
        this.serverStatus !== this.server.status) &&
      !this.changesSaved
    ) {
      return confirm('Do you want to discard your changes?');
    }

    return true;
  }
}
