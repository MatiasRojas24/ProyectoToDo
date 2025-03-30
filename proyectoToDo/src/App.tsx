import { Sidebar } from "./components/screens/Sidebar/Sidebar";
import { Sprint } from "./components/screens/Sprint/Sprint";
import { Backlog } from "./components/screens/Backlog/Backlog";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [sprintOpen, setOpenSprint] = useState(false)
  const [backlogOpen, setOpenBacklog] = useState(false)

  return (
    <div className={styles.containerApp}>
      <Sidebar setOpenSprint={setOpenSprint} setOpenBacklog={setOpenBacklog} />
      {sprintOpen && <Sprint />}
      {backlogOpen && <Backlog />}
    </div>
  );
}

export default App;
