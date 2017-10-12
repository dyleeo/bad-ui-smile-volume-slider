let Sound = (() => {

    const AUDIO = document.querySelectorAll('#audioplayer')[0];
    const PLAY_BTN = document.querySelectorAll('#play-btn')[0];
    const PLAY_HEAD = document.querySelectorAll('.playhead')[0];
    const TIMELINE = document.querySelectorAll('.timeline')[0];
    const VOLUME_TOGGLE = document.querySelectorAll('.volume-toggle')[0];
    const VOLUME_BAR = document.querySelectorAll('.volume-bar')[0];
    const SCORE = document.querySelectorAll('.score')[0];
    const EMO_DISPLAY = document.querySelectorAll('#container')[0];
    let timelineWidth;
    let duration;
    let EMO_COEFFICIENT = 0;
    let CHANGE_VOLUME = false;
    let IS_EMO_DISPLAY = -1;

    const init = () => {
        initAudioEvents();
    }


    const initAudioEvents = () => {

        timelineWidth = TIMELINE.offsetWidth - PLAY_HEAD.offsetWidth;

        //PLAY BUTTON
        PLAY_BTN.addEventListener('mousedown', (event) => {
            let target = Utils._touchTest(event);
            duration = AUDIO.duration;
            playHandler();
        }, true);

        AUDIO.addEventListener('timeupdate', timeUpdate, false);


        //VOLUME TOGGLE BUTTON
        VOLUME_TOGGLE.addEventListener('mousedown', function(event){
            console.log('down fired');
            let target = Utils._touchTest(event);
            Emo.setCLTracking(true);
            CHANGE_VOLUME = true;
            TweenMax.to('.bgfill', .35, { fill: 'rgba(255,0,0,1)' });
            TweenMax.to(VOLUME_BAR, .35, { backgroundColor: 0xff0000 });
            TweenMax.to(SCORE, .35, { opacity: 1 });
        }, true);

        //MOUSE DOWN
        VOLUME_TOGGLE.addEventListener('mouseup', function(event){
            console.log('up fired');
            let target = Utils._touchTest(event);
            Emo.setCLTracking(false);
            CHANGE_VOLUME = false;
            TweenMax.to('.bgfill', .35, { fill: 'rgba(0,0,0,1)' });
            TweenMax.to(VOLUME_BAR, .35, { backgroundColor: 0x333333 });
            TweenMax.to(SCORE, .35, { opacity: 0 });
        }, true);


        document.addEventListener('keydown', (e) => {
            const keyName = e.key;
            if(keyName === 'Q' || keyName === 'q'){
                if(IS_EMO_DISPLAY<0){
                    EMO_DISPLAY.style.display = 'block';
                }else{
                    EMO_DISPLAY.style.display = 'none';
                }
                IS_EMO_DISPLAY *= -1;
            }
        });


        console.log(':: button events initilized')

    }

    const playHandler = () => {
        if (AUDIO.paused) {
            AUDIO.play();
            PLAY_BTN.className = '';
            PLAY_BTN.className = 'pause';
        } else {
            AUDIO.pause();
            PLAY_BTN.className = '';
            PLAY_BTN.className = 'play';
        }
    }

    const getPosition = (e) => {
        return e.getBoundingClientRect().left;
    }

    const volumeHandler = () => {
        if(CHANGE_VOLUME){
            let percent = Emo.getPercent();
            AUDIO.volume = percent;
            TweenMax.to(VOLUME_BAR, 0, {width: percent * 100  + '%'  })
        }
    }

    let percent = {val: 0 };
    const timeUpdate = () => {
        TweenMax.to(percent, .1, {val: timelineWidth * (AUDIO.currentTime / duration), ease: Linear.easeNone});
        PLAY_HEAD.style.marginLeft = percent.val + 'px';
        if (AUDIO.currentTime == duration) {
            PLAY_BTN.className = '';
            PLAY_BTN.className = 'play';
        }
    }

    const getChangeVolumeStatus = () => {
        return CHANGE_VOLUME;
    }

    return{
        init,
        volumeHandler,
        getChangeVolumeStatus
    }
})();
