var IdleHandler = function( app, idleTimeout ) {
    var self = this;
    
    self.app = app;
    self.idleTimeout = idleTimeout;
    self.unreadMessages = 0;

    $.idleTimer( self.idleTimeout, document, {
        events: 'mousemove keydown mousewheel mousedown touchstart touchmove' // DOMMouseScroll, nope, scroll to bottom emits this
    });

    $( document ).bind( 'idle.idleTimer', function() {
        if ( self.app.socket && self.app.room && self.app.user )
        {
            self.app.socket.emit( 'message', {
                kind: 'idle',
                roomId: self.app.room._id,
                senderId: self.app.user._id,
                nickname: self.app.user.nickname,
                userHash: self.app.user.hash,
                avatar: self.app.user.avatar,
                content: null
            });
        }
    });
    
    $( document ).bind( 'active.idleTimer', function() {
        if ( self.app.socket && self.app.room && self.app.user )
        {
            self.unreadMessages = 0;
            document.title = self.app.room.name + ' on Grmble';
            
            self.app.socket.emit( 'message', {
                kind: 'active',
                roomId: self.app.room._id,
                nickname: self.app.user.nickname,
                userHash: self.app.user.hash,
                avatar: self.app.user.avatar,
                content: null
            });
        }
    });
    
    self.socket.on( 'message', function( message ) {
            
        switch( message.kind )
        {
            case 'idle':
            case 'active':
            case 'startedTyping':
            case 'stoppedTyping':
            case 'cancelledTyping':
                return;
        }
            
        if ( $.data( document, 'idleTimer' ) == 'idle' )
        {
            $( '#message-sound' )[ 0 ].play();
            
            ++self.unreadMessages;
            document.title = '(' + self.unreadMessages + ') ' + self.app.room.name + ' on Grmble';
        }
    });
    
}