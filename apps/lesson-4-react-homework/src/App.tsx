import './App.css';

import { Koopa } from '@/components/Koopa';

import { Mario } from './components/Mario';

function App() {
  return (
    <div className="App">
      <section>
        <Mario />
        <Koopa />
      </section>
    </div>
  );
}

export { App };
