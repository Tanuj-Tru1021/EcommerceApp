import React, { useContext, useEffect, useState } from 'react';
import ApiDataProvider from './src/components/ApiDataProvider';
import Navigator from './src/Navigator';



const App = () => {
  return (
    <ApiDataProvider>
      <Navigator />
    </ApiDataProvider>

  );
}

export default App;
