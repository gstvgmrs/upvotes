import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type UpVoteContextType = {
  upvotesByList: Record<string, boolean[]>;
  toggleAll: (listId: string) => void;
  addUpVote: (listId: string) => void;
  removeUpVote: (listId: string) => void;
};

const UpVoteContext = createContext<UpVoteContextType | undefined>(undefined);

export const useUpVote = (listId: string) => {
  const ctx = useContext(UpVoteContext);
  if (!ctx) throw new Error('useUpVote must be used within UpVoteProvider');
  const { upvotesByList, toggleAll, addUpVote, removeUpVote } = ctx;
  return {
    upvotes: upvotesByList[listId] || [],
    toggleAll: () => toggleAll(listId),
    addUpVote: () => addUpVote(listId),
    removeUpVote: () => removeUpVote(listId),
  };
};

const DEFAULT_LISTS: Record<string, boolean[]> = {
  a: Array(5).fill(false),
  b: Array(5).fill(false),
  c: Array(5).fill(false),
};

export const UpVoteProvider = ({ children }: { children: ReactNode }) => {
  const [upvotesByList, setUpvotesByList] = useState<Record<string, boolean[]>>(() => {
    const saved = localStorage.getItem('upvotesByList');
    return saved ? JSON.parse(saved) : { ...DEFAULT_LISTS };
  });

  useEffect(() => {
    localStorage.setItem('upvotesByList', JSON.stringify(upvotesByList));
  }, [upvotesByList]);

  const toggleAll = (listId: string) => {
    setUpvotesByList((prev) => ({
      ...prev,
      [listId]: prev[listId].map(() => !prev[listId][0]),
    }));
  };

  const addUpVote = (listId: string) => {
    setUpvotesByList((prev) => ({
      ...prev,
      [listId]: [...(prev[listId] || []), prev[listId]?.[0] ?? false],
    }));
  };

  const removeUpVote = (listId: string) => {
    setUpvotesByList((prev) => ({
      ...prev,
      [listId]: prev[listId].slice(1),
    }));
  };

  return (
    <UpVoteContext.Provider value={{ upvotesByList, toggleAll, addUpVote, removeUpVote }}>
      {children}
    </UpVoteContext.Provider>
  );
};
