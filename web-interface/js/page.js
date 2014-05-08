/**

   Nicholas St.Pierre
   Excerpted from my work at Comrex
   April 17, 2014

   jquery used to make the page resize and re-style as needed
   
 */



/* this setup code runs when the page loads */
$(function(){

  /* string used to select the outermost div */
  var parentDivSelector = '#wrapper';

  /* this function is responsible for resizing elements on the page at load, and whenever the page is resized. */
  function sizePage() {

    /* get the size of the window using some simple jquery methods */
    var windowHeight = $( window ).height(),
	windowWidth  = $( window ).width();


    var maxWidth  = 800 ;


    /* calculate the new page size*/
    var newHeight = (windowHeight - 30),
	newWidth  = Math.min( maxWidth, (windowWidth  - 20 ));


    /*window.console.log('resizing ' + parentDivSelector + ' to width '
      + newWidth + ' and height ' + newHeight );*/


    /* size our outermost div */
    $( parentDivSelector ).height(newHeight);
    $( parentDivSelector ).width( newWidth );

    /* size the inner div so scrolling works properly */
    $("#nodeinfo").height( (newHeight - 105) );


  } /* end of function sizePage(){ */


  /* size the page once when it loads, and register our function to be called whenever the page is resized. */
  sizePage();
  $( window ).resize( sizePage );


});