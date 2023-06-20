import React from 'react';
import HostViewPage from './HostViewPage';
import LoginForm from './Login';
import ParticipantViewPage from './ParticipantViewPage';
import { Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <div className="App">
       <h1>Video Conferencing App</h1>
      <Routes>
        <Route path="/host" element={<HostViewPage />} />
        <Route path="/client" element={<ParticipantViewPage />} />
      </Routes>
    </div>
  );
};

export default App;
