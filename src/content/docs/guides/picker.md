---
title: The picker
description: Browse your sources and folders in a strip of thumbnails, and set, favorite, or trash a wallpaper with one key.
---

The picker is a strip of thumbnails along one screen edge. To open it, run `kakemono pick` or use the tray menu. The picker is part of the kakemono app, so the command-line tool on its own can't open it. The [`[picker]` reference](/reference/configuration/#picker) lists its settings.

## Tabs

The picker has five tabs:

| Tab | What it shows |
|---|---|
| Sources | Previews from the enabled online sources, fetched as you scroll. kakemono downloads nothing until you use an image. |
| Downloaded | The download folders of the enabled online sources, then the manual folder. |
| Local | The images of the enabled `folder`, `album-name`, `album-date`, and `images` sources. |
| Favorites | The favorites folder. |
| Cache | Files in the download folder that belong to no enabled online source: loose files and the folders of removed sources. |

The current wallpaper comes first in the tab that holds it.

## Keys

The tabs run across the strip, so the tab keys use the other arrow axis. In a horizontal strip, Left and Right move between thumbnails, and Up and Down change the tab. In a vertical strip, the axes are swapped.

| Key | Action |
|---|---|
| Left, Right (vertical strip: Up, Down) | Previous or next thumbnail. Home and End go to the first and the last. |
| Up, Down (vertical strip: Left, Right) | Previous or next tab. |
| 1 to 5 | Sources, Downloaded, Local, Favorites, or Cache. |
| `[`, `]` | In the Sources tab, the previous or next source filter: All, then one per source. |
| Enter, Space | Set as wallpaper. |
| F | Add to favorites. |
| Delete, Backspace | Move to trash. Not in the Sources tab. |
| Menu key, Shift+F10 | Open the context menu. In the Sources tab, the menu also has **Download**. |
| Cmd+Z (Ctrl+Z) | Undo the last trash. |
| Esc | Close the picker. |

## Browse a source

In the Sources tab, three actions download the image:

- **Set** downloads the image to the source's download folder and sets it as the wallpaper.
- **Favorite** downloads the image to the favorites folder.
- **Download** only saves the image.

Each source type browses differently:

| Source type | What it browses |
|---|---|
| Wallhaven | The row's search, with its purity, categories, and sorting. Without an API key, each request reads one search page, about 24 images. |
| Unsplash | The row's search. With no keywords, the editorial feed, up to 20 pages. Needs `access_key`. |
| Reddit | The row's listing, 25 posts a page. The listing is hot unless its URL names another sort. kakemono leaves out posts marked NSFW (`over_18`) and posts with a score below 100. |
| Bing | The current daily images, up to 16. |
| APOD | The archive, 14 days a page, newest first, back to 16 June 1995. kakemono skips videos. |
| Folder, album, images | Not in the Sources tab. Their images are in the Local tab. |

Downloads always start from the first page of results. To see more than the first page, browse the source here. See [Things to know about pasted URLs](/guides/sources/#things-to-know-about-pasted-urls).

### Source messages under the strip

Each source reports its own state under the strip:

- A source that the provider is rate-limiting shows `type (id): message`, with the provider's text. kakemono asks the provider again after the wait the provider gave, or after 60 seconds.
- A source that needs setup, such as a missing API key, says what to add.
- With internet access off in Settings, the tab says that browsing is off.

### Blur NSFW previews

kakemono blurs previews that the source marks NSFW, such as Wallhaven sketchy and NSFW results, until you hover over or focus them. To turn the blur off, turn off **Blur NSFW previews** in Settings, or set [`blur_nsfw = false`](/reference/configuration/#picker) in `[picker]`.

### Privacy

The daemon fetches the previews, not the picker window. It requests previews only from the sources' image hosts and does not use a system proxy. It keeps them for 24 hours in the [previews cache folder](/reference/files/).

## Move and resize the picker

To move the picker, drag it by its grip. To make the strip shorter or longer, drag either end. The picker resizes only along the strip: left and right when horizontal, top and bottom when vertical. It is never shorter than about two thumbnails.

If you drop the picker so that it runs past the screen edge, it shrinks to end at the edge, and you scroll the strip for the rest. Move it back and it grows to the length you last chose. Only resizing it by hand changes that length.

kakemono remembers the spot and the length in [`[picker] custom`](/reference/configuration/#picker). To return the picker to the screen edge, click **Reset position** in Settings.

On Hyprland and sway, the compositor places the picker. kakemono moves the picker back on screen there, but doesn't shorten it. On native Wayland, add window rules for the picker. See [Picker window rules](/guides/linux/#picker-window-rules).
