let pages = [...document.querySelectorAll(".wrapper")];
let appBtns = [...document.querySelectorAll(".app__btn")];
let slickDotsUl = null;
let dotsArr = [];
let backBtns = [...document.querySelectorAll(".back__btn")];
let pageNums = [...document.querySelectorAll(".current__page")];
let progressBars = [...document.querySelectorAll(".progress__bar")];
let pageCounters = [...document.querySelectorAll(".pages")];
let barProgress = 100 / progressBars.length;
let wrap = document.querySelector(".wrap");
let colorizedItems = [...document.querySelectorAll(".colorized")];

document.addEventListener("DOMContentLoaded", function () {
  slickDotsUl = document.querySelector(".slick-dots");
  dotsArr = [...slickDotsUl.querySelectorAll("li")];
  dotsArr.forEach((dot) => {
    dot.classList.add("primary");
    colorizedItems.push(dot);
  });
});

appBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = appBtns.indexOf(btn);
    btnIndex === appBtns.length - 1
      ? false
      : pages.forEach((page) => {
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
let firstLetter = null;

childNameInput.addEventListener("focusout", (e) => {
  childNameVal = e.target.value;
  firstLetter = childNameVal[0].toUpperCase();
  console.log(firstLetter);
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
  btn.addEventListener("click", () => {
    ageBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    btn.classList.add("selected");
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
let colorClass = "primary";
let prevColorClassesCopy = ["primary"];

function toggleQuestionClasses(item) {
  item.classList.toggle("selected");
  item.classList.toggle(colorClass);
  item.classList.remove(prevColorClassesCopy[0]);
}

qaBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    let blockText = block.querySelector(".question__text");
    toggleQuestionClasses(block);
    toggleQuestionClasses(blockText);
  });
});

// fifth page settings (colorized)

let changeColorBtns = [...document.querySelectorAll(".color__btn")];
let collorsData = [];

// add color to collorsData
changeColorBtns.forEach((btn) => {
  collorsData.push(btn.getAttribute("data-color"));
});
let prevColorClasses = ["primary"];

changeColorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    prevColorClasses.push(btn.getAttribute("data-color"));
    changeColorBtns.forEach((btn) => {
      let colorName = btn.querySelector(".color__name");
      for (let i = 0; i < collorsData.length; i++) {
        if (btn.classList.contains(collorsData[i])) {
          btn.classList.remove(collorsData[i]);
        }
        if (colorName.classList.contains(collorsData[i])) {
          colorName.classList.remove(collorsData[i]);
        }
      }
    });
    colorClass = btn.getAttribute("data-color");
    btn.classList.add(colorClass);
    btn.querySelector(".color__name").classList.add(colorClass);
    colorizedItems.forEach((item) => {
      item.classList.remove(prevColorClasses[0]);
      if (item.classList.contains("color__btn") || item.classList.contains("color__name")) {
        return;
      } else {
        item.classList.add(`${colorClass}`);
      }
      if (
        (item.classList.contains("question__text") && !item.classList.contains("selected")) ||
        (item.classList.contains("question") && !item.classList.contains("selected"))
      ) {
        item.classList.remove(colorClass);
      }
    });
    prevColorClassesCopy = [...prevColorClasses];
    prevColorClasses.splice(0, 1);
  });
});

// page seven settings

let circleProgress = document.querySelector(".circle__animation__c");
let circleBg = document.querySelector(".bg__circle");
let progressCounter = document.querySelector(".percentages");
let circleRadius = null;
let circumference = null;

function circleSizeCounter(sizes) {
  changeCircleSize(circleProgress, ...sizes);
  changeCircleSize(circleBg, ...sizes);
  circleRadius = circleProgress.r.baseVal.value;
  circumference = circleRadius * 2 * Math.PI;
  circleProgress.style.strokeDasharray = `${circumference} ${circumference}`;
  circleProgress.style.strokeDashoffset = circumference;
}

function windowWidthWatcher() {
  if (window.innerWidth < 525) {
    circleSizeCounter([100, 100, 85, 15]);
  } else {
    circleSizeCounter([150, 150, 130, 20]);
  }
}
windowWidthWatcher();

function setProgress(percents) {
  let offset = circumference - (percents / 100) * circumference;
  circleProgress.style.strokeDashoffset = offset;
}

let percents = 0;

window.addEventListener("resize", () => {
  windowWidthWatcher();
});

function changeCircleSize(circle, cx, cy, r, sw) {
  circle.setAttribute("cx", cx);
  circle.setAttribute("cy", cy);
  circle.setAttribute("r", r);
  circle.setAttribute("stroke-width", sw);
}

appBtns[6].addEventListener("click", () => {
  let run = setInterval(runAnimation, 80);

  function runAnimation() {
    percents = percents + 1;
    if (percents == 101) {
      clearInterval(run);
      pages[7].classList.add("disabled");
      pages[8].classList.remove("disabled");
    } else {
      setProgress(percents);
      progressCounter.innerText = percents + "%";
    }
  }
});

// page nine settings

let planBlocks = [...document.querySelectorAll(".plan__wrapper")];

planBlocks.forEach((block) => {
  block.addEventListener("click", () => {
    planBlocks.forEach((block) => {
      block.classList.remove("active");
    });
    block.classList.add("active");
  });
});

// page ten settings

let startLetter = document.querySelector(".child__name__start__letter");
appBtns[appBtns.length - 2].addEventListener("click", () => {
  startLetter.innerText = firstLetter;
});
