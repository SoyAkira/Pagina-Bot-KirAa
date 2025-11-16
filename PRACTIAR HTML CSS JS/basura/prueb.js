const searchInput = document.getElementById('searchInput');
const autocomplete = document.getElementById('autocomplete');
const resultBox = document.getElementById('result');

const suggestions = [
  {
    category: "MIMU BOT",
    title: "currency / economy",
    desc: "settings that affect the server's currency or economy...",
    link: "economy.html"
  },
  {
    category: "MIMU BOT",
    title: "advanced ii: using user arguments",
    desc: "how do i use user arguments? before or after...",
    link: "advanced.html"
  },
  {
    category: "MIMU BOT",
    title: "stars",
    desc: "star meter and how to configure it for your server...",
    link: "stars.html"
  },
  {
    category: "MIMU BOT",
    title: "profile customization",
    desc: "change your Mimu profile color, icon and badges",
    link: "profile.html"
  },
  {
    category: "MIMU BOT",
    title: "leaderboard setup",
    desc: "display ranking for currency or XP systems...",
    link: "leaderboard.html"
  },
];

let activeIndex = -1;

// 🔍 Renderiza las sugerencias filtradas
function renderSuggestions(list) {
  autocomplete.innerHTML = "";

  if (list.length === 0) {
    autocomplete.innerHTML = `<div class="no-results">No results found</div>`;
    return;
  }

  list.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("suggestion");
    div.innerHTML = `
      <span class="category">${item.category}</span>
      <p class="title">${item.title}</p>
      <p class="desc">${item.desc}</p>
    `;
    div.addEventListener('click', () => selectSuggestion(item));
    autocomplete.appendChild(div);
  });
}

// 🟩 Seleccionar sugerencia
function selectSuggestion(item) {
  // ✅ Abrir en nueva pestaña
  window.open(item.link, '_blank');
}

// 🔹 Filtrar en tiempo real
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  activeIndex = -1;

  if (value.trim() === "") {
    autocomplete.style.display = "none";
    return;
  }

  const filtered = suggestions.filter(item =>
    item.title.toLowerCase().includes(value) ||
    item.desc.toLowerCase().includes(value)
  );

  renderSuggestions(filtered);
  autocomplete.style.display = "flex";
});

// 🔹 Navegación con teclado
searchInput.addEventListener('keydown', (e) => {
  const items = autocomplete.querySelectorAll('.suggestion');
  if (items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % items.length;
    updateActive(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    updateActive(items);
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (activeIndex >= 0) {
      const title = items[activeIndex].querySelector(".title").textContent;
      const item = suggestions.find(s => s.title === title);
      selectSuggestion(item);
    }
  }
});

function updateActive(items) {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === activeIndex);
  });
  const activeItem = items[activeIndex];
  if (activeItem) {
    activeItem.scrollIntoView({ block: "nearest" });
  }
}

// 🔹 Mostrar/Ocultar autocompletado
searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim() !== "") autocomplete.style.display = "flex";
});

document.addEventListener('click', (e) => {
  if (!autocomplete.contains(e.target) && e.target !== searchInput) {
    autocomplete.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') autocomplete.style.display = 'none';
});

// 🔹 Atajo Ctrl + K
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    searchInput.focus();
  }
});
