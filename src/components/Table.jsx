import DeleteIcon from "./DeleteIcon";
import { FilledFlagIcon, FlagIcon } from "./FlagIcon";

const Table = ({ tableData, setTasks }) => {
  const headerData = ["Task", "Expiry Date", "Users", "Important", "Action"];
  const tableHeader = () => {
    return headerData?.map((data, i) => {
      return <td key={i}>{data}</td>;
    });
  };

  const deleteTask = (taskIndex) => {
    setTasks(tableData.filter((_, i) => i !== taskIndex));
  };
  const returnTableData = () => {
    return tableData.map((tasks, i) => {
      const { task, expiry_date, user, important } = tasks;
      return (
        <tr key={i}>
          <td>{task}</td>
          <td>{expiry_date}</td>
          <td>
            <select>
              <option>{user}</option>
            </select>
          </td>
          <td>{important ? <FilledFlagIcon /> : <FlagIcon />}</td>
          <td>
            <button className="delete_btn" onClick={() => deleteTask(i)}>
              <DeleteIcon />
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table>
        <thead>
          <tr>{tableHeader()}</tr>
        </thead>
        <tbody>{returnTableData()}</tbody>
      </table>
    </>
  );
};

export default Table;
