---
title: Troubleshooting
description: Fixes for the problems people hit most with kakemono, from unsigned-app warnings to a wallpaper that doesn't change.
---

Each section names a problem and gives the fix.

## macOS says the app is "damaged"

The kakemono app is not signed, so macOS calls it "damaged" until you clear the quarantine flag. Run:

```sh
xattr -dr com.apple.quarantine /Applications/kakemono.app
```

The Homebrew cask clears the flag for you. See [Install on macOS](/getting-started/install/#macos).

## Windows SmartScreen warns that the publisher is unknown

The installer is not signed. When SmartScreen warns, click **More info**, then **Run anyway**. winget runs the same unsigned installer, so SmartScreen warns once there too.

## The menu-bar icon is missing on macOS

On a MacBook with a notch, macOS hides menu-bar icons that don't fit beside the notch. To see the kakemono icon, quit some menu-bar apps, or use a menu-bar manager such as Ice or Bartender.

## The tray icon is missing on Windows

Windows can hide the kakemono icon in the notification area behind the **^** arrow. Click the arrow to see it.

## The tray icon is missing on Linux

The tray icon needs a StatusNotifier host. KDE Plasma and most bars, such as waybar, have one. On GNOME, install the AppIndicator extension.

## The wallpaper doesn't change on Linux

1. Run `kakemono detect` to see which wallpaper backend kakemono picked for your desktop, and why.
2. Run `kakemono doctor`. It prints the config file, the session, the backend and the command it would run, and the daemon's state. `kakemono doctor --apply` asks the daemon to set the current wallpaper again.
3. Compare the **Session (this shell)** and **Daemon** sections of the `doctor` output. If they show different backends, the login service is missing part of your session environment. See [The systemd service needs your session environment](/guides/linux/#the-systemd-service-needs-your-session-environment).

To choose the backend yourself, see [How kakemono picks a backend](/guides/linux/#how-kakemono-picks-a-backend) and [Use your own command](/guides/linux/#use-your-own-command).

## The wallpaper changes only when you ask

This is the default. A new install changes the wallpaper only on **Next**, `kakemono next`, or the picker. To change it on a timer, see [Change the wallpaper on a timer](/guides/changing-wallpapers/#change-the-wallpaper-on-a-timer).

## Only the current Space changes on macOS

macOS has no API that sets the wallpaper on every Space. kakemono sets it on the current Space of each screen. To give each Space the current wallpaper when you switch to it, set `reapply_on_space_change = true` in `[daemon]`. That turns off **Show on all Spaces** in System Settings. See [Spaces on macOS](/guides/changing-wallpapers/#spaces-on-macos).

## A source shows Invalid

**Invalid** means that the source returned an error or no images. Hover over the status, or select the row in Settings, to see why. For a pasted URL, the status says which URLs that source accepts.

Common causes:

- A `web` row points to a page that builds its content with JavaScript, such as Google Images, Pinterest, or Instagram. Paste direct image links instead. See [Web page](/guides/sources/#web-page).
- A URL that the source type doesn't accept. See [Use a website's search as a source](/guides/sources/#use-a-websites-search-as-a-source).
- An `unsplash` row with no `[unsplash] access_key`.

**Unknown** means that the background service didn't answer.

## Wallhaven NSFW returns nothing

Wallhaven returns NSFW results only with an API key. Without one, `purity=001` gives nothing. Set `api_key` in [`[wallhaven]`](/reference/configuration/#settings-for-each-source-type).

## The picker shows a rate-limit message

A source that the provider is rate-limiting shows `type (id): message` under the strip, with the provider's text. kakemono asks the provider again after the wait the provider gave, or after 60 seconds. See [Source messages under the strip](/guides/picker/#source-messages-under-the-strip).

## The picker opens in the wrong place on Wayland

On native Wayland, the compositor decides where windows go. Add window rules for the picker. See [Picker window rules](/guides/linux/#picker-window-rules).

## The picker or Settings window is blank on NVIDIA

Set `WEBKIT_DISABLE_DMABUF_RENDERER=1` in the environment that starts the kakemono app. See [Blank windows on NVIDIA](/guides/linux/#blank-windows-on-nvidia).

## A command can't reach the daemon

If a command can't reach the daemon, it exits with code 1 and says how to start the daemon. Start it with:

```sh
kakemono daemon
```

To start the daemon at every login, see [Start the daemon at login](/getting-started/first-start/#start-the-daemon-at-login).

## Where the logs are

The daemon writes one log file per day in its logs folder:

- macOS: `~/.local/state/kakemono/`
- Linux: `$XDG_STATE_HOME/kakemono/`, which is `~/.local/state/kakemono/` by default
- Windows: `%LOCALAPPDATA%\kakemono\logs\`

For more detail, start the daemon with `KAKEMONO_LOG=debug`. [Logs](/reference/files/#logs) lists the login service logs too.
