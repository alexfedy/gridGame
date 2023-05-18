let gridContainer = document.getElementById("grid_container");

let refreshButton = document.getElementById("refresh_page");

let startTime;
let elapsedTime;
let bestTime;

let randomMode = false;

// to get css variable from :root
const greenColor = "rgb(35, 197, 82)";
const redColor = "rgb(248, 79, 49)";

let start_popup = document.getElementById("start_popup");
let text = document.getElementById("text");
let overlay = document.getElementById("overlay");

let startButton = document.getElementById("start_button");

let item1 = document.getElementById("grid_item_1");
let item2 = document.getElementById("grid_item_2");
let item3 = document.getElementById("grid_item_3");
let item4 = document.getElementById("grid_item_4");
let item5 = document.getElementById("grid_item_5");
let item6 = document.getElementById("grid_item_6");
let item7 = document.getElementById("grid_item_7");
let item8 = document.getElementById("grid_item_8");
let item9 = document.getElementById("grid_item_9");

let grid_items_array = [
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8,
  item9,
];

let item1_children_array = [item1, item2, item4];
let item2_children_array = [item1, item2, item3, item5];
let item3_children_array = [item2, item3, item6];
let item4_children_array = [item1, item4, item5, item7];
let item5_children_array = [item2, item4, item5, item6, item8];
let item6_children_array = [item3, item5, item6, item9];
let item7_children_array = [item4, item7, item8];
let item8_children_array = [item5, item7, item8, item9];
let item9_children_array = [item6, item8, item9];

refreshButton.addEventListener("click", () => {
  location.replace(location.href);
});

startButton.addEventListener("click", refreshGrid);

window.onload = (event) => {
  setGrid();
  beginGame();
};

//also a resize function
window.addEventListener(
  "resize",
  function (event) {
    setGrid();
  },
  true
);

function setGrid() {
  window_width = window.innerWidth;
  window_height = window.innerHeight;
  let min_val = Math.min(window_width, window_height);
  min_val -= min_val * 0.1;
  gridContainer.style.width = min_val + "px";
  gridContainer.style.height = min_val + "px";
}

function beginGame() {
  start_popup.style.display = "flex";
}

function refreshGrid() {
  if (document.querySelector("#random_check").checked) {
    refreshGridRandom();
  } else {
    refreshGridMiddle();
  }
}

function refreshGridRandom() {
  start_popup.style.display = "none";
  overlay.style.display = "none";
  let randomIndex = Math.floor(Math.random() * 10);
  for (i = 0; i < grid_items_array.length; i++) {
    let grid_item = grid_items_array[i];
    if (i != randomIndex) {
      setTimeout(function () {
        grid_item.style.backgroundColor = redColor;
      }, 20 * i);
    } else {
      setTimeout(function () {
        grid_item.style.backgroundColor = greenColor;
      }, 20 * i);
    }
  }

  setTimeout(function () {
    beginClock();
  }, 20 * 9);
}

function refreshGridMiddle() {
  start_popup.style.display = "none";
  overlay.style.display = "none";
  for (i = 0; i < grid_items_array.length; i++) {
    let grid_item = grid_items_array[i];
    if (grid_item != item5) {
      setTimeout(function () {
        grid_item.style.backgroundColor = redColor;
      }, 20 * i);
    } else {
      setTimeout(function () {
        grid_item.style.backgroundColor = greenColor;
      }, 20 * i);
    }
  }

  setTimeout(function () {
    beginClock();
  }, 20 * 9);
}

item1.addEventListener("click", () => {
  updateState(item1_children_array);
  checkWinState();
});
item2.addEventListener("click", () => {
  updateState(item2_children_array);
  checkWinState();
});
item3.addEventListener("click", () => {
  updateState(item3_children_array);
  checkWinState();
});
item4.addEventListener("click", () => {
  updateState(item4_children_array);
  checkWinState();
});
item5.addEventListener("click", () => {
  updateState(item5_children_array);
  checkWinState();
});
item6.addEventListener("click", () => {
  updateState(item6_children_array);
  checkWinState();
});
item7.addEventListener("click", () => {
  updateState(item7_children_array);
  checkWinState();
});
item8.addEventListener("click", () => {
  updateState(item8_children_array);
  checkWinState();
});
item9.addEventListener("click", () => {
  updateState(item9_children_array);
  checkWinState();
});

function updateState(children_array) {
  children_array.forEach((item) => {
    if (green(item)) {
      item.style.backgroundColor = redColor;
    } else {
      item.style.backgroundColor = greenColor;
    }
  });
}

function checkWinState() {
  //loop through all items and check that they are all green
  for (i = 0; i < grid_items_array.length; i++) {
    if (!green(grid_items_array[i])) {
      return;
    }
  }
  setTimeout(function () {
    winGame();
  }, 500);
}

function green(e) {
  return e.style.backgroundColor == greenColor;
}

function winGame() {
  endClock();
  document.getElementById("time_val").innerHTML =
    "Time: " +
    elapsedTime +
    "s" +
    "<br>Best Time: " +
    localStorage.getItem("bestTime") +
    "s";
  text.innerHTML = "You Won!";
  startButton.innerHTML = "Restart";
  start_popup.style.display = "flex";
  overlay.style.display = "block";
}

function beginClock() {
  startTime = Date.now();
}

function endClock() {
  elapsedTime = (Date.now() - startTime) / 1000;
  if (localStorage.getItem("bestTime") === null) {
    localStorage.setItem("bestTime", elapsedTime);
  } else {
    let temp_best_time = localStorage.getItem("bestTime");
    if (elapsedTime < temp_best_time) {
      localStorage.setItem("bestTime", elapsedTime);
    }
  }
}

//winning algo:

//click all 4 middle edges
//click alll 4 outer corners
