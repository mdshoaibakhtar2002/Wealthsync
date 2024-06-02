import './App.css'
import MiniDrawer from './components/layout/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Planner from './components/table/Planner';

const App = () => {
  return (
    <Router>
      <MiniDrawer />
      <Routes>
        <Route path="/" element={<Planner open={true} />} />
        <Route path="/planner" element={<Planner open={true}/>} />
      </Routes>
    </Router>
  );
};
export default App
