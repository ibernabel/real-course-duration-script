//Duracion real del curso mas guardado datos en local por 24 horas
//Mas guardado en especifico por nombre del curso
//Con Ayuda de Chat-GPT
setTimeout(function () {
	if (window.location.href.includes("/cursos/")) {
		setTimeout(function () {
			let parrafs = Array.from(document.querySelectorAll('.ContentClass-item-content > p'));
			let duracionMinutos = 0;
			let duracionSegundos = 0;

			parrafs.forEach(function (element) {
				let duracion = element.innerText.split(':');
				duracionMinutos += parseInt(duracion[0]);
				duracionSegundos += parseInt(duracion[1]);
			});

			let duracionRealMinutos = duracionMinutos + Math.floor(duracionSegundos / 60);
			let horas = Math.floor(duracionRealMinutos / 60);
			let minutosRestantes = duracionRealMinutos % 60;
			let segundosRestantes = duracionSegundos % 60;

			minutosRestantes = (minutosRestantes < 10) ? '0' + minutosRestantes : minutosRestantes;
			segundosRestantes = (segundosRestantes < 10) ? '0' + segundosRestantes : segundosRestantes;

			let tiempoDuracion = `${horas}:${minutosRestantes}:${segundosRestantes}`;
			let duracionSpan = document.querySelector("#content > div.Content-wrapper.u-wrapper > div.Content-resources > div > ul > li:nth-child(1) > p > span");
			// duracionSpan.textContent = tiempoDuracion;

			let cursoNombre = obtenerNombreCurso(); // Función para obtener el nombre del curso de la URL
			let datosGuardados = localStorage.getItem(cursoNombre);

			// Comprobar si existen datos guardados y si han pasado menos de 24 horas
			if (datosGuardados) {
				let datos = JSON.parse(datosGuardados);
				if (datos.horas != 0 && datos.minutosRestantes != 0 && datos.segundosRestantes != 0) {

					let fechaGuardada = new Date(datos.fecha);
					let horasPasadas = (Date.now() - fechaGuardada.getTime()) / (1000 * 60 * 60);
					if (horasPasadas < 24) {
						horas = datos.horas;
						minutosRestantes = datos.minutosRestantes;
						segundosRestantes = datos.segundosRestantes;
					}
				}
			}

			// Guardar los nuevos datos en el almacenamiento local
			let datosAGuardar = {
				horas: horas,
				minutosRestantes: minutosRestantes,
				segundosRestantes: segundosRestantes,
				fecha: Date.now()
			};
			localStorage.setItem(cursoNombre, JSON.stringify(datosAGuardar));

			console.log('La duracion real del curso es de: ' + horas + ':' + minutosRestantes + ':' + segundosRestantes);
		}, 1000); // Retardo para ejecutar funcion de calculo duracion del curso
	}
}, 500); // Retardo de tiempo para leer la url

function obtenerNombreCurso() {
	let url = window.location.href;
	let inicio = url.indexOf("/cursos/") + "/cursos/".length;
	let fin = url.indexOf("/", inicio);
	return url.substring(inicio, fin);
}

