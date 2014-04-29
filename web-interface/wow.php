<!doctype html>
<html>
  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <!-- NRS: Directive to control the page width on mobile devices-->
    <meta name="viewport" content="width=device-width, maximum-scale=1" />

    <!-- JQuery -->
    <script type="text/javascript" src="js/jquery/jquery.js"></script>
    <script type="text/javascript" src="js/jquery/jquery-ui.js"></script>
    <!-- -------------------- -->

    <!-- speech recognition javascript -->
    <!--script type="text/javascript" src="js/speech.js"></script-->

    <!-- todo stylesheet -->
    <!--link type="text/style" src=""-->

    <!-- todo stylesheet -->
    <style>
      html, div {
      display:  block;
      }

      div, p {
        margin:  0px;
        padding: 0px;
      }

      body {

      background-color: #ABC;
      color: black;

      width: 100%;

      margin: 15px 0px;

      padding:  0px;

      }
      
      .red {
      background-color: red;
      }

      #wrapper {

      border:        black thin solid;
      border-radius: 5px;

      background-color: #EFF;

      margin-left:    auto;
      margin-right:   auto;

      /* width is controlled by jquery! */

     }

      #logo {      
        left:     0px;
        position: relative;
      }


      #navbar *, #footer * { 
        display:    inline-block;
        max-height: 50px;
      }

      #navbar {

        /*position: absolute;*/
        top:   0px;
        left:  0px;
        width: inherit;
      
        background-color: #BEF;

        border-bottom: black thin solid;

      }


      #footer {

        position: absolute;
        bottom:  13px;

        width:   inherit;

        height:   22px;

        background-color: #BEF;

        border-bottom: black thin solid;

      }

      
      /* sets width to 100% */
      .pwidth
      {

      }


      #navbuttons
      {
        float:        right;
        margin-top:   10px;
        margin-right: 10px;

      }

      /* actually style the navbutton */
      #navbuttons a
      {
      
        
      
      }

      /* navbutton hover style */
      #navbuttons a:hover
      {
      background-color: #EFF;
      color: #4EA;
      }


    </style>
    <!-- todo script -->


    <!-- very cool script for voice commands -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/1.1.0/annyang.min.js"></script>
    <script>

      var state;

      function dostatus(){
        $("#speechstatus").html(state);
      }

      function toReadyState()
      {
        state = "ready";
        dostatus();
      }

      function toActiveState()
      {
        state = "active";
        dostatus();
      }


      function isActive(){ return state === "active" ; }

      function actionLock(lockname)
      {
        console.log("actionLock: "+lockname );
      }
      
      function actionUnlock(lockname)
      {
        console.log("actionUnlock: "+lockname );
      }
      
      function actionOn(lightname)
      {
        console.log("actionOn: "+lightname);
      }
      
      function actionOff(lightname)
      {
        console.log("actionOff: "+lightname);
      }
      

    if (annyang) {
      // Let's define our first command. First the text we expect, and then the function it should call
      var commands = 
      {

        'hello world': function() { console.log("hello world, indeed"); },

        '(hello) computer': function() {

          toActiveState();
          console.log("what's up?");
          // play sound
      
         },


        '(please) unlock *lockname': actionUnlock,
      
        '(please) lock *lockname': actionLock,
      

        '(please) turn off *lightname': actionOff,

        '(please) turn on *lightname': actionOn,

        'nevermind': toReadyState

      };

      // Add our commands to annyang
      annyang.addCommands(commands);
 
     
      // Start listening. You can call this here, or attach this call to an event, button, etc.
      annyang.start();

    }

    </script>

    <script type="text/javascript" src="js/page.js"></script>

  </head>
  <body>
    <div id="wrapper"> <!-- wraps the whole page-->
	<div id="navbar">
	  <img id="logo" src="assets/bitlr-logo.png" alt="Bitlr" /> 
	  <div id="navbuttons">
	    <a >Login</a>
	    <a>Settings</a>
	  </div>
	</div>

	<h1>Welcome to BitLr</h1>
	<div id="main">

	  <div id="speechStuff">
	    <div    id="speechstatus">:)</div>
	    <input  id="speechResult" />
	    <button id="speechButton" onclick="speechAction()">Say a command</button>
	    <button id="submitCommandButton">submit command (not implemented)</button>
	    <div    id="commandResult"></div>
	  </div>
	  <div id="ok great"></div>
	</div>

	<div id="footer"></div>

    </div>
  </body>
</html>
