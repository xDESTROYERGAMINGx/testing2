// Multiple leaderboard datasets
const leaderboards = [
    {
        title: "OFW ELITES 1 CWL LEADERBOARD",
        updated: "UPDATED ON 5/28/25 : 3:20PM",
        players: [
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 }
        ]
    },
    {
        title: "OFW ELITES 2 CWL LEADERBOARD",
        updated: "UPDATED ON 5/30/25 : 4:51PM",
        players: [
            { name: "PATRICK XD JDS", stars: 15, percentage: 87.5 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 }
        ]
    },
    {
        title: "OFW ELITES 3 CWL LEADERBOARD",
        updated: "UPDATED ON 6/1/25 : 1:15PM",
        players: [
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 }
        ]
    },
    {
        title: "OFW ELITES 4 CWL LEADERBOARD",
        updated: "UPDATED ON 6/2/25 : 9:30AM",
        players: [
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 }
        ]
    },
    {
        title: "OFW ELITES 5 CWL LEADERBOARD",
        updated: "UPDATED ON 6/3/25 : 11:00AM",
        players: [
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 },
            { name: "NO DATA", stars: 0, percentage: 0 }
        ]
    }
];

// Animate percentage bar fill
function animatePercentageBar(bar, percentage) {
    setTimeout(() => {
        bar.style.width = percentage + '%';
    }, 100);
}

// Render podium (top 3)
function renderPodium(players) {
    const podium = document.getElementById('podium');
    podium.innerHTML = '';
    const places = ['first', 'second', 'third'];
    for (let i = 0; i < 3; i++) {
        const p = players[i];
        if (!p) continue;
        const div = document.createElement('div');
        div.className = `podium-place ${places[i]}`;
        div.style.animationDelay = `${i * 0.15}s`;
        div.innerHTML = `
          <div class="podium-rank">${i + 1}</div>
          <div class="podium-name">${p.name}</div>
          <div class="stars">${p.stars}x stars</div>
          <div class="percentage-bar" aria-label="Percentage bar">
            <div class="percentage-fill" style="width: 0;"></div>
          </div>
          <div class="percentage-text">${p.percentage.toFixed(1)}%</div>
        `;
        podium.appendChild(div);
        animatePercentageBar(div.querySelector('.percentage-fill'), p.percentage);
    }
}

// Render leaderboard list (from 4th place)
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
          <div class="row-stars">${p.stars}x stars</div>
          <div class="row-percentage">${p.percentage.toFixed(1)}%</div>
        `;
        list.appendChild(row);
    });
}

// Update leaderboard content based on index
function updateLeaderboard(index) {
    const data = leaderboards[index];
    // Sort players by stars desc, then percentage desc
    data.players.sort((a, b) => {
        if (b.stars !== a.stars) return b.stars - a.stars;
        return b.percentage - a.percentage;
    });

    document.getElementById('leaderboard-title').textContent = data.title;
    document.getElementById('leaderboard-sub').textContent = data.updated;
    renderPodium(data.players);
    renderList(data.players);

    // Update active button style
    document.querySelectorAll('#leaderboard-buttons .switch-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === index);
    });
}

// Setup event listeners for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('#leaderboard-buttons .switch-btn');
    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => updateLeaderboard(idx));
    });

    // Initialize with first leaderboard
    updateLeaderboard(0);
});
