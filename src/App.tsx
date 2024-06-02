import './App.css';
import MiniDrawer from './components/layout/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './components/table/Planner';
import { AppProvider } from './AppContext'; // Import the context provider
import Dashboard from './components/Dashboard';
import Configuration from './components/Configuration';
import Settings from './components/Settings';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <MiniDrawer />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/planner" element={<Planner/>} />
          <Route path="/configuration" element={<Configuration/>} />
          <Route path="/settings" element={<Settings/>} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
