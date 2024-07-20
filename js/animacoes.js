function toggleNavbar() {



}

// Função de rolagem suave para um ID específico
function jumpToId(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// assume o elemento pelo ID
function inicioID() {
  jumpToId('inicio');
}

function quemSomosID() {
  jumpToId('quemsomos');
}

function faleConoscoID() {
  jumpToId('faleconosco');
}

// Funções para atualizar as classes dos botões
function atualizarClasses(botaoAtivo) {
  const botoes = ['Inicio', 'QuemSomos', 'FaleConosco'];
  
  botoes.forEach(botao => {
    const elemento = document.getElementById(`btnMenu${botao}`);
    if (botao === botaoAtivo) {
      elemento.classList.remove('btn-outline-secondary');
      elemento.classList.add('btn-success');
    } else {
      elemento.classList.remove('btn-success');
      elemento.classList.add('btn-outline-secondary');
    }
  });
}

function irParaInicio() {
  var navbarToggler = document.getElementById('navbar-toggler');
  var navbarCollapse = document.getElementById('navbarNavAltMarkup');

  inicioID();

  if (navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
}

function irParaQuemSomos() {
  var navbarToggler = document.getElementById('navbar-toggler');
  var navbarCollapse = document.getElementById('navbarNavAltMarkup');

  quemSomosID();

  if (navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
}

function irParaFaleConosco() {
  var navbarToggler = document.getElementById('navbar-toggler');
  var navbarCollapse = document.getElementById('navbarNavAltMarkup');  

  faleConoscoID();

  if (navbarCollapse.classList.contains('show')) {
    navbarToggler.click();
  }
}



// Função para criar um IntersectionObserver
function criarObserver(elementId, callback) {
  const elemento = document.getElementById(elementId);
    
  if (elemento) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, {
      threshold: 0.6 // Ajuste este valor conforme necessário
    });
      
    observer.observe(elemento);
  }
}


// Configura os observers para cada seção
function observarInicio() {
  atualizarClasses('Inicio');
}

function observarQuemSomos() {
  atualizarClasses('QuemSomos');
}

function observarFaleConosco() {
  atualizarClasses('FaleConosco');
}

document.addEventListener('DOMContentLoaded', () => {
  criarObserver('inicio',observarInicio);
  criarObserver('quemsomos', observarQuemSomos);
  criarObserver('faleconosco', observarFaleConosco);
});

const texts = ["Rapidez nas Entregas!", "Produtos de Qualidade!", "E Economia para Você!", "Funcionamos em Horário Comercial.", "Entre em pela aba Fale Conosco", "Ou Ligue: (21) 3833-8188"];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';
let isDeleting = false;
const cursor = document.getElementById('cursor');

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];

    if (isDeleting) {
        letter = currentText.slice(0, index--);
    } else {
        letter = currentText.slice(0, ++index);
    }

    document.getElementById('text').textContent = letter;

    if (!isDeleting && letter.length === currentText.length) {
        cursor.classList.add('blink');  // Adiciona a classe blink antes de deletar
        setTimeout(() => {
            cursor.classList.remove('blink');  // Remove a classe blink
            isDeleting = true;
            setTimeout(type, 100);  // Velocidade de apagamento
        }, 2000);  // Tempo para esperar antes de começar a apagar a frase
    } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        cursor.classList.add('blink');  // Adiciona a classe blink antes de começar a próxima frase
        setTimeout(() => {
            cursor.classList.remove('blink');  // Remove a classe blink
            type();
        }, 700);  // Tempo para começar a digitar a próxima frase
    } else {
        setTimeout(type, isDeleting ? 9 : 90);  // Velocidade de digitação e apagamento
    }
}

// Inicia a função de digitação
type();