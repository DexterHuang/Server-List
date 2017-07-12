import { EditServerComponent } from './edit-server/edit-server.component';
import { NewServerComponent } from './new-server/new-server.component';
import { MyServersComponent } from './my-servers/my-servers.component';
import { HomeComponent } from './home/home.component';

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

export const router: Routes = [
    { path: '', redirectTo: 'about', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'myServers', component: MyServersComponent },
    { path: 'myServers/newServer', component: NewServerComponent },
    { path: 'myServers/editServer', component: EditServerComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
