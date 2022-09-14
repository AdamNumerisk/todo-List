import "../styles/TaskList.css";

//import Tache from "./Tache";

import Table from "./Table";

function TaskList({ tasks, updateTasks, setTaskName }) {
  return (
    <div>
      <h2 className="liste-taches">Liste de tâches</h2>
      <div>
        <Table data={tasks} updateData={updateTasks}></Table>
      </div>
      {/*} <ul className="liste-taches">
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
        </ul> */}
    </div>
  );
}

export default TaskList;
