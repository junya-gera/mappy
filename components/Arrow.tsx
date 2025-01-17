import React from 'react';
import Xarrow from 'react-xarrows';

interface ArrowProps {
  start: string;
  end: string;
}

const Arrow: React.FC<ArrowProps> = ({ start, end }) => {
  return (
    <Xarrow
      start={start}
      end={end}
      color="#888"
      strokeWidth={2}
      path="straight"
    />
  );
};

export default Arrow;

