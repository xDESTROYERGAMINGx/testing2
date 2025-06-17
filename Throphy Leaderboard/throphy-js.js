// Two sets of leaderboard data
const leaderboards = [
    {
        title: "OFW ELITES LEADERBOARD",
        sub: "UPDATED ON 5/30/25 : 4:51PM",
        players: [
            { name: "ALICE", trophies: 5890, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "BOB", trophies: 5890, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "CHARLIE", trophies: 5700, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "DAVID", trophies: 5400, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "ELLA", trophies: 5200, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "FRANK", trophies: 5200, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "GRACE", trophies: 5100, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "HELEN", trophies: 5000, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "IVAN", trophies: 4950, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "JULIA", trophies: 4900, avatar: "../assets/CHAR/hogrider.webp" }
        ]
    },
    {
        title: "OFW ELITES 2 LEADERBOARD",
        sub: "UPDATED ON 6/1/25 : 10:00AM",
        players: [
            { name: "ZEUS", trophies: 6000, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "HERA", trophies: 5990, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "POSEIDON", trophies: 5900, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "ARES", trophies: 5800, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "ATHENA", trophies: 5700, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "APOLLO", trophies: 5600, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "ARTEMIS", trophies: 5500, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "HEPHAESTUS", trophies: 5400, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "HERMES", trophies: 5300, avatar: "../assets/CHAR/hogrider.webp" },
            { name: "DEMETER", trophies: 5200, avatar: "../assets/CHAR/hogrider.webp" }
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
