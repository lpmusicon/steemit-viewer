import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { FeedComponent } from "./feed/feed.component";
import { HotComponent } from './hot/hot.component';

const routes: Routes = [
    { path: "", component: FeedComponent },
    { path: "hot", component: HotComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
