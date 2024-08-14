type Props = {
  page: number;
  totalPosts: number;
  handlePageChange: (page: number) => void;
};

const Pagination = ({
  page,
  totalPosts,
  handlePageChange,
}: Props): JSX.Element => {
  const totalPages: number = Math.ceil(totalPosts / 10);
  return (
    <div className="flex justify-center gap-x-3 gap-y-5 py-3 flex-wrap">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          type="button"
          onClick={() => handlePageChange(pageNum)}
          className={`px-3 py-1 rounded ${
            pageNum === page ? "bg-primary text-white" : "bg-gray-200"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
