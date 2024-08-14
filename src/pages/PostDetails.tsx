import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Post, UpdatePostForm } from "../types";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import MainButton from "../components/MainButton";
import DeleteButton from "../components/DeleteButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import usePosts from "../hooks/usePosts";

const PostDetails = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const { data: post, loading, error } = useFetch<Post>(`/${id}`);
  const { updatePost, deletePost } = usePosts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostForm>();

  const handleUpdate = async (data: UpdatePostForm) => {
    if (post) {
      try {
        await updatePost({
          ...post,
          title: data.title,
          body: data.body,
          tags: data.tags.split(",").map((tag) => tag.trim()),
        });
        navigate(`/`);
      } catch (error) {
        console.error("Failed to update post:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (post) {
      if (window.confirm("Are you sure you want to delete this post?")) {
        try {
          await deletePost(post.id);
          navigate("/");
        } catch (error) {
          console.error("Failed to delete post:", error);
        }
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!post) return <div className="text-center">Post not found</div>;

  return (
    <div className="mx-auto py-8">
      {!isEditing ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-700 mb-8">{post.body}</p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex space-x-4">
              <span className="text-sm text-gray-500 flex items-center">
                <HandThumbUpIcon className="h-4 w-4 mr-1 text-green-500" />
                {post.reactions.likes}
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <HandThumbDownIcon className="h-4 w-4 mr-1 text-red-500" />
                {post.reactions.dislikes}
              </span>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <MainButton action={() => setIsEditing(true)}>
              Update Post
            </MainButton>
            <DeleteButton action={handleDelete}>
              {loading ? "Deleting..." : "Delete Post"}
            </DeleteButton>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block mb-1">
              Title
            </label>
            <input
              id="title"
              defaultValue={post.title}
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="body" className="block mb-1">
              Body
            </label>
            <textarea
              id="body"
              defaultValue={post.body}
              {...register("body", { required: "Body is required" })}
              className="w-full px-3 py-2 border rounded"
              rows={5}
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="tags" className="block mb-1">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              defaultValue={post.tags.join(", ")}
              {...register("tags")}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PostDetails;
