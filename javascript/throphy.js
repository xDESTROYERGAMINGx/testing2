// Two sets of leaderboard data
const leaderboards = [
    {
        title: "OFW ELITES LEADERBOARD",
        sub: "UPDATED ON 6/29/25 : 3:00PM : NOT FINAL",
        players: [
            { name: "FL⚡️❣️My_Lady❣️", trophies: 6165, avatar: "../assets/CHAR/golem.png" },
            { name: "OE☆☆☆ReNaN☆☆☆", trophies: 6163, avatar: "../assets/CHAR/barbarian2.png" },
            { name: "❤KIDDO❤", trophies: 6092, avatar: "../assets/CHAR/giant2.png" },
            { name: "Minimix.", trophies: 6077, avatar: "../assets/CHAR/bk2.png" },
            { name: "™Aliäs{{2015}}™", trophies: 6019, avatar: "../assets/CHAR/golem.png" },
            { name: "❤baBy_sKy™❤", trophies: 5976, avatar: "../assets/CHAR/hogrider.png" },
            { name: "☠️⭕P-Maximus☠️", trophies: 5956, avatar: "../assets/CHAR/valkyrie.png" },
            { name: "☠️OP-SenG⭕️kU☠️", trophies: 5949, avatar: "../assets/CHAR/barbarian1.png" },
            { name: "TW™️ seaweeds", trophies: 5948, avatar: "../assets/CHAR/barbarian1.png" },
            { name: "LostChild", trophies: 5939, avatar: "../assets/CHAR/barbarian2.png" }
        ]
    },
    {
        title: "OFW ELITES 2 LEADERBOARD",
        sub: "UPDATED ON 6/29/25 : 3:00PM : NOT FINAL", 
        players: [
            { name: "OE ⚔️Meliodas⚔️", trophies: 6027, avatar: "../assets/CHAR/hogrider.png" },
            { name: "⚜️⚜️JÉSSÍÉ⚜️⚜️", trophies: 6006, avatar: "../assets/CHAR/hogrider.png" },
            { name: "Sawamura", trophies: 5986, avatar: "../assets/CHAR/bk.png" },
            { name: "ЯЄD Ｎ⭕ＴＩＣＥ ᵘⁿ", trophies: 5926, avatar: "../assets/CHAR/witch1.png" },
            { name: "Makario", trophies: 5915, avatar: "../assets/CHAR/barbarian1.png" },
            { name: "Rai Ley メ ❘ イノブ", trophies: 5908, avatar: "../assets/CHAR/barbarian1.png" },
            { name: "☠️BAYMAX☠️", trophies: 5883, avatar: "../assets/CHAR/dragon.png" },
            { name: "8mG Uric Acid", trophies: 5858, avatar: "../assets/CHAR/barbarian1.png" },
            { name: "K♦️L♦️H♦️A♦️Y", trophies: 5851, avatar: "../assets/CHAR/super-goblin.png" },
            { name: "Aether..23", trophies: 5842, avatar: "../assets/CHAR/witch1.png" }
        ]
    }
];

// Placeholder avatar SVG
function avatarSVG(size = 72) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="25" r="15" fill="#bdbdbd"/><ellipse cx="35" cy="52" rx="22" ry="13" fill="#bdbdbd"/></svg>`;
}

function renderPodium(players) {
    const podium = document.getElementById('podium');
    podium.innerHTML = '';
    // Podium order for layout: 2nd, 1st, 3rd
    const order = [1, 0, 2];
    const places = ['second', 'first', 'third'];
    const labels = ['2nd', '1st', '3rd'];
    order.forEach((idx, i) => {
        const p = players[idx];
        if (!p) return;
        const div = document.createElement('div');
        div.className = `podium-player ${places[i]}`;
        div.innerHTML = `
          ${places[i] === 'first'
                ? `<svg class="big-trophy"><use href="#trophy"></use></svg>`
                : ''
            }
          <div class="podium-rank">${labels[i]}</div>
          <div class="avatar">
            ${p.avatar ? `<img src="${p.avatar}" alt="${p.name}" style="width:100%;height:100%;border-radius:50%;">` : avatarSVG()}
          </div>
          <div class="player-name">${p.name}</div>
          <div class="trophy-count">
            <svg class="trophy-icon"><use href="#trophy"></use></svg>
            ${p.trophies.toLocaleString()}
          </div>
          <div class="podium-base">
            <span class="podium-label">${labels[i]} PLACE</span>
          </div>
        `;
        podium.appendChild(div);
    });
}

function renderList(players) {
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    players.slice(3).forEach((p, i) => {
        const row = document.createElement('div');
        row.className = 'leaderboard-row';
        row.style.setProperty('--delay', `${i * 0.08 + 0.1}s`);
        row.innerHTML = `
          <div class="rank">${i + 4}</div>
          <div class="row-name">${p.name}</div>
          <div class="row-trophies">
            <svg class="row-trophy-icon"><use href="#trophy"></use></svg>
            ${p.trophies.toLocaleString()}
          </div>
        `;
        list.appendChild(row);
    });
}

function updateLeaderboard(idx) {
    const data = leaderboards[idx];
    // Sort players by trophies descending
    data.players.sort((a, b) => b.trophies - a.trophies);
    document.getElementById('lb-title').textContent = data.title;
    document.getElementById('lb-sub').textContent = data.sub;
    renderPodium(data.players.slice(0, 3));
    renderList(data.players);
}

// Button logic
document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById('btn-1');
    const btn2 = document.getElementById('btn-2');
    btn1.addEventListener('click', function () {
        btn1.classList.add('active');
        btn2.classList.remove('active');
        updateLeaderboard(0);
    });
    btn2.addEventListener('click', function () {
        btn2.classList.add('active');
        btn1.classList.remove('active');
        updateLeaderboard(1);
    });
    // Show first leaderboard by default
    updateLeaderboard(0);
});
