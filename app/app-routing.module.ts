import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { IsSetupCompletedGuard } from "./guards/is-setup-completed.guard";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule", canActivate: [ IsSetupCompletedGuard ] },
    { path: "post", loadChildren: "./post/post.module#PostModule", canActivate: [ IsSetupCompletedGuard ] },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule", canActivate: [ IsSetupCompletedGuard ] },
    { path: "setup", loadChildren: "./setup/setup.module#SetupModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
