import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";
import { FeedComponent } from "./feed/feed.component";
import { HotComponent } from './hot/hot.component';
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
    { path: "", component: FeedComponent },
    { path: "hot", component: HotComponent },
    { path: "trending", component: TrendingComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
