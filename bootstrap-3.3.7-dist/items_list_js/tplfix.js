$(window).load(function(){

    $(document).on('click', '.main_menu .dropdown-submenu a', function(e) {
      e.stopPropagation();
    })

    //tootltip
    $('[data-toggle="tooltip"]').tooltip();

    //Popover
    $('[data-toggle="popover"]').popover();

    //back to top
    $('body').append('<a href="javascript:void(0);" id="back-to-top"><i class="fa fa-angle-up"></i></a>');

    $(window).on('scroll',function() {
        if ($(this).scrollTop() >= 200) {
            $('#back-to-top').fadeIn(200);
        } else {
            $('#back-to-top').fadeOut(200);
        }
    });
    $('#back-to-top').click(function() {
        $('body,html').animate({
            scrollTop : 0
        }, 500);
    });


});
