// jQuery UI Touch Punch 0.2.3 - must load after jQuery UI
// enables touch support for jQuery UI
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);

function start_puzzle(x) {
  // Having a list of images select a random one.
  var list_of_images = [
    "images/01_small.png",
    "images/02_small.png",
    "images/03_small.png",
    "images/04_small.png",
    "images/05_small.png",
    "images/06_small.png",
    "images/07_small.png",
    "images/08_small.png",
    "images/09_small.png",
    "images/10_small.png",
    "images/11_small.png",
    "images/12_small.png",
    "images/13_small.png",
    "images/14_small.png",
    "images/15_small.png",
    "images/16_small.png",
    "images/17_small.png",
    "images/18_small.png",
    "images/19_small.png"
  ];

  var selected_image = list_of_images[
    Math.floor(Math.random() * list_of_images.length)
  ];

  // Update the image with selected one.
  $("#source_image").attr("src", selected_image);

  // Start puzzle then...
  $('#puzzle_solved').hide();
  $('#source_image').snapPuzzle({
    rows: x, columns: x,
    pile: '#pile',
    containment: '#puzzle-containment',
    onComplete: function(){
      $('#source_image').fadeOut(150).fadeIn();
      $('#puzzle_solved').show();
    }
  });
}

$(function() {
  $('#pile').height($('#source_image').height());
  start_puzzle(3);

  $('.restart-puzzle').click(function() {
    $('#source_image').snapPuzzle('destroy');
    start_puzzle($(this).data('grid'));
  });

  $(window).resize(function() {
    $('#pile').height($('#source_image').height());
    $('#source_image').snapPuzzle('refresh');
  });
});
