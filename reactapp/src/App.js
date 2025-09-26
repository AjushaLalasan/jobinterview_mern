import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import AddInterview from './components/AddInterview';
import ViewInterviews from './components/ViewInterviews';
import './App.css'
function App() {
  return (
    <Router>
      <nav style={{ padding: 20, borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/add-interview" style={{ marginRight: 15 }}>Add Interview</Link>
        <Link to="/view-interviews">View Interviews</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-interview" element={<AddInterview />} />
        <Route path="/view-interviews" element={<ViewInterviews />} />
      </Routes>
    </Router>
  );
}

export default App;
