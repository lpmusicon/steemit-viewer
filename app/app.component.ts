import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { initializeOnAngular } from "nativescript-web-image-cache";
import { SettingsService } from "./shared/settings.service";

@Component({
    selector: "ns-app",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor(routerExtensions: RouterExtensions, settings: SettingsService) {
        routerExtensions.router.routeReuseStrategy.shouldReuseRoute = () => false;
        initializeOnAngular();

        // settings.getDarkMode().subscribe((isDark: boolean) => {
        //     Themes.applyTheme(Themes.getAppliedTheme("light.css"));
        //     if (isDark) {
        //         Themes.applyTheme("dark.css");
        //     } else {
        //         Themes.applyTheme("light.css");
        //     }
        // });
    }
 }
