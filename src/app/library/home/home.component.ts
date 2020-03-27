import { Component, OnInit } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { map } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { ApiService } from "../../common/api/api.service";

export interface Tile {
    image?: string;
    subtitle: string;
}

export const enum ViewTypes {
    MOVIES = "movies",
    HOME_VIDEOS = "homevideos"
}

export interface ViewTile extends Tile {
    type: ViewTypes;
}

export interface MovieTile extends Tile {
    year?: string | number;
    originalTitle: string | null;
}

export interface ContinueTile extends MovieTile {
    progress: number;
}

@Component({
    selector: "jellyfin-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    // All images are just random tmdb images, inserted as design stubs
    public myMedia: ViewTile[] = [];
    public continueWatching: ContinueTile[] = [];
    public latestMovies: MovieTile[] = [];
    public loaded = false;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private router: Router
    ) {}

    public ngOnInit() {
        Promise.all([this.loadViews(), this.loadStarted(), this.loadLatest()]).then(() => {
            this.loaded = true;
        });
    }

    public viewUrl(type: ViewTypes): UrlTree {
        switch (type) {
            case ViewTypes.MOVIES: {
                return this.router.createUrlTree(["movies"]);
            }
            case ViewTypes.HOME_VIDEOS: {
                return this.router.createUrlTree(["home_videos"]);
            }
            default: {
                // TODO: Implement more
                // assertNever(type);
            }
        }
    }

    public viewIcon(type: ViewTypes): string {
        switch (type) {
            case ViewTypes.MOVIES: {
                return "movie";
            }
            case ViewTypes.HOME_VIDEOS: {
                return "camera_alt";
            }
            default: {
                // TODO: Implement more
                // assertNever(type);
            }
        }
    }

    private loadViews() {
        return this.apiService
            .get<any>(`/Users/${this.authService.userId}/Views`)
            .pipe(
                map(resp => {
                    for (const item of resp.Items) {
                        const tile: ViewTile = {
                            subtitle: item.Name,
                            type: item.CollectionType
                        };
                        if (item.ImageTags.Primary) {
                            tile.image = this.apiService.assembleUrl(
                                `/Items/${item.Id}/Images/Primary`,
                                {
                                    tag: item.ImageTags.Primary,
                                    quality: "90",
                                    maxWidth: "400",
                                    maxHeight: "400"
                                }
                            );
                        }
                        this.myMedia.push(tile);
                    }
                })
            )
            .toPromise();
    }

    private loadStarted() {
        return this.apiService
            .get<any>(`/Users/${this.authService.userId}/Items/Resume`, {
                query: {
                    Limit: "12",
                    Recursive: "true",
                    ImageTypeLimit: "1",
                    EnableImageTypes: "Primary,Backdrop,Thumb",
                    EnableTotalRecordCount: "false",
                    MediaTypes: "Video"
                }
            })
            .pipe(
                map(resp => {
                    for (const item of resp.Items) {
                        const [title, cut] = this.sliceTitle(item.Name);
                        const tile: ContinueTile = {
                            subtitle: title,
                            year: new Date(item.PremiereDate).getFullYear(),
                            originalTitle: cut ? item.Name : null,
                            progress: item.UserData.PlayedPercentage
                        };
                        if (item.BackdropImageTags && item.BackdropImageTags.length > 0) {
                            tile.image = this.apiService.assembleUrl(
                                `/Items/${item.Id}/Images/Backdrop`,
                                {
                                    tag: item.BackdropImageTags[0],
                                    quality: "90",
                                    maxWidth: "400",
                                    maxHeight: "400"
                                }
                            );
                        } else if (item.ImageTags && Object.keys(item.ImageTags).length > 0) {
                            const imageType = Object.keys(item.ImageTags)[0];
                            tile.image = this.apiService.assembleUrl(
                                `/Items/${item.Id}/Images/${imageType}`,
                                {
                                    tag: item.ImageTags[imageType],
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
            .get<any>(`/Users/${this.authService.userId}/Items/Latest`, {
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
                                `/Items/${item.Id}/Images/Primary`,
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
