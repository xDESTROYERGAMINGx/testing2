let players = [
  { name: "PATRICK XD JDS", score: 10456, avatar: "" },
  { name: "PLAYER", score: 10205, avatar: "" },
  { name: "PLAYER", score: 8589, avatar: "" },
  { name: "PLAYER", score: 7455, avatar: "" },
  { name: "PLAYER", score: 7455, avatar: "" },
  { name: "PLAYER", score: 7455, avatar: "" },
  { name: "PLAYER", score: 5670, avatar: "" },
  { name: "PLAYER", score: 5670, avatar: "" },
  { name: "PLAYER", score: 5670, avatar: "" },
  { name: "PLAYER", score: 4980, avatar: "" }
];

function avatarSVG(size = 70) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 70 70" fill="none"><circle cx="35" cy="25" r="15" fill="#bdbdbd"/><ellipse cx="35" cy="52" rx="22" ry="13" fill="#bdbdbd"/></svg>`;
}

function renderPodium(players) {
  const [first, second, third] = players;
  document.getElementById('podium').innerHTML = `
      <div class="podium-place second">
        <div class="rank-label">2</div>
        <div class="avatar">${second.avatar ? `<img src="${second.avatar}" style="width:100%;height:100%;border-radius:50%;">` : avatarSVG()}</div>
        <div class="player-name">${second.name}</div>
        <div class="score">${second.score.toLocaleString()}</div>
      </div>
      <div class="podium-place first">
        <svg class="gem"><use href="#gem"></use></svg>
        <div class="avatar">
          ${first.avatar ? `<img src="${first.avatar}" style="width:100%;height:100%;border-radius:50%;">` : avatarSVG()}
        </div>
        <div class="player-name">${first.name}</div>
        <div class="score">${first.score.toLocaleString()}</div>
      </div>
      <div class="podium-place third">
        <div class="rank-label">3</div>
        <div class="avatar">${third.avatar ? `<img src="${third.avatar}" style="width:100%;height:100%;border-radius:50%;">` : avatarSVG()}</div>
        <div class="player-name">${third.name}</div>
        <div class="score">${third.score.toLocaleString()}</div>
      </div>
    `;
}

function renderList(players) {
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  players.slice(3).forEach((player, i) => {
    const rank = i + 4;
    const row = document.createElement('div');
    row.className = 'leaderboard-row';
    row.style.setProperty('--delay', (i * 0.09 + 0.1) + 's');
    row.innerHTML = `
        <div class="rank">${rank}</div>
        <div class="row-name">${player.name}</div>
        <div class="row-score">${player.score.toLocaleString()}</div>
      `;
    list.appendChild(row);
  });
}

function updateLeaderboard(data) {
  data.sort((a, b) => b.score - a.score);
  renderPodium(data.slice(0, 3));
  renderList(data);
}

updateLeaderboard(players);