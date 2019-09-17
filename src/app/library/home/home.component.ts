import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { ApiService } from "../../common/api/api.service";

export interface ViewTile {
    image?: string;
    subtitle: string;
}

export interface MovieTile {
    image?: string;
    subtitle: string;
    year?: string | number;
    originalTitle: string | null;
}

@Component({
    selector: "jellyfin-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    // All images are just random tmdb images, inserted as design stubs
    public myMedia: ViewTile[] = [];
    public continueWatching: MovieTile[] = [];
    public latestMovies: MovieTile[] = [];
    public loaded = false;

    constructor(private apiService: ApiService, private authService: AuthService) {}

    public ngOnInit() {
        Promise.all([this.loadViews(), this.loadStarted(), this.loadLatest()]).then(() => {
            this.loaded = true;
        });
    }

    private loadViews() {
        return this.apiService
            .get<any>(`/emby/Users/${this.authService.userId}/Views`)
            .pipe(
                map(resp => {
                    for (const item of resp.Items) {
                        this.myMedia.push({
                            subtitle: item.Name,
                            image: this.apiService.assembleUrl(
                                `/emby/Items/${item.Id}/Images/Primary`,
                                {
                                    tag: item.ImageTags.Primary,
                                    quality: "90",
                                    maxWidth: "400",
                                    maxHeight: "400"
                                }
                            )
                        });
                    }
                })
            )
            .toPromise();
    }

    private loadStarted() {
        return this.apiService
            .get<any>(`/emby/Users/${this.authService.userId}/Items/Resume`, {
                token: this.authService.token,
                query: {
                    Limit: "10",
                    EnableImageType: "Thumb"
                }
            })
            .pipe(
                map(resp => {
                    for (const item of resp.Items) {
                        const [title, cut] = this.sliceTitle(item.Name);
                        const tile: MovieTile = {
                            subtitle: title,
                            year: new Date(item.PremiereDate).getFullYear(),
                            originalTitle: cut ? item.Name : null
                        };
                        if (item.ImageTags.Thumb) {
                            tile.image = this.apiService.assembleUrl(
                                `/emby/Items/${item.Id}/Images/Thumb`,
                                {
                                    tag: item.ImageTags.Thumb,
                                    quality: "90",
                                    maxWidth: "400",
                                    maxHeight: "400"
                                }
                            );
                        }
                        this.continueWatching.push(tile);
                    }
                })
            )
            .toPromise();
    }

    private loadLatest() {
        return this.apiService
            .get<any>(`/emby/Users/${this.authService.userId}/Items/Latest`, {
                token: this.authService.token,
                query: {
                    Limit: "10",
                    EnableImageType: "Primary"
                }
            })
            .pipe(
                map(resp => {
                    for (const item of resp) {
                        const [title, cut] = this.sliceTitle(item.Name);
                        const tile: MovieTile = {
                            subtitle: title,
                            year: new Date(item.PemiereDate).getFullYear(),
                            originalTitle: cut ? item.Name : null
                        };
                        if (item.ImageTags.Primary) {
                            tile.image = this.apiService.assembleUrl(
                                `/emby/Items/${item.Id}/Images/Primary`,
                                {
                                    tag: item.ImageTags.Primary,
                                    quality: "90",
                                    maxWidth: "400",
                                    maxHeight: "400"
                                }
                            );
                        }
                        this.latestMovies.push(tile);
                    }
                })
            )
            .toPromise();
    }

    private sliceTitle(title) {
        let cut = false;
        if (title.length > 25) {
            cut = true;
            const space = title.slice(0, 26).lastIndexOf(" ");
            if (space > 15) {
                title = `${title.slice(0, space)}...`;
            } else {
                title = `${title.slice(0, 26)}...`;
            }
        }
        return [title, cut];
    }
}
