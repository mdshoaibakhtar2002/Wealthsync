import './App.css';
import MiniDrawer from './components/layout/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './components/table/Planner';
import { AppProvider } from './AppContext'; // Import the context provider
import Dashboard from './components/Dashboard';
import Configuration from './components/Configuration';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <MiniDrawer />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/planner" element={<Planner/>} />
          <Route path="/configuration" element={<Configuration/>} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
