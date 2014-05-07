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
    <h1>test speech recognition!</h1>
    <p>Allow the page to use the microphone, and then say something.
      The speech result will appear in your browser's console.</p>
    <p><i>This only works in chrome.</i></p>
  </body>
</html>
