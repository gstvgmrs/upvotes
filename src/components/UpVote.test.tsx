import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import UpVote from './UpVote';

afterEach(cleanup);

describe('UpVote', () => {
  it('renders a single button', () => {
    render(<UpVote />);
    const button = screen.getByRole('button');
    expect(button).to.exist;
    expect(button.querySelector('svg')).to.exist;
  });

  it('applies active class when active', () => {
    render(<UpVote active />);
    const button = screen.getByRole('button');
    expect(button.className).to.contain('u-button--active');
  });

  it('calls onClick with toggled state when clicked', () => {
    const onClick = vi.fn();
    render(<UpVote active={false} onClick={onClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClick.mock.calls.length).to.equal(1);
    expect(onClick.mock.calls[0][0]).to.be.true;
    expect(onClick.mock.calls[0][1]).to.be.an('object');
  });
});
