---
title: Changing wallpapers
description: Change the wallpaper on a timer, step through the history, keep favorites, match light and dark mode, and filter the images kakemono picks.
---

kakemono changes the wallpaper only when you ask, until you turn on the timer. This page explains the timer, where new images come from, the history, and the filters. The [configuration reference](/reference/configuration/#daemon) lists every key and its default.

## Change the wallpaper on a timer

The timer is off by default. To turn it on, tick **Change wallpaper every** in Settings, or set `rotation_enabled = true` in `[daemon]`. `interval` sets the time between changes, as a Go duration such as `"45s"`, `"30m"`, or `"2h30m"`. The default is 30 minutes.

```toml
[daemon]
rotation_enabled = true
interval = "1h"
```

To stop the timer for a while, run `kakemono pause`. To start it again, run `kakemono resume`.

To change the wallpaper once each time the daemon starts, set `change_on_start = true`.

## Downloads

A wallpaper change picks an image that is already on disk, from the enabled sources. Background downloads are off by default, so **Next** downloads an image when you ask for one. Browsing in the [picker](/guides/picker/) downloads only the image you use.

To keep a pool of new images ready, set `download_enabled = true`. The background downloader then downloads one image every `download_interval`, 10 minutes by default.

kakemono keeps the download folder under 500 MB by default. When the folder grows past the limit, kakemono deletes the oldest downloads first. It never deletes favorites, the current wallpaper, or files in local sources. `download_limit_mb` sets the limit, and `download_limit_mb_enabled = false` turns it off.

To use only the images already on disk, set `internet = false`. kakemono then skips every online source.

Images that you drop on Settings or fetch from a URL go to the manual folder, `manual_dir`.

## History, favorites, and trash

kakemono keeps a history of the wallpapers it has set.

- `kakemono prev` sets the previous wallpaper from the history.
- `kakemono next` moves forward in the history. At the end of the history, it sets a new image.
- `kakemono favorite` copies the current wallpaper to the favorites folder, [`[favorites] dir`](/reference/configuration/#favorites).
- `kakemono trash` moves the current wallpaper to the trash folder, `trash_dir`, and sets the next one.

The tray menu and the [picker](/guides/picker/#keys) do the same. In the picker, Cmd+Z (Ctrl+Z) undoes the last trash.

## Match light and dark mode

kakemono can follow the system's light and dark mode in two ways:

- To prefer dark images in dark mode and light images in light mode, set [`brightness = "system"`](/reference/configuration/#filters) in `[filters]`.
- To set a new wallpaper when the system switches mode, set `rotate_on_theme_change = true` in `[daemon]`.

Use both to get a new wallpaper that matches the mode each time it switches.

On Linux, kakemono can't read the system theme on some sessions, such as a bare X11 window manager. To choose the theme yourself, set [`theme`](/guides/linux/#how-kakemono-picks-a-backend) in `[desktop]`.

## Filter the images

Filters narrow the images that a wallpaper change can pick. They can require landscape images, a minimum size, a brightness, a main colour, an EXIF or XMP rating, or a file name. The [`[filters]` reference](/reference/configuration/#filters) lists each one.

Filters are soft. If no image passes all of them, kakemono uses the image that passes the most. A filter that nothing matches doesn't stop the wallpaper from changing.

## Spaces on macOS

macOS has no API that sets the wallpaper on every Space. kakemono sets it on the current Space of each screen, and the other Spaces keep their old wallpaper.

With `reapply_on_space_change = true` in `[daemon]`, each Space gets the current wallpaper when you switch to it. The option is off by default, because setting the wallpaper again turns off **Show on all Spaces** in System Settings.
