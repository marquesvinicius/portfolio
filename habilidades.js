const habilidades = document.querySelectorAll('.lista-habilidades-block');
const descricao = document.querySelector('.habilidades-descricao');

const descricaoHabilidades = [
    '<p>HTML</p> <br> <p>É uma linguagem de marcação utilizada na construção de páginas na Web.</p> <br>',
    '<p>CSS</p> <br> <p>É um mecanismo para adicionar estilo a um documento web.</p> <br>',
    '<p>JavaScript</p> <br> <p>É uma linguagem de programação. Juntamente com HTML e CSS, é uma das três principais tecnologias da web.</p> <br>',
    '<p>Java</p> <br> <p>O Java é uma linguagem de programação orientada a objetos e é uma das linguagens mais utilizadas pelas empresas na atualidade no desenvolvimento de aplicações WEB e Mobile.</p> <br>',
    '<p>SQL</p> <br> <p>O SQL é uma linguagem padrão para manipulação de registros em bancos de dados relacionais.</p> <br>',
    '<p>Node</p> <br> <p>Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.</p> <br>',
]

habilidades.forEach((elemento, index) => {
    let index1 = index;
    let elemento1 = elemento;
    elemento.addEventListener('mouseover', (evento) => {
        descricao.innerHTML = `<p>${descricaoHabilidades[index1]}<p>`
    })
    elemento.addEventListener('mouseout', (evento, elemento) => {
        descricao.innerHTML = '/* Passe o mouse por cima de alguma habilidade para ler a descrição */'
    })
});
