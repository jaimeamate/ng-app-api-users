import { Routes } from '@angular/router';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { UserFormComponent } from './pages/user-form/user-form.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'home',
        component:UsersListComponent
    },
    {
        path:'user/:_id', 
        component:UserViewComponent
    },
    {
        path:'newuser', 
        component:UserFormComponent
    },
    {
        path:'updateuser/:_id', 
        component:UserFormComponent
    },
    {
        path:'**', 
        component:UsersListComponent
    }
];
