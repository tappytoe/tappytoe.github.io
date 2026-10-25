(() => {
  "use strict";

  const OWNER = "tappytoe";
  const TOPIC = "tappytoe-game";
  const FEATURED_REPOS = new Set(["sg-money-quest", "tappytoe.github.io"]);
  const grid = document.getElementById("discovered-games");

  function displayName(repoName) {
    const knownNames = { "sg-primary-exam": "Primary Quest", "maths-market": "Maths Market" };
    return knownNames[repoName.toLowerCase()] || repoName
      .replace(/[-_]+/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function createGameCard(repo) {
    const card = document.createElement("article");
    card.className = "game-card discovered-card";

    const art = document.createElement("a");
    art.className = "game-art discovered-game-art";
    art.href = repo.homepage && /^https?:\/\//i.test(repo.homepage)
      ? repo.homepage
      : "https://" + OWNER + ".github.io/" + encodeURIComponent(repo.name) + "/";
    art.setAttribute("aria-label", "Play " + displayName(repo.name));
    const thumbnail = document.createElement("img");
    thumbnail.className = "game-thumbnail";
    thumbnail.alt = "";
    thumbnail.loading = "lazy";
    thumbnail.src = "https://raw.githubusercontent.com/" + OWNER + "/" + encodeURIComponent(repo.name) + "/main/thumbnail.svg";
    thumbnail.onerror = function () {
      if (!thumbnail.dataset.pngFallback) {
        thumbnail.dataset.pngFallback = "1";
        thumbnail.src = "https://raw.githubusercontent.com/" + OWNER + "/" + encodeURIComponent(repo.name) + "/main/thumbnail.png";
      } else {
        thumbnail.remove();
      }
    };
    art.appendChild(thumbnail);

    const artLabel = document.createElement("span");
    artLabel.className = "art-label";
    artLabel.textContent = "LEARN & PLAY";
    art.appendChild(artLabel);

    const info = document.createElement("div");
    info.className = "game-info";
    const row = document.createElement("div");
    row.className = "game-title-row";
    const titleWrap = document.createElement("div");
    const category = document.createElement("p");
    category.className = "game-category";
    category.textContent = "TAPPYTOE • GAME";
    const title = document.createElement("h3");
    title.textContent = displayName(repo.name);
    titleWrap.append(category, title);
    const badge = document.createElement("span");
    badge.className = "status-pill live";
    const dot = document.createElement("span");
    badge.append(dot, document.createTextNode(" PLAY NOW"));
    row.append(titleWrap, badge);

    const description = document.createElement("p");
    const knownDescriptions = {
      "sg-primary-exam": "A playful Singapore Primary 3–5 maths adventure.",
      "maths-market": "A colourful maths adventure for Primary 1–6. Explore, solve, and play."
    };
    description.textContent = knownDescriptions[repo.name.toLowerCase()] || repo.description || "A little game to learn and play.";

    const link = document.createElement("a");
    link.className = "text-link";
    link.href = repo.homepage && /^https?:\/\//i.test(repo.homepage)
      ? repo.homepage
      : "https://" + OWNER + ".github.io/" + encodeURIComponent(repo.name) + "/";
    link.textContent = "Play game ";
    const arrow = document.createElement("span");
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.appendChild(arrow);

    info.append(row, description, link);
    card.append(art, info);
    return card;
  }

  async function loadGames() {
    try {
      const query = encodeURIComponent("user:" + OWNER + " topic:" + TOPIC);
      const response = await fetch("https://api.github.com/search/repositories?q=" + query + "&per_page=100&sort=updated", {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!response.ok) throw new Error("GitHub returned " + response.status);
      const data = await response.json();
      const games = (data.items || [])
        .filter((repo) => !FEATURED_REPOS.has(repo.name.toLowerCase()) && !repo.private && !repo.archived)
        .sort((a, b) => a.name.localeCompare(b.name));
      games.forEach((repo) => grid.appendChild(createGameCard(repo)));
    } catch (error) {
      console.error("Could not load TappyToe games:", error);
    }
  }

  loadGames();
})();