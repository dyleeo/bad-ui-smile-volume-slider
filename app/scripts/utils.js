const Utils = (()=>{
    const _promise = (handler) => {
        let _resolve, _reject;
        let promise = new Promise(function(resolve, reject){
            _resolve = resolve;
            _reject = reject;
            handler(resolve, reject);
        })
        promise.resolve = _resolve;
        promise.reject = _reject;
        return promise;
    }

    const _touchTest = (event) => {
        return /touch/.test(event.type) ? event.targetTouches[0] : event.target;
    }

    return {
        _promise,
        _touchTest
    }

})()
