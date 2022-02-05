const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

//nav Links
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", scrolling);

function scrolling() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    console.log(current.offsetHeight);
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active");
    }
  });
}

//reveal library object
const sr = ScrollReveal({
  origin: "top",
  distance: "80px",
  duration: 2000,
  reset: true,
});

sr.reveal(".home__title", { delay: 400 });
sr.reveal(".home__scroll", { delay: 200 });
sr.reveal(".home__img", { origin: "bottom", delay: 400 });

sr.reveal(".about__img", { delay: 500 });
sr.reveal(".about__subtitle", { delay: 300 });
sr.reveal(".about__profession", { delay: 400 });
sr.reveal(".about__text", { delay: 500 });
sr.reveal(".about__social-icon", { delay: 600, interval: 200 });

sr.reveal(".skills__subtitle", {});
sr.reveal(".skills__name", { distance: "20px", delay: 50, interval: 100 });
sr.reveal(".skills__img", { delay: 400 });

sr.reveal(".portfolio__img", { interval: 200 });

sr.reveal(".contact__subtitle", {});
sr.reveal(".contact__text", { interval: 200 });
sr.reveal(".contact__input", { delay: 400 });
sr.reveal(".contact__button", { delay: 600 });

//MAP
var script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4Zx9dPERh9CIC1gcCQPU9Qmbha_J3QqA&callback=initMap";
script.async = true;

window.initMap = function () {
  let options = {
    zoom: 15,
    center: {
      lat: 22.2267018 ,
      lng: 88.3443246,
    },
  };
  let map = new google.maps.Map(document.getElementById("map"), options);
  let marker = new google.maps.Marker({
    position: {
      lat: 22.2267018 ,
      lng: 88.3443246,
    },
    map: map,
  });
};

document.head.appendChild(script);
