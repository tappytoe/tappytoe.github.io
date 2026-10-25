# TappyToe Arcade

The home portal for TappyToe's growing collection of small, thoughtful games.

🌐 **Live site:** https://tappytoe.github.io/

## Games

- **[SG Money Quest](https://tappytoe.github.io/sg-money-quest/)** — learn and explore Singapore money through play.
- Additional public repositories tagged with the GitHub topic `tappytoe-game` are discovered automatically by the homepage.

## Add a game to the portal

1. Create a **public** repository under the `tappytoe` GitHub account.
2. Publish the game using GitHub Pages. For a project site, the usual URL is `https://tappytoe.github.io/REPOSITORY-NAME/`.
3. Open the repository's **About** settings (gear icon near the top-right of the repository page) and add the topic **`tappytoe-game`**.
4. Add a short repository description. The portal uses it as the card description.
5. Add a custom thumbnail named **`thumbnail.svg`** (preferred) or `thumbnail.png` to the root of the game repository. Keep the artwork wide (about 1200×700), readable at small card sizes, and representative of the game. The homepage checks these standard filenames automatically; if neither exists, it shows the default arcade artwork.
6. Use the same TappyToe Arcade footer pattern as SG Money Quest: place the TappyToe logo at the bottom of the page and link it to `https://tappytoe.github.io/`. Do **not** add a prominent homepage/back-to-arcade link in the game header. Keep the header focused on the game itself.
7. Give the game a consistent visual identity, responsive layout, accessible labels, and a clear mobile-friendly play experience.
8. Wait a minute, then refresh https://tappytoe.github.io/.

The portal searches GitHub's public repository API for the `tappytoe-game` topic. It does not need a token or manual card entry for each new tagged game. It looks for `thumbnail.svg` first and `thumbnail.png` second in each game's repository root.

## Development

This is a static site built with HTML, CSS, and JavaScript and hosted on GitHub Pages. Changes pushed to `main` are deployed automatically through `.github/workflows/deploy.yml`.

If Pages has not been configured yet, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
