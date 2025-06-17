// Multiple leaderboard datasets
const leaderboards = [
    {
        title: "OFW ELITES 1 CWL LEADERBOARD",
        updated: "UPDATED ON 5/28/25 : 3:20PM",
        players: [
            { name: "ALICE", stars: 16, percentage: 91.2 },
            { name: "BOB", stars: 15, percentage: 88.7 },
            { name: "CHARLIE", stars: 14, percentage: 85.3 },
            { name: "DAVID", stars: 13, percentage: 80.5 },
            { name: "ELLA", stars: 12, percentage: 79.9 },
            { name: "FRANK", stars: 11, percentage: 78.1 }
        ]
    },
    {
        title: "OFW ELITES 2 CWL LEADERBOARD",
        updated: "UPDATED ON 5/30/25 : 4:51PM",
        players: [
            { name: "PATRICK XD JDS", stars: 15, percentage: 87.5 },
            { name: "BOB", stars: 14, percentage: 79.3 },
            { name: "CHARLIE", stars: 14, percentage: 92.1 },
            { name: "DAVID", stars: 12, percentage: 88.7 },
            { name: "ELLA", stars: 10, percentage: 95.4 },
            { name: "FRANK", stars: 10, percentage: 82.3 }
        ]
    },
    {
        title: "OFW ELITES 3 CWL LEADERBOARD",
        updated: "UPDATED ON 6/1/25 : 1:15PM",
        players: [
            { name: "GRACE", stars: 18, percentage: 90.0 },
            { name: "HELEN", stars: 17, percentage: 85.5 },
            { name: "IVAN", stars: 15, percentage: 78.9 },
            { name: "JULIA", stars: 14, percentage: 80.1 },
            { name: "KATE", stars: 13, percentage: 82.7 },
            { name: "LEO", stars: 12, percentage: 79.4 }
        ]
    },
    {
        title: "OFW ELITES 4 CWL LEADERBOARD",
        updated: "UPDATED ON 6/2/25 : 9:30AM",
        players: [
            { name: "MIA", stars: 20, percentage: 94.2 },
            { name: "NICK", stars: 19, percentage: 89.5 },
            { name: "OLIVIA", stars: 18, percentage: 87.3 },
            { name: "PAUL", stars: 17, percentage: 85.0 },
            { name: "QUINN", stars: 16, percentage: 83.8 },
            { name: "RACHEL", stars: 15, percentage: 81.6 }
        ]
    },
    {
        title: "OFW ELITES 5 CWL LEADERBOARD",
        updated: "UPDATED ON 6/3/25 : 11:00AM",
        players: [
            { name: "SAM", stars: 22, percentage: 96.5 },
            { name: "TINA", stars: 21, percentage: 92.7 },
            { name: "URSULA", stars: 20, percentage: 90.1 },
            { name: "VICTOR", stars: 19, percentage: 88.4 },
            { name: "WENDY", stars: 18, percentage: 85.9 },
            { name: "XANDER", stars: 17, percentage: 84.3 }
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
