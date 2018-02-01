import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { IsSetupCompletedGuard } from "./guards/is-setup-completed.guard";
import { SteemService } from "./steem.service";
import { FeedUtilityService } from './home/feed-utility.service';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        IsSetupCompletedGuard,
        FeedUtilityService,
        SteemService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
