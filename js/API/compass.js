//Acelerómetro
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		var verID = null;
		$('#brujula .greenButton').tap(function(){ //Obtener Aceleración actual
			navigator.compass.getCurrentHeading(function(h){ //Funciona
				pgAlert('Cabecera: '+h.magneticHeading,'Posición actual');
			}, comError);
		});
		
		$('#brujula .individual li').tap(function(){
			switch($(this).index()){
				case 0: //Comenzar actualización de acelerómetro
					var opc = { frequency: 500 };
					verID = navigator.compass.watchHeading(function(h){
						$('#brujula .plastic li').eq(0).children('span').text('X:');
						$('#brujula .plastic li').eq(0).children('strong').text(h.magneticHeading);
					}, comError, opc);
					break;
				case 1: //Detener actualización de acelerómetro
					if(verID){
						navigator.compass.clearWatch(verID);
						$('#brujula .plastic li').eq(0).children('span').text('Apagado');
						$('#brujula .plastic li').eq(0).children('strong').text('');
						verID = null;
					}else{
						pgAlert('El Acelerómetro está apagado', 'Acelerómetro');
					}
			}
		});
		
		function comError(err){ //Error
			pgAlert('Error: '+err.code, 'Error');
		}
	}, false);
});