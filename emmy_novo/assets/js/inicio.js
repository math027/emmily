// Floating hearts
setInterval(() => {
  const size = Math.random() * 24 + 8;
  const left = Math.random() * 100;
  const time = Math.random() * 6 + 6;

  const heart = $(`
    <div class="heart" style="
      width:${size}px;
      height:${size}px;
      left:${left}%;
      animation:love ${time}s linear forwards;
      opacity:${Math.random() * 0.4 + 0.2};
    "></div>
  `);

  $(".bg_heart").append(heart);

  setTimeout(() => heart.remove(), time * 1000);
}, 600);

// Typing animation – agora com frases de noivado
let i = 0;
const texto = "Meu amor... < minha noiva. <<< Você não é apenas a pessoa que eu escolhi... > É a pessoa que faz cada amanhecer valer a pena. << Desde aquele dia em que te pedi em casamento... < soube que havia encontrado meu lar. > Você é minha paz, minha alegria... < o sorriso que eu não consigo tirar do rosto. << Ser seu noivo é a maior honra da minha vida. > E em breve... < o maior privilégio: ser seu marido. << Te amo hoje... < amanhã... < e para sempre.";
const el = document.getElementById("text1");

function digitar() {
  if (i < texto.length) {
    if (texto[i] === "<") {
      el.innerHTML += "<br>";
    } else if (texto[i] === ">") {
      el.innerHTML = "";
    } else {
      el.innerHTML += texto[i];
    }
    i++;
    setTimeout(digitar, 65);
  }
}

setTimeout(digitar, 800);
