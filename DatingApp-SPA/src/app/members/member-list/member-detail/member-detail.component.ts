import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyServiceService } from 'src/app/_services/alertifyService.service';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
   user: User;
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, 
              private alertify: AlertifyServiceService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
      this.galleryOptions = [{
          width: '500px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false


      }
    ];
      this.route.data.subscribe(data=> {
        this.user = data['user'];
        this.galleryImages = this.getImages();
      });

  }

  getImages() {
    const imageUrls = [];
    console.log("photos**");
    console.log(this.user);
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }
}
