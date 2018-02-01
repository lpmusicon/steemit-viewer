import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { MyDrawerItemComponent } from "./my-drawer-item/my-drawer-item.component";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";

import { FeedAvatarIconComponent } from './feed-avatar-icon/feed-avatar-icon.component';
import { FeedThumbnailComponent } from './feed-thumbnail/feed-thumbnail.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        MyDrawerComponent,
        MyDrawerItemComponent,
        FeedAvatarIconComponent,
        FeedThumbnailComponent
    ],
    exports: [
        MyDrawerComponent,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        FeedAvatarIconComponent,
        FeedThumbnailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
