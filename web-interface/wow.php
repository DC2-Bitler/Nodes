<!doctype html>
<!--
    Nick St.Pierre
    May 8 2014

    This is the UI for our DC2 project Bitler.

    It asks for the node status from the master node, and then creates a UI
    based on the capabilities of the nodes.

-->
<html>
  <head>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <!-- NRS: Directive to control the page width on mobile devices-->
    <meta name="viewport" content="width=device-width, maximum-scale=1" />

    <title>BITlr control page</title>

    <!-- JQuery -->
    <script type="text/javascript" src="js/jquery/jquery.js"></script>
    <script type="text/javascript" src="js/jquery/jquery-ui.js"></script>
    <!-- -------------------- -->

    <!-- stylesheet -->
    <link rel="stylesheet" type="text/css" href="style/main.css">


    <!-- very cool script for voice commands -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/annyang/1.1.0/annyang.min.js"></script>


    <!-- doCommand code -->
    <script>

      <!-- callbacks for our AJAX request -->
      function command_fail(jsonpObject){
        console.log("ajax error");
      }

      function command_success(jsonpObject){
        console.log("ajax success");
      }

      
      /**
       * send a command to the master node via an ajax call
       */
      function doCommand( nodeid, command )
      {
        $.ajax({

          url: "http://localhost:1337/command",

          data: { id: nodeid, command: command  },

          dataType: 'jsonp',

          jsonp: false,
      
          jsonpCallback: function(anObject){console.log("jsonp default callback running...")},
      
          error: function( failedXHR, strTextStatus, strErrorThrown ){

            console.warn("AJAX call encountered an error: " + strTextStatus + "... " + strErrorThrown);
            
          }

        });

      }

    </script>

    <!-- voice recognition js, not used in final version -->
    <!--script>

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
      
      /* voice recognition legacy code */
/********
    if (annyang) {

      // Let's define our first command. 
      // First the text we expect, and then the function it should call
      var commands = 
      {

        'hello world': function() { console.log("hello world, indeed"); },

        '(hello) computer': function() {

          toActiveState();
          console.log("what's up?");
          // play sound
      
         },

      // DOORS

         // UNLOCK
        '(please) unlock *lockname': actionUnlock,

         // LOCK
        '(please) lock *lockname'  : actionLock,

      
      // LIGHTS

        // OFF
        '(please) turn off *lightname': actionOff,

        // ON
        '(please) turn on *lightname' : actionOn,

      
      // NEVERMIND
        'nevermind': toReadyState

      };

      // Add our commands to annyang
      annyang.addCommands(commands);
 
     
      // Start listening. 
      // (You can call this here, or attach this call to an event, button, etc.)
      annyang.start();

    } // end of if(annyang){

      else {

        console.warn("no annyang, no speech");
        alert("speech could not load properly, and is disabled");

      }
********/
    </script -->

    <!-- jquery ui stuff: code to size the page properly -->
    <script type="text/javascript" src="js/page.js"></script>

  </head>
  <body>
    <div id="wrapper"> <!-- wraps the whole page -->

	<div id="navbar">
	  <img id="logo" src="assets/bitlr-logo.png" alt="Bitlr" /> 
	  <div id="navbuttons">
	    <a >Login</a>
	    <a>Settings</a>
	  </div>
	</div>

	<div id="main">

	  <div id="speechStuff">
	    <!--div>Status: <span id="speechstatus"></span></div-->
	    <!--input  id="speechResult" />
	    <button id="speechButton" onclick="speechAction()">Say a command</button-->
	    <!--button id="submitCommandButton">submit command (not implemented)</button-->
	    <!--div    id="commandResult"></div-->
	  </div>

	  <!--div id="ok great"></div-->

	  <div id="nodeinfo">
	    <h2>Devices</h2>
	    <?php

	     require('request.php');

	     // get node's info from master
	     $nodes = getNodesInfo();

	     if( $nodes === FALSE )
	     {
	       echo "<p>node status couldn't be retreived</p>";
	     }
	     else 
	     {

	       foreach( $nodes as $node )
	       {
	       
	         $nInfo = $node->info;
	         $name  = $nInfo->name;


	         echo "<div class='nodeinfo'>",
		      "<p class='devicename'>$name<p>";
	  
	         echo "<div>Commands";

	         foreach( $nInfo->commands as $command )
	         { 
	           echo "<button onclick=doCommand('$name','$command')>$command</button>";
	         }

	         echo "</div></div>" ;
	       
	       }

	     }
	  ?>
	  </div>
	</div> <!-- end main -->
	<div id="footer">Bitlr all rights reserved I guess</div>
    </div> <!-- end wrapper -->
  </body>
</html>
