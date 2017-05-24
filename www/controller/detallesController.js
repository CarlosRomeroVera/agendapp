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
    		                $('#showdata').html('Asiento: ' + 'El usuario no tiene asignado un asiento' +
                                                '<br><a href="#" data-popup=".popup-about" class="open-popup">Asignar asiento</a>');
                            $('#showExtra').html('Nombre: ' + persona.personaNombreCompleto +
                                                     '<br>Estado civil: ' + persona.estadoCivilNombre +
                                                     '<br>Cargo: ' + persona.cargoNombre +
                                                     '<br>Organismo: ' + persona.organismoNombre +
                                                     '<br>Partido: ' + persona.siglaPartido +
                                                     '<br>Tipo invitado: ' + persona.tipoPersona);
                            $.ajax({
                                type: 'POST', 
                                url:  window.server + 'obtiene_asientos_libres.php',
                                data:   ({
                                            eventoId: window.evento_id,
                                        }),
                                cache: false,
                                dataType: 'text',
                                success: function(data){
                                    
                                    if(data != 'error'){
                                        var obj = $.parseJSON(data);
                                        var html = '';
                                        $.each(obj, function(i,asiento){
                                            html = html + '<option value="'+asiento.nombreSilla+'">'+asiento.nombreSilla+'</option>'
                                        });
                                        $("#asientoslibres").html(html);
                                    }
                                    else{
                                        myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
                                    }
                                }
                            });//fin de ajax
    		                
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

    $$('#asignarAsiento').on('click', function(){
        
        $.ajax({
            type: 'POST', 
            url:  window.server + 'asignar_asiento.php',
            data:   ({
                        personaId: window.resultado_id,
                        sillaNombre: $('#asientoslibres').val(),
                        eventoId: window.evento_id
                    }),
            cache: false,
            dataType: 'text',
            success: function(data){
                
                if(data == 'ok'){
                    myApp.alert('Actualizado', '¡Atención!');
                    mainView.router.loadPage('../User/Index.html');
                }
                else{
                    myApp.alert(data, '¡Atención!');
                }
            }
        });//fin de ajax
        
        $('#contrasenia').val(''); 
        //var formData = myApp.formToData('#LoginForm');
        //alert(JSON.stringify(formData));
    });  
});