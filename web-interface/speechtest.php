<!doctype html>
<html>
  <head>
    <script>
	var recognition = new webkitSpeechRecognition();
	recognition.onresult = function(event) { 
	console.log(event) 
	}
	recognition.start();
    </script>
  </head>
  <body>

    test!

  </body>
</html>
