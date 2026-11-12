---
title: Help
description: Answers to the questions people ask most about kakemono.
---

## My Mac says kakemono "is damaged and can't be opened"

It isn't damaged. macOS says this about apps that aren't signed with a paid Apple certificate. [Install on a Mac](/install/mac/) shows the one command that fixes it. You only run it once.

## Windows says "Windows protected your PC"

Click **More info**, then **Run anyway**. Windows says this because kakemono isn't signed with a paid certificate yet.

## I can't find the kakemono icon

- **Mac with a notch:** macOS hides menu bar icons that don't fit next to the notch. Quit a few other menu bar apps, or use a menu bar manager such as Ice or Bartender.
- **Windows:** click the **^** arrow next to the clock. The icon may be hidden there.
- **Linux on GNOME:** install the AppIndicator extension. Other desktops show tray icons without it.

## My wallpaper never changes

That's the default. kakemono changes the wallpaper only when you click **Next** or choose one in the picker. To change it on a timer, tick **Change wallpaper every** in Settings. See [How to use kakemono](/using/#change-it-every-30-minutes).

## Only one desktop changed on my Mac

macOS doesn't let apps set the wallpaper of every Space at once. kakemono sets it on the Space you're looking at. [Spaces on macOS](/guides/changing-wallpapers/#spaces-on-macos) has a setting that updates each Space when you switch to it.

## A source says Invalid

Hover over **Invalid** in Settings to see why. The usual causes:

- An Unsplash source without a key. See [Unsplash needs a key](/sources/#unsplash-needs-a-key).
- A web page that kakemono can't read, such as Pinterest or Instagram.
- A link from a site that the source doesn't accept. For example, a Reddit link in a Wallhaven source.

## The wallpaper doesn't change on Linux

Run `kakemono doctor` in a terminal. It says which wallpaper tool kakemono uses for your desktop and what went wrong. [Linux desktops](/guides/linux/) explains the fixes.

## Something else

[Troubleshooting](/troubleshooting/) covers more problems. If yours isn't there, [open an issue on GitHub](https://github.com/RielJ/kakemono/issues) and say which system you use.
