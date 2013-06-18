//Acelerómetro
$(document).ready(function(e) {
    document.addEventListener("deviceready", function(){
		var verID = null;
		$('#acelerometro .greenButton').tap(function(){ //Obtener Aceleración actual
			navigator.accelerometer.getCurrentAcceleration(function(acceleration){ //Funciona
				pgAlert('Aceleración X: '+acceleration.x+'\n'+
					    'Aceleración Y: '+acceleration.y+'\n'+
						'Aceleración Z: '+acceleration.z+'\n'+
						'TimeStamp: '+acceleration.timestamp,'Posición actual');
			}, accError);
		});
		
		$('#acelerometro .individual li').tap(function(){
			switch($(this).index()){
				case 0: //Comenzar actualización de acelerómetro
					var opc = { frequency: 500 };
					verID = navigator.accelerometer.watchAcceleration(function(acceleration){
						$('#acelerometro .plastic li').eq(0).children('span').text('X:');
						$('#acelerometro .plastic li').eq(0).children('strong').text(acceleration.x);
						$('#acelerometro .plastic li').eq(1).children('span').text('Y:');
						$('#acelerometro .plastic li').eq(1).children('strong').text(acceleration.y);
						$('#acelerometro .plastic li').eq(2).children('span').text('Z:');
						$('#acelerometro .plastic li').eq(2).children('strong').text(acceleration.z);
						$('#acelerometro .plastic li').eq(3).children('span').text('TimeStamp:');
						$('#acelerometro .plastic li').eq(3).children('strong').text(acceleration.timestamp);
					}, accError, opc);
					break;
				case 1: //Detener actualización de acelerómetro
					if(verID){
						navigator.accelerometer.clearWatch(verID);
						$('#acelerometro .plastic li').eq(0).children('span').text('Apagado');
						$('#acelerometro .plastic li').eq(0).children('strong').text('');
						$('#acelerometro .plastic li').eq(1).children('span').text('Apagado');
						$('#acelerometro .plastic li').eq(1).children('strong').text('');
						$('#acelerometro .plastic li').eq(2).children('span').text('Apagado');
						$('#acelerometro .plastic li').eq(2).children('strong').text('');
						$('#acelerometro .plastic li').eq(3).children('span').text('Apagado');
						$('#acelerometro .plastic li').eq(3).children('strong').text('');
						verID = null;
					}else{
						pgAlert('El Acelerómetro está apagado', 'Acelerómetro');
					}
			}
		});
		
		function accError(err){ //Error
			pgAlert('Error: '+err.code, 'Error');
		}
	}, false);
});