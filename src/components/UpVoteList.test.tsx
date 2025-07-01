import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { UpVoteProvider } from '../UpVoteContext';
import UpVoteList from './UpVoteList';

afterEach(cleanup);

describe('UpVoteList', () => {
  const renderWithProvider = (ui: React.ReactElement) =>
    render(<UpVoteProvider>{ui}</UpVoteProvider>);

  it('renders a list of UpVotes', () => {
    renderWithProvider(<UpVoteList listId="test" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).to.be.greaterThan(1);
  });

  it('adds a new UpVote when plus button is clicked', () => {
    renderWithProvider(<UpVoteList listId="test" />);
    const before = screen.getAllByRole('button').length;
    const addBtn = screen.getAllByRole('button').at(-1)!;
    fireEvent.click(addBtn);
    const after = screen.getAllByRole('button').length;
    expect(after).to.equal(before + 1);
  });

  it('removes an UpVote when minus button is clicked', () => {
    renderWithProvider(<UpVoteList listId="test" />);
    const before = screen.getAllByRole('button').length;
    const removeBtn = screen.getAllByRole('button')[0];
    fireEvent.click(removeBtn);
    const after = screen.getAllByRole('button').length;
    expect(after).to.equal(before - 1);
  });
});
