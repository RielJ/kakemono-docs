---
title: Files
description: Where kakemono keeps its config, state, socket, logs, and caches on macOS, Linux, and Windows.
---

kakemono keeps its files in these places:

| File | macOS | Linux | Windows |
|---|---|---|---|
| Config | `~/.config/kakemono/config.toml` | `$XDG_CONFIG_HOME/kakemono/config.toml` | `%APPDATA%\kakemono\config.toml` |
| History and state | `~/.config/kakemono/state.json` | `$XDG_CONFIG_HOME/kakemono/state.json` | `%APPDATA%\kakemono\state.json` |
| Socket | `~/.config/kakemono/kakemono.sock` | `$XDG_RUNTIME_DIR/kakemono/kakemono.sock` | Named pipe `\\.\pipe\kakemono-<user>` |
| Lock and PID files | `~/.config/kakemono/` | `$XDG_RUNTIME_DIR/kakemono/` | `%LOCALAPPDATA%\kakemono\run\` |
| Daemon logs | `~/.local/state/kakemono/` | `$XDG_STATE_HOME/kakemono/` | `%LOCALAPPDATA%\kakemono\logs\` |
| Thumbnails (app) | `~/.cache/kakemono/` | `$XDG_CACHE_HOME/kakemono/` | `%LOCALAPPDATA%\kakemono\cache\` |
| Browse previews (daemon, 24 hours) | `~/.cache/kakemono/previews/` | `$XDG_CACHE_HOME/kakemono/previews/` | `%LOCALAPPDATA%\kakemono\cache\previews\` |

## Environment variables

`XDG_CONFIG_HOME`, `XDG_STATE_HOME`, and `XDG_CACHE_HOME` default to `~/.config`, `~/.local/state`, and `~/.cache`. These defaults apply on macOS too.

On Linux without `XDG_RUNTIME_DIR`, kakemono puts the socket at `~/.config/kakemono/kakemono.sock`, and the lock and PID files in the config folder.

`$KAKEMONO_SOCKET` overrides the default socket. `$KAKEMONO_CONFIG` sets the config file. See [Where kakemono finds the config file](/reference/configuration/#where-kakemono-finds-the-config-file).

## Logs

The background daemon writes one log file per day, `kakemono.<date>.log`, in the daemon logs folder. It keeps the newest 7.

`KAKEMONO_LOG` sets the log level in `tracing` filter syntax, for example `KAKEMONO_LOG=debug`.

The [login service](/install/other/#start-the-daemon-at-login) also logs to these places:

| OS | Login service logs |
|---|---|
| macOS | `~/.local/state/kakemono/launchd.log` |
| Linux | `journalctl --user -u kakemono.service` |
| Windows | `%LOCALAPPDATA%\kakemono\logs\` |
