import logo from './logo.svg';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

function App() {
  // @ts-ignore
  const [{ n }, springRef] = useSpring(() => ({ n: 0 }));
  const bind = useDrag(
    (state) => {
      const { movement } = state;
      springRef.set({ n: movement[0] });
    },
    {
      axis: 'x',
    }
  );

  return (
    <div className="App" {...bind()}>
      <header className="App-header">
        <animated.img
          onMouseDown={(e) => e.preventDefault()}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            touchAction: 'none',
            transform: n.to((x) => `rotateZ(${x}deg)`),
          }}
          width="50%"
          src={logo}
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
