---
title: Commands
description: Every kakemono command, its options, and how pick and settings find the kakemono app.
---

The `kakemono` binary is both the daemon and the command-line client. Every command takes these options:

| Option | Meaning |
|---|---|
| `--config <PATH>` | The config file to read. See [Configuration](/reference/configuration/). |
| `--socket <PATH>` | The daemon socket to connect to. See [Files](/reference/files/). |

`kakemono <command> --help` describes each command.

## Command list

| Command | What it does |
|---|---|
| `daemon` | Starts the daemon in the background. `-f`, `--foreground` keeps it in the terminal. The daemon refuses to start twice. |
| `quit` | Stops the daemon after it saves its state. The login service restarts only a daemon that failed, so the daemon stays stopped until the next login or `kakemono daemon`. |
| `next` | Sets the next wallpaper: forward in the history, or a new download at the end of it. |
| `prev` | Sets the previous wallpaper from the history. |
| `set <IMAGE-PATH>` | Sets an image file as the wallpaper. |
| `favorite` | Copies the current wallpaper to the favorites folder. |
| `trash` | Moves the current wallpaper to the trash folder and sets the next one. |
| `status` | Shows the current wallpaper, the theme, the interval, and whether rotation is paused. `--json` prints the daemon's JSON. |
| `pause`, `resume` | Stops or restarts the rotation timer. |
| `open` | Reveals the current wallpaper in Finder or the file manager. `--folder` opens the download folder. `--favorites` opens the favorites folder. |
| `pick` | Opens the thumbnail [picker](/guides/picker/) in the kakemono app. |
| `settings` | Opens the settings window in the kakemono app. |
| `detect` | Shows the wallpaper backend for this session and why. `--write` saves it to `[desktop]`. `--force` overwrites a section with `managed_by = "user"`. Linux only. On other systems, it prints the native backend. |
| `doctor` | Prints the config file, the session, the backend and the command it would run, the picker window rules, and the daemon's state. `--apply` asks the daemon to set the current wallpaper again. |
| `service install`, `service uninstall`, `service status [--json]` | Manages the login service. See [Start the daemon at login](/install/other/#start-the-daemon-at-login). |
| `config path`, `config init`, `config edit` | Prints the config path, writes the commented default config, or opens the config in `$VISUAL` or `$EDITOR`. `config init` never overwrites a file. |
| `completions <SHELL>` | Prints a completion script for `bash`, `elvish`, `fish`, `powershell`, or `zsh`. |

## Exit code when the daemon isn't running

If a command can't reach the daemon, it exits with code 1 and says how to start the daemon.

## How pick and settings find the app

`pick` and `settings` start the `kakemono-ui` binary from the kakemono app. They look for it in this order:

1. `$KAKEMONO_UI`. If this variable is set, it is the only place kakemono looks.
2. The folder that holds `kakemono`.
3. On macOS, `/Applications/kakemono.app` and `~/Applications/kakemono.app`.
4. Every folder on `PATH`.

`pick` and `settings` pass their environment to the app when they start it. If the app is already running, it keeps its own environment.
