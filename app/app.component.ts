import { Component } from "@angular/core";
import { initializeOnAngular } from "nativescript-web-image-cache";

@Component({
    selector: "ns-app",
    template: "<page-router-outlet></page-router-outlet>"
})
export class AppComponent {
    constructor() {
        initializeOnAngular();
    }
 }
