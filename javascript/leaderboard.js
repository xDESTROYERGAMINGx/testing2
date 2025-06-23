// Data for both leaderboards
const leaderboardData = [
  {
    title: "OFW ELITES DONATION LEADERBOARD",
    sub: "NO DATA",
    players: [
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" },
      { name: "NO DATA", score: 0, avatar: "" }
    ]
  },
  {
    title: "OFW ELITES 2 DONATION LEADERBOARD",
    sub: "UPDATED ON 6/14/25 : 12:48AM",
    players: [
      { name: "ZANE", score: 27157, avatar: "../assets/CHAR/healer.webp" },
      { name: "PATRICK", score: 8658, avatar: "../assets/CHAR/hogrider.webp" },
      { name: "ANDREW", score: 6358, avatar: "../assets/CHAR/minion.webp" },
      { name: "KEV PU AKAL", score: 2511, avatar: "../assets/CHAR/barbarian1.png" },
      { name: "PAWIII", score: 2063, avatar: "../assets/CHAR/balloon.png" },
      { name: "K L H A Y", score: 1541, avatar: "" },
      { name: "POT2X", score: 1402, avatar: "../assets/CHAR/barbarian2.webp" },
      { name: "JESSIE", score: 1367, avatar: "../assets/CHAR/hogrider.webp" },
      { name: "OE MELIODAS", score: 1159, avatar: "../assets/CHAR/hogrider.webp" },
      { name: "EVIL WITCH", score: 1038, avatar: "../assets/CHAR/archer3.webp" }
    ]
  }
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

function updateLeaderboard(idx) {
  const data = leaderboardData[idx];
  // Sort players by score descending
  data.players.sort((a, b) => b.score - a.score);
  document.getElementById('lb-title').textContent = data.title;
  document.getElementById('lb-sub').textContent = data.sub;
  renderPodium(data.players.slice(0, 3));
  renderList(data.players);
}

// Button switching logic
document.addEventListener("DOMContentLoaded", function() {
  const btn1 = document.getElementById('btn-1');
  const btn2 = document.getElementById('btn-2');
  btn1.addEventListener('click', function() {
    btn1.classList.add('active');
    btn2.classList.remove('active');
    updateLeaderboard(0);
  });
  btn2.addEventListener('click', function() {
    btn2.classList.add('active');
    btn1.classList.remove('active');
    updateLeaderboard(1);
  });
  // Show first leaderboard by default
  updateLeaderboard(0);
});
