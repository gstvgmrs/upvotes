import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { UpVoteProvider, useUpVote } from './UpVoteContext';

describe('UpVoteContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UpVoteProvider>{children}</UpVoteProvider>
  );

  it('provides default upvotes for a list', () => {
    const { result } = renderHook(() => useUpVote('a'), { wrapper });
    expect(result.current.upvotes.length).toBeGreaterThan(0);
  });

  it('toggleAll toggles all upvotes in a list', () => {
    const { result } = renderHook(() => useUpVote('b'), { wrapper });
    act(() => {
      result.current.toggleAll();
    });
    expect(result.current.upvotes.every(v => v === true)).toBe(true);
    act(() => {
      result.current.toggleAll();
    });
    expect(result.current.upvotes.every(v => v === false)).toBe(true);
  });

  it('addUpVote adds a new upvote to the list', () => {
    const { result } = renderHook(() => useUpVote('c'), { wrapper });
    const initialLength = result.current.upvotes.length;
    act(() => {
      result.current.addUpVote();
    });
    expect(result.current.upvotes.length).toBe(initialLength + 1);
  });

  it('removeUpVote removes an upvote from the list', () => {
    const { result } = renderHook(() => useUpVote('d'), { wrapper });
    act(() => {
      result.current.addUpVote();
    });
    const lengthAfterAdd = result.current.upvotes.length;
    act(() => {
      result.current.removeUpVote();
    });
    expect(result.current.upvotes.length).toBe(lengthAfterAdd - 1);
  });
});
