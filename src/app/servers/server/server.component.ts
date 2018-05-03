import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService, private route: ActivatedRoute) { }

  ngOnInit() {
    const serverId: number = this.route.snapshot.params.serverId ? this.route.snapshot.params.serverId : 1;
    this.server = this.serversService.getServer(+serverId);

    this.route.params.subscribe((serverParams) => {
      const subServerId: number = serverParams.serverId ? serverParams.serverId : 1;
      this.server = this.serversService.getServer(+subServerId);
    });
  }

}
