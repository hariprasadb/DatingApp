import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AlertifyServiceService } from '../../_services/alertifyService.service';
import { UserService } from '../../_services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
     private alertifyService: AlertifyServiceService,
     private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(data=> {
        this.users = data['users'];
      });
  }
  
}
