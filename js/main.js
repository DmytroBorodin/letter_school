let pages = [...document.querySelectorAll(".wrapper")];
let appBtns = [...document.querySelectorAll(".app__btn")];
let backBtns = [...document.querySelectorAll(".back__btn")];
let pageNums = [...document.querySelectorAll(".current__page")];
let progressBars = [...document.querySelectorAll(".progress__bar")];
let pageCounters = [...document.querySelectorAll(".pages")];
let barProgress = 100 / progressBars.length;
let wrap = document.querySelector(".wrap");

function windowHeight() {
  let wH = window.innerHeight;
  wrap.style.height = `${wH}px`;
}

window.addEventListener("resize", () => {
  if (window.innerHeight > 415) {
    windowHeight();
  } else {
    wrap.style.height = `auto`;
  }
});

appBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = appBtns.indexOf(btn);
    pages.forEach((page) => {
      page.classList.add("disabled");
      pages[btnIndex + 1].classList.remove("disabled");
    });
  });
  btn.addEventListener("mousedown", (event) => {
    event.path[0].classList.add("clicked");
  });
  btn.addEventListener("mouseup", (event) => {
    event.path[0].classList.remove("clicked");
  });
});

backBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = backBtns.indexOf(btn);
    pages.forEach((page) => {
      page.classList.add("disabled");
      pages[btnIndex].classList.remove("disabled");
    });
  });
});

pageNums.forEach((num) => {
  let index = pageNums.indexOf(num);
  num.innerText = index + 1;
});

progressBars.forEach((bar) => {
  let index = progressBars.indexOf(bar) + 1;
  let barWidth = barProgress * index;
  bar.style.width = `${barWidth}%`;
});

pageCounters.forEach((counter) => {
  counter.innerText = pageCounters.length;
});

let childNameInput = document.getElementById("child__name__input");
let childNameBlocks = [...document.querySelectorAll(".child__name")];
let childNameVal = null;

childNameInput.addEventListener("focusout", (e) => {
  childNameVal = e.target.value;
  childNameBlocks.forEach((block) => {
    block.innerText = e.target.value;
  });
});

// second page settings

let ageBtns = [...document.querySelectorAll(".age__btn")];
ageBtns.forEach((btn) => {
  btn.addEventListener("mousedown", () => {
    btn.classList.add("active");
  });
  btn.addEventListener("mouseup", () => {
    btn.classList.remove("active");
  });
});

// third page settings

let langBlocks = [...document.querySelectorAll(".language__block")];

langBlocks.forEach((langBlock) => {
  langBlock.addEventListener("click", () => {
    let index = langBlocks.indexOf(langBlock);
    langBlocks.forEach((block) => {
      block.classList.toggle("selected");
    });
    if (langBlocks[index].classList.contains("selected")) {
      return;
    } else {
      langBlocks[index].classList.add("selected");
    }
  });
});

// fourth page settings

let qaBlocks = [...document.querySelectorAll(".question")];

qaBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    block.classList.toggle("selected");
  });
});
