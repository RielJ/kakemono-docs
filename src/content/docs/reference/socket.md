---
title: Socket protocol
description: The JSON-lines protocol that the kakemono daemon speaks on its local socket.
---

The daemon listens on a local socket. On macOS and Linux it is a Unix socket. On Windows it is the named pipe `\\.\pipe\kakemono-<user>`. [Files](/reference/files/) lists the default path on each system.

## Requests and replies

The daemon reads one JSON request per line and answers with one JSON line:

```sh
echo '{"cmd":"status"}' | nc -U ~/.config/kakemono/kakemono.sock
echo '{"cmd":"set","args":{"path":"/tmp/a.jpg"}}' | nc -U ~/.config/kakemono/kakemono.sock
```

A request is an object with `cmd` and, for some commands, `args`.

A reply is one of these:

- `{"ok":true,"data":{...}}`
- `{"ok":false,"error":"..."}`

## Commands

| `cmd` | What it does |
|---|---|
| `next` | Sets the next wallpaper. |
| `prev` | Sets the previous wallpaper. |
| `set` | Sets the image at `args.path` as the wallpaper. Needs `args.path`. |
| `favorite` | Copies the current wallpaper to the favorites folder. |
| `trash` | Moves the current wallpaper to the trash folder and sets the next one. |
| `pause` | Stops the rotation timer. |
| `resume` | Starts the rotation timer again. |
| `status` | Returns the current wallpaper and the daemon's state. |
| `reload` | Reads the config again without a restart. Changes to `socket_path` and `[desktop]` still need a restart. |
| `subscribe` | Keeps the connection open and sends one line for each event. |
| `version` | Returns the daemon's version. |
| `doctor` | Returns the diagnostics report that `kakemono doctor` prints. |

The [`kakemono` commands](/reference/commands/) use the same requests.

## The `status` reply

`data` in the `status` reply has these fields. `kakemono status --json` prints the same object.

| Field | Meaning |
|---|---|
| `current` | The current wallpaper, or `null`. |
| `current.path` | The image file. |
| `current.source` | The source type, such as `wallhaven` or `folder`. `manual` for the manual folder. `local` for an image from `set`. |
| `current.source_id` | The `[[sources]]` row `id`. Left out when empty. |
| `current.source_url` | The page the image came from. |
| `current.image_url` | The image's URL. |
| `current.title` | The image's title. |
| `current.author` | The image's author. |
| `current.width`, `current.height` | The image size in pixels. |
| `current.set_at` | When the daemon set the image, as an RFC 3339 time, or `""`. |
| `paused` | `true` while the rotation timer is stopped. |
| `interval` | The `interval` from the config, such as `"30m"`. |
| `theme` | `"light"` or `"dark"`. |
| `history_count` | The number of entries in the history. |
| `history_index` | The position of the current wallpaper in the history. `-1` when the history is empty. |

## Events from `subscribe`

After `{"cmd":"subscribe"}`, the daemon answers `{"ok":true}` and keeps the connection open. Then it sends one line for each event, in the form `{"event":"<name>","data":...}`:

| `event` | `data` |
|---|---|
| `changed` | The new wallpaper, with the same fields as `current` in the `status` reply. |
| `paused` | `true` when rotation paused, `false` when it resumed. |
| `theme_changed` | `"light"` or `"dark"`. |

A client should ignore event names that it doesn't know.
