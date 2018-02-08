import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { initializeOnAngular } from "nativescript-web-image-cache";

@Component({
    selector: "ns-app",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor(routerExtensions: RouterExtensions) {
        routerExtensions.router.routeReuseStrategy.shouldReuseRoute = () => false;
        initializeOnAngular();
    }
 }
