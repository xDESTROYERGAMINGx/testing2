// Data for both leaderboards
const leaderboardData = [
  {
    title: "OFW ELITES DONATION LEADERBOARD",
    sub: "UPDATED ON 6/30/25 : 4:00PM",
    players: [
      { name: "Raz.Ai", score: 109226, avatar: "../assets/CHAR/bk2.png" },
      { name: "OE_Alexandra❤️", score: 56997, avatar: "../assets/CHAR/wallbreaker.png" },
      { name: "OE_xAd_dAx", score: 11395, avatar: "../assets/CHAR/pekka.png" },
      { name: "✧ chⒺssmⒶn ✧", score: 9946, avatar: "../assets/CHAR/archer1.png" },
      { name: "entengzki", score: 6299, avatar: "../assets/CHAR/archer3.png" },
      { name: "pruto", score: 5216, avatar: "../assets/CHAR/wallbraeker.png" },
      { name: "✓Lord BioMan✓", score: 3318, avatar: "../assets/CHAR/barbarian4.png" },
      { name: "Minimix", score: 1793, avatar: "../assets/CHAR/bk2.png" },
      { name: "1k", score: 1706, avatar: "../assets/CHAR/giant1.png" },
      { name: "❤KIDDO❤", score: 1527, avatar: "../assets/CHAR/giant2.png" }
    ]
  },
  {
    title: "OFW ELITES 2 DONATION LEADERBOARD",
    sub: "UPDATED ON 6/30/25 : 4:00PM",
    players: [
      { name: "Zane", score: 81243, avatar: "../assets/CHAR/healer.png" },
      { name: "ąŋɗřəẃ❤️", score: 48480, avatar: "../assets/CHAR/minion.png" },
      { name: "PATRICK", score: 26935, avatar: "../assets/CHAR/hogrider.png" },
      { name: "pot2x", score: 13754, avatar: "../assets/CHAR/barbarian2.png" },
      { name: "8mG Uric Acid", score: 4570, avatar: "../assets/CHAR/barbarian1.png" },
      { name: "KEV⚡PU⚡AKAL", score: 4073, avatar: "../assets/CHAR/barbarian4.png" },
      { name: "Curt Jester ❤️", score: 3612, avatar: "../assets/CHAR/barbarian3.png" },
      { name: "MASTER CASBY", score: 3044, avatar: "../assets/CHAR/witch2.png" },
      { name: "Pawiii", score: 1823, avatar: "../assets/CHAR/ballooon.png" },
      { name: "K♦️L♦️H♦️A♦️Y", score: 1542, avatar: "../assets/CHAR/super-goblin.png" }
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
