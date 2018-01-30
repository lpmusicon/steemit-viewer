import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { PostComponent } from "./post.component";

const routes: Routes = [
    { path: ":author/:perm", component: PostComponent },
    { path: "**", redirectTo: "/", pathMatch: "full"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class PostRoutingModule { }
