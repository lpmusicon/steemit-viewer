import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { SharedModule } from "../shared/shared.module";
import { BlogComponent } from "./blog/blog.component";
import { FeedComponent } from "./feed/feed.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HotComponent } from "./hot/hot.component";
import { NewComponent } from "./new/new.component";
import { TagsComponent } from "./tags/tags.component";
import { TrendingComponent } from "./trending/trending.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        FeedComponent,
        HotComponent,
        TrendingComponent,
        NewComponent,
        BlogComponent,
        TagsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
