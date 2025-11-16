
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.submenu-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const item = toggle.parentElement; // li.has-submenu
      const wasOpen = item.classList.contains('open');

      // cerrar todos los submenus abiertos primero
      document.querySelectorAll('.has-submenu.open').forEach(other => {
        other.classList.remove('open');
        const t = other.querySelector('.submenu-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      // si estaba cerrado, lo abrimos; si estaba abierto, lo dejamos cerrado
      if (!wasOpen) {
        item.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // cerrar submenus si se hace click fuera del sidebar
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sidebar')) {
      document.querySelectorAll('.has-submenu.open').forEach(openItem => {
        openItem.classList.remove('open');
        const t = openItem.querySelector('.submenu-toggle');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });
});

// JS del btn-guia

function goToPage(url) {
  window.location.href = url;
}


// Ejemplo: cambiar texto central después de 3 segundos

setTimeout(() => {
  document.querySelector('.izquierda').textContent = '$';
}, 0);
setTimeout(() => {
  document.querySelector('.izquierda').textContent = '$$';
}, 100);
setTimeout(() => {
  document.querySelector('.izquierda').textContent = '$$$';
}, 200);
setTimeout(() => {
  document.querySelector('.izquierda').textContent = 'command';
}, 300);

setTimeout(() => {
  document.querySelector('.centro').textContent = '$';
}, 0);
setTimeout(() => {
  document.querySelector('.centro').textContent = '$$';
}, 100);
setTimeout(() => {
  document.querySelector('.centro').textContent = '$$$';
}, 200);
setTimeout(() => {
  document.querySelector('.centro').textContent = 'example';
}, 300);


setTimeout(() => {
  document.querySelector('.derecha').textContent = '$';
}, 0);
setTimeout(() => {
  document.querySelector('.derecha').textContent = '$$';
}, 100);
setTimeout(() => {
  document.querySelector('.derecha').textContent = '$$$';
}, 200);
setTimeout(() => {
  document.querySelector('.derecha').textContent = 'description';
}, 300);

// --- Mostrar sugerencias ---
const searchInput = document.getElementById("searchInput");
const autocomplete = document.getElementById("autocomplete");

const suggestions = [
  { category: "KirAa Bot", buyvip: "", title: "Overview", desc: "Go to main overview.", barrita: "",  link: "basura/economy.html" },
  { category: "KirAa Bot", buyvip: "", title: "Commands list", desc: "View all bot commands.", barrita: "",  link: "docs.html" },
  { category: "KirAa Bot", buyvip: "", title: "how to configure...", desc: "Join our support server.", barrita: "",  link: "htc.html" },
  { category: "KirAa Bot", buyvip: "", title: "Custom", desc: "cusatojafklajls fjakl fjalkjfjkl", barrita: "fajskfgh",  link: "custom.html" },
  { category: "KirAa Bot", buyvip: "", title: "Coin", desc: "Learn all about coins.", barrita: "",  link: "coin.html" },
  { category: "KirAa Bot", buyvip: "", title: "Hi!", desc: "Let's greet people.", barrita: "",  link: "hi.html" },
  { category: "KirAa Bot", buyvip: "", title: "I can't be here :c", desc: "Bye, everyone", barrita: "",  link: "icbh.html" },
  { category: "KirAa Bot", buyvip: "", title: "What is?", desc: "Discover how the bot economy works", barrita: "",  link: "whatis.html" },
  { category: "KirAa Bot", buyvip: "", title: "Info extra", desc: "relevant information about the economy", barrita: "",  link: "infoextra.html" },
  { category: "KirAa Bot", buyvip: "", title: "Custom Embeds", desc: "fasgaasdjaskhfjiak", barrita: "fjaskfhagj",  link: "customEm.html" },
  { category: "KirAa Bot", buyvip: "", title: "Pets", desc: "Discover how the bot economy works", barrita: "",  link: "pets.html" },
  { category: "KirAa Bot", buyvip: "", title: "Embeds", desc: "Discover how the bot economy works", barrita: "aslgaklsg",  link: "embeds.html" },
  { category: "KirAa Bot", buyvip: "", title: "Guide", desc: "Discover how the bot economy works", barrita: "",  link: "guide.html" },
  { category: "KirAa Bot", buyvip: "", title: "Oh, bye...", desc: "Discover how the bot economy works", barrita: "",  link: "ohbye.html" },
  { category: "KirAa Bot", buyvip: "", title: "Rules", desc: "Discover how the bot economy works", barrita: "",  link: "rules.html" },
  { category: "KirAa Bot", buyvip: "", title: "Boost", desc: "Discover how the bot economy works", barrita: "",  link: "boost.html" },
  { category: "KirAa Bot", buyvip: "", title: "Welcome", desc: "Discover how the bot economy works", barrita: "",  link: "welcome.html" },
  { category: "KirAa Bot", buyvip: "", title: "How to be superior?", desc: "Discover how the bot economy works", barrita: "",  link: "lvl.html" },
  { category: "KirAa Bot", buyvip: "", title: "Support server", desc: "", barrita: "",  link: "whatis.html" },
  { category: "KirAa Bot", buyvip: "", title: "Status bot", desc: "", barrita: "", link: "whatis.html" },
  { category: "KirAa Bot", buyvip: "", title: "Feedback site", desc: "", barrita: "", link: "whatis.html" },
  { category: "KirAa Bot", buyvip: "", title: "NOTICES 📩", desc: "[03/2024] v8.10 - leaving patreon and restructuring supporter tiers", barrita: "", link: "whatis.html" },
  { category: "KirAa Bot", buyvip: "", title: "Discord Community", desc: "afsagasgklajlk", barrita: "", link: "whatis.html" },
  { category: "KirAa Bot", buyvip: "Buy VIP", title: "VIP", desc: "faklfhaklsjf ajkfhasjkfa lhfk aakljf", barrita: "fhaksjlfhajkf", link: "whatis.html" },
];

let activeIndex = -1;



// --- Mostrar sugerencias ---
searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const results = suggestions.filter(item =>
    item.title.toLowerCase().includes(value)
  );

  if (results.length === 0 || value === "") {
    autocomplete.innerHTML = value !== "" ? '<div class="no-results">No results found</div>' : '';
    autocomplete.style.display = value !== "" ? "flex" : "";
    return;
  }

  autocomplete.innerHTML = results
    .map(
      item => `
      <div class="suggestion">
        <div class="category">${item.category}</div>
        <div class="buyvip">${item.buyvip}</div>
        <div class="title">${item.title}</div>
        <div class="desc">${item.desc}</div>
        <div class="barrita">${item.barrita}</div>
      </div>`
    )
    .join("");

  autocomplete.style.display = "flex";

  // Click event
  autocomplete.querySelectorAll(".suggestion").forEach((el, i) => {
    el.addEventListener("click", () => selectSuggestion(results[i]));
  });
});


// --- Seleccionar sugerencia ---
function selectSuggestion(item) {
  window.location.href = item.link; // abrir en la misma pestaña
  searchInput.value = "";
  autocomplete.style.display = "none";
}

// --- Navegación con teclado ---
searchInput.addEventListener("keydown", (e) => {
  const items = autocomplete.querySelectorAll(".suggestion");
  if (items.length === 0) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex = (activeIndex + 1) % items.length;
    updateActive(items);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex = (activeIndex - 1 + items.length) % items.length;
    updateActive(items);
  } else if (e.key === "Enter" && activeIndex >= 0) {
    e.preventDefault();
    const selected = suggestions.find(
      s => s.title === items[activeIndex].querySelector('.title').textContent
    );
    if (selected) selectSuggestion(selected);
  }
});

function updateActive(items) {
  items.forEach((item, i) => item.classList.toggle("active", i === activeIndex));
}

// --- Atajo Ctrl + K ---
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});

// --- Ocultar sugerencias al hacer clic fuera ---
document.addEventListener("click", (e) => {
  if (!searchInput.contains(e.target) && !autocomplete.contains(e.target)) {
    autocomplete.style.display = "none";
    activeIndex = -1; // opcional: reinicia navegación con teclado
  }
});


// BUTTONS FINAL
function goTo(url) {
  window.location.href = url; // abre en la misma pestaña
}

// OPINION
// Cargar los datos desde localStorage
let votes = JSON.parse(localStorage.getItem('votes')) || {
    happy: 0,
    neutral: 0,
    sad: 0
};

let selectedEmoji = localStorage.getItem('selectedEmoji');  // Recuperar la selección guardada

// Al cargar la página, actualizar los contadores de "likes" con los datos guardados
document.addEventListener('DOMContentLoaded', () => {
    updateLikes();
    if (selectedEmoji) {
        markSelectedEmoji(selectedEmoji);
    }
});

function vote(emoji) {
    // Si ya se ha seleccionado un emoji antes, simplemente actualizamos
    if (selectedEmoji === emoji) {
        return;  // Si ya está seleccionado, no hacemos nada (no sumamos likes)
    }

    // Si es un emoji diferente al seleccionado, lo actualizamos
    if (selectedEmoji) {
        // Restar un "like" al emoji previamente seleccionado
        votes[selectedEmoji]--;
    }

    // Incrementamos el "like" al nuevo emoji seleccionado
    votes[emoji]++;
    selectedEmoji = emoji;

    // Guardamos los votos y la selección en localStorage
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('selectedEmoji', emoji);

    // Actualizamos los contadores y el estado visual
    updateLikes();
    markSelectedEmoji(emoji);
}

function updateLikes() {
    document.getElementById('happy-likes').textContent = votes.happy;
    document.getElementById('neutral-likes').textContent = votes.neutral;
    document.getElementById('sad-likes').textContent = votes.sad;
}

function markSelectedEmoji(emoji) {
    // Eliminar la clase 'selected' de todos los emojis
    document.querySelectorAll('.emoji').forEach(item => item.classList.remove('selected'));
    
    // Añadir la clase 'selected' al emoji que ha sido seleccionado
    document.getElementById(emoji).classList.add('selected');
}

// Last update
function mostrarFechaActual() {
  const ahora = new Date();

  const opcionesFecha = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const fecha = ahora.toLocaleDateString('en-EN', opcionesFecha);

  document.getElementById('update-time').textContent = `${fecha}`;
}

// Ejecutar al cargar la página
mostrarFechaActual();

// ====== Menú hamburguesa ======
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  sidebar.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

// Cierra el menú al hacer click en un enlace
sidebar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    sidebar.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});
