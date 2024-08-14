import { useNavigate } from "react-router-dom";
import { Post } from "../types";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/24/solid";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };
  return (
    <div
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={handleClick}
    >
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-2">{post.body.substring(0, 150)}...</p>
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
    </div>
  );
};

export default PostCard;
