import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { ApiService } from "../../common/api/api.service";
import { Item } from "../../common/api/item";
import { ItemHelper } from "../../utils/api-helpers";
import { Order, SortAttributes } from "../../utils/emums";

interface MovieTile {
    image?: string;
}

@Component({
    selector: "jellyfin-movies",
    templateUrl: "./movies.component.html",
    styleUrls: ["./movies.component.scss"]
})
export class MoviesComponent implements OnInit {
    private sortAttr = SortAttributes.SORT_NAME;
    private sortOrder = Order.ASCENDING;

    public movies?: MovieTile[];

    constructor(private apiService: ApiService, private authService: AuthService) {}

    public ngOnInit() {
        const imageTypes = ["Primary", "Backdrop", "Banner", "Thumb"];
        this.apiService
            .get<{ Items: Item[] }>(`/Users/${this.authService.userId}/Items`, {
                query: {
                    SortBy: this.sortAttr,
                    SortOrder: this.sortOrder,
                    IncludeItemTypes: "Movie",
                    Recursive: "true",
                    Fields: "PrimaryImageAspectRatio,MediaSourceCount,BasicSyncInfo",
                    ImageTypeLimit: "1",
                    EnableImageTypes: imageTypes.join(","),
                    StartIndex: "0",
                    Limit: "100"
                }
            })
            .subscribe(({ Items }) => {
                this.movies = Items.map(
                    (item): MovieTile => {
                        const helper = new ItemHelper(item);

                        return {
                            image: helper.getFirstImageLocation(this.apiService.base, imageTypes)
                        };
                    }
                );
            });
    }

    public loadMore() {
        console.log("load more");
    }
}
