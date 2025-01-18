'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Block from './Block';
import Arrow from './Arrow';
import { Block as BlockType, Arrow as ArrowType } from '../types';

const MindMap: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [arrows, setArrows] = useState<ArrowType[]>([]);
  const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);

  const addBlock = useCallback(() => {
    const newBlock: BlockType = {
      id: `block-${Date.now()}`,
      content: 'New Block',
      x: Math.random() * (window.innerWidth - 150),
      y: Math.random() * (window.innerHeight - 100),
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  }, []);

  const updateBlockContent = useCallback((id: string, content: string) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    );
  }, []);

  const toggleBlockSelection = useCallback((id: string) => {
    setSelectedBlocks((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((blockId) => blockId !== id);
      } else {
        if (prevSelected.length < 2) {
          return [...prevSelected, id];
        }
        return [prevSelected[1], id];
      }
    });
  }, []);

  const connectBlocks = useCallback(() => {
    if (selectedBlocks.length === 2) {
      const [start, end] = selectedBlocks;
      setArrows((prevArrows) => [...prevArrows, { start, end }]);
      setSelectedBlocks([]);
    }
  }, [selectedBlocks]);

  useEffect(() => {
    if (selectedBlocks.length === 2) {
      connectBlocks();
    }
  }, [selectedBlocks, connectBlocks]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id
          ? { ...block, x: block.x + delta.x, y: block.y + delta.y }
          : block
      )
    );
  }, []);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="relative w-screen h-screen bg-gray-100" onClick={() => setSelectedBlocks([])}>
        <div className="absolute top-4 left-4 space-x-2">
          <button
            onClick={addBlock}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            ブロックを追加
          </button>
        </div>
        {blocks.map((block) => (
          <Block
            key={block.id}
            {...block}
            isSelected={selectedBlocks.includes(block.id)}
            onClick={() => toggleBlockSelection(block.id)}
            onContentChange={updateBlockContent}
          />
        ))}
        {arrows.map((arrow, index) => (
          <Arrow key={index} {...arrow} />
        ))}
      </div>
    </DndContext>
  );
};

export default MindMap;

