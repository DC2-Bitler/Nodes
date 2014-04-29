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
    <script type="text/javascript" src="js/speech.js"></script>



    <!-- todo stylesheet -->
    <!--link type="text/style" src=""-->

    <!-- todo stylesheet -->
    <style>
      html, div {
      display:  block;
      margin:   0px;
      padding:  0px;
      }

      body {
      background-color: grey;
      color: black;
      }
      
      .red {
      background-color: red;
      }

      #wrapper {
      border:        black medium solid;
      border-radius: 5px;
      }


      #logo {
      
      left: 10px;
      position: relative;

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

        <h1 id="logo">0rion</h1>

	
	<div></div>
	<input id="text" type="text" x-webkit-speech />
	<button onclick="parse()">ok thanks grimsby</button>

    </div>
</body>
</html>
