import { GoogleAnalyticEventsService } from './service/google-analytic-events.service';
import { SortMethodService } from './service/sort-method.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, EventEmitter } from '@angular/core';

import { AppComponent } from './app.component';
import { routes } from './app.router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule,
  MdInputModule, MdDialogModule, MdSnackBarModule, MdSlideToggleModule,
  MdProgressSpinnerModule, MdTooltipModule, MdSelectModule,
  MdChipsModule, MdListModule

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
import { PageSelectorComponent } from './home/page-selector/page-selector.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { EditTagsComponent } from './admin-page/edit-tags/edit-tags.component';
import { ServerEditorComponent } from './new-server/server-editor/server-editor.component';
import { OnlineModeDisplayComponent } from './Ultility/online-mode-display/online-mode-display.component';
import { EditGameVersionsComponent } from './admin-page/edit-game-versions/edit-game-versions.component';
import { BannerComponent } from './server/banner/banner.component';
import { ServerDetailComponent } from './server/server-detail/server-detail.component';

import { TagFilterComponent } from './home/tag-filter/tag-filter.component';
import { SortMethodSelectorComponent } from './home/sort-method-selector/sort-method-selector.component';
import { FeedbackButtonComponent } from './feedback/feedback-button/feedback-button.component';
import { FeedbackFormComponent } from './feedback/feedback-form/feedback-form.component';
import { NotificationControllerComponent } from './notification-controller/notification-controller.component';
import { FeedbackFormsComponent } from './admin-page/feedback-forms/feedback-forms.component';
import { DownloadPageComponent } from './download-page/download-page.component';
import { LinkToServerComponent } from './server/link-to-server/link-to-server.component';
import { FooterComponent } from './footer/footer.component';
import { VotePageSuccessDialogComponent } from './vote-page/vote-page-success-dialog/vote-page-success-dialog.component';

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
    EditTagsComponent,
    ServerEditorComponent,
    OnlineModeDisplayComponent,
    EditGameVersionsComponent,
    BannerComponent,
    ServerDetailComponent,
    TagFilterComponent,
    SortMethodSelectorComponent,
    FeedbackButtonComponent,
    FeedbackFormComponent,
    NotificationControllerComponent,
    FeedbackFormsComponent,
    DownloadPageComponent,
    LinkToServerComponent,
    FooterComponent,
    VotePageSuccessDialogComponent,

  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MdButtonModule,
    MdCheckboxModule, MdCardModule, routes, MdToolbarModule,
    ReactiveFormsModule, MdInputModule, MdDialogModule,
    MdSnackBarModule, MdSlideToggleModule, FileDropModule,
    HttpClientModule, QuillEditorModule, FormsModule,
    ClipModule, MdIconModule, MdProgressSpinnerModule,
    MdTooltipModule, Angular2FontawesomeModule,
    MdSelectModule, MdChipsModule, MdListModule

  ],
  providers: [SortMethodService, GoogleAnalyticEventsService],
  bootstrap: [AppComponent],
  entryComponents: [VotePageSuccessDialogComponent, CustomMdDialogComponent, FeedbackFormComponent, LinkToServerComponent]
})
export class AppModule { }
