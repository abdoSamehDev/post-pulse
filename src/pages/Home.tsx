import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import usePosts from "../hooks/usePosts";
import SortSelector from "../components/SortSelector";
import TagSelector from "../components/TagSelector";

const Home = (): JSX.Element => {
  const {
    posts,
    totalPosts,
    loading,
    error,
    page,
    tags,
    handlePageChange,
    handleSearch,
    handleSort,
    handleTagSelect,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
  } = usePosts();

  if (loading) return <div className="text-center">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 font-medium text-lg">
        {error}
      </div>
    );

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
        <div className="flex mt-4 md:mt-0">
          <SortSelector
            onSort={handleSort}
            currentSort={sortBy}
            currentOrder={sortOrder}
          />
          <TagSelector
            onSelectTag={handleTagSelect}
            tags={tags.slice(0, 10)}
            selectedTag={selectedTag}
          />
        </div>
      </div>
      {posts.length === 0 && (
        <h2 className="flex items-center justify-center h-64">
          There's No Data
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPosts={totalPosts}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
