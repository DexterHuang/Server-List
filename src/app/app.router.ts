import { DownloadPageComponent } from './download-page/download-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { VotePageComponent } from './vote-page/vote-page.component';
import { ServerComponent } from './server/server.component';
import { EditServerComponent } from './edit-server/edit-server.component';
import { NewServerComponent } from './new-server/new-server.component';
import { MyServersComponent } from './my-servers/my-servers.component';
import { HomeComponent } from './home/home.component';


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'myServers', component: MyServersComponent },
    { path: 'myServers/newServer', component: NewServerComponent },
    { path: 'myServers/editServer', component: EditServerComponent },
    { path: 'server', component: ServerComponent },
    { path: 'vote', component: VotePageComponent },
    { path: 'admin', component: AdminPageComponent },
    { path: 'download', component: DownloadPageComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, { useHash: false });
