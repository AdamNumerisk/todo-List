import "../styles/ListeTaches.css";
import Tache from "./Tache";

function ListeTaches({ tasks, updateTasks, setTaskName }) {
  return (
    <div>
      <h2>Liste de tâches</h2>
      <ul className="liste-taches">
        {tasks.map((task) => (
          <div key={tasks.indexOf(task)}>
            <Tache
              taskName={task.name}
              taskStatus={task.status}
              updateTasks={updateTasks}
              tasks={tasks}
              taskIndex={tasks.indexOf(task)}
              setTaskName={setTaskName}
            ></Tache>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default ListeTaches;
