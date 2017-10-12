const Main = (() => {

  const BASE_VID_W = 400;
  const BASE_VID_H = 300;

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
        videoObj.video.addEventListener('canplay', startEmotionDetect, false);
      })

  }

  const startEmotionDetect = () => {
      //video is ready to be processes - start emotion detection
      Emo.init()
      .then(() => {
          console.log('EMO inited')
          render();
          //sound/volume events
          initSound();
      })



  }

  let skip = 3, count=0;
  const render = () => {
		requestAnimationFrame(render);

    if(Sound.getChangeVolumeStatus()){
        if(count % skip === 0){
            Emo.render();
        }
        Sound.volumeHandler();
    }
    count++;

  }

  const initSound = () => {
    Sound.init();
  }



  return {
      init,
      getVideoObj
  }

})();

window.onload = () => {
    Main.init();
}
