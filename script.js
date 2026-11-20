// ============================================================
// CRÔNICAS DE UM AVENTUREIRO
// JavaScript da apresentação pessoal
// ============================================================


// ------------------------------------------------------------
// 1. ELEMENTOS DA PÁGINA
// ------------------------------------------------------------

const welcome = document.getElementById("welcome");
const enterButton = document.getElementById("enterButton");

const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");

const questButton = document.getElementById("questButton");
const questMessage = document.getElementById("questMessage");


// ------------------------------------------------------------
// 2. SISTEMA DE NOTIFICAÇÃO
// ------------------------------------------------------------

function showToast(message) {

    toastText.textContent = message;

    toast.classList.add("show");

    // Evita que várias notificações fiquem acumuladas.
    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);
}


// ------------------------------------------------------------
// 3. ABERTURA DO PERGAMINHO
// ------------------------------------------------------------

enterButton.addEventListener("click", () => {

    // Esconde a tela inicial.
    welcome.classList.add("hidden");

    // Exibe uma mensagem.
    showToast(
        "O pergaminho foi aberto. Bem-vindo à minha jornada!"
    );

    // Move a página suavemente para o início da apresentação.
    document.querySelector(".hero").scrollIntoView({
        behavior: "smooth"
    });

});


// ------------------------------------------------------------
// 4. NOTIFICAÇÃO AO CARREGAR A PÁGINA
// ------------------------------------------------------------

window.addEventListener("load", () => {

    setTimeout(() => {

        // Só mostra a mensagem se a tela inicial ainda estiver aberta.
        if (!welcome.classList.contains("hidden")) {

            showToast(
                "Uma nova aventura está prestes a começar..."
            );

        }

    }, 900);

});


// ------------------------------------------------------------
// 6. ANIMAÇÃO DOS CARDS AO ENTRAREM NA TELA
// ------------------------------------------------------------

// O IntersectionObserver detecta quando um elemento
// aparece na área visível do navegador.

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                // Adiciona a classe responsável pela animação.
                entry.target.classList.add("visible");

                // Depois que a animação acontece uma vez,
                // não precisamos observar o elemento novamente.
                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


// Procura todos os elementos com a classe "reveal".
document.querySelectorAll(".reveal").forEach((element) => {

    observer.observe(element);

});


// ------------------------------------------------------------
// 7. MENSAGENS DA "PRÓXIMA MISSÃO"
// ------------------------------------------------------------

const messages = [

    "Missão aceita: aprender algo novo todos os dias.",

    "Nenhum grande aventureiro começa sabendo tudo.",

    "Próximo capítulo: transformar conhecimento em projetos.",

    "O melhor equipamento de um desenvolvedor é a curiosidade."

];


// Controla qual mensagem será apresentada.
let messageIndex = 0;


// Quando o botão for pressionado.
questButton.addEventListener("click", () => {

    // Mostra a mensagem atual.
    questMessage.textContent = messages[messageIndex];

    // Passa para a próxima mensagem.
    messageIndex++;

    // Quando chegar ao final, volta para a primeira.
    if (messageIndex >= messages.length) {

        messageIndex = 0;

    }

    showToast(
        "Uma mensagem foi revelada pelo pergaminho."
    );

});


// ------------------------------------------------------------
// 8. PARTÍCULAS MÁGICAS
// ------------------------------------------------------------

function createParticle() {

    // Cria um novo elemento HTML.
    const particle = document.createElement("span");

    // Adiciona a classe que contém a aparência da partícula.
    particle.className = "particle";


    // Define uma posição horizontal aleatória.
    particle.style.left =
        `${Math.random() * 100}vw`;


    // Define uma direção aleatória para a partícula.
    particle.style.setProperty(
        "--drift",
        `${(Math.random() - 0.5) * 180}px`
    );


    // Define uma duração aleatória para a animação.
    particle.style.animationDuration =
        `${6 + Math.random() * 8}s`;


    // Define uma transparência aleatória.
    particle.style.opacity =
        `${0.25 + Math.random() * 0.55}`;


    // Adiciona a partícula ao elemento .particles.
    document
        .querySelector(".particles")
        .appendChild(particle);


    // Remove a partícula depois de 15 segundos.
    setTimeout(() => {

        particle.remove();

    }, 15000);

}


// Cria uma nova partícula a cada 750 milissegundos.
setInterval(createParticle, 750);


// ------------------------------------------------------------
// 9. ATALHO DE TECLADO
// ------------------------------------------------------------

// O usuário pode apertar ENTER para abrir o pergaminho.

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        !welcome.classList.contains("hidden")
    ) {

        enterButton.click();

    }

});