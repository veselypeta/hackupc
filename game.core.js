//The main update loop runs on requestAnimationFrame,
//Which falls back to a setTimeout loop on the server
//Code below is from Three.js, and sourced from links below


let frame_time = 60/1000; // -- 60hz over the refresh time -- for local i.e. client side
if ('undefined' != typeof (global)) frame_time = 45;  //on server we run at 45ms, 22hz

(function () {
    let lastTime = 0;
    // support for different browsers
    const vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    // set the request animation frame for the correct brower that the user is using
    for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++ i) {
        window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']
    }

    // handle the case if no requestAnimationFrame is provided
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (cb, element) {
            const currTime = Date.now();
            const timeToCall = Math.max( 0, frame_time - ( currTime - lastTime ) );
            const id = window.setTimeout( function() { cb( currTime + timeToCall ); }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        }
    }

    if (!window.cancelAnimationFrame){
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        }
    }

})();


const game_core = (game_instance) => {
    // store the instance if any
    this.instance = game_instance;

    // are we the server? -- if we pass a game instance we are the server
    this.server = this.instance || undefined;

    // used in collision ect..
    this.world = {
        width: 720,
        height: 480
    };

    // we create a player set, passing them
    // the game they are running on, too

    if (this.server) {

        this.players  = {
            self: new game_player(this, this.instance.player_host),
            other: new game_player(this, this.instance.player_client)
        };

        this.players.self.pos = {x:20, y:20};

    } else {

        this.players = {
            self : new game_player(this),
            other : new game_player(this)
        };

        // creating ghosts to predict where the next player will be without delay

        this.ghosts = {
            //Our ghost position on the server
            server_pos_self : new game_player(this),
            //The other players server position as we receive it
            server_pos_other : new game_player(this),
            //The other players ghost destination position (the lerp)
            pos_other : new game_player(this)
        };

        this.ghosts.pos_other.state = 'dest_pos';

        this.ghosts.pos_other.info_color = 'rgba(255,255,255,0.1)';

        this.ghosts.server_pos_self.info_color = 'rgba(255,255,255,0.2)';
        this.ghosts.server_pos_other.info_color = 'rgba(255,255,255,0.2)';

        this.ghosts.server_pos_self.state = 'server_pos';
        this.ghosts.server_pos_other.state = 'server_pos';

        this.ghosts.server_pos_self.pos = { x:20, y:20 };
        this.ghosts.pos_other.pos = { x:500, y:200 };
        this.ghosts.server_pos_other.pos = { x:500, y:200 };
    }


};

const game_player = () => {

};

