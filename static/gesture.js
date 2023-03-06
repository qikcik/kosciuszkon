
const GESTURE = {
    swipe: {
        value: 0,
        onChange_delegates: [(value) => {}], // func
        onApply_delegates: [(value) => {}], // func
        reset: () => {}, //func
    }
};


(()=>{
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener("touchend", handleTouchEnd,false);
    GESTURE.swipe.reset = handleTouchEnd;


    function getTouches(evt) {
        return evt.touches;
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
        GESTURE.swipe.value = 0;
    };

    function handleTouchEnd(evt) {
        xDown = null;
        yDown = null;

        GESTURE.swipe.onApply_delegates.forEach(x => x(GESTURE.swipe.value));
    }

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }



        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        let xDiff = xDown - xUp;
        let yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > ( yDiff ) ) {/*most significant*/
            GESTURE.swipe.value = -(xDiff / document.body.clientWidth);
            GESTURE.swipe.onChange_delegates.forEach(x => x(GESTURE.swipe.value ));

            //console.log(GESTURE.swipe.value);
        }

        //xDown = null;
        //yDown = null;
    }

})();