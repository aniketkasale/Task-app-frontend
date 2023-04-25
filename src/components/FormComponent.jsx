import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FilledFlagIcon, FlagIcon } from "./FlagIcon";
const apiURL = import.meta.env.VITE_API_URL;

const FormComponent = ({ setTasks }) => {
  const [isImportant, setIsImportant] = useState(true);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const watchtask = watch("task");

  const onSubmit = (data) => {
    const taskData = { important: isImportant, ...data };
    setTasks((oldArray) => [...oldArray, taskData]);
  };

  const getUsers = async () => {
    const userData = await fetch(apiURL + "users");
    const json = await userData?.json();
    setUsers(json?.users);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="form_container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_control">
          <input
            maxLength={200}
            type="text"
            name="task"
            {...register("task", {
              maxLength: 200,
              required: true,
            })}
          />
          <label className="task_label">
            {errors.task && errors.task.type === "required" ? (
              <span className="alert">Please input task description!</span>
            ) : (
              <>
                <p>Task</p> <p>{watchtask?.length}/200</p>
              </>
            )}
          </label>
        </div>
        <div className="form_control">
          <input
            type="date"
            name="expiry_date"
            {...register("expiry_date", { required: true })}
          />
          <label>
            {errors.expiry_date && errors.expiry_date.type === "required" ? (
              <span className="alert">Please select expiry date!</span>
            ) : (
              <>Expiry Date</>
            )}
          </label>
        </div>
        <div className="form_control">
          <select {...register("user", { required: true })}>
            {users &&
              users?.map((user, i) => {
                return (
                  <option key={i} value={user}>
                    {user}
                  </option>
                );
              })}
          </select>
          <label>
            {errors.user && errors.user.type === "required" ? (
              <span className="alert">Please select user!</span>
            ) : (
              <>Users</>
            )}
          </label>
        </div>
        <div className="form_control_flag">
          <span onClick={() => setIsImportant(!isImportant)}>
            {isImportant ? <FilledFlagIcon /> : <FlagIcon />}
          </span>
          <label>Important</label>
        </div>

        <div className="form_control_btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
