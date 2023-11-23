const baseURL = 'http://localhost:3000/monsters';
let currentPage = 1; 
const monstersPerPage = 50;

document.addEventListener('DOMContentLoaded', () => {
  loadMonsters();

  const form = document.getElementById('monster-form');
  form.addEventListener('submit', createMonster);

  const loadMoreButton = document.getElementById('load-more');
  loadMoreButton.addEventListener('click', loadMoreMonsters);
});

function loadMonsters() {
  fetch(`${baseURL}?_limit=${monstersPerPage}&_page=${currentPage}`)
    .then(response => response.json())
    .then(monsters => displayMonsters(monsters));
}

function displayMonsters(monsters) {
  const monsterContainer = document.getElementById('monster-container');
  monsters.forEach(monster => {
    const monsterCard = document.createElement('div');
    monsterCard.innerHTML = `
      <h3>${monster.name}</h3>
      <p>Age: ${monster.age}</p>
      <p>Description: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterCard);
  });
}

function createMonster(event) {
  event.preventDefault(); 
  const form = event.target;
  const formData = new FormData(form);
  const name = formData.get('name');
  const age = formData.get('age');
  const description = formData.get('description');

  const monsterData = {
    name,
    age,
    description
  };

  fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(monsterData)
  })
  .then(response => response.json())
  .then(() => {
    form.reset();
    currentPage = 1; 
    loadMonsters();
  })
  .catch(error => console.error('Error:', error));
}

function loadMoreMonsters() {
  currentPage++; 
  loadMonsters(); 
}
