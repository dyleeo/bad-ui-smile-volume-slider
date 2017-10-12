let Emo = (()=>{

    let INIT_PROMISE;
    let CTRACK;
    let TRACKING_STARTED = false;
    let OVERLAY_CANVAS;
    let OVERLAY_CONTEXT;
    let EC;
    let EMOTION_DATA;
    let EMO_PERCENT = 0;

    const init = () => {
        return new Promise( (resolve, reject) => {
            INIT_PROMISE = Utils._promise(() => {});
            INIT_PROMISE.then((data) => {
                resolve();
            })

            buildFeedbackOverlay()
            optimizeModel();
            initCLMTracker();

            delete emotionModel['disgusted'];
    				delete emotionModel['fear'];
    				EC = new emotionClassifier();
    				EC.init(emotionModel);
    				EMOTION_DATA = EC.getBlank();
        })
    }

    const buildFeedbackOverlay = () => {
        OVERLAY_CANVAS = document.querySelectorAll('#overlay')[0];
        OVERLAY_CONTEXT = overlay.getContext('2d');
    }

    const optimizeModel = () => {
        // set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
        pModel.shapeModel.nonRegularizedVectors.push(9);
        pModel.shapeModel.nonRegularizedVectors.push(11);
        console.log(':: models optimized');
    }

    const initCLMTracker = () => {
        CTRACK = new clm.tracker({useWebGL : true});
        CTRACK.init(pModel);

        CTRACK.start(Main.getVideoObj().video);

        INIT_PROMISE.resolve();
        console.log(':: CLM TRACKER Started');
    }

    const getCLTracking = () => {
        return TRACKING_STARTED;
    }

    const setCLTracking = (state) => {
        TRACKING_STARTED = state;
    }


    const render = () => {
        //console.log('rendering emo')
        OVERLAY_CONTEXT.clearRect(0, 0, Main.getVideoObj().w, Main.getVideoObj().h);

        if (CTRACK.getCurrentPosition()) {
					CTRACK.draw(OVERLAY_CANVAS);
				}

				let cp = CTRACK.getCurrentParameters();
        let er = EC.meanPredict(cp);

        if(er){
            let percent = er[3].value.toFixed(2);
            if(percent> .96)
              percent = 1;

            if(percent<.06)
              percent=0;

            EMO_PERCENT = percent;
            document.querySelectorAll('.score')[0].innerHTML = (EMO_PERCENT * 100).toFixed(0);
            //console.log(er[3].emotion, er[3].value)
        }

    }

    const getPercent = () => {
        return EMO_PERCENT;
    }

    return {
        init,
        getCLTracking,
        setCLTracking,
        render,
        getPercent
    }
})();
