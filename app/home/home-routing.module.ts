import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { BlogComponent } from "./blog/blog.component";
import { FeedComponent } from "./feed/feed.component";
import { HotComponent } from "./hot/hot.component";
import { NewComponent } from "./new/new.component";
import { TagsComponent } from "./tags/tags.component";
import { TrendingComponent } from "./trending/trending.component";

const routes: Routes = [
    { path: "", component: FeedComponent },
    { path: "blog", component: BlogComponent },
    { path: "blog/:tag", component: BlogComponent },
    { path: "hot", component: HotComponent },
    { path: "hot/:tag", component: HotComponent },
    { path: "trending", component: TrendingComponent },
    { path: "trending/:tag", component: TrendingComponent },
    { path: "new", component: NewComponent },
    { path: "new/:tag", component: NewComponent },
    { path: "tags", component: TagsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
