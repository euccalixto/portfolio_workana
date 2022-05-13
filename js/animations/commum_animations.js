document.querySelectorAll('.border-rd-animation').forEach(button => {
  
  if(button){
    button.onmouseenter = (evt) => {
      evt.target.classList.add('button-animated');
    }

    button.onmouseleave = (evt) => {
      evt.target.classList.remove('button-animated');
    }
  }
});