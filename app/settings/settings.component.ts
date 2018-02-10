import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { EventData } from "tns-core-modules/data/observable/observable";
import { Switch } from "ui/switch";
import { SettingsService } from "./../shared/settings.service";
import { SteemService } from "./../steem.service";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private steem: SteemService,
        private settings: SettingsService,
        private routerExtensions: RouterExtensions) {}

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDarkMode(args) {
        const darkMode = <Switch>args.object;
        this.settings.darkMode = darkMode.checked;

        if (darkMode.checked) {
            require("application").setCssFileName("dark.css");
            const frame = require("ui/frame").topmost();
            if (frame && frame.currentPage) {
                (<any>frame.currentPage)._onCssStateChange();
                console.log("Hello");
            }
        }
    }

    onReset(event: EventData) {
        this.settings.clear();
        this.routerExtensions.navigate(["/home"], { clearHistory: true });
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
