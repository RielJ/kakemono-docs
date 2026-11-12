---
title: Updating
description: Update kakemono from the banner in Settings, or with the package manager that installed it.
---

The kakemono app checks for a new release when you open Settings. It checks again when you come back to Settings after an hour or more.

## Update from the banner

When a new release is out, a banner at the top of Settings shows the new version. The banner has three buttons:

- **Update** downloads the new version, checks its signature, installs it, and restarts kakemono. The daemon stops for the install, and the new app starts the daemon again.
- **What's new** opens the release page.
- **Later** hides the banner until the next version.

On Linux, updating a `.deb` or `.rpm` install asks for your password, because the package installs system-wide.

For a build that is not from a release package, such as one from `cargo build`, the banner links to the release page instead.

## Update with a package manager

If a package manager installed kakemono, update it there instead. The banner names the command.

| Installed with | Update with |
|---|---|
| Homebrew cask | **Update** in the banner, or `brew upgrade --cask kakemono` |
| winget | **Update** in the banner, or `winget upgrade RielJ.kakemono` |
| Scoop | `scoop update kakemono` |
| AUR | Your AUR helper, for example `yay -Syu` |

## Update the command-line tool

The command-line tool on its own does not update itself. To update it, download the new archive and install it the same way as the first time. See [Command-line tool only](/getting-started/install/#command-line-tool-only).
