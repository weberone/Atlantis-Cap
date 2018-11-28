
var atl_masonry = null;
function attiva_masonry () {
      $(window).load(function(){
        atl_masonry = $('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true
        });
      });
      $(window).resize(function(){
        if ( atl_masonry ) {
          setTimeout ( function () { atl_masonry.masonry('layout'); }, 300 );
        }
      });
}



function validate_access(){
		var arr_input=[
			{id:'name', oblg:true, auth:'string'},
			{id:'vat', oblg:true, auth:'string'},
			{id:'Indirizzo', oblg:true, auth:'string'},
			{id:'Cap', oblg:true, auth:'string'},
			{id:'Citta', oblg:true, auth:'string'},
			{id:'Nazione', oblg:true, auth:'string'},
			//{id:'Email', oblg:true, auth:'email'},
			{id:'Telefono', oblg:true, auth:'number'},
			{id:'richiedente', oblg:true, auth:'string'}
			];	

		var valid=true;
		for(i = 0; i < arr_input.length; i++){
			arr_input[i]["value"]=document.getElementById("input"+arr_input[i]["id"]).value;
			
			if(!valid_type(arr_input[i]["value"], arr_input[i]["auth"], arr_input[i]["oblg"])) {  // se un parametro non è valido esegui il codice
				if(!document.getElementById("oblg_"+arr_input[i]["id"]).innerHTML.includes("mandatory or invalid field")){
					document.getElementById("oblg_"+arr_input[i]["id"]).innerHTML +=" mandatory or invalid field";
					document.getElementById("oblg_"+arr_input[i]["id"]).style.color = "orange";
				}
				valid=false;
			}
			else {
				document.getElementById("oblg_"+arr_input[i]["id"]).innerHTML=document.getElementById("oblg_"+arr_input[i]["id"]).innerHTML.replace("mandatory or invalid field", "");
				document.getElementById("oblg_"+arr_input[i]["id"]).style.color = "#616161";
			}
		}
		if (valid){// se tutti i parametri sono validi invio i parametri nella pagina che si occupa del inserimento nel db
			console.log(document.getElementById("sender_request"));
			document.getElementById("sender_request").submit();
		}
	}
	// valida l'email nella finestra modale dedicata alla mail e se è valida la invia tramite request
	function valid_email(){
		var emvalue=document.getElementById("controlla_mail").value;
		if(!valid_type( emvalue, 'email', true)) { 
			if(!document.getElementById("oblg_Email").innerHTML.includes(" invalid email")){
				document.getElementById("oblg_Email").innerHTML =" invalid email";
				document.getElementById("oblg_Email").style.color = "orange";
			}
		}
		else{
			document.getElementById("oblg_Email").innerHTML=document.getElementById("oblg_Email").innerHTML.replace("invalid email", "Email");
			document.getElementById("oblg_Email").style.color = "#616161";
			//console.log(document.getElementById("email_request"));
			document.getElementById("email_request").submit();
			}
	}
	// verifica il tipo di dato che sia valido
	function valid_type(val ,type, oblg){
		if(oblg){
			if(type=='number'){
				if(val){
					return !isNaN(val);
				}
				else return false;	
			}
			else if (type=='email'){
				var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(val);
			}
			else if(type=='string' ){
				if(val) return true;
				else return false;	
			}
		}
		else return true;
	}

  	$(document).ready(function() {
		if(document.getElementById("success_request")!=null){
			var invia_mex=document.getElementById("success_request").value;
			if(invia_mex>-1)
				$("#modal_thanks").modal();	
		}
		if(document.getElementById("email_controll")!=null){
			var modale_campi=document.getElementById("email_controll").value;
			if(modale_campi!=-1)
				$("#modal_panel_request").modal();
		}
		if(document.getElementById("richiedi_credenziali")!=null){
			var modale_campi=document.getElementById("richiedi_credenziali").value;
			if(modale_campi==1)
				$("#modal_panel_email").modal();
		}
			
	});
	
	
function recupera_email (email) {
  var username = email;
  if ( $.trim ( username ) == "" ) { return false; }
  $.ajax({
    url: "/myatl/service/interact.php?action=login_resetp_card",
    data: { "username": username },
    success: function(data, textStatus, jqXHR) {
      if ( data && data.MSG ) {
      	$('#msgrecpass').html(data.MSG);
      	$('#msgrecpass').css("color", ( data.RES ? "green" : "red" ) );
      	$('#msgrecpass').removeClass('invisible');
      	setTimeout ( function () { $('#msgrecpass').addClass('invisible'); }, 5000 );
      }
    }
  });
}
