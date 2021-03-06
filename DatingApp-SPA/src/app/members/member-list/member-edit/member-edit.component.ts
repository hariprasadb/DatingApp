import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyServiceService } from 'src/app/_services/alertifyService.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
      if (this.editForm.dirty) {
        $event.returnValue = true;
      }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyServiceService) {

  }

  ngOnInit() {
    this.route.data.subscribe( data=> {
      this.user = data['user'];
    }

    )
  }
  updateUser(){
    console.log(this.user);
    this.alertify.success('Profile updated successfully');
    this.editForm.reset(this.user);
  }

}
