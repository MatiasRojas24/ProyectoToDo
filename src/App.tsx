import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Sidebar } from './components/screens/Sidebar/Sidebar';
import { SprintForm } from './components/screens/Sprint/SprintForm';
import { Sprint } from './components/screens/Sprint/Sprint';
import { SprintList } from './components/screens/Sprint/SprintList';


function App() {
  const [openSprint, setOpenSprint] = useState(true);
  const [openBacklog, setOpenBacklog] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar setOpenSprint={setOpenSprint} setOpenBacklog={setOpenBacklog} />
        <main style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/" element={<Sprint/>} />
            <Route path="/sprint" element={<SprintList />} />
            <Route path="/sprints/new" element={<SprintForm />} />
            <Route path="/sprints/edit/:id" element={<SprintForm />} />
            <Route path="/sprints/:id" element={<Sprint />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
