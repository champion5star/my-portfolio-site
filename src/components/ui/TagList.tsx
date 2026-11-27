interface TagListProps {
  items: readonly string[];
}

export default function TagList({ items }: TagListProps) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
