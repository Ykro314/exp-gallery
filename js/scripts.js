var elements = document.querySelectorAll( ".wrapper__el" );
var wrapper = document.querySelector( ".wrapper" );
var overlay = document.querySelector( ".overlay" ); 
var closeBtn = document.querySelector( ".overlay__close-btn" );
var overlayContent = overlay.querySelectorAll( ".overlay--animate" );

var activeImage = null;



wrapper.addEventListener( "click", function( event ) {
  if( event.target.classList.contains( "wrapper__el" ) && event.target !== activeImage ) {
    showImage( event );
  }
});

function animateOvelayContent( delay ) {
  delay = delay || 0;
  setTimeout( function() {
    for( var i = 0; i < overlayContent.length; i++ ) {
      overlayContent[i].classList.toggle( "animate" );
    }
  }, delay );
}

function showImage( event ) {
  var el = event.target;
  var coords = el.getBoundingClientRect();
  activeImage = el;
  
  var translateString = "translate(" + ( -coords.left + 50 ) + "px," + ( -coords.top + 50 ) + "px)";
  var scaleString = "scale(2.3)";
  
  function hideOtherImages( el ) {
    for( var i = 0; i < elements.length; i++ ) {
      if( elements[i] == activeImage ) {
        continue;
      }
      else {
        elements[i].classList.add( "scale" );
      }
    }
  }
  function transformCheckedImage() {
    el.style.transform = translateString + scaleString;
    el.style.zIndex = 10;
  }
  function showOverlay() {
    overlay.classList.add( "showed" );
    setTimeout( function() {
      overlay.classList.add( "color" );
      animateOvelayContent( 300 );
    }, 100);
//    overlay.addEventListener( "transitionend", denyBodyOverflow);
    
    function denyBodyOverflow( event ) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "17px";
      this.removeEventListener( event.type, denyBodyOverflow );
    }
  }
  
  hideOtherImages( el );
  transformCheckedImage();
  showOverlay();
//  animateOvelayContent();
}




closeBtn.addEventListener( "click", showGallery );

function showGallery( event ) {
  
  function showOtherImages() {
    for( var i = 0; i < elements.length; i++ ) {
      if( elements[i].classList.contains( "active" ) ) {
        continue;
      }
      else {
        elements[i].classList.remove( "scale" );
      }
    }
  }
  function restoreBodyOverflow() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
  function hideOverlay() {
    overlay.classList.remove( "color" );
  }
  function hideCheckedImage( image ) {
    image.style.transform = "";
    image.addEventListener( "transitionend", onTransitionEnd );
    activeImage = null;
    
    function onTransitionEnd( event ) {
      this.style.zIndex = 0;
      this.removeEventListener( event.type, onTransitionEnd );
      overlay.classList.remove( "showed" );
    }
  }
  
  showOtherImages();
//  restoreBodyOverflow();
  hideOverlay();
  hideCheckedImage( activeImage );
  animateOvelayContent();
}























/*
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
*/
