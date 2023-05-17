const SortingExample = (props) => {
  var title = "Bubble sort";

  function swap(arr, xp, yp) {
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
  }
  function bubbleSort(arr, n) {
    var i, j;
    for (i = 0; i < n - 1; i++) {
      for (j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
    }
  }

  var numbers = [5, 2, 7, 9, 1, 2, 3];
  //   bubbleSort(numbers, numbers.length);

  return (
    <>
      {/* Card Header */}
      <div>
        <h3>{title}</h3>
        <button onClick={swap(numbers, numbers.length)}>Swap</button>
      </div>
      <div style={{ height: "100vh" }}>{numbers}</div>
    </>
  );
};

export default SortingExample;
