
class SwipeDetection{
    constructor(animation, sliderPos, imgCount){
        console.log('swipeDetect')
        this.touchstart = {x: 0, y: 0};
        this.touchend = {x: 0, y: 0};
        this.swipe;
        this.a = animation
        this.sliderPos = sliderPos;
        this.direction = 1
        this.count = imgCount
        
        
    }
    listenStart(evt){
        this.touchstart.x = evt.touches[0].clientX
        this.touchstart.y = evt.touches[0].clientY
    }
    listenEnd(evt){
        this.touchend.x = evt.changedTouches[0].clientX
        this.touchend.y = evt.changedTouches[0].clientY
        this.swipe = this.touchstart.x-this.touchend.x
    }
    touchListener(sBox){
        sBox.addEventListener('touchstart', (evt) => {
            this.listenStart(evt)
        })
        sBox.addEventListener('touchend', (evt) => {
            this.listenEnd(evt)
            this.handleSwipe()
        })

    }
    
    handleSwipe(){
        
        if(this.swipe > 0 && !this.a.whileAnimate){
            console.log('left');
            this.direction = 1;
            this.sliderPos += 1
            if(this.sliderPos < this.count){
                this.a.pos = this.sliderPos
                this.a.interval(this.direction)
            }
            else{this.sliderPos -= 1}
        }
        else if(this.swipe < 0 && !this.a.whileAnimate){
            console.log('right');
            this.direction = -1;
            this.sliderPos -= 1
            if(this.sliderPos >= 0){
                
                this.a.pos = this.sliderPos
                this.a.interval(this.direction)
                
            }
            else{this.sliderPos += 1}
        }
        

        
    }
}
class SlideshowAnimation{
    constructor(imgBoxes, posDots){
        this.pos = 0;
        this.move = 0
        this.imgBoxes = imgBoxes;
        this.dots = posDots;
        this.animationInterval;
        this.v = 2
        this.whileAnimate = false;
        this.activateDot()
    }

    interval(direction){
        console.log('animate')
        this.animationInterval = setInterval(() => {
            this.whileAnimate = true
            this.activateDot()
            for(this.i = 0; this.i <this.imgBoxes.length; this.i ++){
                this.imgBoxes[this.i].style.left = this.imgBoxes[this.i].offsetLeft - direction * this.v +'px'
            }
            this.move += this.v;
            if(this.move >= this.imgBoxes[0].offsetWidth){
                clearInterval(this.animationInterval)
                this.move= 0;
                this.whileAnimate = false;
                
            }
        },1)
    }
    activateDot(){
        console.log('dot')
        for(this.i = 0; this.i < this.dots.length; this.i ++){
            if(this.i === this.pos){
                this.dots[this.i].style.backgroundColor = 'rgb(100,100,100)'
            }
            else{
                this.dots[this.i].style.backgroundColor = 'transparent'
            }
            
        }
    }
    
    
}
isTouchDevice = () => {
    return typeof window.ontouchstart !== 'undefined';
}
arrangeImgBoxes = (boxes) => {
    let i;
    let leftX = 0;
    for(i = 0; i < boxes.length; i++){
        boxes[i].style.left = leftX +'px';
        leftX += boxes[i].offsetWidth;
    }
}

main = () =>{
    let actPos = 0;
    let slideBox = document.getElementById('slideshow1');
    let imgBoxes = document.getElementsByClassName('imgBox1');
    let posDots = document.getElementsByClassName('posDot1')
    arrangeImgBoxes(imgBoxes)
    console.log(isTouchDevice())
    let animation = new SlideshowAnimation(imgBoxes, posDots);
    if(isTouchDevice()){
        console.log('touch')
        let swipe = new SwipeDetection(animation, actPos, imgBoxes.length)
        console.log(slideBox)
        swipe.touchListener(slideBox)
    }
}

main();