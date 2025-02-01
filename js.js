let algorithmInformation = {
  sorting: {
    "Bubble Sort": {
      name: "Bubble Sort",
      description:
        "This algorithm works by comparing two adjacent elements and swapping them if they are in an incorrect order",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      worstCase: "O(n^2)",
    },
    "Selection Sort": {
      name: "Selection Sort",
      description:
        "This algorithm works by selecting the smallest element from the unsorted part of the array and swapping it with the first unsorted element",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      bestCase: "O(n^2)",
      worstCase: "O(n^2)",
    },
    "Insertion Sort": {
      name: "Insertion Sort",
      description:
        "This algorithm works by iterating through the array one element at a time, inserting each element into its proper position in the sorted part of the array",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      bestCase: "O(n)",
      worstCase: "O(n^2)",
    },
  },
};
let activeAlgorithm = {};
let algoName = document.getElementById("name");
let algoDescription = document.getElementById("description");
let algoTimeComplexity = document.getElementById("timeComplexity");
let algoSpaceComplexity = document.getElementById("spaceComplexity");

let bubble_sort_container = document.querySelector("#bubble_sort_container");
let bubble_sort_list = [37, 12, 6, 23, 43, 45, 19, 33];
let bubble_sort_hovered = false;
//

//
let select_sort_container = document.querySelector("#select_sort_container");
let select_sort_hovered = false;
let select_sort_list = new Array(8)
  .fill(0)
  .map(() => Math.floor(Math.random() * 70));
//

//
let insertion_sort_container = document.querySelector(
  "#insertion_sort_container"
);
let insertion_sort_hovered = false;
let insertion_sort_list = new Array(8)
  .fill(0)
  .map(() => Math.floor(Math.random() * 70));
//

//
let delay = async (time) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log("Delaying for: ", time, "ms");
      resolve();
    }, time);
  });

const updateBars = (
  container,
  numArray,
  sortAlgoBars,
  classNames = ["bars"]
) => {
  container.innerHTML = "";
  numArray.forEach((item) => {
    let div = document.createElement("div");
    classNames &&
      classNames.forEach((className) => {
        div.classList.add(className);
      });

    div.style.height = `${item + 50}px`;
    div.innerText = item;
    container.append(div);
  });
  let bars = document.querySelectorAll(sortAlgoBars);

  return bars;
};
//

//

const animateBar = async (bar, newWidth, newHeight, prevWidth, prevHeight) => {
  bar.style.setProperty("--previous-height", prevHeight || bar.style.height);
  bar.style.setProperty("--current-height", newHeight);
  bar.style.setProperty("--previous-width", prevWidth || bar.style.width);
  bar.style.setProperty("--current-width", newWidth);
  prevWidth && prevWidth == "0px"
    ? bar.classList.add("animateDimensions2")
    : bar.classList.add("animateDimensions");
  // bar.classList.remove("bar");
  await delay(1000);
  prevWidth && prevWidth == "0px" && (bar.style.padding = "5px");
  // bar.classList.remove("animateDimensions");
};

//

//
updateBars(select_sort_container, select_sort_list, ".select_sort_bar", [
  "bar",
  "select_sort_bar",
]);
updateBars(bubble_sort_container, bubble_sort_list, ".bubble_sort_bar", [
  "bar",
  "bubble_sort_bar",
]);
updateBars(
  insertion_sort_container,
  insertion_sort_list,
  ".insertion_sort_bar",
  ["bar", "insertion_sort_bar"]
);

const swapFunc = async (a, b, bars) => {
  let pxs = [bars[a].style.height, bars[b].style.height];
  bars[a].style.setProperty("--previous-height", bars[a].style.height);
  temp = bars[a].innerText;
  bars[a].style.setProperty("--current-height", bars[b].style.height);
  await delay(750);

  bars[a].innerText = bars[b].innerText;
  await delay(500);

  bars[b].style.setProperty("--previous-height", bars[b].style.height);
  bars[a].classList.add("height");
  // bars[a].classList.remove("height");
  bars[b].innerText = temp;
  bars[b].style.setProperty("--current-height", `${parseInt(temp) + 50}px`);
  bars[b].classList.add("height");
  await delay(500);
  bars[a].style.height = pxs[1];
  bars[a].classList.remove("height");
  await delay(500);
  bars[b].style.height = pxs[0];
  bars[b].classList.remove("height");

  // bars[b].classList.remove("height");
};

const select_sort_Func = async () => {
  activeAlgorithm = algorithmInformation.sorting["Selection Sort"];

  algoName.innerText = "Name: " + activeAlgorithm.name;
  algoDescription.innerText = activeAlgorithm.description;
  algoTimeComplexity.innerText =
    activeAlgorithm.timeComplexity +
    "\nBest Case: " +
    activeAlgorithm.bestCase +
    "\nWorst Case: " +
    activeAlgorithm.worstCase;
  algoSpaceComplexity.innerText = activeAlgorithm.spaceComplexity;
  if (!select_sort_hovered) {
    select_sort_hovered = true;
  } else {
    return;
  }
  select_sort_list = new Array(8)
    .fill(0)
    .map(() => Math.floor(Math.random() * 70));
  //
  let select_sort_bars = updateBars(
    select_sort_container,
    select_sort_list,
    ".select_sort_bar",
    ["bar", "select_sort_bar"]
  );

  let index = 0;
  while (index < select_sort_list.length - 1) {
    select_sort_bars[index].classList.add("next");
    for (i = index + 1; i < select_sort_list.length; i++) {
      // select_sort_bars[i].classList.remove("active");

      select_sort_bars[i].classList.add("active");
      await delay(300);
      if (select_sort_list[i] < select_sort_list[index]) {
        await swapFunc(index, i, select_sort_bars);
        [select_sort_list[index], select_sort_list[i]] = [
          select_sort_list[i],
          select_sort_list[index],
        ];
      }
      select_sort_bars[i].classList.remove("active");
      await delay(100);
      //   await delay(300);
    }
    select_sort_bars[index].classList.remove("next");
    index++;
  }
  select_sort_hovered = false;
};

const bubble_sort_Func = async () => {
  activeAlgorithm = algorithmInformation.sorting["Bubble Sort"];

  algoName.innerText = "Name: " + activeAlgorithm.name;
  algoDescription.innerText = activeAlgorithm.description;
  algoTimeComplexity.innerText =
    activeAlgorithm.timeComplexity +
    "\nBest Case: " +
    activeAlgorithm.bestCase +
    "\nWorst Case: " +
    activeAlgorithm.worstCase;
  algoSpaceComplexity.innerText = activeAlgorithm.spaceComplexity;

  if (!bubble_sort_hovered) {
    bubble_sort_hovered = true;
  } else {
    return;
  }
  bubble_sort_list = [37, 12, 6, 23, 43, 45, 19, 33];

  let bubble_sort_bars = updateBars(
    bubble_sort_container,
    bubble_sort_list,
    ".bubble_sort_bar",
    ["bar", "bubble_sort_bar"]
  );
  let changed = true;
  while (changed === true) {
    changed = false;
    for (ii = 0; ii < bubble_sort_list.length; ii++) {
      bubble_sort_bars[ii].classList.add("active");
      await delay(400);
      if (ii < bubble_sort_list.length - 1) {
        if (
          parseInt(bubble_sort_list[ii]) > parseInt(bubble_sort_list[ii + 1])
        ) {
          bubble_sort_bars[ii + 1].classList.add("next");
          await swapFunc(ii, ii + 1, bubble_sort_bars);
          changed = true;
          let temp = bubble_sort_list[ii];
          bubble_sort_list[ii] = bubble_sort_list[ii + 1];
          bubble_sort_list[ii + 1] = temp;
          bubble_sort_bars[ii + 1].classList.remove("next");
        }
      }
      bubble_sort_bars[ii].classList.remove("active");
    }
  }
  bubble_sort_hovered = false;
};

const insertion_sort_Func = async (insertion_sort_list) => {
  activeAlgorithm = algorithmInformation.sorting["Insertion Sort"];

  algoName.innerText = "Name: " + activeAlgorithm.name;
  algoDescription.innerText = activeAlgorithm.description;
  algoTimeComplexity.innerText =
    activeAlgorithm.timeComplexity +
    "\nBest Case: " +
    activeAlgorithm.bestCase +
    "\nWorst Case: " +
    activeAlgorithm.worstCase;
  algoSpaceComplexity.innerText = activeAlgorithm.spaceComplexity;
  if (!insertion_sort_hovered) {
    insertion_sort_hovered = true;
  } else {
    return;
  }
  insertion_sort_list = new Array(8)
    .fill(0)
    .map(() => Math.floor(Math.random() * 70));
  //
  let insertion_sort_bars = updateBars(
    insertion_sort_container,
    insertion_sort_list,
    ".insertion_sort_bar",
    ["bar", "insertion_sort_bar"]
  );
  insertion_sort_bars.forEach((bar, index) => {
    bar.classList.remove("active");
    bar.classList.remove("next");
    index > 0 ? bar.classList.add("unsorted") : null;
  });

  console.log(insertion_sort_list);
  let index = 1;
  while (index < insertion_sort_list.length) {
    insertion_sort_bars[index].classList.add("active");
    await delay(300);
    for (i = 0; i < insertion_sort_list.slice(0, index).length; i++) {
      if (insertion_sort_list[index] < insertion_sort_list[i]) {
        let temp = insertion_sort_list[index];

        insertion_sort_bars[index].innerText = "";
        insertion_sort_bars[index].style.padding = 0;
        await animateBar(insertion_sort_bars[index], index, 0, 0);

        //
        //Remove the bar from its current position
        //
        insertion_sort_bars[index].classList.remove("bar");
        insertion_sort_bars[index].classList.remove("insertion_sort_bar");

        //
        //Remove element from DOM
        //
        insertion_sort_bars[index].parentNode.removeChild(
          insertion_sort_bars[index]
        );

        //Little delay
        await delay(100);

        //
        //Indicate where the element will be inserted
        i > 0 && insertion_sort_bars[i - 1].classList.add("next");
        insertion_sort_bars[i].classList.add("next");

        //
        //Little delay
        //
        await delay(100);
        let parentDiv = insertion_sort_bars[i].parentNode;

        //
        //Create New Bar
        //
        let newBar = document.createElement("div");
        newBar.classList.add("bar");
        parentDiv.insertBefore(newBar, insertion_sort_bars[i]);

        //
        //Animate the new bar
        //
        await animateBar(newBar, "16px", `${temp + 50}px`, "0px", "0px");

        //
        //Insert text in new bar
        //
        newBar.innerText = temp;

        //
        //Delay for smooth animation
        //
        await delay(1100);

        //
        //There isn't an existing method to delete items from
        //an array, probably beacuse the arrays are of fixed
        //size, to delete an item from an array you have to
        //create a new array and insert all items into the new
        //array except the item you want to delete?
        //
        let tempArray = insertion_sort_list
          .slice(0, index)
          .concat(insertion_sort_list.slice(index + 1));
        insertion_sort_list = tempArray;
        insertion_sort_list.splice(i, 0, temp);

        //
        //I don't even know if this break statement has any
        //use in this function, but...
        //if it works, don't touch it
        break;
      }
    }
    i > 0 && insertion_sort_bars[i - 1].classList.remove("next");
    insertion_sort_bars[i].classList.remove("next");
    insertion_sort_bars[index].classList.remove("active");
    insertion_sort_bars[index].classList.remove("unsorted");
    insertion_sort_bars = updateBars(
      insertion_sort_container,
      insertion_sort_list,
      ".insertion_sort_bar",
      ["bar", "insertion_sort_bar"]
    );
    await delay(300);
    index++;
  }

  console.log(insertion_sort_list);
  insertion_sort_hovered = false;
};
// insertion_sort_Func([2, 3, 1, 7, 3, 9]);
