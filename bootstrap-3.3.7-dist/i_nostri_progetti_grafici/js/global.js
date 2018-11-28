/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/* WINDOW LOAD */
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/


$(window).on("load",function(){
    // LOADING
    $('.content').animate({'opacity': 1}, 'slow');
    $('#preloader').fadeOut('slow',function(){$(this).remove();});
});





/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/* WINDOW RESIZE */
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/


$( window ).resize(function() {
  var width = $(window).width();
    if (width >= 768) {
        $(".label_menu").hide();  
        $(".label_profilo").hide();  
        $(".label_carrello").hide(); 
        //$("#close_menu").hide(); 
        //$("#navbar").addClass("collapse"); 
    }
    else {
        //$(".label_menu").show();
        //$("#close_menu").show(); 
        //$("#navbar").removeClass("collapse"); 
    }
});





/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/* DOCUMENT READY */
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/


jQuery(document).ready(function($) {


    // BOOTSTRAP SLIDER
    $('#myCarousel').carousel({
            interval: 5000
    });
    $('#carousel-text').html($('#slide-content-0').html());
    //Handles the carousel thumbnails
    $('[id^=carousel-selector-]').click( function(){
        var id = this.id.substr(this.id.lastIndexOf("-") + 1);
        var id = parseInt(id);
        $('#myCarousel').carousel(id);
    });
    // When the carousel slides, auto update the text
    $('#myCarousel').on('slid.bs.carousel', function (e) {
        var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-'+id).html());
    });


    // PARALLAX CAP
    const tilt = $('.js-tilt').tilt();
    $('.js-destroy').on('click', function () {
        const element = $(this).closest('.js-parent').find('.js-tilt');
        element.tilt.destroy.call(element);
    });
    $('.js-getvalue').on('click', function () {
        const element = $(this).closest('.js-parent').find('.js-tilt');
        const test = element.tilt.getValues.call(element);
        console.log(test[0]);
    });
    $('.js-reset').on('click', function () {
        const element = $(this).closest('.js-parent').find('.js-tilt');
        element.tilt.reset.call(element);
    });


    $(function() {   
        $("#close_menu").click(function() {  
            $("#main_menu_block").hide();  
            $("#navbar_cart").hide();
            $("#menu_date").hide();
            $("#navbar_user").hide();   
            $("#close_menu").hide();  
            $(".label_menu").hide();  
            $(".label_profilo").hide();  
            $(".label_carrello").hide();  
        });
        $("#navbar_user_btn").click(function() {  
            $("#main_menu_block").hide();  
            $("#navbar_cart").hide();
            $("#menu_date").hide();
            $("#navbar_user").show();   
            $("#close_menu").show();
            $(".label_menu").hide();  
            $(".label_profilo").show();  
            $(".label_carrello").hide();  
        });
        $("#navbar_cart_btn").click(function() {  
            $("#main_menu_block").hide();    
            $("#navbar_cart").show();  
            $("#menu_date").hide();
            $("#navbar_user").hide();   
            $("#close_menu").show();  
            $(".label_menu").hide();  
            $(".label_profilo").hide();  
            $(".label_carrello").show(); 
        });
        $("#butt_menu").click(function() {  
            $("#main_menu_block").show();  
            $("#navbar_cart").hide();  
            $("#menu_date").show();
            $("#close_menu").show();  
            $("#navbar_user").hide();  
            $(".label_menu").show();  
            $(".label_profilo").hide();  
            $(".label_carrello").hide(); 
        });
    });


    // CONTACT
    $(function() {              
      $("#btn_phone").click(function() {  
        $(".dx_bar").removeClass("dx_bar-close");     
        $("#phone").show();      
        $("#email").hide();   
        $("#hover_page").show();  
      });
      $("#btn_email").click(function() {  
        $(".dx_bar").removeClass("dx_bar-close");      
        $("#email").show(); 
        $("#phone").hide();  
        $("#hover_page").show();    
      });
       $("#hover_page").hover(function() {  
        $(".dx_bar").addClass("dx_bar-close");        
        $("#hover_page").hide(); 
      });
    });




       // CONTACT
    $(function() {   

      $("#btn_item_group").click(function() {  
        $("#product_list").removeClass("listato");  
        $("#btn_item_group").addClass("active");
        $("#btn_item_list").removeClass("active");   
      });

      $("#btn_item_list").click(function() {  
        $("#product_list").addClass("listato");
        $("#btn_item_group").removeClass("active");
        $("#btn_item_list").addClass("active");         
      });
    });







    // BURGER MENU
    (function() {
      "use strict";
      var toggles = document.querySelectorAll(".c-hamburger");
      for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
      };
      function toggleHandler(toggle) {
        toggle.addEventListener( "click", function(e) {
          e.preventDefault();
          (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
        });
      }
    })();


});





/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/* WINDOW SCROLL */
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------*/


$(window).scroll(function(){

    // PARALLAX HOME
    var width = $(window).width();
    if (width <= 768) {
            var scrollVericale = $(this).scrollTop();
        $(".box-image").css({
            "transform" : "translate(0px, " + scrollVericale / 0 + "%)"
        });
    }
    else if (width <= 1281) {
            var scrollVericale = $(this).scrollTop();
        $(".box-image").css({
            "transform" : "translate(0px, " + scrollVericale / -40 + "%)"
        });
    }
    else {
        var scrollVericale = $(this).scrollTop();
        $(".box-image").css({
            "transform" : "translate(0px, " + scrollVericale / -40 + "%)"
        });
    }
    
    // SCROLL PAGE
    if ($(document).scrollTop() < 300) { 
        $('body').removeClass('scrolled');
    } else {
        $('body').addClass('scrolled');  
    }

});









