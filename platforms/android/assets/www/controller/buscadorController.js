myApp.onPageInit('PrincipalUser', function (page) {
    document.getElementById('buscar').focus();
	javascript:window.history.forward(1);
	document.onkeydown = function(e){
  
	    e=window.event;
	    if(!window.event)return false;
	 	if(e.keyCode == 37 && e.altKey==true )
		{return false;} 
		if((e.keyCode == 116 || e.keyCode == 82) && e.ctrlKey==true)
		{return false;} 
	    if(e.keyCode == 13)
		{return false;} 
	}
	$("#buscar").on('keyup', function(){
        var value = $(this).val();
        $.ajax({
	        type: 'POST', 
	        url:  window.server + 'buscador.php',
	        data:   ({
	                    match: value,
	                }),
	        cache: false,
	        dataType: 'text',
	        success: function(data){
	            
	            if(data != 'error'){
	                var obj = $.parseJSON(data);
	                //alert(obj.funcionario.length);
	        		var html = '';
	                $.each(obj.funcionario, function(i,funcionario){
	                    html = html + "<li>";
						    html = html + "<a href='../User/detail.html' onclick='asignaId("+'"'+funcionario.id+'"'+");' class='item-link item-content' id='cl'> ";
						    html = html + "<div class='item-inner'>";
							    html = html + "<div class='item-title-row'>";
								    html = html + "<div class='item-title'>" + funcionario.personaNombreCompleto + "</div>";
							    html = html + "</div>";
							    html = html + "<div class='item-after'>" + funcionario.organismoNombre +"</div>";
						    html = html + "</div>";
						    html = html + "</a>";
					    html = html + "</li>";
	                });
	                $("#results").html(html);
	                if (obj.funcionario.length == 1) {
	                	$.each(obj.funcionario, function(i,funcionario){
							asignaId(funcionario.id);
	                	});
	        			
	        			mainView.router.loadPage('../User/detail.html');
	        		}
	            }
	            else{
	                myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
	            }
	        }
	    });//fin de ajax
    }).keyup();
});