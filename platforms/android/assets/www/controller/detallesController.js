myApp.onPageInit('DetallesUser', function (page) {
	//alert(window.resultado_id);
	$.ajax({
        type: 'POST', 
        url:  window.server + 'obtener_detalles.php',
        data:   ({
                    id: window.resultado_id,
                    evento: window.evento_id,
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            
            if(data != 'Error'){
                if(data != 'Error1'){
                	if(data != 'Error2'){
                		$('#showdata').html('Asiento: ' + data);
		            }
		            else{
		                myApp.alert('El usuario no tiene asignado un asiento', '¡Atención!');
		                $('#showdata').html('Asiento: ' + 'El usuario no tiene asignado un asiento');
		                
		            }
	            }
	            else{
	                myApp.alert('El usuario no está registrado para el evento', '¡Atención!');
	                $('#showdata').html('Asiento: ' + 'El usuario no está registrado para el evento');
	            }
            }
            else{
                myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
                $('#showdata').html('Asiento: ' + 'Verifique conexión e intente de nuevo');
            }
        }
    });//fin de ajax

    function sleep (time) {
	  return new Promise((resolve) => setTimeout(resolve, time));
	}
});