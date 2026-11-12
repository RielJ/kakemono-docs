---
title: Sources
description: Add online and local wallpaper sources, and paste a Wallhaven, Reddit, or Unsplash search URL to use its filters.
---

A source is a place kakemono gets wallpapers from. It can be an online service, a web page, or a folder on your disk. Each source is one `[[sources]]` row in `config.toml`, and you can have several rows of the same type, for example two Wallhaven searches. The [`[[sources]]` reference](/reference/configuration/#sources-sources) lists every key.

With no `[[sources]]` rows, kakemono uses [a default set of sources](/reference/configuration/#sources-sources).

## Source types

The `type` of a row decides what its `location` means:

| `type` | `location` |
|---|---|
| `wallhaven` | Search keywords, or a wallhaven.cc search URL. Empty for the latest images. |
| `unsplash` | Search keywords. Empty for the editorial feed. Needs `[unsplash] access_key`. |
| `reddit` | A subreddit, such as `EarthPorn`. |
| `bing` | Empty. The images of the day. |
| `apod` | Empty. NASA's Astronomy Picture of the Day. |
| `web` | An `https://` link to an image, a web page, or an RSS or Atom feed. |
| `folder` | A folder. kakemono picks its images at random, subfolders included. |
| `album-name`, `album-date` | A folder, shown in file-name or file-date order. |
| `images` | Image files. |

## Add a source in Settings

The easiest way to edit sources is the sources table in Settings. To add a source, click **Sources** > **Add…**. To rename a source in place, double-click its name.

kakemono checks each enabled online source for images once, when you add or change it. It marks only the sources with a problem:

- **Invalid**: the source returned an error or no images.
- **Unknown**: the background service didn't answer.

To see why, hover over the status or select the row. Rows without a status are fine.

## Add a source in the config file

Each row needs an `id` and a `type`. The `id` names the folder that the source's downloads go to.

```toml
[[sources]]
id = "wh-nature"          # a-z, 0-9 and "-", at most 32; names the folder downloads/<id>/
enabled = true
type = "wallhaven"
location = "nature"

[[sources]]
id = "pictures"
type = "folder"
location = "~/Pictures/Wallpapers"
```

After you edit the file, restart the daemon or send it [`reload`](/reference/socket/).

Settings shared by every row of a type, such as an API key, go in a section named after the type. The next sections describe each type. The [per-type sections reference](/reference/configuration/#settings-for-each-source-type) lists the keys and defaults.

## Wallhaven

Wallhaven works without an API key. The `location` is sent as Wallhaven's search query, so its search syntax works:

- `+mountains -people`: must have mountains, no people.
- `@username`: one user's uploads.
- `type:png`: PNG images only.
- `like:94x38z`: images with tags similar to that image.

Wallhaven returns NSFW results only with an API key in `[wallhaven] api_key`. Without one, `purity=001` gives nothing.

The `[wallhaven]` section sets `purity`, `categories`, and `sorting` for every Wallhaven row. A [pasted search URL](#use-a-websites-search-as-a-source) overrides them for one row.

## Unsplash

An Unsplash row needs an access key in `[unsplash] access_key`. With keywords, the row uses the Unsplash search. With no keywords, it uses the editorial feed.

## Reddit

A Reddit row takes a subreddit name, such as `EarthPorn`. To combine subreddits, join them with `+`, as in `EarthPorn+SkyPorn`. To choose a sort order, [paste a listing URL](#use-a-websites-search-as-a-source).

## Bing

A Bing row uses Bing's images of the day and ignores `location`. `[bing] market` picks the country, for example `en-GB`.

## NASA APOD

An `apod` row uses NASA's Astronomy Picture of the Day and ignores `location`. `[apod] api_key` defaults to `DEMO_KEY`.

## Web page

A `web` row takes an `https://` link to one of these:

- An image.
- A page that has images in its HTML.
- An RSS or Atom feed.

kakemono uses only the images that are at least 1080 px on the short side, in the order they appear on the page. It reads the page again at most every 6 hours. Settings checks the link again each time you add or edit the row.

Pages that build their content with JavaScript, such as Google Images, Pinterest, and Instagram, show **Invalid**. For those sites, paste direct image links instead.

## Local folders and files

Four types read images from your disk:

- `folder` picks images from a folder at random, subfolders included.
- `album-name` shows a folder's images in file-name order.
- `album-date` shows a folder's images in file-date order.
- `images` uses a list of image files.

These types take a path, not a URL. `~` means your home folder. Their images appear in the [Local tab](/guides/picker/#tabs) of the picker.

## Use a website's search as a source

Search on the website itself and set its filters. Then copy the URL from the address bar and paste it as the source's `location`, either in **Sources** > **Add…** in Settings or in the config file. You can add one row per search.

```toml
[[sources]]
id = "wh-top-6m"
type = "wallhaven"
location = "https://wallhaven.cc/search?categories=110&purity=100&topRange=6M&sorting=toplist&order=desc&page=2"

[[sources]]
id = "earth-month"
type = "reddit"
location = "https://www.reddit.com/r/EarthPorn/top/?t=month"

[[sources]]
id = "misty-forest"
type = "unsplash"
location = "https://unsplash.com/s/photos/misty-forest"

[[sources]]
id = "gallery"
type = "web"
location = "https://example.com/wallpapers/"
```

Each source type accepts different URLs:

| Source | URLs you can paste | What kakemono uses |
|---|---|---|
| Wallhaven | A search: `wallhaven.cc/search?...` | `q`, `categories`, `purity`, `sorting`, `topRange`, `order`, `atleast`, `resolutions`, `ratios`, and `colors`. They replace the `[wallhaven]` values for this row only. kakemono ignores `page` and `seed`. |
| Wallhaven | A list: `wallhaven.cc/hot`, `/toplist`, `/latest`, or `/random` | The list's sort order, plus any of the parameters above, for example `wallhaven.cc/toplist?topRange=1y`. |
| Wallhaven | A tag: `wallhaven.cc/tag/37` | The images with that tag, the same as the search `id:37`. |
| Reddit | A subreddit: `reddit.com/r/EarthPorn` | The subreddit's hot posts. |
| Reddit | A sorted listing: `reddit.com/r/EarthPorn/top/?t=month` | The sort (`hot`, `new`, `rising`, `top`, or `controversial`). For `top` and `controversial`, also the time range `t` (`hour`, `day`, `week`, `month`, `year`, or `all`). |
| Reddit | Several subreddits: `reddit.com/r/EarthPorn+SkyPorn` | All of them together, as on Reddit. You can also type `EarthPorn+SkyPorn`. |
| Unsplash | A search: `unsplash.com/s/photos/misty-forest` | The keywords `misty forest`. Other Unsplash URLs, such as collections and profiles, are not supported. |
| Web page | Any `https://` page, image, or feed: `example.com/wallpapers/` | The images on the page that are at least 1080 px on the short side. See [Web page](#web-page). |
| Bing, APOD | None | Nothing. For Bing, `[bing] market` picks the country, for example `en-GB`. |

### Things to know about pasted URLs

- **Pages.** Downloads always start from the first page of results, so `page=2` in a Wallhaven URL changes nothing. To see more than the first page, browse the source in the [picker](/guides/picker/#browse-a-source).
- **Wallhaven without an API key.** Each Wallhaven download picks up to 3 images at random from the first page. For a source that keeps changing, use `sorting=random` or a shorter `topRange`.
- **`topRange`.** Wallhaven uses `topRange` only with `sorting=toplist`.
- **A URL that kakemono can't use.** The row shows **Invalid** in Settings. Hover over the status to see which URLs that source accepts.
