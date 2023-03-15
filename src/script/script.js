const welcomeText = 'Bienvenue dans notre jeu vidéo ! Vous incarnez un héros courageux qui doit traverser plusieurs étapes pour sauver le monde. Vous allez parcourir de nombreuses scènes et affronter des défis difficiles tout au long de votre quête. Chaque choix que vous ferez aura une incidence sur le cours de l\'histoire et sur l\'issue de votre mission. Au début de votre aventure, vous vous retrouvez dans une foret paisible où la vie est simple et agréable. Cependant, vous apprenez bientôt qu\'une menace imminente pèse sur le monde. Un grand mal s\'approche et vous êtes le seul capable de l\'arrêter.';
let i = 0;
let speed = 60;

function typeWriter() {
  const introElement = document.getElementById("intro");
  const startButton = document.getElementById("start");

  if (i < welcomeText.length) {
    const char = document.createTextNode(welcomeText.charAt(i));
    introElement.appendChild(char);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    startButton.style.display = "block";
  }
}