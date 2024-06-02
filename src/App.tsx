import './App.css';
import MiniDrawer from './components/layout/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Planner from './components/table/Planner';
import { AppProvider } from './AppContext'; // Import the context provider
import Dashboard from './components/Dashboard';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <AppProvider>
      <Router>
        <MiniDrawer />
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/planner" element={<Planner/>} />
        </Routes>
      </Router>
      <Footer />
    </AppProvider>
  );
};

export default App;
