import { useEffect, useState } from "react";
import AjouterTacheForm from "./AjouterTacheForm";
import Header from "./Header";
import ListeTaches from "./ListeTaches";
import "../styles/Layout.css";
import "../styles/Header.css";

function App() {
  const savedTasks = localStorage.getItem("tasks");
  const [tasks, updateTasks] = useState(
    savedTasks ? JSON.parse(savedTasks) : []
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <div className="header">
        <Header></Header>
      </div>
      <div className="layout">
        <div className="blocks">
          <AjouterTacheForm
            tasks={tasks}
            updateTasks={updateTasks}
          ></AjouterTacheForm>
        </div>
        <div className="blocks">
          <ListeTaches tasks={tasks} updateTasks={updateTasks}></ListeTaches>
        </div>
      </div>
    </div>
  );
}

export default App;
