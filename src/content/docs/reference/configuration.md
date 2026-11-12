---
title: Configuration
description: Every section and key in kakemono's config.toml, with its default.
---

kakemono reads one TOML file. This page lists every section and key with its default.

## Where kakemono finds the config file

kakemono reads the first config file that it finds:

1. `--config <PATH>`.
2. `$KAKEMONO_CONFIG`.
3. `~/.config/kakemono/config.toml`. If `$XDG_CONFIG_HOME` is set, kakemono reads `$XDG_CONFIG_HOME/kakemono/config.toml` instead. On Windows, it reads `%APPDATA%\kakemono\config.toml`.

`kakemono config path` prints the file that kakemono reads.

With no file, kakemono uses the defaults below. `kakemono config init` writes a commented config, with some example values that differ from the defaults.

The daemon reads the config when it starts. After you edit the file, restart the daemon or send it [`reload`](/reference/socket/). Changes to `socket_path` and `[desktop]` still need a restart.

kakemono ignores unknown keys. A section with some keys missing uses the defaults for those keys. Paths can start with `~`.

## `[daemon]`

| Key | Default | Meaning |
|---|---|---|
| `rotation_enabled` | `false` | Change the wallpaper on a timer. Off by default, so the wallpaper changes only when you ask. |
| `interval` | `"30m"` | Time between changes, as a Go duration: `"45s"`, `"30m"`, `"2h30m"`. An invalid or zero value falls back to 30 minutes. |
| `download_dir` | `"~/Pictures/Wallpapers/cache"` | Where downloads go, one folder per source. |
| `trash_dir` | `"~/Pictures/Wallpapers/trash"` | Where `trash` moves files. |
| `socket_path` | unset | The daemon socket. Unset means the [platform default](/reference/files/). Ignored on Windows. |
| `rotate_on_theme_change` | `false` | Set a new wallpaper when the system switches between light and dark mode. |
| `reapply_on_space_change` | `false` | macOS only. Set the current wallpaper again when you switch Spaces. See [Spaces on macOS](/guides/changing-wallpapers/#spaces-on-macos). |

## Change and download settings in `[daemon]`

These keys are also in the `[daemon]` section. [Downloads](/guides/changing-wallpapers/#downloads) explains how they work together.

| Key | Default | Meaning |
|---|---|---|
| `change_on_start` | `false` | Change the wallpaper once when the daemon starts. |
| `internet` | `true` | Allow online sources. With `false`, kakemono uses only the images already on disk. |
| `download_enabled` | `false` | Download new images from the online sources in the background. Off by default, so **Next** and the picker download on demand. |
| `download_interval` | `"10m"` | Time between background downloads, one image each time. |
| `download_limit_mb_enabled`, `download_limit_mb` | `true`, `500` | Keep the download folder under this size. kakemono deletes the oldest downloads first. It never deletes favorites, the current wallpaper, or files in local sources. |
| `manual_dir` | `<download_dir>/manual` | Where images go that you drop on Settings or fetch from a URL. |

## Sources: `[[sources]]`

Each source is one `[[sources]]` row. You can have several rows of the same type. [Sources](/guides/sources/) explains each type and the URLs you can paste.

| Key | Meaning |
|---|---|
| `id` | The source's name: `a` to `z`, `0` to `9`, and `-`, at most 32 characters. Downloads go to the folder `<download_dir>/<id>/`. |
| `enabled` | `true` or `false`. |
| `type` | One of `wallhaven`, `unsplash`, `reddit`, `bing`, `apod`, `web`, `folder`, `album-name`, `album-date`, and `images`. |
| `location` | What the source reads. Its meaning depends on `type`. See [Source types](/guides/sources/#source-types). |

```toml
[[sources]]
id = "wh-nature"
enabled = true
type = "wallhaven"
location = "nature"

[[sources]]
id = "pictures"
type = "folder"
location = "~/Pictures/Wallpapers"
```

With no `[[sources]]` rows, kakemono uses three sources:

- Wallhaven's hot list, `https://wallhaven.cc/hot`.
- Wallhaven's top list, `https://wallhaven.cc/toplist`.
- The favorites folder.

Config files from older versions have `[light]` and `[dark]` sections and an `enabled` key per provider. kakemono converts them to `[[sources]]` rows on the first start. It keeps the original file next to the new one as `config.toml.bak`.

## Settings for each source type

Settings shared by every row of a type go in a section named after the type.

| Section | Keys and defaults |
|---|---|
| `[wallhaven]` | `api_key = ""`, `purity = "100"`, `sorting = "random"`, `categories = "111"` |
| `[unsplash]` | `access_key = ""` |
| `[bing]` | `market = "en-US"` |
| `[apod]` | `api_key = "DEMO_KEY"` |

For `[wallhaven]`:

- `api_key` is optional. Without it, Wallhaven returns no NSFW results.
- `purity` is three digits, for SFW, sketchy, and NSFW.
- `categories` is three digits, for general, anime, and people.
- `sorting` is one of `random`, `toplist`, `date_added`, `relevance`, `views`, `favorites`, and `hot`.

A pasted Wallhaven search URL replaces these values for its row only. See [Use a website's search as a source](/guides/sources/#use-a-websites-search-as-a-source).

## `[filters]`

Filters are soft. If no image passes all of them, kakemono uses the image that passes the most.

| Key | Default | Meaning |
|---|---|---|
| `landscape` | `false` | Only images wider than they are tall. |
| `min_size_enabled`, `min_size_percent` | `false`, `80` | Only images at least this percentage of the screen size: 50, 80, or 100. |
| `brightness` | `"off"` | `dark`, `light`, or `system`. `system` means dark images in dark mode and light images in light mode. |
| `color_enabled`, `color` | `false`, `"#3b82f6"` | Prefer images whose main colour is close to this colour. |
| `rating_enabled`, `min_rating` | `false`, `4` | Only images with an EXIF or XMP rating of at least this, from 1 to 5. |
| `name_regex_enabled`, `name_regex` | `false`, `""` | Only images whose file name matches this regular expression. |

## `[favorites]`

| Key | Default | Meaning |
|---|---|---|
| `dir` | `"~/Pictures/Wallpapers/favorites"` | Where `favorite` copies the current wallpaper. |

## `[picker]`

[The picker](/guides/picker/) explains how to use these settings.

| Key | Default | Meaning |
|---|---|---|
| `position` | `"bottom"` | The screen edge for the picker: `bottom`, `top`, `left`, or `right`. |
| `orientation` | `"auto"` | `horizontal`, `vertical`, or `auto`. `auto` means vertical on the left and right edges. |
| `close_on_blur` | `true` | Hide the picker when it loses focus. |
| `placement` | `"edge"` | `edge` uses `position`. `custom` uses `custom`. Dragging or resizing the picker sets both. |
| `custom` | unset | `{ x = 10, y = 20, monitor = "DP-1", length = 1200 }`. `length` is optional. It is the strip's length in physical px. Without it, the strip spans the edge. |
| `force_x11` | `false` | Linux, Wayland: run the picker under XWayland so that kakemono can place it. Experimental. |
| `blur_nsfw` | `true` | Blur NSFW previews in the Sources tab until you hover over or focus them. |

## `[desktop]`

Linux only. `[desktop]` selects the wallpaper backend with the keys `backend`, `set_command`, `persistent`, `fit`, `theme`, and `managed_by`. The daemon fills it in on the first start. [Linux desktops](/guides/linux/#how-kakemono-picks-a-backend) describes every key and backend.

On macOS and Windows, kakemono always uses the system API and ignores `backend` and `set_command`.

## `[ui]`

| Key | Default | Meaning |
|---|---|---|
| `appearance` | `"light"` | The colour scheme of the Settings and Welcome windows: `light`, `dark`, or `system`. |
| `show_welcome` | `false` | Open the Welcome window on the next start. A new config sets `true`. The Welcome window sets it back to `false` the first time it shows. |

## `[hooks]`

| Key | Default | Meaning |
|---|---|---|
| `on_change` | unset | A command to run after every wallpaper change. An argv array, or a string that kakemono splits like a shell would. |

[Bars and hooks](/guides/bars-and-hooks/#how-the-hook-runs) describes the environment variables and placeholders the hook gets.
