import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router'
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
    {path: 'login', component: LoginPageComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}