import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { FeedComponent } from "./feed/feed.component";
import { HotComponent } from './hot/hot.component';
import { TrendingComponent } from './trending/trending.component';
import { NewComponent } from './new/new.component';


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
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
