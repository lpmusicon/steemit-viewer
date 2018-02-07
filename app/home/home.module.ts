import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { FeedComponent } from "./feed/feed.component";
import { HomeRoutingModule } from "./home-routing.module";
import { HotComponent } from "./hot/hot.component";
import { NewComponent } from "./new/new.component";
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
        NewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
