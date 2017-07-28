import { BrowserModule } from '@angular/platform-browser';
import { NgModule, EventEmitter } from '@angular/core';

import { AppComponent } from './app.component';
import { routes } from './app.router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule,
  MdInputModule, MdDialogModule, MdSnackBarModule, MdSlideToggleModule,
  MdProgressSpinnerModule, MdTooltipModule, MdSelectModule,
  MdChipsModule

} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { QuillEditorModule } from 'ng2-quill-editor';
import { ClipModule } from 'ng2-clip'
import { MdIconModule } from '@angular/material';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { CopyStringAreaComponent } from './copy-string-area/copy-string-area.component'
import { Angular2FontawesomeModule } from 'angular2-fontawesome';
import { PageSelectorComponent } from './page-selector/page-selector.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EditTagsComponent } from './admin-page/edit-tags/edit-tags.component'
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
    VotePageComponent,
    TextEditorComponent,
    TextViewerComponent,
    CopyStringAreaComponent,
    PageSelectorComponent,
    AdminPageComponent,
    EditTagsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MdButtonModule,
    MdCheckboxModule, MdCardModule, routes, MdToolbarModule,
    ReactiveFormsModule, MdInputModule, MdDialogModule,
    MdSnackBarModule, MdSlideToggleModule, FileDropModule,
    HttpClientModule, QuillEditorModule, FormsModule,
    ClipModule, MdIconModule, MdProgressSpinnerModule,
    MdTooltipModule, Angular2FontawesomeModule,
    MdSelectModule, MdChipsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomMdDialogComponent]
})
export class AppModule { }
