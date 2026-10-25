(() => {
  "use strict";

  const OWNER = "tappytoe";
  const TOPIC = "tappytoe-game";
  const FEATURED_REPOS = new Set(["sg-money-quest", "tappytoe.github.io"]);
  const status = document.getElementById("discovery-status");
  const grid = document.getElementById("discovered-games");

  function displayName(repoName) {
    const knownNames = { "sg-primary-exam": "Primary Quest" };
    return knownNames[repoName.toLowerCase()] || repoName
      .replace(/[-_]+/g, " ")
      .replace(/\\b\\w/g, (letter) => letter.toUpperCase());
  }

  function createGameCard(repo) {
    const card = document.createElement("article");
    card.className = "game-card discovered-card";

    const art = document.createElement("a");
    art.className = "game-art discovered-game-art";
    art.href = repo.html_url;
    art.target = "_blank";
    art.rel = "noopener noreferrer";
    art.setAttribute("aria-label", "Open " + displayName(repo.name));
    const artLabel = document.createElement("span");
    artLabel.className = "art-label";
    artLabel.textContent = "TAPPYTOE GAME";
    art.appendChild(artLabel);

    const info = document.createElement("div");
    info.className = "game-info";

    const row = document.createElement("div");
    row.className = "game-title-row";
    const titleWrap = document.createElement("div");
    const category = document.createElement("p");
    category.className = "game-category";
    category.textContent = "COMMUNITY • GAME";
    const title = document.createElement("h3");
    title.textContent = displayName(repo.name);
    titleWrap.append(category, title);

    const badge = document.createElement("span");
    badge.className = "status-pill live";
    const dot = document.createElement("span");
    badge.append(dot, document.createTextNode(" DISCOVERED"));
    row.append(titleWrap, badge);

    const description = document.createElement("p");
    const knownDescriptions = { "sg-primary-exam": "A playful Singapore Primary 3–5 maths adventure. Choose your level, solve questions and earn stars." };
    description.textContent = knownDescriptions[repo.name.toLowerCase()] || repo.description || "A new game from TappyToe. Open the repository to learn more.";

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

      if (games.length === 0) {
        status.textContent = "";
        return;
      }

      games.forEach((repo) => grid.appendChild(createGameCard(repo)));
      status.textContent = games.length === 1 ? "1 more game discovered" : games.length + " more games discovered";
    } catch (error) {
      console.error("Could not load TappyToe games:", error);
      status.textContent = "We couldn't load the latest games right now. Try refreshing in a moment.";
    }
  }

  loadGames();
})();
