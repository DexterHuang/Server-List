import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routes } from './app.router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule,
  MdInputModule, MdDialogModule, MdSnackBarModule, MdSlideToggleModule,
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerListComponent } from './server-list/server-list.component';
import { ServerListItemComponent } from './server-list-item/server-list-item.component';
import { MyServersComponent } from './my-servers/my-servers.component';
import { NewServerComponent } from './new-server/new-server.component';
import { EditServerComponent } from './edit-server/edit-server.component';
import { CustomMdDialogComponent } from './custom-md-dialog/custom-md-dialog.component';
import { FileDropModule } from 'ngx-file-drop/lib/ngx-drop';
import { ServerComponent } from './server/server.component';
import { VotePageComponent } from './vote-page/vote-page.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavComponent,
    ServerListComponent,
    ServerListItemComponent,
    MyServersComponent,
    NewServerComponent,
    EditServerComponent,
    CustomMdDialogComponent,
    ServerComponent,
    VotePageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MdButtonModule,
    MdCheckboxModule, MdCardModule, routes, MdToolbarModule,
    ReactiveFormsModule, MdInputModule, MdDialogModule,
    MdSnackBarModule, MdSlideToggleModule, FileDropModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomMdDialogComponent]
})
export class AppModule { }
