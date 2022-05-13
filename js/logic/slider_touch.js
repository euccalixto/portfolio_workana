document.querySelectorAll('.slider-container').forEach(slider => {
  let translate= 0;
  var movements=[];
  let i=0;
  let canMove=false;
  slider.onmousedown = (evt) => {
    canMove=true;
  }
  slider.onmouseup = (evt) => {
    canMove=false;
    if(slider.classList.contains('not-select')){
      slider.classList.remove('not-select');
    }

    if(slider.classList.contains('grabbing')){
      slider.classList.remove('grabbing');
    }
  }

  slider.onmousemove = (evtMove) => {
    if(canMove){
      // AnimateCardX(slider.getBoundingClientRect(),evtMove.screenX);
      slider.classList.add('not-select');
      slider.classList.add('grabbing');
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