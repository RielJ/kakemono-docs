# Share image

`public/og.png` is the 1280×640 card that X, LinkedIn, Discord and Slack show for links to the
site. Upload the same file to GitHub as the repository's social preview (Settings > General >
Social preview).

To change it, edit `og.html`, then render it with headless Chrome:

```sh
cd og
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1280,640 \
  --screenshot="$PWD/../public/og.png" "file://$PWD/og.html"
```

`icon.svg` is a copy of `crates/ui/src-tauri/icons/icon.svg` from the kakemono repo, and
`picker.jpg` is the picker screenshot from the blog post.
