const Main = (() => {

  const BASE_VID_W = 400;
  const BASE_VID_H = 300;
  let VOLUME_TOGGLE;

  let videoObj = {
      video: document.getElementById('videoPlayer'),
      w: BASE_VID_W,
      h: BASE_VID_H
  };

  const getVideoObj = () => {
      return videoObj;
  }

  const init = () => {
      Camera.init()
      .then(() => {
        //alert("S")
        videoObj.video.addEventListener('canplay', startEmotionDetect, false);
      })
  }

  const startEmotionDetect = () => {
      //video is ready to be processes - start emotion detection
      Emo.init()
      .then(() => {
          console.log('EMO inited')
          render();
      })

      //enable volume button
      initButtonHandlers();

  }

  const render = () => {
		requestAnimationFrame(render);
    //console.log(Emo.getCLTracking())

    // let skip = 3, count=0;
    // if(count % skip === 0){}
    // count++;

    Emo.render();

  }



  const initButtonHandlers = () => {

      VOLUME_TOGGLE = document.querySelectorAll('.volume-toggle')[0];

      //MOUSE UP
      VOLUME_TOGGLE.addEventListener("mousedown", function(event){
          console.log('down fired');
          var target = Utils._touchTest(event);
          Emo.setCLTracking(true);
      }, true);

      //MOUSE DOWN
      VOLUME_TOGGLE.addEventListener("mouseup", function(event){
          console.log('up fired');
          var target = Utils._touchTest(event);
          Emo.setCLTracking(false);
      }, true);
      console.log(':: button events initilized')
  }



  return {
      init,
      getVideoObj
  }

})();

window.onload = () => {
    Main.init();
}
