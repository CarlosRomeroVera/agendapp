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
            var obj = $.parseJSON(data);
            var html = '';
            $.each(obj, function(i,persona){
                if(data != 'Error'){
                    if(persona.error1 == false){
                    	if(persona.error2 == false){
                            
                                $('#showdata').html('Asiento: ' + persona.asiento);
                                $('#showExtra').html('Nombre: ' + persona.personaNombreCompleto +
                                                     '<br>Estado civil: ' + persona.estadoCivilNombre +
                                                     '<br>Cargo: ' + persona.cargoNombre +
                                                     '<br>Organismo: ' + persona.organismoNombre +
                                                     '<br>Partido: ' + persona.siglaPartido +
                                                     '<br>Tipo invitado: ' + persona.tipoPersona);
                           
                    		
    		            }
    		            else{
    		                myApp.alert('El usuario no tiene asignado un asiento', '¡Atención!');
    		                $('#showdata').html('Asiento: ' + 'El usuario no tiene asignado un asiento');
                            $('#showExtra').html('Nombre: ' + persona.personaNombreCompleto +
                                                     '<br>Estado civil: ' + persona.estadoCivilNombre +
                                                     '<br>Cargo: ' + persona.cargoNombre +
                                                     '<br>Organismo: ' + persona.organismoNombre +
                                                     '<br>Partido: ' + persona.siglaPartido +
                                                     '<br>Tipo invitado: ' + persona.tipoPersona);
    		                
    		            }
    	            }
    	            else{
    	                myApp.alert('El usuario no está registrado para el evento', '¡Atención!');
    	                $('#showdata').html('Asiento: ' + 'El usuario no está registrado para el evento');
                        $('#showExtra').html('Nombre: ' + persona.personaNombreCompleto +
                                                     '<br>Estado civil: ' + persona.estadoCivilNombre +
                                                     '<br>Cargo: ' + persona.cargoNombre +
                                                     '<br>Organismo: ' + persona.organismoNombre +
                                                     '<br>Partido: ' + persona.siglaPartido +
                                                     '<br>Tipo invitado: ' + persona.tipoPersona);
    	            }
                }
                else{
                    myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
                    $('#showdata').html('Asiento: ' + 'Verifique conexión e intente de nuevo');
                    $('#showExtra').html('Nombre: ' + persona.personaNombreCompleto +
                                                     '<br>Estado civil: ' + persona.estadoCivilNombre +
                                                     '<br>Cargo: ' + persona.cargoNombre +
                                                     '<br>Organismo: ' + persona.organismoNombre +
                                                     '<br>Partido: ' + persona.siglaPartido +
                                                     '<br>Tipo invitado: ' + persona.tipoPersona);
                }
            });
        }
    });//fin de ajax
});