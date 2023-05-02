import { fetchData } from "./fetchData";

export const fetchUserTasks = async (userId) => {
    const url = `http://localhost:3000/tasks/${userId}`;
    let allUserTasks;
    try {
        const responseData = await fetchData(url, "GET");
        allUserTasks = responseData;
    } catch (error) {
        console.log(error);
    }
    return allUserTasks;
};