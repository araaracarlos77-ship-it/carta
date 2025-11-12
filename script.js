const canvas = document.getElementById("cartaCanvas");
const ctx = canvas.getContext("2d");
const papel3d = document.getElementById("papel3d");
const papelMsg = document.getElementById("papelMsg");
const closeBtn = document.getElementById("closeBtn");
const subtitle = document.getElementById("subtitle");
const bgFade = document.getElementById("bgFade");
const openSound = document.getElementById("openSound");
const closeSound = document.getElementById("closeSound");
const bgMusic = document.getElementById("bgMusic");
let open = false;

// Dibuja la carta cerrada
function drawCarta() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(50, 80, 300, 150);
  ctx.strokeStyle = "#b5838d";
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 80, 300, 150);
  ctx.fillStyle = "#b5838d";
  ctx.beginPath();
  ctx.moveTo(50, 80);
  ctx.lineTo(200, 180);
  ctx.lineTo(350, 80);
  ctx.closePath();
  ctx.fill();
}
drawCarta();

// Mensaje
let para = "Flor";
let mensaje = `Hola ${para} ❤️

No quiero que pienses que no te saludo porque no me importas, o porque te he olvidado…
No lo hago porque intento acostumbrarme a no escuchar tu hermosa voz,
a no mirar esos ojitos tan lindos, ni esa sonrisa que siempre me hacía el día.

Esta tarea no es fácil, créeme. Intentar olvidarte se siente como 
tratar de borrar el sol con las manos. Porque aunque lo intente,
sé que voy a seguir amándote, solo que ahora lo haré en silencio. 💔

No te guardo rencor, ni tristeza, solo me guardo el cariño 
y los recuerdos más bonitos. Gracias por haber sido una parte 
tan especial de mi vida. Siempre vas a tener un lugar en mi corazón, 
aunque ya no te lo diga. 💖`;

// Efecto máquina de escribir
function escribirTexto(texto, elemento, velocidad = 50) {
  elemento.innerHTML = "";
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.innerHTML += texto[i];
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, velocidad);
}

// Corazones flotantes
function crearCorazon() {
  const corazon = document.createElement("div");
  corazon.classList.add("corazon");
  corazon.innerHTML = "❤️";
  corazon.style.left = Math.random() * 100 + "vw";
  corazon.style.bottom = "0px";
  document.body.appendChild(corazon);
  setTimeout(() => corazon.remove(), 4000);
}

// Abrir carta
canvas.addEventListener("click", () => {
  if (!open) {
    open = true;
    gsap.to(canvas, { y: -80, opacity: 0, duration: 1 });
    setTimeout(() => {
      papel3d.classList.add("visible");
      escribirTexto(mensaje, papelMsg, 45);
      bgFade.classList.add("bg-fade-dark");
      closeBtn.classList.add("visible");
      subtitle.style.opacity = 0;
      openSound.play();
      bgMusic.play();
      setInterval(crearCorazon, 400);
    }, 800);
  }
});

// Cerrar carta
closeBtn.addEventListener("click", () => {
  open = false;
  papel3d.classList.remove("visible");
  bgFade.classList.remove("bg-fade-dark");
  closeBtn.classList.remove("visible");
  gsap.to(canvas, { y: 0, opacity: 1, duration: 1 });
  subtitle.style.opacity = 1;
  closeSound.play();
  bgMusic.pause();
});
