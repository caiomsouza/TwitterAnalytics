$.ajax({
	url: 'getSitemapJson',
	dataType:'json',
	type: 'GET'									
  }).done(function(data){
	var page, url = '';        
	for (var i in data) {
		page = data[i].name;
		url =  data[i].link;
		$("#cpkSiteMapObj").append("<li><a href='"+url+"'>"+page+"</a></li>");
	}							
});

function logout(){   
    window.location.href='/pentaho/Logout';   
}

function reloadPage(){    
    window.location.reload();
}
	
function loading() {  
     var img = $('.modalClass');
     img.removeClass('hide');
     img.addClass('show');
 };

 function endLoading() {
     var img = $('.modalClass');
     img.removeClass('show');
     img.addClass('hide');
 };
	
function updateCache(){   
	loading();
    $.when(
	    //Chamada ao endpoint que limpa o cache: Mondrian, Saiku and CDA
        $.ajax("/pentaho/plugin/it4bizDashboardToolkit/api/update_cache")
    ).then(
        //sucess
        function(){
            //alert('atualizado');
            var globalDelay = { show: 200, hide: 100 };
            var lcontent = "<div class='alert alert-success'>Atualizado com sucesso!</div>";
			
			 
           
            $('#msg_ferramenta').popover({placement:'bottom', trigger:'hover', content:lcontent , delay:globalDelay, html: true});             
            $('#msg_ferramenta').popover('show');

            setTimeout(function() {
                  $('#msg_ferramenta').popover('hide');
                  $('#msg_ferramenta').popover('destroy');
                  reloadPage();
            }, 2000);  
			endLoading();		
        }, 
        //error
        function(){
            //alert('erro');
            var globalDelay = { show: 200, hide: 100 };
            var lcontent = "<div class='alert alert-error'>Erro ao Atualizar!</div>";
           
            $('#msg_ferramenta').popover({placement:'bottom', trigger:'hover', content:lcontent , delay:globalDelay, html: true});             
            $('#msg_ferramenta').popover('show');
       
            setTimeout(function() {
                  $('#msg_ferramenta').popover('hide');
                  $('#msg_ferramenta').popover('destroy');                  
            }, 3000);
		endLoading();
    });//close then  
}