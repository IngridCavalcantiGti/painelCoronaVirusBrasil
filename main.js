(function(){

'use strict'

let btnEstado = document.querySelectorAll('.btnEstado');
let casosConfirmadosAjax = document.querySelector('#casosConfirmadosAjax');
let casosSuspeitosAjax = document.querySelector('#casosSuspeitosAjax');
let obitosConfirmadosAjax = document.querySelector('#obitosConfirmadosAjax');
let estadonoPainel = document.querySelector('#estadonoPainel');
let dataTime = document.querySelector('#dateTime');

Array.prototype.forEach.call(btnEstado, function(item) {
    item.addEventListener('click', clicouEstado);  
})

function pesquisar(estado) {
    let ajax = new XMLHttpRequest();
    ajax.open("GET", "https://covid19-brazil-api.now.sh/api/report/v1");
    ajax.send();
    ajax.addEventListener('readystatechange', function() {

    if(ajax.readyState === 4 && ajax.status === 200) {
      let dadosApi = ajax.responseText;
      let array = JSON.parse(dadosApi);
      let isArray = Object.entries(array);
             
     isArray[0][1].map(function(valorAtual) {   
      if(valorAtual.uf === estado) {
        casosConfirmadosAjax.innerText = valorAtual.cases; 
        obitosConfirmadosAjax.innerText = valorAtual.deaths; 
        casosSuspeitosAjax.innerHTML = valorAtual.suspects; 
        estadonoPainel.innerHTML =valorAtual.state;
        dataTime.innerHTML = 'Última atualização ' + valorAtual.datetime.replace('T', '-').split('-').reverse().splice(1).join('/');
              };
          });       
        };  
    });           
};
function clicouEstado() {
    pesquisar(this.id);       
 };

})()

