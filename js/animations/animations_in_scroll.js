
let footer = document.querySelector('footer');



class constructDatasToAnimations {
  constructor(element, porcentScreen) {
    this.element = element,
      this.porcentScreen = porcentScreen,
      this.aumountPxThatWillHaveAnimationInTop =
      window.pageYOffset + calcPorcent(this.porcentScreen, window.innerHeight),
      this.elementClientRect =
      this.element.getBoundingClientRect(),
      this.notIsLanding =
      !this.element.classList.contains('landing'),
      this.haveColisionOfTop =
      this.aumountPxThatWillHaveAnimationInTop >= this.element.offsetTop,
      this.haveColisionOfBottom =
      this.aumountPxThatWillHaveAnimationInTop <= this.element.offsetTop,
      this.areInEnd =
      0 == parseInt(window.innerHeight - this.element.getBoundingClientRect().bottom),
      this.isInFocusDown =
      this.haveColisionOfTop && this.elementClientRect.bottom > 0,
      this.inInFocusUp =
      this.haveColisionOfBottom && this.elementClientRect.bottom + calcPorcent(this.porcentScreen, window.innerHeight) > 0,
      this.MakeAnimations =
      this.MakeAnimations.bind(this)
  }

  MakeAnimations(funs) {
    if (this.notIsLanding) {
      if (this.isInFocusDown) {
        if (funs.goingDown) {
          if(Array.isArray(funs.goingDown)){
            funs.goingDown.forEach(fun => {
              fun(this.element, 'going down');
            })
          }else{
            funs.goingDown(this.element, 'going down');
          }
          
        }
      } else if (this.inInFocusUp) {
        if (funs.goingUp) {
          if(Array.isArray(funs.goingUp)){
            funs.goingUp.forEach(fun => {
              fun(this.element, 'going up');
            })
          }else{
            funs.goingUp(this.element, 'going down');
          }
          
        }
      }
    }
  }
}

function animationsInScroll() {

  allDivsAndFooter.forEach((element, elementIndex) => {

    //! const isMobile = window.screen.width <= 700;
    const animationDatasHeaderLinks = new constructDatasToAnimations(element, 17);
    animationDatasHeaderLinks.MakeAnimations({
      goingDown: [
        AnimateMenuLinks,
      ],
      goingUp: [
        AnimateMenuLinks,
      ],
    });

    if (element.id == 'services') {
      const animationDatasServices = new constructDatasToAnimations(element, 55);
      animationDatasServices.MakeAnimations({
        goingDown: AnimateChildrens
      });
    }

    if (element.id == 'benefits') {
      Array.from(element.children).forEach(children => {
        if (children.classList.contains('list-benefits')) {
          Array.from(children.children).forEach(grandChildren => {
            Array.from(grandChildren.children).forEach(greatGrandChildren => {
              const animationDatasGreatGrandChildren = new constructDatasToAnimations(greatGrandChildren, 80);
              animationDatasGreatGrandChildren.MakeAnimations({
                goingDown: AnimateBenefits
              });
            });
          });
        };
      });
    };

    if (element.id == 'portfolio') {
      Array.from(element.children).forEach(children => {
        if (children.classList.contains('projects')) {
          Array.from(children.children).forEach(grandChildren => {
            const animationDatasGrandChildren = new constructDatasToAnimations(grandChildren, 80);
            animationDatasGrandChildren.MakeAnimations({
              goingDown: AnimatePortfolio
            });
          });
        }
      });
    };

    if (element.id == 'footer') {
      const animationDatasFooter = new constructDatasToAnimations(element, 10);
      animationDatasFooter.MakeAnimations({
        goingDown: [
          AnimateHeaderWithEventFooter,
          AnimateMenuLinkWithEventFooter
        ],
        goingUp: [
          AnimateHeaderWithEventFooter
        ],
      });
    }
  })
}

animationsInScroll();
window.addEventListener("scroll", function (event) {
  scrollFunctionHeader();
  animationsInScroll();
});



function AnimateMenuLinks(element, op) {
  const isMobile = window.screen.width <= 700
  const animationDatas = new constructDatasToAnimations(element, 55);
  if (animationDatas.haveColisionOfTop && (op != 'going-up')) {
    linksFromMenu.forEach(link => {
      document.querySelectorAll(`.id_${link.id}`).forEach(tagAInVector => {
        if (!tagAInVector.classList.contains('bright-link')) {
          tagAInVector.classList.add('bright-link');
        }
      })
    })
  }

  linksFromMenu.forEach((tagA, tagAIndex) => {
    if (element.id == tagA.id && !element.classList.contains('diviser')) {
      if (element.tagName != 'FOOTER') {
        switch (op) {
          case "going down":
            document.querySelectorAll(`.id_${tagA.id}`).forEach(tagAInVector => {
              if (!tagAInVector.classList.contains('bright-link')) {
                tagAInVector.classList.add('bright-link');
              }
            })
            // if (tagAIndex != 0 && tagAIndex) {
            //   document.querySelectorAll(`.id_${linksFromMenu[tagAIndex - 1].id}`).forEach(tagAInVector => {
            //     tagAInVector.classList.remove('bright-link');
            //   })
            // }
            // ! this part remove bright of menu when is going down
            break;
          case "going up":
            document.querySelectorAll(`.id_${tagA.id}`).forEach(tagAInVector => {
              if (tagAInVector.classList.contains('bright-link')) {
                tagAInVector.classList.remove('bright-link');
              }
            })
            break;
          default:
            null
            break;
        }
      }
    }
  });
}

function AnimateChildrens(element, op) {
  if (element.id == 'services') {
    if (!element.classList.contains('effect-services-active')) {
      element.classList.add('effect-services-active');
    }
  }
}

function AnimateBenefits(element, op) {
  if (!element.classList.contains('effect-benefit')) {
    element.classList.add('effect-benefit');
  }
}

function AnimatePortfolio(element, op) {
  if (!element.classList.contains('effect-portfolio')) {
    element.classList.add('effect-portfolio');
  }
}

function AnimateHeaderWithEventFooter(element, op) {
  if (element.tagName == "FOOTER" && !element.classList.contains('diviser')) {
    switch (op) {
      case "going down":
        document.querySelectorAll('header').forEach(header => {
          if (!header.classList.contains('top-negative')) {
            header.classList.add('top-negative');
          }
        })

        break;
      case "going up":
        document.querySelectorAll('header').forEach(header => {
          if (header.classList.contains('top-negative')) {
            header.classList.remove('top-negative');
          }
        })
        break;
      default:
        null
        break
    }

  }
}

function AnimateMenuLinkWithEventFooter(element, op) {
  if (element.tagName == 'FOOTER') {
    document.querySelectorAll(`.id_${linksFromMenu[linksFromMenu.length - 1].id}`).forEach(tagAInVector => {
      tagAInVector.classList.remove('bright-menu');
    })
  }

}

function calcPorcent(porcentAumount, totalValue) {
  return (porcentAumount * totalValue) / 100;
}