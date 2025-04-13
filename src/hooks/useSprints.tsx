import { useShallow } from "zustand/shallow"
import { sprintStore } from "../store/sprintStore"
import { createSprintController, deleteSprintController, getSprintsController, updateSprintController } from "../data/sprintController"
import { ISprint } from "../types/ISprint"
import Swal from "sweetalert2"


export const useSprints = () => {
    const { sprints, setSprints, agregarNuevaSprint, editarUnaSprint, eliminarUnaSprint } = sprintStore(useShallow((state) => ({
        sprints: state.sprints,
        setSprints: state.setSprints,
        agregarNuevaSprint: state.agregarNuevaSprint,
        editarUnaSprint: state.editarUnaSprint,
        eliminarUnaSprint: state.eliminarUnaSprint,
    })))

    const getSprints = async () => {
        const data = await getSprintsController()
        if (data) setSprints(data)
    }

    const crearSprint = async (nuevaSprint: ISprint) => {
        agregarNuevaSprint(nuevaSprint)
        try {
            await createSprintController(nuevaSprint)
            Swal.fire("Éxito", "Sprint creada correctamente", "success")
        } catch (error) {
            eliminarUnaSprint(nuevaSprint.id!)
            console.error("Algo salió mal al crear la sprint: ", error)
        }
    }

    const putSprintEditar = async (sprintEditada: ISprint) => {
        const estadoPrevio = sprints.find((el) => el.id === sprintEditada.id)
        editarUnaSprint(sprintEditada)
        try {
            await updateSprintController(sprintEditada)
            Swal.fire("Éxito", "Sprint actualizada correctamente", "success")
        } catch (error) {
            if (estadoPrevio) editarUnaSprint(estadoPrevio)
            console.error("Algo salió mal al editar la sprint", error)
        }
    }

    const eliminarSprint = async (idSprint: string) => {
        const estadoPrevio = sprints.find((el) => el.id === idSprint)
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        if (!confirm.isConfirmed) return
        eliminarUnaSprint(idSprint)
        try {
            await deleteSprintController(idSprint)
            Swal.fire("Eliminado", "La sprint se eliminó correctamente", "success")
        } catch (error) {
            if (estadoPrevio) agregarNuevaSprint(estadoPrevio)
            console.error("Algo salió mal al eliminar la tarea: ", error)
        }
    }

    return { getSprints, crearSprint, putSprintEditar, eliminarSprint, sprints }
}