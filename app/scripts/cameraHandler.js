let Camera = (() => {

    let INIT_PROMISE;

    const init = () => {
        return new Promise( (resolve, reject) => {
            INIT_PROMISE = Utils._promise(() => {});
            INIT_PROMISE.then((data) => {
                resolve();
            })
            checkSSL();
            initCamera();
        })
    }

    const initCamera = () => {
        normalizeUserMedia();
        getUserMediaHandler();
    }

    const getUserMediaHandler = () => {
        if (navigator.mediaDevices) {
            navigator.mediaDevices.getUserMedia({video : true})
            .then(getUserMediaSuccess)
            .catch(getUserMediaFail);
        } else if (navigator.getUserMedia) {
            navigator.getUserMedia({video : true}, getUserMediaSuccess, getUserMediaFail);
        } else {
            console.warning('GetUserMedia is not supported.');
        }
    }

    const getUserMediaSuccess = (stream) => {
        Main.getVideoObj().w = Main.getVideoObj().video.width;
        Main.getVideoObj().h = Main.getVideoObj().video.height;

        if ('srcObject' in Main.getVideoObj().video) {
            Main.getVideoObj().video.srcObject = stream;
        } else {
            Main.getVideoObj().video.src = (window.URL && window.URL.createObjectURL(stream));
        }

        initVideoEvents();
    }

    const initVideoEvents = () => {
        //==== VIDEO EVENT HANDLERS ===
        //ON LOADED
        Main.getVideoObj().video.onloadedmetadata = () => {
            adjustVideoProportions();  //handle overlay
            Main.getVideoObj().video.play();
            INIT_PROMISE.resolve();
        }

        //ON RESIZE
        Main.getVideoObj().video.onresize = function() {
            //handle overlay
            adjustVideoProportions();
          // 	if (trackingStarted) {
          // 		ctrack.stop();
          // 		ctrack.reset();
          // 		ctrack.start(vid);
          // 	}
         }
    }

    const adjustVideoProportions = () => {
  			let ratio = Main.getVideoObj().video.videoWidth/Main.getVideoObj().video.videoHeight;
  			Main.getVideoObj().w = Math.round(Main.getVideoObj().h * ratio);
  			Main.getVideoObj().video.width = Main.getVideoObj().w ;
  			overlay.width = Main.getVideoObj().w ;
		}

    const getUserMediaFail = () => {
  	     console.warn('There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.');
  	}

    const normalizeUserMedia = () => {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
    }

    const checkSSL = () => {
      if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
            window.location.protocol = 'https';
        }
    }

    return {
        init
    }

})()
