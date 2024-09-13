/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { api } from "../../../_api";

export function useTasks() {
	const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

	const listTasks = useCallback(async () => {
		try {
			const { data } = await api.get("/tasks");

			setTasks(data);
		} catch (error: any) {
      setError(error.response.data.message);
		}
	}, []);

	return {
		listTasks,
    error,
    tasks,
	};
}
