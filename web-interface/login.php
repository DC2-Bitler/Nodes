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


      #navbar * { 
        display:    inline-block;
        max-height: 50px;
      }

      #navbar {

        /*position: absolute;*/
        top:   0px;
        left:  0px;
        width: inherit;
      
        background-color: #AFE;

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
    <script>

      console.log("ack");

    </script>


    <script type="text/javascript" src="js/page.js"></script>


  </head>
  <body>
    <div id="wrapper">

	<div id="navbar">
	  <img id="logo" src="assets/bitlr-logo.png" alt="Bitlr" /> 
	  <div id="navbuttons">
	    <a >Login</a>
	    <a>Settings</a>
	  </div>
	</div>

	<div id="main">
	  <div id="info"></div>
	  <div id="login"></div>
	</div>

    </div>
  </body>
</html>
