import { createContext, useState } from 'react';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [configTableHeader, setConfigTableHeader] = useState({});
  const [open, setOpen] = useState(false);
  const [graphData, setGraphData] = useState({
    'cashInArray' : [],
    'cashBox' :[],
    'cashOutArray' : []
});

  const contextValue = {
    configTableHeader,
    setConfigTableHeader,
    graphData,
    setGraphData,
    open,
    setOpen
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
