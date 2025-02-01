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
  insertion_sort_bars.forEach((bar) => {
    bar.classList.remove("active");
    bar.classList.remove("next");
  });

  let index = 1;
  while (index < insertion_sort_list.length) {
    for (i = 0; i < insertion_sort_list.slice(0, index).length; i++) {
      if (insertion_sort_list[index] < insertion_sort_list[i]) {
        let temp = insertion_sort_list[index];
        let tempArray = insertion_sort_list
          .slice(0, index)
          .concat(insertion_sort_list.slice(index + 1));
        console.log("After Slice: ", temp);
        insertion_sort_list = tempArray;
        insertion_sort_list.splice(i, 0, temp);
        break;
      }
    }
    index++;
  }

  console.log(insertion_sort_list);
  insertion_sort_hovered = false;
};
// insertion_sort_Func([2, 3, 30, 2, 450, 1, 7, 3, 9]);
