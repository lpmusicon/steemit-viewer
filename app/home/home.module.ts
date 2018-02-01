import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { FeedComponent } from "./feed/feed.component";
import { HotComponent } from './hot/hot.component';

import { FeedUtilityService } from './feed-utility.service';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent,
        FeedComponent,
        HotComponent
    ],
    providers: [
        FeedUtilityService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
