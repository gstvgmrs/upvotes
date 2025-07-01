import React from 'react';
import { UpVoteProvider } from './UpVoteContext';
import UpVoteList from './components/UpVoteList';

function App() {
  return (
    <div className="container">
      <UpVoteProvider>
        <div className="card">
          <UpVoteList listId="a" />
          <UpVoteList listId="b" />
          <UpVoteList listId="c" />
        </div>
      </UpVoteProvider>
    </div>
  );
}

export default App;
