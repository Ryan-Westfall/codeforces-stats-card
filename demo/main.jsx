import React from 'react';
import { createRoot } from 'react-dom/client';
import { CodeforcesCard } from '../src/index.js';

const handle = new URLSearchParams(location.search).get('handle') || 'Ryan-Westfall';

function Demo() {
  return (
    <>
      <div className="demo-col">
        <h4>Light</h4>
        <CodeforcesCard handle={handle} theme="light" />
      </div>
      <div className="demo-col">
        <h4>Dark</h4>
        <CodeforcesCard handle={handle} theme="dark" />
      </div>
    </>
  );
}

createRoot(document.getElementById('root')).render(<Demo />);
