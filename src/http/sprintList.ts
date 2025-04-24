import axios from "axios";
import { ISprint } from "../types/ISprint";
import { ISprintList } from "../types/ISprintList";

const API_URL_SPRINTLIST = import.meta.env.VITE_API_URL_SPRINTLIST!
export const putSprintList = async (sprints: ISprint[]) => {
    try {
        const response = await axios.put<ISprintList>(API_URL_SPRINTLIST, {
            sprints: sprints
        })
        return response.data
    } catch (error) {
        console.error("Algo salió mal en sprintList", error);
    }
}