// Variáveis de controle de interface 
let seuVotoPara = document.querySelector('.p1-info1 span');
let cargo = document.querySelector('.p1-info2 span');
let descricaoGeral = document.querySelector('.p1-info4');
let numeros = document.querySelector('.p1-info3');

let mensagem = document.querySelector('.p2');
let images = document.querySelector('.p1-image'); 

// Variáveis de controle de ambiente
var etapaAtual = 0;
let numPreenchido = '';
let votoBranco = false;
let votos = [];

// Funções
function iniciarEtapa(){
    // função para determinar inicializações da tela
    let etapa = etapas[etapaAtual];
    let numeroHTML = '';
    numPreenchido = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++){
        if (i == 0) {
            numeroHTML += '<div class="numero pisca"><b></b></div>';
        } else {
            numeroHTML += '<div class="numero"><b></b></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricaoGeral.innerHTML = '';
    mensagem.style.display = 'none';
    images.innerHTML = '';
    numeros.innerHTML = numeroHTML;
    
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero == numPreenchido){
            return true;
        } else {
            return false;
        }
    });
    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        mensagem.style.display = 'block';
        descricaoGeral.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        
        let fotoHTML = '';
        for (let i in candidato.fotos) {
            fotoHTML += `<div class="p1-image1"><img src="images/${candidato.fotos[i].url}"/> ${candidato.fotos[i].legenda} </div>`;           
        }

        images.innerHTML = fotoHTML;
    } else {
        seuVotoPara.style.display = 'block';
        mensagem.style.display = 'block';
        descricaoGeral.innerHTML = '<div class="avisoNulo pisca">VOTO NULO!</div>';
    }
}

function cliclou(n) {
    let numClicado = document.querySelector('.numero.pisca');
    if (numClicado != null) {
        numClicado.innerHTML = n;
        numPreenchido = `${numPreenchido}${n}`;
        numClicado.classList.remove('pisca');
        if (numClicado.nextElementSibling != null) {
            numClicado.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    if (numPreenchido == '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        mensagem.style.display = 'block';
        numeros.innerHTML = ''; 
        descricaoGeral.innerHTML = '<div class="avisoBranco pisca">VOTO EM BRANCO!</div>';
    } else {
        alert("Para votar em branco é necessário não ter nenhum número nos campos. Precione a tecla CORRIGE e após isso a tecla BRANCO");
    }
}

function corrige() {
/*     let numClicado = document.querySelector('.numero.pisca');
    numClicado.classList.remove('pisca');
    numClicado.innerHTML = '';
    numClicado.previousElementSibling.classList.add('pisca'); */
    iniciarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let confirmaVoto = false;

    if (votoBranco == true) {
        confirmaVoto = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numPreenchido.length == etapa.numeros) {
        confirmaVoto = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numPreenchido
        });
    }

    if (confirmaVoto) {
        etapaAtual++;
        if (etapas[etapaAtual] != undefined) {
            iniciarEtapa();
        } else {
            document.getElementById("sound").play();
            document.querySelector('.tela').innerHTML = '<div class="avisoFim piscaTemp">FIM!</div>';
        }
    }
}

iniciarEtapa();