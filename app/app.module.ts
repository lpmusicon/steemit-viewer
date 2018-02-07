import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { IsSetupCompletedGuard } from "./guards/is-setup-completed.guard";
import { FeedUtilityService } from "./home/feed-utility.service";
import { FeedInterceptor } from "./interceptors/feed.interceptor";
import { SteemService } from "./steem.service";

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
        SteemService,
        [ { provide: HTTP_INTERCEPTORS, useClass: FeedInterceptor, multi: true } ]

    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
