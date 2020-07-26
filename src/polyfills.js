// There's some issues in which memory -mostly from accumulated frames- will not be freed, depending on the platform and the mood of the browser. If you run into non-sawtooth like memory profiles, and are running chrome, try running it with ```--js-flags="--expose-gc"```. This way CCapture will run ```gc()``` every frame and memory consumption should stay stable.
if( !('gc' in window ) ) {
	window.gc = function(){}
}

// toBlob polyfill for IE10
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
   value: function (callback, type, quality) {

     var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
         len = binStr.length,
         arr = new Uint8Array(len);

     for (var i=0; i<len; i++ ) {
      arr[i] = binStr.charCodeAt(i);
     }

     callback( new Blob( [arr], {type: type || 'image/png'} ) );
   }
  });
 }

 // @license http://opensource.org/licenses/MIT
 // copyright Paul Irish 2015

 // Date.now() is supported everywhere except IE8. For IE8 we use the Date.now polyfill
 //   github.com/Financial-Times/polyfill-service/blob/master/polyfills/Date.now/polyfill.js
 // as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

 // if you want values similar to what you'd get with real perf.now, place this towards the head of the page
 // but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed
if ("performance" in window == false) {
    window.performance = {};
}

Date.now = (Date.now || function () {  // thanks IE8
  return new Date().getTime();
});

if ("now" in window.performance == false){

  var nowOffset = Date.now();

  if (performance.timing && performance.timing.navigationStart){
    nowOffset = performance.timing.navigationStart
  }

  window.performance.now = function now(){
    return Date.now() - nowOffset;
  }
}
