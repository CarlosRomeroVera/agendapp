myApp.onPageInit('PrincipalUser', function (page) {
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
	        		var html = '';
	                $.each(obj.funcionario, function(i,funcionario){
	                    //html = html + "<li class='table-view-cell'><a class='navigate-right' href='../User/detail.html?id=" + funcionario.id + "'>" + 
	                    //funcionario.personaNombreCompleto + " - " + funcionario.organismoNombre +"</a></li>";
	                    html = html + "<li>";
						    html = html + "<a href='../User/detail.html' onclick='asignaId("+'"'+funcionario.id+'"'+");' class='item-link item-content'>";
						    html = html + "<div class='item-inner'>";
							    html = html + "<div class='item-title-row'>";
								    html = html + "<div class='item-title'>" + funcionario.personaNombreCompleto + "</div>";
								    //html = html + "<div class='item-after'>" + funcionario.organismoNombre +"</div>";
								    
							    html = html + "</div>";
							    html = html + "<div class='item-after'>" + funcionario.organismoNombre +"</div>";
						    html = html + "</div>";
						    html = html + "</a>";
					    html = html + "</li>";
	                });
	                $("#results").html(html);
	            }
	            else{
	                myApp.alert('Verifique conexión e intente de nuevo', '¡Atención!');
	            }
	        }
	    });//fin de ajax
    }).keyup();
});