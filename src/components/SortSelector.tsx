interface Props {
  onSort: (field: string) => void;
  currentSort: string;
  currentOrder: "asc" | "desc";
}

const SortSelector = ({
  onSort,
  currentSort,
  currentOrder,
}: Props): JSX.Element => {
  return (
    <div className="flex items-center ml-4">
      <label htmlFor="sort" className="mr-2">
        Sort by:
      </label>
      <select
        id="sort"
        onChange={(e) => onSort(e.target.value)}
        value={currentSort}
        className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="id">ID</option>
        <option value="title">Title</option>
      </select>

      <button
        type="button"
        onClick={() => onSort(currentSort)}
        className="ml-2 px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {currentOrder === "asc" ? "↑" : "↓"}
      </button>
    </div>
  );
};

export default SortSelector;
