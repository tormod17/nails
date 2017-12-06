// Place left slide place right animate slider in direction.
// reset 


(function() {

    document.querySelector('.moveLeft').addEventListener('click', function() {
        moveSlider('left');
        clearInterval(autoPlay);
        setTimeout(startAutoPlay(), 4000);
    })
    document.querySelector('.moveRight').addEventListener('click', function() {
        moveSlider('right')
        clearInterval(autoPlay);
        setTimeout(startAutoPlay(), 4000);
    })

    var slider = document.querySelector('.slider');

    function placeSlide(ele, dir) {
        ele.style.display = 'inline-block';
        ele.style.position = 'absolute';
        ele.style.top = '0';
        ele.style.left = dir;
    }

    function animate(elem, style, unit, from, to, time) {
        if (!elem) return;
        var start = new Date().getTime(),
            timer = setInterval(function() {
                sliding = true;
                var step = Math.min(1, (new Date().getTime() - start) / time);
                elem.style.position = 'absolute';
                elem.style[style] = (from + step * (to - from)) + unit;
                if (step == 1) clearInterval(timer);
            }, 25);
        elem.style[style] = from + unit;
        sliding = false;
    }
    var index = 1;

    function moveSlider(dir) {
        var moveLeft = dir === 'left';
        var string = moveLeft ? '-100%' : '100%';

        var currentSlide = document.querySelector('.slide:nth-child(' + index + ')');
        var currentDot = document.querySelector('.dot.selected');
        currentDot.classList.remove('selected')

        if (moveLeft) {
            index--
        } else {
            index++
        }
        if (index > 4) {
            index = 1;
        } else if (index < 1) {
            index = 4;
        }
       
        var nextSlide = document.querySelector('.slide:nth-child(' + index + ')');
        var nextDot = document.querySelector('.dot:nth-child(' + index + ')');
        nextDot.classList.add('selected');

        placeSlide(nextSlide, string);

        if (moveLeft) {
            animate(currentSlide, 'left', '%', 0, -100, 1000);
            animate(nextSlide, 'left', '%', 100, 0, 1000);
        } else {
            animate(currentSlide, 'left', '%', 0, 100, 1000);
            animate(nextSlide, 'left', '%', -100, 0, 1000);
        }
    }
    var autoPlay;
    function startAutoPlay() {
      autoPlay = setInterval(moveSlider, 3000)
    }
    startAutoPlay();

}())