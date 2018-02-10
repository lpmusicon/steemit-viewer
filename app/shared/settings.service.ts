import { Injectable } from "@angular/core";
import * as NSAppSettings from "application-settings";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { IPost } from "./../steem/post.interface";

@Injectable()
export class SettingsService {
    getAccountName(): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            const name = NSAppSettings.getString("accountName", null);
            observer.next(name);
            observer.complete();
        });
    }

    get accountName(): string {
        return NSAppSettings.getString("accountName", null);
    }

    set accountName(name: string) {
        NSAppSettings.setString("accountName", name);
    }

    getAccountCover(): Observable<string> {
        return Observable.create((observer: Observer<string>) => {
            const cover = NSAppSettings.getString("accountCover", null);
            observer.next(cover);
            observer.complete();
        });
    }

    set accountCover(cover: string) {
        NSAppSettings.setString("accountCover", cover);
    }

    get currentPost(): IPost {
        return JSON.parse(NSAppSettings.getString("currentPost", "{}"));
    }

    set currentPost(post: IPost) {
        NSAppSettings.setString("currentPost", JSON.stringify(post));
    }

    set accountReputation(reputation: number) {
        NSAppSettings.setNumber("accountReputation", reputation);
    }

    getAccountReputation(): Observable<number> {
        return Observable.create((observer: Observer<number>) => {
            const rep = NSAppSettings.getNumber("accountReputation", null);
            observer.next(rep);
            observer.complete();
        });
    }

    getDarkMode(): Observable<boolean> {
        return Observable.create((observer: Observer<boolean>) => {
            const isDark = NSAppSettings.getBoolean("darkMode", false);
            observer.next(isDark);
            observer.complete();
        });
    }

    set darkMode(isDark: boolean) {
        NSAppSettings.setBoolean("darkMode", isDark);
    }

    clear(): void {
        NSAppSettings.clear();
    }
}
