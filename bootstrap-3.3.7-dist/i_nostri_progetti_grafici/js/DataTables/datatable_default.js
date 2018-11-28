$.extend( true, $.fn.DataTable.defaults, {
    searching: true,
    ordering : true,
    paging   : false,
    pagingType: "full", //full", //simple_numbers", //first_last_numbers",
    lengthMenu: [ [ 10, 25, 50, 100, -1 ],  [ 10, 25, 50, 100, "-" ] ],
    fixedHeader: { headerOffset: $('#main-nav-menu').outerHeight() },
    language: { url: $('#datatable-defualt-js').data('lang-file') }
});

$.fn.dataTable.moment( 'DD/MM/YYYY HH:mm' );

$.fn.dataTable.moment( 'DD/MM/YYYY' );

$.fn.dataTable.moment( 'DD/MM/YY' );
