let mainSlider = document.querySelector('.slider-main');
let innerSliderOne = document.querySelector('.slider-inner-one');
let innerSliderTwo = document.querySelector('.slider-inner-two');
let images = [...document.querySelectorAll('.img')];
console.log(images)
let imageItems = [];

let current = 0;
let target = 0;
let ease = 0.075;


//init설정안하면 오른쪽에 여백생김
window.addEventListener('resize', init)

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

 function init(){
    document.body.style.height = `${mainSlider.getBoundingClientRect().width - ( window.innerWidth - window.innerHeight)}px`;

    console.log(mainSlider.getBoundingClientRect().width)/* left, top, right, bottom, x, y, width, height 프로퍼티는 전반적인 사각형의 위치와 크기를 픽셀 단위로 나타냅니다. */
    console.log(window.innerWidth)/* 브라우저 윈도우의 뷰포트 너비 */
    console.log(window.innerHeight)
    console.log(document.body.style.height)

    
}
 
function transformElement(el, transform){
    el.style.transform = transform;
}

function animate(){
    target = window.scrollY;
    current = lerp(current, target, ease).toFixed(2)
    console.log(current)
    transformElement(mainSlider, `translate3d(${-current}px, 0, 0)`);
    transformElement(innerSliderTwo, `translate3d(${-(current* 1.1).toFixed(2)}px, 0, 0)`);

    for (let i = 0; i < imageItems.length; i++){
        imageItems.forEach(() => {
            ImageItem
        })
       
        if(current < target - 50 || current > target + 50){
            transformElement(imageItems[i].el, `scale(0.8)`)
        }else{
            transformElement(imageItems[i].el, `scale(1)`)
        }
    }
    requestAnimationFrame(animate)
}


let options = {
    rootMargin: '0px',
    threshold: .9
}


 function ImageItem(el){
    this.el = el;
    this.isVisible = false;

    this.current = 150;
    this.target = 150;
    this.ease = 0.1

    if(this.isVisible && this.target != 0){
        this.target = 0;
         this.el.classList.add('active');
     }
     this.current = lerp(this.current, this.target, this.ease).toFixed(2);
     this.el.querySelector('img').scale= this.current+"%";
} 

//아래를 적지 않으면 이미지가 작아지지 않는다
 images.forEach(image => {
    imageItems.push(new ImageItem(image))
    console.log(imageItems)
    
})


setTimeout(()=>{
    init();
    animate();
},1000)