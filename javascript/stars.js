// Multiple leaderboard datasets
const leaderboards = [
    {
        title: "*ASHANTY FAM * JULY 2025 CWL",
        updated: "PROMOTED : CHAMPION LEAGUE I",
        players: [
            { name: "Sawamura", stars: 21, percentage: 700 },
            { name: "Rai Ley メ ❘ イノブ", stars: 21, percentage: 700 },
            { name: "Gobta.", stars: 21, percentage: 700 },
            { name: "OE☆☆☆ReNaN☆☆☆", stars: 21, percentage: 700 },
            { name: "™Aliäs{{Pögi}}™", stars: 20, percentage: 696 },
            { name: "K♥️L♥️H♥️A♥️Y", stars: 20, percentage: 692 },
            { name: "Makario", stars: 19, percentage: 696 },
            { name: "entengzki", stars: 19, percentage: 691 },
            { name: "DON EX MACHINA", stars: 19, percentage: 678 },
            { name: "❤❤SHALTEAR❤❤", stars: 18, percentage: 684 },
        ]
    },
    {
        title: "OFW ELITES 2 JULY 2025 CWL",
        updated: "DEMOTED : CHAMPION LEAGUE II (LACK OF DATA)",
        players: [
            { name: "TW™ seaweeds", stars: 21, percentage: 700 },
            { name: "LostChild", stars: 21, percentage: 700 },
            { name: "ЯЄD Ｎ⭕ＴＩＣＥ ᵘⁿ", stars: 20, percentage: 698 },
            { name: "ChaMi", stars: 20, percentage: 696 },
            { name: "✨⭐ YzeQuel⭐✨", stars: 20, percentage: 683 },
            { name: "™Aliäs{{2015}}™", stars: 19, percentage: 688 },
            { name: "NO DATA", stars: 19, percentage: 680 },
            { name: "Aether..23", stars: 19, percentage: 675 },
            { name: "mOSTSTER KILL", stars: 19, percentage: 672 },
            { name: "PHT Bogs", stars: 18, percentage: 687 },
        ]
    },
    {
        title: "OFW ELITES 3 JULY 2025 CWL",
        updated: "DEMOTED : CHAMPION LEAGUE III (LACK OF DATA)",
        players: [
            { name: "KARMA BLITZ", stars: 21, percentage: 700 },
            { name: "VHINZE", stars: 20, percentage: 699 },
            { name: "MASTER KYASUBi", stars: 20, percentage: 694 },
            { name: "K♦️L♦️H♦️A♦️Y", stars: 20, percentage: 693 },
            { name: "LV. 88 ❌⭕❌⭕", stars: 19, percentage: 689 },
        ]
    },
    {
        title: "OFW ELITES 4 JULY 2025 CWL",
        updated: "MAINTAINED : MASTER LEAGUE I",
        players: [
            { name: "R3N4N", stars: 21, percentage: 700 },
            { name: "dgreat,one", stars: 21, percentage: 700 },
            { name: "(12~jessie~27)", stars: 21, percentage: 700 },
            { name: "♔ᶦᶰᵈ☤✞☤ᴀʟᴅᴡɪɴ♔", stars: 21, percentage: 700 },
            { name: "⚡SHANKS⚡", stars: 20, percentage: 690 },
            { name: "♥️KIDDO♥️", stars: 20, percentage: 690 },
            { name: "HAMMER", stars: 20, percentage: 690 },
            { name: "QF, JHAY", stars: 19, percentage: 692 },
            { name: "BasePunisher(Sa", stars: 19, percentage: 690 },
            { name: "MaCoH27", stars: 19, percentage: 689 },
        ]
    },
    {
        title: "IMMORTARS JULY 2025 CWL",
        updated: "PROMOTED : MASTER LEAGUE III (LACK OF DATA)",
        players: [
            { name: "OE☆☆☆ReNaN☆☆☆", stars: 21, percentage: 700 },
            { name: "D' BackupPlan", stars: 21, percentage: 700 },
            { name: "Madisson", stars: 21, percentage: 700 },
            { name: "bff ian", stars: 21, percentage: 700 },
            { name: "JEFF DONATOR", stars: 21, percentage: 700 },
            { name: "NO DATA", stars: 21, percentage: 700 },
            { name: "NO DATA", stars: 21, percentage: 700 },
            { name: "CHOOXtv", stars: 21, percentage: 700 },
            { name: ">>♤♡MËL♢♧<<", stars: 20, percentage: 696 },
            { name: "allison", stars: 20, percentage: 694 },
        ]
    },
    {
        title: "JUST 4 FUN JULY 2025 CWL",
        updated: "PROMOTED : MASTER LEAGUE II",
        players: [
            { name: "Sharkie", stars: 21, percentage: 700 },
            { name: "KIEFER", stars: 21, percentage: 700 },
            { name: "Veldora", stars: 21, percentage: 700 },
            { name: "OE⚔️Meliodas⚔️", stars: 21, percentage: 700 },
            { name: "A B R A H A M", stars: 21, percentage: 700 },
            { name: "NANATZY✔️", stars: 21, percentage: 700 },
            { name: "JOHNJEZZPER", stars: 20, percentage: 692 },
            { name: "RAYGUNNN", stars: 20, percentage: 690 },
            { name: "NATSU dRAgoN", stars: 20, percentage: 684 },
            { name: "PRINCE", stars: 19, percentage: 688 },
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
