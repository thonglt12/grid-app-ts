import React from 'react';
import GridShow from './components/GridShow';
import GridContextProvider from './store/GridContext';

function App() {
  return (
    <GridContextProvider>
      <GridShow/>
    </GridContextProvider>
  );
}

export default App;
