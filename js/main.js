let pages = [...document.querySelectorAll(".wrapper")];
let appBtns = [...document.querySelectorAll(".app__btn")];
let appBtnsWraps = [...document.querySelectorAll(".button__wrapper")];
let slickDotsUl = null;
let dotsArr = [];
let backBtns = [...document.querySelectorAll(".back__btn")];
let pageNums = [...document.querySelectorAll(".current__page")];
let progressBars = [...document.querySelectorAll(".progress__bar")];
let pageCounters = [...document.querySelectorAll(".pages")];
let barProgress = 100 / progressBars.length;
let wrap = document.querySelector(".wrap");
let colorizedItems = [...document.querySelectorAll(".colorized")];
let currentPageNumber = null;

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
    currentPageNumber = btnIndex + 1;
    if (!appBtnsWraps[btnIndex].classList.contains("disabled")) {
      btnIndex === appBtns.length - 1
        ? false
        : pages.forEach((page) => {
            page.classList.add("disabled");
            pages[btnIndex + 1].classList.remove("disabled");
          });
    } else {
      return;
    }
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
console.log(pageCounters);

let emailInput = document.getElementById("email__input");
let childNameInput = document.getElementById("child__name__input");
let childNameBlocks = [...document.querySelectorAll(".child__name")];
let childNameVal = null;
let firstLetter = null;

let inputs = [emailInput, childNameInput];

childNameInput.addEventListener("focusout", (e) => {
  childNameVal = e.target.value;
  firstLetter = childNameVal[0].toUpperCase();
  console.log(firstLetter);
  childNameBlocks.forEach((block) => {
    block.innerText = e.target.value;
  });
});

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    console.log(currentPageNumber);
    e.target.value === "" ? false : appBtnsWraps[currentPageNumber].classList.remove("disabled");
  });
});

// third page settings

let ageBtns = [...document.querySelectorAll(".age__btn")];
let pageNum = +document.querySelector(".current__page").innerText;
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
    appBtnsWraps[currentPageNumber].classList.remove("disabled");
  });
});

// fourth page settings

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

// fifth page settings

let qaBlocks = [...document.querySelectorAll(".question")];

let answersArr = [];

function createAnswerObj(index, answer) {
  let answerObj = {
    index,
    answer,
  };

  if (!answersArr.length) {
    answersArr.push(answerObj);
  } else {
    for (let i = 0; i < answersArr.length; i++) {
      if (answersArr.length < 3) {
        answerObj.index === answersArr[i].index
          ? (answersArr[i].answer = answerObj.answer)
          : answersArr.push(answerObj);
      } else {
        answerObj.index === answersArr[i].index
          ? (answersArr[i].answer = answerObj.answer)
          : answersArr[i].answer;
      }
    }
  }
  console.log(answersArr);
}

qaBlocks.forEach((block) => {
  let btns = [...block.querySelectorAll(".answer__btn")];
  let index = null;

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btns.forEach((btn) => btn.classList.remove("selected"));
      btn.classList.add("selected");
      let answer = btn.innerText;
      createAnswerObj(index, answer);
      block.classList.remove("selected");
      block.style.height = "auto";
      block.style.opacity = "100%";

      if (index + 1 < qaBlocks.length) {
        qaBlocks[index + 1].classList.add("selected");
      }
      if (answersArr.length === 3) {
        appBtnsWraps[currentPageNumber].classList.remove("disabled");
      }
    });
  });

  block.addEventListener("mouseover", () => {
    index = qaBlocks.indexOf(block);
    qaBlocks.forEach((block) => block.classList.remove("active"));
    block.classList.add("active");
  });
  block.addEventListener("mouseout", () => {
    block.classList.remove("active");
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

// page six settings

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
