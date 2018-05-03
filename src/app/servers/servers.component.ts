import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  private selectedServer: number;
  private servers: {id: number, name: string, status: string}[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.servers = this.serversService.getServers();
    this.selectedServer = this.route.snapshot.params.serverId;

    this.route.params.subscribe(serverParams => {
      this.selectedServer = serverParams.serverId;
    });
  }

  onReload() {
    // this.router.navigate(['servers'], { relativeTo: this.route });
  }

}
