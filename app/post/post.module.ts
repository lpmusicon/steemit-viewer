import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../shared/shared.module";
import { PostRoutingModule } from "./post-routing.module";
import { PostComponent } from "./post.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PostRoutingModule,
        SharedModule
    ],
    declarations: [
        PostComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PostModule { }
