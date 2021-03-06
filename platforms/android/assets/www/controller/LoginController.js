// Initialize app
var myApp = new Framework7({
    //swipePanel: 'left'
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
$$('.panel-close').on('click', function (e) {
    myApp.closePanel();
});
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


//SCRIPT PARA CERRAR SESION
function salir(){
    var usuario = localStorage.getItem('User');
        if (usuario!==null) {
            localStorage.clear();
            destroyAll();
            window.location.href = "../Login/Index.html";
            //$.mobile.changePage( "../Login/Index.html", { transition: "flip", reverse: "true", changeHash: "false" });
        }
}

function cambiarPage(link, tipo) {
    mainView.router.loadPage(link);
    window.tipo = tipo;
    //alert('entrando');
    //window.location.href = link;
}

$(function() {
    var usuario = localStorage.getItem('User');

    if (usuario!=null) {
        //window.user_id_global = localStorage.getItem('id');
        //window.user_usuario_global = localStorage.getItem('User');
        window.user_id = localStorage.getItem('idUser');
        window.user_usuario = localStorage.getItem('User');
        window.evento_id = localStorage.getItem('Evento');
        //$.mobile.changePage( "../Index/Index.html", { transition: "flip", reverse: "true", changeHash: "false" });
        //cleanUp('IndexIndex');
        mainView.router.loadPage('../User/Index.html');

        //window.location.href = "../Index/Index.html";
    }

    $.ajax({
        type: 'POST', 
        url:  window.server + 'obtener_eventos.php',
        data:   ({
                    
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            
            if(data != 'error'){
                var obj = $.parseJSON(data);
                var datos = '';
        
                $.each(obj.evento, function(i,evento){
                    datos = datos + '<option value="'+evento.id+'">'+evento.nombre+'</option>'
                });
                $("#evento").html(datos);
            }
            else{
                myApp.alert('Usuario o contraseña incorrecta', '¡Atención!');
            }
        }
    });//fin de ajax
});

//BUTTON ENVIAR DE LOGIN
$$('#IniciarSesion').on('click', function(){
 
    var usuario     = $('#usuario').val();
    var contrasenia = $('#contrasenia').val();
    window.evento_id = $('#evento').val();
    
    $.ajax({
        type: 'POST', 
        url:  window.server + 'login.php',
        data:   ({
                    user: usuario,
                    pass: contrasenia
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            
            if(data != 'error'){
                var obj = $.parseJSON(data);
                var datos = '';
        
                $.each(obj.user, function(i,user){
                    window.user_id = user.id;
                    window.user_usuario = user.username;
                    window.user_organismo = user.organismo_id;
                    datos = user.id+" "+user.username+" "+window.evento_id;
                });
                
                var result = datos.split(" ");
                localStorage.setItem('idUser', result[0]);
                localStorage.setItem('User', result[1]);
                localStorage.setItem('Evento', result[2]);
                mainView.router.loadPage('../User/Index.html');
            }
            else{
                myApp.alert('Usuario o contraseña incorrecta', '¡Atención!');
            }
        }
    });//fin de ajax
    
    $('#contrasenia').val(''); 
    //var formData = myApp.formToData('#LoginForm');
    //alert(JSON.stringify(formData));
});  


