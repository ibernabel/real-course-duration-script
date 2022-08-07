let parrafs = document.querySelectorAll('.ContentClass-item-content > p');
let parrafos = Array.from( parrafs );
let duracionTodos = parrafos.map( function( element ) { return element.innerText; });
let minutos = duracionTodos.map( function( element ) { return Number( element.slice( 0, 2) ) });
let segundos = duracionTodos.map( function( element ) { return Number( element.slice( 3, 5) ) });
let duracionMinutos = minutos.reduce( ( previousValue, currentValue ) => previousValue + currentValue, 0 );
let duracionSegundos = segundos.reduce( ( previousValue, currentValue ) => previousValue + currentValue, 0 );
let segundosRestantes = duracionSegundos % 60;
let minutosRestantes = duracionMinutos % 60;
let minutosAdicionales = Math.trunc(duracionSegundos / 60);
let duracionRealMinutos = duracionMinutos + minutosAdicionales;
let horas = Math.trunc(duracionRealMinutos / 60);
// 'La duracion real del curso es de: ' + horas + ' horas, ' + minutosRestantes + ' minutos, ' + segundosRestantes + ' segundos';
let showDurationDivMobile = document.querySelector("#content > div:nth-child(2) > div > div.Tabs-content.Tabs-content--active > div > div > ul > li:nth-child(1) > p > span");
showDurationDivMobile.innerText = horas + ':' + minutosRestantes + ' Horas';

