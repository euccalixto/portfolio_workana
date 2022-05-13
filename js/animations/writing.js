let p= document.querySelector('.landing-page .bg .copy p');
let btn= document.querySelector('.landing-page .btn');


function WritingTextEffect(...tags){
  tags.forEach((tag,iTag) => {
    let words= tag.innerText.split('');
    tag.innerHTML='';
    words.forEach((word,wordIndex) => {
      setTimeout(() => {
        tag.innerHTML+=word;
        //if(wordIndex==parseInt(calcPorcent(50,words.length))){
          if(iTag == tags.length-1 && wordIndex == words.length-1){
            addButton();
          }
      },60*wordIndex)  
    })
  })
}

function addButton(){
  btn.innerHTML= `
    <svg viewBox="0 0 86 49" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M43 37.6157L21.4641 25.3453L26.5309 22.4563L43.0143 31.848L59.4976 22.4563L64.5358 25.3453L43.0036 37.6157H43ZM43 26.5417L21.4641 14.2692L26.5309 11.3823L43.0143 20.774L59.4976 11.3823L64.5358 14.2692L43.0036 26.5397L43 26.5417Z" fill="var(--primary)"/>
    </svg>
  
  `;
}
WritingTextEffect(p);

function calcPorcent(porcentAumount, totalValue) {
  return (porcentAumount * totalValue) / 100;
}