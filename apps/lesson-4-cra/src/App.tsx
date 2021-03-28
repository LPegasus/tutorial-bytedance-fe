import logo from './logo.svg';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  background-color: red;
`;

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
    <BrowserRouter>
      <Switch>
        <Route path="/test1">
          <h1>test1</h1>
        </Route>
        <Route path="/test2">
          <h1>test2</h1>
        </Route>
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
            <Button>Red Button</Button>
          </header>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
