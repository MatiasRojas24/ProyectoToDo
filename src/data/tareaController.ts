import axios from "axios";
import { ITarea } from "../types/ITarea";
import { putBacklog } from "../http/backlog";

const API_URL_BACKLOG = import.meta.env.VITE_API_URL_BACKLOG!
export const getTareasController = async (): Promise<ITarea[] | undefined> => {
    try {
        const response = await axios.get<{ tareas: ITarea[] }>(API_URL_BACKLOG)
        return response.data.tareas
    } catch (error) {
        console.log("Problemas en getTareasController", error);
    }
}

export const createTareaController = async (tareaNueva: ITarea) => {
    try {
        const tareasBd = await getTareasController()

        if (tareasBd) {
            await putBacklog([...tareasBd, tareaNueva])
        } else {
            await putBacklog([tareaNueva])
        }
    } catch (error) {
        console.log("Error en createTareaController", error);
    }
}

export const updateTareaController = async (tareaActualizada: ITarea) => {
    try {
        const tareasBd = await getTareasController()

        if (tareasBd) {
            const result = tareasBd.map((tareaBd) => tareaBd.id === tareaActualizada.id ? { ...tareaBd, ...tareaActualizada } : tareaBd)
            await putBacklog(result)
        }
        return tareaActualizada
    } catch (error) {
        console.log("Error en updateTareaController", error);
    }
}

export const deleteTareaController = async (idTarea: string) => {
    try {
        const tareasBd = await getTareasController()
        if (tareasBd) {
            const result = tareasBd.filter((tareaBd) => tareaBd.id !== idTarea)
            await putBacklog(result)
        }
    } catch (error) {
        console.log("Error en deleteTareaController", error);
    }
}