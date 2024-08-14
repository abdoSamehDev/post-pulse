interface Props {
  onSelectTag: (tag: string) => void;
  tags: string[];
  selectedTag: string;
}

const TagSelector = ({
  onSelectTag,
  tags,
  selectedTag,
}: Props): JSX.Element => {
  return (
    <div className="flex items-center ml-4">
      <label htmlFor="tag" className="mr-2">
        Filter by tag:
      </label>
      <select
        id="tag"
        onChange={(e) => onSelectTag(e.target.value)}
        value={selectedTag}
        className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagSelector;
