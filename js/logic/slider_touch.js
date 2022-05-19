document.getElementById('ds')
let shadow=document.querySelector('.shadows');
let translate= 0;
var movements=[];
let i=0;
let canMove=false;
let alternate={state:false,timer:10,i:0};
document.querySelectorAll('.slider-container').forEach(slider => {
  //desktop
  shadow.onclick = () => {
    alternate.state= true;
  }
  
  shadow.onmousedown = (evt) => {
    canMove=true;
  }

  shadow.onmouseup = (evt) => {
    stopMove(slider);
  }

  shadow.onmouseleave = () => {
    if(canMove){
      stopMove(slider);
    }
  }

  shadow.onmousemove = (evtMove) => {
    if(canMove){
      Move(slider,evtMove,3,true);
    }
  }

  //mobile
  shadow.ontouchstart = (evt) => {
    canMove=true;
  }
  shadow.ontouchend = (evt) => {
    stopMove(slider);
  }
  shadow.ontouchcancel = (evt) => {
    stopMove(slider);
  }
  shadow.ontouchmove = (evtMove) => {
    Move(slider,evtMove,0.1,false);
  }
});


function stopMove(slider){
  canMove=false;

  if(slider.classList.contains('not-select')){
    slider.classList.remove('not-select');
  }

  if(shadow.classList.contains('grabbing')){
    shadow.classList.remove('grabbing');
  }
}

function Move(slider,evtMove,t,stateAlter){
  // AnimateCardX(slider.getBoundingClientRect(),evtMove.screenX);
  slider.classList.add('not-select');
  shadow.classList.add('not-select');
  shadow.classList.add('grabbing');
  movements[i]= evtMove.screenX || evtMove.touches[0].screenX;
  //console.log(evt);
  slider.style.transform= `translateX(${translate}px)`;
  //console.log(evtMove.screenX)
  //slider.scrollLeft = evtMove.screenX * -1;
  if(movements[i-1]<movements[i] && slider.getBoundingClientRect().left + 20 < 0){
    translate+=t + (alternate.state && stateAlter) ? alternate.timer : 0;
    alternate.state= false;
  }else if(movements[i-1]>movements[i] && slider.getBoundingClientRect().right - window.innerWidth + 20 > 0){
    translate-=t + (alternate.state && stateAlter) ? alternate.timer : 0;
    alternate.state=false;
  }else{
    translate+=0;
  }
  i++;
}