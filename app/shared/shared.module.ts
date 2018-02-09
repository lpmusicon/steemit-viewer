import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { FeedCommentComponent } from "./feed-comment/feed-comment.component";
import { FeedSocialFooterComponent } from "./feed-social-footer/feed-social-footer.component";
import { FeedThumbnailComponent } from "./feed-thumbnail/feed-thumbnail.component";
import { FeedTopbarComponent } from "./feed-topbar/feed-topbar.component";
import { MyDrawerItemComponent } from "./my-drawer-item/my-drawer-item.component";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        MyDrawerComponent,
        MyDrawerItemComponent,
        FeedThumbnailComponent,
        FeedTopbarComponent,
        FeedSocialFooterComponent,
        FeedCommentComponent
    ],
    exports: [
        MyDrawerComponent,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        FeedThumbnailComponent,
        FeedTopbarComponent,
        FeedSocialFooterComponent,
        FeedCommentComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
