var GetQueryParams = function() {
    var result = {};
    
    if ( window.location.search )
    {
        var params = window.location.search.slice( 1 ).split( "&" );
        for ( var i = 0; i < params.length; ++i )
        {
            var tmp = params[ i ].split( "=" );
            result[ tmp[ 0 ] ] = unescape( tmp[ 1 ] );
        }
    }
    
    return result;
}

var JSONRequest = function( options ) {
    var opts = $.extend({
            dataType: 'json'
        },
        options,
        ( ( typeof( options.data ) != 'undefined' ) ? { data: JSON.stringify( options.data ), contentType: 'application/json' } : {} ) );

    $.ajax( opts );
}
