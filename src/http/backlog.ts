import axios from "axios";
import { ITarea } from "../types/ITarea";
import { IBacklog } from "../types/IBacklog";
import { API_URL_BACKLOG } from "../utils/constantes";

export const putBacklog = async (tareas: ITarea[]) => {
    try {
        const response = await axios.put<IBacklog>(API_URL_BACKLOG, {
            tareas: tareas
        })
        return response.data
    } catch (error) {
        console.error("Algo salió mal en backlog", error);
    }
}