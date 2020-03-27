import { Item } from "../common/api/item";

interface Image {
    type: string;
    tag: string;
}

export class ItemHelper {
    constructor(public item: Item) {}

    public getFirstImage(imageTypes: string[]): Image | null {
        for (const imageType of imageTypes) {
            if (imageType === "Backdrop" && this.item.BackdropImageTags) {
                return {
                    type: "Backdrop",
                    tag: this.item.BackdropImageTags[0]
                };
            }

            const tag = this.item.ImageTags[imageType];
            if (tag) {
                return {
                    type: imageType,
                    tag
                };
            }
        }
        return null;
    }

    public getFirstImageLocation(
        apiUrl: string,
        imageTypes: string[],
        query: Record<string, string> = {}
    ): string | null {
        const image = this.getFirstImage(imageTypes);
        if (image) {
            const url = new URL(apiUrl);
            url.pathname = `/emby/Items/${this.item.Id}/Images/${image.type}`;
            for (const [key, value] of Object.entries(Object.assign({ tag: image.tag }, query))) {
                url.searchParams.set(key, value);
            }
            return url.href;
        }
        return null;
    }
}
