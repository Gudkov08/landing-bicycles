window.onresize = function(event) {
  document.location.reload();
};



// change theme colors
const sun = document.querySelector("#sun");
const moon = document.querySelector("#moon");
const linkTheme = document.querySelector("#theme-link");
const indicatorTheme = document.querySelector(".theme-changer__indicator");

const lightTheme = "./vars/theme-light.css";
const darkTheme = "./vars/theme-dark.css";

sun.addEventListener("click", function () { turnOnLight(); });

function turnOnLight() {
  let currTheme = linkTheme.getAttribute("href");

  if(currTheme == lightTheme) {
    return;
  } else {
    currTheme = lightTheme;
  }

  linkTheme.setAttribute("href", currTheme);
  indicatorTheme.classList.add("theme-changer__indicator_switched_sun");
  indicatorTheme.classList.remove("theme-changer__indicator_switched_moon");
}

moon.addEventListener("click", function () { turnOnDark(); });

function turnOnDark() {
  let currTheme = linkTheme.getAttribute("href");

  if(currTheme == darkTheme) {
    return;
  } else {
    currTheme = darkTheme;
  }

  linkTheme.setAttribute("href", currTheme);
  indicatorTheme.classList.remove("theme-changer__indicator_switched_sun");
  indicatorTheme.classList.add("theme-changer__indicator_switched_moon");
}
// replace theme-changer to mobile-menu
const mobileMenu = document.querySelector(".mobile-menu");
const pageWidth = document.documentElement.scrollWidth;
const themeChanger = document.querySelector("#theme-changer");

if (pageWidth <= 480) {
  themeChanger.parentNode.removeChild(themeChanger);
  mobileMenu.appendChild(themeChanger);
}


// mobile-menu
const buttonMobileMenuOpen = document.querySelector("#header-mobile-menu_open");
const buttonMobileMenuClose = document.querySelector("#header-mobile-menu_close");
const linksMobileMenu = document.querySelectorAll(".mobile-menu__link");

if (pageWidth <= 480) {
  buttonMobileMenuOpen.classList.add("header__mobile-menu-button_type_visible");
}

linksMobileMenu.forEach((item)=> {
  item.addEventListener("click", function () {
    closeMobileMenu();
  });
});

buttonMobileMenuOpen.addEventListener("click", function () {
  openMobileMenu();
});

buttonMobileMenuClose.addEventListener("click", function () {
  closeMobileMenu();
});

function openMobileMenu() {
  buttonMobileMenuOpen.classList.remove("header__mobile-menu-button_type_visible");
  buttonMobileMenuClose.classList.add("header__mobile-menu-button_type_visible");
  mobileMenu.classList.add('mobile-menu_open');
};

function closeMobileMenu() {
  buttonMobileMenuOpen.classList.add("header__mobile-menu-button_type_visible");
  buttonMobileMenuClose.classList.remove("header__mobile-menu-button_type_visible");
  mobileMenu.classList.remove('mobile-menu_open');
};


//add bicycles-types objects
const bicycleTypesContent = document.querySelector('.bicycle-types__content');
const bicycleTypesTemplate = document.querySelector('#template__bicycle-types');


function createBicycleTypes(object) {
  clone = bicycleTypesTemplate.content.cloneNode(true);
  clone.querySelector(".bicycle-types__title").textContent = object.title;
  clone.querySelector(".bicycle-types__text").textContent = object.text;
  clone.querySelector(".bicycle-types__image_position_left").style.backgroundImage = object.imageLeft;
  clone.querySelector(".bicycle-types__image_position_right").style.backgroundImage = object.imageRight;
}

bicycleTypesObjects.forEach( (i)=> {
  createBicycleTypes(i);
  bicycleTypesContent.append(clone);
});

const bicycleTypesItems = document.querySelectorAll('.bicycle-types__content-item');

bicycleTypesItems[0].classList.add('bicycle-types__content-item_visible');

//bicycles-types slider
const buttonLeft = document.querySelector('#button-left');
const buttonRight = document.querySelector('#button-right');

buttonLeft.addEventListener("click", function () { moveLeft(); });
buttonRight.addEventListener("click", function () { moveRight(); });

let slideIndex = 1;

function moveRight() {
  showSlides(slideIndex += 1);
};

function moveLeft() {
  showSlides(slideIndex -= 1);
};

function currentSlide(n) {
  showSlides(slideIndex = n);
};

function showSlides(n) {
  if (n > bicycleTypesItems.length) {
    slideIndex = 1
  } else if (n < 1) {
    slideIndex = bicycleTypesItems.length
  };

  for (let slide of bicycleTypesItems) {
    slide.classList.remove("bicycle-types__content-item_visible");
  };

  bicycleTypesItems[slideIndex - 1].classList.add("bicycle-types__content-item_visible");
}

//add bicycles-cards
const bicyclesCardsContainer = document.querySelector('.bicycles__cards');
const bicyclesCardsTemplate = document.querySelector('#template__bicycles-card');

const highwayBicycles = bicyclesObjects.filter(item => item.type === 'highway');
const gravelBicycles = bicyclesObjects.filter(item => item.type === 'gravel');
const ttBicycles = bicyclesObjects.filter(item => item.type === 'tt');

function createBicycleCard(object) {
  clone = bicyclesCardsTemplate.content.cloneNode(true);
  clone.querySelector(".bicycles__img-link").href = object.href;
  clone.querySelector(".bicycles__img-link").ariaLabel = "Велосипед " + object.name;
  clone.querySelector(".bicycles__img").src = object.image;
  clone.querySelector(".bicycles__img").alt = "Велосипед " + object.name + ".";
  clone.querySelector(".bicycles__card-capture_position_inside").textContent = object.name;
  clone.querySelector(".bicycles__card-capture_position_outside").textContent = object.name;
}

highwayBicycles.forEach( (i)=> {
  createBicycleCard(i);
  bicyclesCardsContainer.append(clone);
});

//change bicycles-cards
const highwayLink = document.querySelector("#highway-link");
const gravelLink = document.querySelector("#gravel-link");
const ttLink = document.querySelector("#tt-link");
const bicyclesCards = document.querySelectorAll(".bicycles__card-item");

function showBicyclesCards(massive) {
  bicyclesCardsContainer.innerHTML = "";
  massive.forEach( (i)=> {
    createBicycleCard(i);
    bicyclesCardsContainer.append(clone);
  });
}

highwayLink.addEventListener("click", function () { showBicyclesCards(highwayBicycles); });
gravelLink.addEventListener("click", function () { showBicyclesCards(gravelBicycles); });
ttLink.addEventListener("click", function () { showBicyclesCards(ttBicycles); });
