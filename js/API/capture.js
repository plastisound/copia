//Captura
function deviceReady(){
	//Obteniendo taps de los botones
	$('#capturar .rounded .arrow').tap(function(){
		switch($(this).index()){
			case 0: //Grabar Audio
				navigator.device.capture.captureAudio(function(mediaFiles){ //Correcto
					for(i=0; i<mediaFiles.length; i++){
						pgAlert(mediaFiles[i].fullPath, 'Audio Capturado');
					}
				}, errorCaptura, { limit: 2 }); //Opciones
				break;
			case 1: //Grabar Video
				navigator.device.capture.captureVideo(function(mediaFiles){ //Correcto
					for(i=0; i<mediaFiles.length; i++){
						pgAlert(mediaFiles[i].fullPath, 'Vídeo Capturado');
					}
				}, errorCaptura, { limit: 2 }); //Opciones
				break;
			case 2: //Capturar Imagen
				navigator.device.capture.captureImage(function(mediaFiles){ //Correcto
					for(i=0; i<mediaFiles.length; i++){
						pgAlert(mediaFiles[i].fullPath, 'Imagen Capturada');
					}
				}, errorCaptura, { limit: 2 }); //Opciones
		}
	});
}
//Errores de captura
function errorCaptura(err){ //Error
	pgAlert('Error; '+err.code, 'Error de Captura');
}
//Dispositivo Listo
function pageReady(){
	document.addEventListener("deviceready", deviceReady, false);
}
//WebView Listo
$(document).ready(pageReady);