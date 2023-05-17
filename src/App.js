import "./css/App.css";

import ListCard from "./components/ListCard";
import SortingExample from "./components/SortingExample";

function App() {
  var algorithmDescriptions = [
    {
      description: `Bubble sort: This is a simple sorting algorithm that works by
    repeatedly swapping adjacent elements if they are in the wrong
    order.`,
    },
    {
      description: `Selection Sort: This algorithm sorts an array by repeatedly
    finding the minimum element from the unsorted part of the array
    and putting it at the beginning.`,
    },
    {
      description: `Insertion Sort: This sorting algorithm works by iterating through
    an array and inserting each element in its correct position in a
    sorted subarray.`,
    },
    {
      description: `Merge Sort: This is a divide-and-conquer algorithm that divides an
    array into smaller subarrays, sorts them recursively, and then
    merges them back together.`,
    },
    {
      description: `Quick Sort: This algorithm selects a pivot element and partitions
    the array around the pivot, recursively sorting the left and right
    partitions.`,
    },
    {
      description: `Heap Sort: This algorithm uses a binary heap data structure to
   sort an array by repeatedly removing the largest element from the
   heap and adding it to the sorted array.`,
    },
    {
      description: `Bogo Sort: This algorithm is a highly inefficient and impractical
   sorting algorithm that works by randomly shuffling a list of
   elements until it happens to be sorted. Its worst-case time
   complexity is O(n!), making it unsuitable for sorting large
   datasets. While it is interesting as a theoretical concept, it is
   not a practical solution for real-world applications.`,
    },
  ];

  return (
    <>
      <div className="App">
        <header>
          <h1>Sorting Algorithims</h1>
          <p>A quick dive into algoritms</p>

          <address className="author">
            By <a rel="author">Arnfinn Larsen</a>
          </address>
        </header>

        <section>
          <img
            src="https://i.pinimg.com/originals/30/62/75/3062756a297f1e3c22e35f3fe89b3ecc.jpg"
            alt="Genius Cat"
          ></img>
        </section>

        <section>
          Sorting algorithms are a fundamental part of computer science and are
          used to organize data in a particular order. The goal of a sorting
          algorithm is to rearrange a collection of data elements in a specific
          order, usually in ascending or descending order.
        </section>

        <section>
          There are several types of sorting algorithms, each with its own
          advantages and disadvantages in terms of performance, memory usage,
          and implementation complexity. Some of the most common sorting
          algorithms used in computer science include:
          <ul>
            {algorithmDescriptions.map((item, key) => {
              return (
                <li key={key}>
                  <ListCard text={item.description}></ListCard>
                </li>
              );
            })}
          </ul>
        </section>
        <section id="sortingExample">
          <SortingExample></SortingExample>
        </section>
      </div>
    </>
  );
}

export default App;
