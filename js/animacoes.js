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

  // Abre o modal
  if (localStorage.getItem('mensagemEnviada') === 'true') {
    var myModal = new bootstrap.Modal(document.getElementById('conformarEnvio'), {
      keyboard: false
    });
    myModal.show();
  }
});

const texts = ["Funcionamos em Horário Comercial.", "Entre em contato pela aba Fale Conosco", "Ou Ligue para: (21) 3833-8188"];
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

function enviando() {
   ajustaCPF(document.getElementById('cpf'));
   ajustaCel(document.getElementById('celular'));
   
    const cpf = document.getElementById('cpf');
    const celular = document.getElementById('celular');

    if (cpf.classList.contains('is-invalid') || celular.classList.contains('is-invalid')) {
      return false; // Impede o envio se CPF ou celular estiver inválido
    }else{
      document.getElementById('btnformlimpar').classList.add('disabled');
      document.getElementById('btnformenviar').classList.add('disabled');
    
      document.getElementById('btnformenviarspinner').classList.remove('d-none');
      document.getElementById('btnformenviarspanenviando').classList.remove('d-none');
      document.getElementById('btnformenviarspanenviar').classList.add('d-none');

      // Adiciona a mensagem no localStorage
      localStorage.setItem('mensagemEnviada', 'true');
      return true; // Permite o envio
    }


}

function confirmarEnvio() {
  localStorage.removeItem('mensagemEnviada');
}

//ajuste de campos

function removeLetras(v){
  // Remove os caracteres não numéricos
  v.value = v.value.replace(/\D/g,'');
}

function removeNumeros(v) {
  // Remove os caracteres numéricos
  v.value = v.value.replace(/[0-9]/g, '');
}

function ajustaCPF(v){
  v.value = v.value.replace(/\D/g,'');
  //Adiciona pontos no CPF
  v.value = v.value.replace(/(\d{3})(\d)/,'$1.$2');
  v.value = v.value.replace(/(\d{3})(\d)/,'$1.$2');
  v.value = v.value.replace(/(\d{3})(\d)/,'$1-$2');

  const cpf = document.getElementById('cpf');
    if (cpf.value.length === 14) {
        cpf.classList.remove('is-invalid');
        cpf.classList.add('is-valid');
    } else {
        cpf.classList.remove('is-valid');
        cpf.classList.add('is-invalid');
    }
}

function ajustaCel(v){
  v.value = v.value.replace(/\D/g,'');
  //Adiciona parênteses no DDD
  v.value = v.value.replace(/^(\d\d)(\d)/g,'($1) $2');
  //Adiciona hifen no número do telefone
  v.value = v.value.replace(/(\d{5})(\d)/,'$1-$2');

  const celular = document.getElementById('celular');
  if (celular.value.length === 15) {
      celular.classList.remove('is-invalid');
      celular.classList.add('is-valid');
  } else {
      celular.classList.remove('is-valid');
      celular.classList.add('is-invalid');
  }
}