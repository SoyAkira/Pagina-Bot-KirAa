// Fondo degradado animado
const body = document.body;

let step = 0;
let direction = 1; // 1 = avanza, -1 = retrocede

function animateGradient() {
  // el valor oscila entre 0 y 1
  step += 0.005 * direction;

  if (step >= 1 || step <= 0) direction *= -1;

  // colores base
  const color1 = { h: 180, s: 56, l: 7 };
  const color2 = { h: 180, s: 43, l: 1 };

  // interpolación entre ambos
  const h = color1.h + (color2.h - color1.h) * step;
  const s = color1.s + (color2.s - color1.s) * step;
  const l = color1.l + (color2.l - color1.l) * step;

  body.style.background = `radial-gradient(circle at bottom, hsl(${h}, ${s}%, ${l}%), hsl(${(h + 20)}, ${s}%, ${l - 3}%))`;

  requestAnimationFrame(animateGradient);
}

animateGradient();


// Animación al pasar el mouse sobre el editor
const editor = document.querySelector('.editor');
editor.addEventListener('mouseenter', () => {
  editor.style.boxShadow = '0 0 40px rgba(0, 255, 255, 0.5)';
});
editor.addEventListener('mouseleave', () => {
  editor.style.boxShadow = '0 0 25px rgba(0, 255, 255, 0.2)';
});

// Simulación de interacción con el botón
document.getElementById("addContext").addEventListener("click", () => {
  alert("Función de añadir contexto en construcción 🚧");
});



