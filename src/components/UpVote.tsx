import React from 'react';
import UpArrowIcon from '@/assets/icons/arrow-up.svg?react';

interface UpVoteProps {
  active?: boolean;
  onClick?: (newState: boolean, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UpVote = ({ onClick, active = false }: UpVoteProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(!active, e);
  };

  return (
    <button
      onClick={handleClick}
      className={`u-button ${active ? 'u-button--active' : ''}`}
      aria-pressed={active}
    >
      <UpArrowIcon width={16} height={16} fill={active ? '#253CF2' : '#343A40'} />
    </button>
  );
};

export default UpVote;
