import { useEffect, useState } from "react";
import Table from "./components/Table";
import FormComponent from "./components/FormComponent";
import Notification from "./components/Notification";
const apiURL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [importantTasks, setImportantTasks] = useState([]);
  const getTasks = async () => {
    const taskData = await fetch(apiURL + "tasks");
    const json = await taskData?.json();
    const important = json?.tasks.filter((task) => task?.important === true);
    setImportantTasks(important);
    setTasks(json?.tasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {importantTasks.map((task, i) => {
        return <Notification key={i} task={task} i={i} />;
      })}
      <div className="container">
        <h2 className="title">User Tasks</h2>
        <FormComponent setTasks={setTasks} />
        <hr />
        <Table tableData={tasks} setTasks={setTasks} />
      </div>
    </>
  );
}

export default App;
