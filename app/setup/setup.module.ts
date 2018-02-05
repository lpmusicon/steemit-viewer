import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SharedModule } from "../shared/shared.module";
import { SteemService } from "./../steem.service";
import { FirstRunComponent } from "./first-run/first-run.component";

const routes: Routes = [
    { path: "first-run", component: FirstRunComponent }
];

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedModule
    ],
    declarations: [
        FirstRunComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        SteemService
    ]
})
export class SetupModule { }
