/**

   Nicholas st.pierre
   This script adapted from dictation.js at https://dictation.io



 */



// onclick for button.
function parse()
{
    var resultStr  =  "",
	textbox    =  document.getElementById("text"),
	wordArray,
	speechText;

    speechText =  textbox.value;

    wordArray  =  speechText.split(" ");




    //  http://stackoverflow.com/questions/2896626/switch-statement-for-string-matching-in-javascript

    switch ()
    {

    default: console.log("lsdj");



    }




    resultStr  =  "Processing speech text: '" + speechText + "'."; 

    alert(resultStr);

}



var speech, clear, working, speech, final_transcript = "";

function initialize() {
    window.console.log("initialize");
    speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.maxAlternatives = 5;
    speech.interimResults = true;
    speech.lang = getLang(localStorage["language"]);
    speech.onend = reset;
}

function reset() {
    window.console.log("reset");
    working = false;
};




if (typeof(webkitSpeechRecognition) !== 'function') {

    //document.getElementById("labnol").innerHTML = "We are sorry but Dictation requires the latest version of Google Chrome on your desktop.";
    alert("We are sorry but Dictation requires the latest version of Google Chrome on your desktop.");
    //document.getElementById("messages").style.display = "none";

} else {

    initialize();
    reset();




}
