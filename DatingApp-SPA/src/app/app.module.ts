import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-list/memberCard/memberCard.component';
import { MemberDetailComponent } from './members/member-list/member-detail/member-detail.component';
import { MemberDetailsResolver } from './_resolver/member-detail.resolver';
import { AlertifyServiceService } from './_services/alertifyService.service';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-list/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';


export function tokenGetter() {
   return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig
{
   ovverrides = {
      pinch: {enable : false},
      rotate: {enable : false}
   };
}
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      NgxGalleryModule,
      JwtModule.forRoot({
         config: {
             tokenGetter: tokenGetter,
             whitelistedDomains: ['localhost:5000'],
             blacklistedRoutes:['localhost:5000/api/auth']
         }

      })
   ],
   providers: [
      ErrorInterceptorProvider,
      AuthService,
      AlertifyServiceService,
      AuthGuard,
      PreventUnsavedChanges,
      UserService,
      MemberDetailsResolver,
      MemberEditResolver,
      MemberListResolver,
      {
         provide: HAMMER_GESTURE_CONFIG,
         useClass: CustomHammerConfig
      }
   ],
   bootstrap: [
      AppComponent
   ]
})

export class AppModule { }
