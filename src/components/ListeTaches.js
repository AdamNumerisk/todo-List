function ListeTaches({ tasks }) {
  return (
    <div>
      <h2>Liste de tâches</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.name} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListeTaches;
