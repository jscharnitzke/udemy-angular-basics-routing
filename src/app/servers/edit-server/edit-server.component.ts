import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  private allowEdit = false;

  constructor(private serversService: ServersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const serverId = this.route.snapshot.params.serverId;
    this.server = this.serversService.getServer(serverId ? +serverId : 1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
    this.allowEdit = this.route.snapshot.queryParams.allowEdit;

    this.route.params.subscribe((serverParams) => {
      this.server = this.serversService.getServer(serverParams.serverId ? +serverParams.serverId : 1);
      this.serverName = this.server.name;
      this.serverStatus = this.server.status;
    });
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
