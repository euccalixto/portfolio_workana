document.querySelectorAll('.slider-container').forEach(slider => {
  let shadow=document.querySelector('.shadows');
  console.log(slider);
  let translate= 0;
  var movements=[];
  let i=0;
  let canMove=false;
  shadow.onmousedown = (evt) => {
    canMove=true;
  }
  shadow.onmouseup = (evt) => {
    canMove=false;
    if(slider.classList.contains('not-select')){
      slider.classList.remove('not-select');
    }

    if(shadow.classList.contains('grabbing')){
      shadow.classList.remove('grabbing');
    }
  }

  shadow.onmouseleave = () => {
    if(canMove){
      canMove=false;
      if(shadow.classList.contains('grabbing')){
        shadow.classList.remove('grabbing');
      }
    }
  }

  shadow.onmousemove = (evtMove) => {
    if(canMove){
      // AnimateCardX(slider.getBoundingClientRect(),evtMove.screenX);
      slider.classList.add('not-select');
      shadow.classList.add('grabbing');
      movements[i]= evtMove.screenX;
      //console.log(evt);
      slider.style.transform= `translateX(${translate}px)`;
      //console.log(evtMove.screenX)
      //slider.scrollLeft = evtMove.screenX * -1;
      if(movements[i-1]<movements[i] && slider.getBoundingClientRect().left + 20 < 0){
        translate+=10;
      }else if(movements[i-1]>movements[i] && slider.getBoundingClientRect().right - window.innerWidth + 20 > 0){
        translate-=10;
      }else{
        translate+=0;
      }
      i++;
    }
  }
});