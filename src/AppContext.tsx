import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

// Define types for context values
interface GraphData {
  cashInArray: any[];
  cashBox: any[];
  cashOutArray: any[];
}

interface AppContextType {
  configTableHeader: Record<string, any>;
  setConfigTableHeader: Dispatch<SetStateAction<Record<string, any>>>;
  graphData: GraphData;
  setGraphData: Dispatch<SetStateAction<GraphData>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

// Create a context with a default value of undefined
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Define props type for AppProvider
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [configTableHeader, setConfigTableHeader] = useState<Record<string, any>>({});
  const [open, setOpen] = useState<boolean>(false);
  const [graphData, setGraphData] = useState<GraphData>({
    cashInArray: [],
    cashBox: [],
    cashOutArray: []
  });

  const contextValue: AppContextType = {
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
