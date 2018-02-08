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

    get accountCover(): string {
        return NSAppSettings.getString("accountCover", null);
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

    clear(): void {
        NSAppSettings.clear();
    }
}
