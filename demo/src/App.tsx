import * as React from 'react';
import './App.css';
import { Engine } from './game/Engine';

const engine : Engine = new Engine();

class App extends React.Component {
  public componentDidMount() {
    engine.start();
  }

  public componentWillUnmount() {
    engine.stop();
  }

  public render() {
    return (
      <div className="App">
        <canvas id="glContainer" width="1200" height="800" />
      </div>
    );
  }
}

export default App;
