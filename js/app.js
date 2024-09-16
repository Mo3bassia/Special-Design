let toggleMenu = document.querySelector(".toggle-menu");
let toggleSettings = document.querySelector(".toggle-settings");
let links = document.querySelector(".links");
let bullets = document.querySelector(".bullets");
let colorsSplitter = document.querySelector(".colors-splitter");
let closeNav = document.querySelector(".landing").querySelector(".close");
let progressCont = document.querySelector(".skills .progresses-cont");
let colors = [
  "#FF9800",
  "#E91E63",
  "#009688",
  "#03A9F4",
  "#4CAF50",
  "rgb(235 100 245)",
];

colors.forEach((color) => {
  let span = document.createElement("span");
  colorsSplitter.append(span);
  span.style.background = color;
});

Array.from(colorsSplitter.children).forEach((e) => {
  e.onclick = function () {
    document.documentElement.style.setProperty(
      "--mainColor",
      e.style.background
    );
    localStorage.setItem("currentColor", e.style.background);
    Array.from(colorsSplitter.children).forEach((all) => {
      all.classList.remove("active");
    });
    e.classList.add("active");
  };
});

if (localStorage.getItem("currentColor")) {
  Array.from(colorsSplitter.children).forEach((e) => {
    if (e.style.background == localStorage.getItem("currentColor")) {
      e.classList.add("active");
      document.documentElement.style.setProperty(
        "--mainColor",
        e.style.background
      );
    }
  });
} else {
  colorsSplitter.children[0].classList.add("active");
  localStorage.setItem(
    "currentColor",
    colorsSplitter.children[0].style.background
  );
}

console.log(toggleMenu);
toggleMenu.onclick = function () {
  console.log("HELLO");
  links.classList.toggle("active");
  closeNav.classList.toggle("active");
};

closeNav.onclick = function () {
  closeNav.classList.toggle("active");
  links.classList.toggle("active");
};

Array.from(progressCont.children).forEach((element) => {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= document.querySelector(".skills").offsetTop - 200) {
      element.querySelector(".active").style.width = `${element
        .querySelector(".active")
        .getAttribute("data-width")}%`;
    }
  });
});

toggleSettings.onclick = function () {
  this.classList.toggle("active");
  this.parentElement.classList.toggle("active");
};

let allSec = document.querySelectorAll("section");

allSec.forEach((sec) => {
  let span = document.createElement("span");
  bullets.append(span);

  let title = document.createElement("div");
  title.classList.add("title");
  span.append(title);
  title.textContent = sec.id;

  span.onmouseenter = function () {
    this.children[0].style.opacity = "1";
    this.children[0].style.zIndex = "99999999";
  };
  span.onmouseleave = function () {
    this.children[0].style.opacity = "0";
    this.children[0].style.zIndex = "-5";
  };

  span.onclick = function () {
    location.hash = `#${sec.id}`;
  };
});

let bulletsOption = document.querySelector(".bulletsOption");

bulletsOption.querySelectorAll("button").forEach((e) => {
  e.onclick = function () {
    if (e.getAttribute("data-check") == "false") {
      bullets.style.display = "none";
    } else {
      bullets.style.display = "block";
    }
    localStorage.setItem("bulletsOrNo", e.getAttribute("data-check"));
    bulletsOption.querySelectorAll("button").forEach((all) => {
      all.classList.remove("active");
    });
    e.classList.add("active");
  };
});

if (localStorage.getItem("bulletsOrNo") != null) {
  bulletsOption
    .querySelector(`[data-check=${localStorage.getItem("bulletsOrNo")}]`)
    .click();
} else {
  localStorage.setItem(
    "bulletsOrNo",
    bulletsOption
      .querySelectorAll("button.active")[0]
      .getAttribute("data-check")
  );
}
