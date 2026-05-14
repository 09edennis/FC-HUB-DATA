const container = document.getElementById('playerContainer');
const searchInput = document.getElementById('searchInput');

let players = [];

async function loadPlayers() {
  const response = await fetch('data/players.json');
  players = await response.json();
  renderPlayers(players);
}

function renderPlayers(playerList) {
  container.innerHTML = '';

  playerList.forEach(player => {
    const card = document.createElement('div');
    card.className = 'player-card';

    card.innerHTML = `
      <h3>${player.name}</h3>
      <p>${player.rating} ${player.position}</p>
      <p>${player.club}</p>
      <p>PS/XBOX: ${player.psPrice.toLocaleString()}</p>
      <p>PC: ${player.pcPrice.toLocaleString()}</p>
      <p>24h: ${player.change24h}%</p>

      <button class="watch-btn">
        Add to Watchlist
      </button>
    `;

    const button = card.querySelector('.watch-btn');

    button.addEventListener('click', () => {
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
      watchlist.push(player);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${player.name} added to watchlist`);
    });

    container.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();

  const filtered = players.filter(player =>
    player.name.toLowerCase().includes(value)
  );

  renderPlayers(filtered);
});

loadPlayers();