
$(document).ready(function(){

  $('body').on("click", ".sys-splitter", function(e){
    $(this).next().toggleClass('hidden').next().toggleClass('hidden');
  });


  $('body').popover({
    selector: '[data-toggle="popover-live"]',
    html: true,
    placement: "auto right",
    container: $(this).data("ref"),
    trigger: "focus",
    content: function() { return $(this).next().html(); }
  });

  $('#searchInput').keydown(function(e){
    if ( e.keyCode == 13 ) {
      if ( $.trim ( $('#searchInput').val() ) != "" ) {
        $('#searchButton').click();
        return false;
      }
    }
  });
  
  
  $( "body" ).on( "click", ".share-panel > .btn-share", function() {
    return frm_sharer_logger ( this );
  });

});


function form_ricerca_catego ( obj, key ) {

  // Assegna a controllo della form
  $('#catego').val(key);

  // Aggiorna pulsante
  var obj_but  = $('#riccat-button .text');
  var obj_mob  = $('#riccat-button .mobile');
  var new_text = $.trim($(obj).text());
  var ori_text = obj_but.data('ori');
  if ( key != "" ) {
    obj_but.text(new_text);
    var img = $('img',obj).clone();
    obj_mob.html("").append(img);
    $('#searchButton').click();
  } else {
    obj_but.text(ori_text);
    obj_mob.html("<i class='fa fa-list'></i>");
  }

}







var prev3d_curimg     = 0;
var prev3d_timer_chkimg_obj = null;
var prev3d_timer_animate    = null;

function prev3d_bind_animation ( ) {

  prev3d_curimg = 0;
  $('img.prev3d').hide();
  clearInterval(prev3d_timer_animate);

  prev3d_timer_chkimg_obj = setInterval ( function () {
    if ( $('img.prev3d.loading').length == 0 ) {
      clearInterval ( prev3d_timer_chkimg_obj );
      return true;
    }
    $('img.prev3d.loading').each(function(){
      var testW = typeof this.naturalWidth  == "undefined";
      var testH = typeof this.naturalHeight == "undefined";
      var testEvo = ( testW && testH ? ( this.naturalWidth > 0 || this.naturalHeight > 0 ) : 1 );
      if ( this.complete && testEvo ) {
        $(this).removeClass('loading');
      }
    });
  }, 50 );

  prev3d_timer_animate = setInterval ( function ( ) {
    if ( $('img.prev3d.loading').length == 0 ) {
      // calcola indice prossimo con modulo
      var prev3d_neximg = ( prev3d_curimg + 1 == $('img.prev3d').length ? 0 : prev3d_curimg + 1 );
      $('.prev3d_'+prev3d_neximg).show();
      $('.prev3d_'+prev3d_curimg).fadeOut(250);
      prev3d_curimg = prev3d_neximg;
    }
  }, 750 );

}


function _js_pad ( str, pad ) { return (pad+str).slice(-pad.length); }
function _get_date_time ( ) {
  var ora = new Date();
  var time = _js_pad ( ora.getDate()    , "00" )+"/"+
             _js_pad ( ora.getMonth()+1 , "00" )+"/"+
                       ora.getFullYear()        +" "+
             _js_pad ( ora.getHours()   , "00" )+":"+
             _js_pad ( ora.getMinutes() , "00" )+":"+
             _js_pad ( ora.getSeconds() , "00" )      ;
  return time;
}







function login_resetp_card ( ) {
  var username = $('#eUserReset').val();
  if ( $.trim ( username ) == "" ) { return false; }
  $.ajax({
    url: "/myatl/service/interact.php?action=login_resetp_card",
    data: { "username": username },
    success: function(data, textStatus, jqXHR) {
      if ( data && data.MSG ) {
      	$('#dResRecPas').html(data.MSG);
      	$('#dResRecPas').css("color", ( data.RES ? "green" : "red" ) );
      	$('#dResRecPas').removeClass('invisible');
      	setTimeout ( function () { $('#dResRecPas').addClass('invisible'); }, 5000 );
      }
    }
  });
}






function cartstate_catres_remart ( codart ) {
  $.ajax({
    url: "/myatl/service/interact.php?action=cart_operation&cmd=rem",
    data: { "codart": codart },
    success: function(data, textStatus, jqXHR) {
      if ( data && data.RES ) {

        // Tenere aggiornato ecommerce

        // Comune
        $('.cartstate > a sup').text(data.DAT.CART_STATE_NUM);

        // Vecchio
        $('.cartstate .cart-items .items').html(data.DAT.CART_STATE_BODY);

        // Nuovo
        $('#navbar_cart_btn sup').text(data.DAT.CART_STATE_NUM);
        $('.cartstate .carrello li').not('.checkout').remove();
        $(data.DAT.CART_STATE_BODY).insertBefore('.cartstate .carrello li.checkout');

      }
    }
  });
}







function frm_write_easy_cookie ( name, value ) {
  var expire = new Date();
  var now    = new Date();
  expire.setTime ( now.getTime() + ( 1 * 24 * 60 * 60 * 1000 ) );
  document.cookie = name + '=' + encodeURIComponent ( value ) + '; expires=' + expire.toGMTString() + '; path=/';
}

function frm_read_easy_cookie ( name ) {
  if ( document.cookie.length > 0 ) {
    var start = document.cookie.indexOf ( name + "=" );
    if ( start != -1 ) {
      start = start + name.length + 1;
      var end = document.cookie.indexOf ( ";", start );
      if ( end == -1 ) { end = document.cookie.length; }
      return decodeURIComponent ( document.cookie.substring ( start, end ) );
    }else{
      return "";
    }
  }
  return "";
}


function frm_toggle_value_in_easy_cookie ( name, value ) {
  var cookie_value   = frm_read_easy_cookie ( name );
  var present_values = ( cookie_value != "" ? cookie_value.split ( "," ) : new Array () );
  var present_num    = present_values.length;

  var present = false;
  for ( c = 0; c < present_num; c++ ) {
    if ( present_values[c] == value ) {
      present = c;
      break;
    }
  }

  if ( present !== false ) {
    present_values.splice ( present, 1 );
  } else {
    present_values.splice ( 0, 0, value );
  }
  var new_cookie_value = present_values.join(",");

  frm_write_easy_cookie ( name, new_cookie_value );
}

function frm_get_values_in_easy_cookie ( name ) {
  var cookie_value   = frm_read_easy_cookie ( name );
  var present_values = ( cookie_value != "" ? cookie_value.split ( "," ) : new Array () );
  return present_values;
}


function frm_pdf_catalog_custom ( value ) { frm_toggle_value_in_easy_cookie ( "COOKIE_SPECIAL_SELECTION_CUSTOM", value ); }

function frm_pdf_catalog_stock  ( value ) { frm_toggle_value_in_easy_cookie ( "COOKIE_SPECIAL_SELECTION", value ); }







function framework_keep_alive ( ) {
  setInterval(function(){
  	$.get('keep_alive.php');
  }, 60 * 1000 );  
}







function frm_sharer_logger ( obj ) {
  var type = $(obj).data("type");
  var tit  = $(obj).parent().data("tit");
  $.ajax({
    url: "/myatl/service/interact.php?action=sharer_logger",
    data: { "type": type, "tit": tit }
  });
  return true;
}

function frm_sharer_sms ( obj ) {
  var $composer = $(obj).next();
  var sms_url = $('.sms_url', $composer).val();
  var sms_tit = $('.sms_tit', $composer).val();
  if ( $composer.hasClass('not-inited') ) {
    $.ajax({
      url: "/myatl/service/interact.php?action=sms_content",
      data: { "sms_url": sms_url, "sms_tit": sms_tit },
      success: function(data, textStatus, jqXHR) {
        if ( data && data.RES ) {
          $('.sms-composer-content', $composer).html(data.DAT);
        }
      }
    });
    $composer.removeClass('not-inited');
  }
  $composer.toggleClass('hidden');
}

function frm_sharer_sms_send ( obj ) {
  var $composer = $(obj).closest('.sms-composer');
  var sms_prefix = parseInt ( $('.sms_prefix', $composer).val(), 10 );
  var sms_number = parseInt ( $('.sms_number', $composer).val(), 10 );
  var sms_conten = $('.sms_conten', $composer).val();
  
  // VALIDA
  $('.has-error', $composer).removeClass('has-error');
  if ( isNaN ( sms_prefix ) || sms_prefix == 0 ) {
  	$('.sms_prefix', $composer).parent().addClass('has-error');
    return false;
  }
  if ( isNaN ( sms_number ) || sms_number == 0 ) { 
  	$('.sms_number', $composer).parent().addClass('has-error');
    return false;
  }
  
  $.ajax({
    url: "/myatl/service/interact.php?action=sms_send",
    data: { "sms_prefix": sms_prefix, "sms_number": sms_number, "sms_conten": sms_conten },
    success: function(data, textStatus, jqXHR) {
      console.log ( data );
      if ( data && data.RES ) {
      }
    },
    complete: function ( ) {
      $(obj).html( $(obj).data('done') );
      setTimeout ( function () {
      	$(obj).html( $(obj).data('base') );
      }, 2000 );
    }
  });
}
