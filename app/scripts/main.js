const Proto = (() => {

  const video = document.getElementById('videoel');
  let vidW;
  let vidH;

  const init = () => {
      // if(getUserMediaHandler()){
      //   console.log('good to go');
      // }else{
      //   console.log('fail')
      // }
      //
      //
      //
      //

      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
				window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
				// check for camerasupport
				if (navigator.mediaDevices) {
					navigator.mediaDevices.getUserMedia({video : true}).then(gumSuccess).catch(gumFail);
				} else if (navigator.getUserMedia) {
					navigator.getUserMedia({video : true}, gumSuccess, gumFail);
				} else {
					alert('This demo depends on getUserMedia, which your browser does not seem to support. :(');
				}


      //initVideo();
  }

  const gumSuccess = (stream) => {
    vidW = video.width;
    vidH = video.height;
    if ('srcObject' in video) {
          video.srcObject = stream;
    } else {
          video.src = (window.URL && window.URL.createObjectURL(stream));
    }
    video.onloadedmetadata = function() {
      //adjustVideoProportions();
      video.play();
    }
  }

  const initVideo = () => {
      // vidW = video.width;
      // vidH = video.height;
      // if ('srcObject' in video) {
			// 	    video.srcObject = stream;
			// } else {
			// 	    video.src = (window.URL && window.URL.createObjectURL(stream));
			// }
			// video.onloadedmetadata = function() {
			// 	adjustVideoProportions();
			// 	video.play();
			// }
  }

  const getUserMediaHandler = () => {
      if (window.location.protocol == 'file:') {
            alert('You seem to be running this example directly from a file. Note that these examples only work when served from a server or localhost due to canvas cross-domain restrictions.');
            return false;
      } else if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:'){
          window.location.protocol = 'https';
          return true;
      }
  }

  function gumFail() {
		  alert('There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.');
	}


  return {
      init
  }

})();

window.onload = () => {
    Proto.init();
}
