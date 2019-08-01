import { Component } from "@angular/core";
import { TileItem } from "./slider/tile/tile.component";

@Component({
    selector: "jellyfin-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    // All images are just random tmdb images, inserted as design stubs
    public myMedia: TileItem[] = [
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "Movies"
        }
    ];
    public continueWatching: TileItem[] = [
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        }
    ];
    public latestMovies: TileItem[] = [
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/1TUg5pO1VZ4B0Q1amk3OlXvlpXV.jpg",
            subtitle: "The Lion King",
            year: "2019"
        },
        {
            image: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
            subtitle: "Avengers: Endgame",
            year: "2019"
        }
    ];
}
