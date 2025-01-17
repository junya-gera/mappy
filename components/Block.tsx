import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface BlockProps {
  id: string;
  content: string;
  x: number;
  y: number;
  onContentChange: (id: string, content: string) => void;
  isSelected: boolean;
  onClick: () => void;
}

const Block: React.FC<BlockProps> = ({ id, content, x, y, onContentChange, isSelected, onClick }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { x, y },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    left: x,
    top: y,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`absolute p-2 bg-white border rounded shadow-md cursor-move ${
        isSelected ? 'border-blue-500 border-2' : 'border-gray-300'
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <textarea
        value={content}
        onChange={(e) => onContentChange(id, e.target.value)}
        className="w-full h-full resize-none outline-none cursor-text"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default Block;

