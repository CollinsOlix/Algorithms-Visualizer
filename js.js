let bubble_sort_container = document.querySelector("#bubble_sort_container");
let bubble_sort_list = [37, 12, 6, 23, 43, 45, 19, 33];
//
bubble_sort_container.addEventListener("mouseover", () => {
  bubble_sort_hovered = true;
});
bubble_sort_container.addEventListener("mouseleave", () => {
  bubble_sort_hovered = false;
});

//
let select_sort_container = document.querySelector("#select_sort_container");
select_sort_container.addEventListener("mouseover", () => {
  select_sort_hovered = true;
});
select_sort_container.addEventListener("mouseleave", () => {
  select_sort_hovered = false;
});
let select_sort_list = new Array(8)
  .fill(0)
  .map(() => Math.floor(Math.random() * 70));
let bubble_sort_hovered = false;

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
updateBars(select_sort_container, select_sort_list, ".select_sort_bar", [
  "bar",
  "select_sort_bar",
]);
updateBars(bubble_sort_container, bubble_sort_list, ".bubble_sort_bar", [
  "bar",
  "bubble_sort_bar",
]);

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
  select_sort_hovered = true;
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
  select_sort_bars.forEach((bar) => {
    bar.classList.remove("active");
    bar.classList.remove("next");
    console.log(bar);
  });

  let index = 0;
  while (index < select_sort_list.length - 1 && select_sort_hovered) {
    console.log("Bars2: ", select_sort_bars);
    select_sort_bars[index].classList.add("next");
    for (i = index + 1; i < select_sort_list.length; i++) {
      // select_sort_bars[i].classList.remove("active");
      if (!select_sort_hovered) {
        await delay(2000);
        break;
      }
      select_sort_bars[i].classList.add("active");
      await delay(400);
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
};

const bubble_sort_Func = async () => {
  bubble_sort_hovered = true;
  bubble_sort_list = [37, 12, 6, 23, 43, 45, 19, 33];

  let bubble_sort_bars = updateBars(
    bubble_sort_container,
    bubble_sort_list,
    ".bubble_sort_bar",
    ["bar", "bubble_sort_bar"]
  );
  let changed = true;
  while (changed === true && bubble_sort_hovered) {
    changed = false;
    for (i = 0; i < bubble_sort_list.length; i++) {
      if (bubble_sort_hovered === false) break;
      bubble_sort_bars[i].classList.add("active");
      await delay(400);
      if (i < bubble_sort_list.length - 1) {
        if (parseInt(bubble_sort_list[i]) > parseInt(bubble_sort_list[i + 1])) {
          bubble_sort_bars[i + 1].classList.add("next");
          await swapFunc(i, i + 1, bubble_sort_bars);
          changed = true;
          let temp = bubble_sort_list[i];
          bubble_sort_list[i] = bubble_sort_list[i + 1];
          bubble_sort_list[i + 1] = temp;
          bubble_sort_bars[i + 1].classList.remove("next");
        }
      }
      bubble_sort_bars[i].classList.remove("active");
    }
  }
};
