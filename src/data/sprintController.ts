import axios from "axios";
import { ISprint } from "../types/ISprint";
import { putSprintList } from "../http/sprintList";
import { ITarea } from "../types/ITarea";


const API_URL_SPRINTLIST = import.meta.env.VITE_API_URL_SPRINTLIST!
export const getSprintsController = async (): Promise<ISprint[] | undefined> => {
    try {
        const response = await axios.get<{ sprints: ISprint[] }>(API_URL_SPRINTLIST)
        return response.data.sprints
    } catch (error) {
        console.log("Problemas en getSprintsController", error);
    }
}

export const createSprintController = async (sprintNueva: ISprint) => {
    try {
        const sprintBd = await getSprintsController()
        if (sprintBd) {
            await putSprintList([...sprintBd, sprintNueva])
        } else {
            await putSprintList([sprintNueva])
        }
    } catch (error) {
        console.log("Error en createSprintController", error)
    }
}

export const updateSprintController = async (sprintActualizada: ISprint) => {
    try {
        const sprintBd = await getSprintsController()
        if (sprintBd) {
            const result = sprintBd.map((sprintBd) => sprintBd.id === sprintActualizada.id ? { ...sprintBd, ...sprintActualizada } : sprintBd)
            await putSprintList(result)
        }
        return sprintActualizada
    } catch (error) {
        console.log("Error en updateSprintController", error)
    }
}

export const deleteSprintController = async (idSprint: String) => {
    try {
        const sprintBd = await getSprintsController()
        if (sprintBd) {
            const result = sprintBd.filter((sprintBd) => sprintBd.id !== idSprint)
            await putSprintList(result)
        }
    } catch (error) {
        console.log("Error en deleteSprintController", error)
    }
}