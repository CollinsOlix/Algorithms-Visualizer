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
  console.log(select_sort_bars);

  let index = 0;
  while (index < select_sort_list.length - 1 && select_sort_hovered) {
    select_sort_bars[index].classList.add("next");
    for (i = index + 1; i < select_sort_list.length; i++) {
      if (!select_sort_hovered) break;
      select_sort_bars[i].classList.add("active");
      await delay(400);
      if (select_sort_list[i] < select_sort_list[index]) {
        await swapFunc(index, i, select_sort_bars);
        [select_sort_list[index], select_sort_list[i]] = [
          select_sort_list[i],
          select_sort_list[index],
        ];
        select_sort_bars[i].classList.remove("active");
      }
      //   await delay(300);
    }
    select_sort_bars[index].classList.remove("next");
    index++;
  }
};
