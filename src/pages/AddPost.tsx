import { useForm } from "react-hook-form";
import { UpdatePostForm } from "../types";
import { useNavigate } from "react-router-dom";
import usePosts from "../hooks/usePosts";

const AddPost = (): JSX.Element => {
  const navigate = useNavigate();
  const { addPost } = usePosts();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostForm>();

  const handleCreate = async (data: UpdatePostForm) => {
    try {
      await addPost({
        title: data.title,
        body: data.body,
        tags: data.tags.split(",").map((tag) => tag.trim()),
        userId: 5,
        id: 300,
        reactions: {
          likes: 100,
          dislikes: 50,
        },
        views: 50,
      });
      navigate(`/`);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };
  return (
    <div className="mx-auto py-8">
      <form onSubmit={handleSubmit(handleCreate)} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            id="title"
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
            {...register("body", { required: "Body is required" })}
            className="w-full px-3 py-2 border rounded"
            rows={5}
          />
          {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        </div>
        <div>
          <label htmlFor="tags" className="block mb-1">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            {...register("tags")}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
