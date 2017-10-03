import React, { Component } from 'react';
import MobileBar from './MobileBar';
import DesktopBar from './DesktopBar';

class App extends Component {
  render() {
    return (
      <div className="levlerapp">
        <MobileBar />
        <DesktopBar />
      </div>
    );
  }
}

export default App;
