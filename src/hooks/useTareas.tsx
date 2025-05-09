import { useShallow } from 'zustand/shallow'
import { getTareasController, createTareaController, updateTareaController, deleteTareaController } from '../data/tareaController'
import { tareaStore } from '../store/tareaStore'
import { ITarea } from '../types/ITarea'
import Swal from 'sweetalert2'

export const useTareas = () => {
    const { tareas, setTareas, agregarNuevaTarea, editarUnaTarea, eliminarUnaTarea } = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setTareas: state.setTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarUnaTarea: state.editarUnaTarea
    })))

    const getTareas = async () => {
        const data = await getTareasController()
        if (data) setTareas(data)
    }

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try {
            await createTareaController(nuevaTarea)
            Swal.fire("Éxito", "Tarea creada correctamente", "success")
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!)
            console.error("Algo salió mal al crear la tarea: ", error)
        }
    }

    const putTareaEditar = async (tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id)
        editarUnaTarea(tareaEditada)
        try {
            await updateTareaController(tareaEditada)
            Swal.fire("Éxito", "Tarea actualizada correctamente", "success")
        } catch (error) {
            if (estadoPrevio) editarUnaTarea(estadoPrevio)
            console.error("Algo salió mal al editar la tarea: ", error)
        }
    }

    const eliminarTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea)
        const confirm = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        })
        if (!confirm.isConfirmed) return;
        eliminarUnaTarea(idTarea)
        try {
            await deleteTareaController(idTarea)
            Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success")
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.error("Algo salió mal al eliminar la tarea: ", error)
        }
    }

    const enviarTareaASprint = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea)
        try {
            await deleteTareaController(idTarea)
            eliminarUnaTarea(idTarea)
            Swal.fire("Enviado", "La tarea se envió al sprint correctamente", "success")
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.error("Algo salió mal al enviar la tarea al sprint: ", error)
        }
    }

    const recibirTareaDeSprint = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try {
            await createTareaController(nuevaTarea)
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!)
            console.error("Algo salió mal al recibir la tarea en el backlog: ", error)
        }
    }

    return { getTareas, crearTarea, putTareaEditar, eliminarTarea, enviarTareaASprint, recibirTareaDeSprint, tareas }
}