var elements = document.querySelectorAll( ".wrapper__el" );
var wrapper = document.querySelector( ".wrapper" );
var overlay = document.querySelector( ".overlay" ); 

wrapper.addEventListener( "click", function( event ) {
  if( event.target.classList.contains( "wrapper__el" ) ) {
    doThings( event );
  }
});

function doThings( event ) {
  var el = event.target;
  var coords = el.getBoundingClientRect();
  el.classList.toggle( "active" );
  
  var translateString = "translate(" + ( -coords.left + 50 ) + "px," + ( -coords.top + 50 ) + "px)";
  var scaleString = "scale(2.3)";
  
  if( el.classList.contains( "active" ) ) {
    for( var i = 0; i < elements.length; i++ ) {
      if( elements[i].classList.contains( "active" ) ) {
        continue;
      }
      else {
        elements[i].classList.add( "scale" );
      }
    }
    el.style.transform = translateString + scaleString;
    el.style.zIndex = 10;
    overlay.classList.add( "showed" );
    setTimeout( function() {
      overlay.classList.add( "color" );
    }, 100);
    overlay.addEventListener( "transitionend", onTransitionEndSecond );
  }
  else {
    for( var i = 0; i < elements.length; i++ ) {
      if( elements[i].classList.contains( "active" ) ) {
        continue;
      }
      else {
        elements[i].classList.remove( "scale" );
      }
    }
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    overlay.classList.remove( "color" );
    el.style.transform = "";
    el.addEventListener( "transitionend", onTransitionEnd );
  }
  
  function onTransitionEndSecond( event ) {
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "17px";
    this.removeEventListener( event.type, onTransitionEndSecond );
  }
  
  function onTransitionEnd( event ) {
    this.style.zIndex = 0;
    this.removeEventListener( event.type, onTransitionEnd );
    overlay.classList.remove( "showed" );
  }
  
  console.log( coords );
}
