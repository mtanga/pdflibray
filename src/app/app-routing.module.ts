import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { 
   path: 'home', 
   component: HomeComponent 
   },
   { 
    path: 'login', 
    component: LoginComponent 
    },
    { 
      path: 'upload', 
      component: FileUploadComponent 
    },
    { 
      path: 'admin', 
      component: AdminComponent
    },
   { 
     path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'notfound'},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
