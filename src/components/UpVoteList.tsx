import React from 'react';
import UpVote from './UpVote';
import { useUpVote } from '../UpVoteContext';
import MinusIcon from '@/assets/icons/minus.svg?react';
import PlusIcon from '@/assets/icons/plus.svg?react';

interface UpVoteListProps {
  listId: string;
}

const UpVoteList = ({ listId }: UpVoteListProps) => {
  const { upvotes, toggleAll, addUpVote, removeUpVote } = useUpVote(listId);

  return (
    <div className="upvote-container">
      <button onClick={removeUpVote} className="u-button">
        <MinusIcon width={16} height={16} />
      </button>

      <div className="upvote-list">
        {upvotes.map((active, i) => (
          <UpVote
            key={i}
            active={active}
            onClick={toggleAll}
          />
        ))}

      </div>
      <button onClick={addUpVote} className="u-button">
        <PlusIcon width={16} height={16} />
      </button>
    </div>
  );
};

export default UpVoteList;
