import { useCallback, useEffect, useMemo } from "react";
import useFetch from "./useFetch";
import { Post, PostsResponse } from "../types";
import { useSearchParams } from "react-router-dom";

interface UsePostsOptions {
  limit?: number;
}

const usePosts = ({ limit = 10 }: UsePostsOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("q") || "";
  const sortBy = searchParams.get("sortBy") || "id";
  const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc";
  const selectedTag = searchParams.get("tag") || "";

  const buildUrl = useMemo(() => {
    if (searchQuery) return "/search";
    if (selectedTag) return `/tag/${selectedTag}`;
    return "";
  }, [searchQuery, selectedTag]);

  const buildParams = useMemo(() => {
    const params: Record<string, string | number> = {
      limit,
      skip: (page - 1) * limit,
    };
    if (searchQuery) params.q = searchQuery;
    if (sortBy) {
      params.sortBy = sortBy;
      params.order = sortOrder;
    }
    return params;
  }, [page, limit, searchQuery, sortBy, sortOrder]);

  const { data, loading, error, fetchData } = useFetch<PostsResponse>(
    buildUrl,
    {
      params: buildParams,
    }
  );

  const {
    data: tags,
    loading: tagsLoading,
    error: tagsError,
  } = useFetch<string[]>("/tag-list");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
      setSearchParams((prev) => {
        Object.entries(newParams).forEach(([key, value]) => {
          if (value) {
            prev.set(key, value);
          } else {
            prev.delete(key);
          }
        });
        return prev;
      });
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      updateSearchParams({ page: newPage.toString() });
    },
    [updateSearchParams]
  );

  const handleSearch = useCallback(
    (query: string) => {
      updateSearchParams({ q: query, page: "1" });
    },
    [updateSearchParams]
  );

  const handleSort = useCallback(
    (field: string) => {
      updateSearchParams({
        sortBy: field,
        order: field === sortBy && sortOrder === "asc" ? "desc" : "asc",
        page: "1",
      });
    },
    [updateSearchParams, sortBy, sortOrder]
  );

  const handleTagSelect = useCallback(
    (tag: string) => {
      updateSearchParams({ tag, page: "1", q: "" });
    },
    [updateSearchParams]
  );

  const addPost = useCallback(
    async (newPostData: Post) => {
      try {
        const response = await fetchData({
          url: "/add",
          method: "POST",
          data: { ...newPostData },
        });
        return response;
      } catch (error) {
        console.error("Failed to add post:", error);
        throw error;
      }
    },
    [fetchData]
  );

  const updatePost = useCallback(
    async (updatedPostData: Post) => {
      try {
        const response = await fetchData({
          url: `/${updatedPostData.id}`,
          method: "PUT",
          data: updatedPostData,
        });
        return response;
      } catch (error) {
        console.error("Failed to update post:", error);
        throw error;
      }
    },
    [fetchData]
  );

  const deletePost = useCallback(
    async (postId: number) => {
      try {
        await fetchData({
          url: `/${postId}`,
          method: "DELETE",
        });
      } catch (error) {
        console.error("Failed to delete post:", error);
        throw error;
      }
    },
    [fetchData]
  );

  return {
    posts: data?.posts || [],
    totalPosts: data?.total || 0,
    loading,
    error,
    page,
    tags: tags || [],
    tagsLoading,
    tagsError,
    handlePageChange,
    handleSearch,
    handleSort,
    handleTagSelect,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    addPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
