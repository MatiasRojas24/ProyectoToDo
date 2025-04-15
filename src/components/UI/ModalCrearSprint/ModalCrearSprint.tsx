import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import styles from "./ModalCrearSprint.module.css";
import { ISprint } from "../../../types/ISprint";
import { sprintStore } from "../../../store/sprintStore";
import { useSprints } from "../../../hooks/useSprints";

type IModalCrearSprint = {
    handleCloseModal: VoidFunction
}
const initialState: ISprint = {
    nombre: "",
    fechaInicio: "",
    fechaCierre: "",
    tareas: [],
}

export const ModalCrearSprint: FC<IModalCrearSprint> = ({ handleCloseModal }) => {
    const sprintActiva = sprintStore((state) => state.sprintActiva)
    const setSprintActiva = sprintStore((state) => state.setSprintActiva)
    const { crearSprint, putSprintEditar } = useSprints()
    const [formValues, setFormValues] = useState<ISprint>(initialState)
    useEffect(() => {
        if (sprintActiva) setFormValues(sprintActiva)
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (sprintActiva) {
            putSprintEditar(formValues)
        } else {
            const formattedValues = { ...formValues, id: crypto.randomUUID(), tareas: [] }
            crearSprint(formattedValues)
        }
        handleCloseModal()
        setSprintActiva(null)
    }

    const handleCancelSubmit = () => {
        handleCloseModal()
        setSprintActiva(null)
    }

    return (
        <div className={styles.containerPrincipalModal}>
            <div className={styles.contentPopUP}>
                <div>
                    <h1>{sprintActiva ? "Editar Sprint" : "Crear Sprint"}</h1>
                </div>
                <form onSubmit={handleSubmit} className={styles.formContent}>
                    <div>
                        Nombre
                        <input value={formValues.nombre} onChange={handleChange} type="text" required autoComplete="off" name="nombre" />
                        Fecha de inicio
                        <input value={formValues.fechaInicio} onChange={handleChange} type="date" required min={new Date().toISOString().split("T")[0]} name="fechaInicio" />
                        Fecha de cierre
                        <input value={formValues.fechaCierre} onChange={handleChange} type="date" required min={formValues.fechaInicio} name="fechaCierre" />
                    </div>
                    <div className={styles.buttonCard}>
                        <button className={styles.buttonCrearTarea}>{sprintActiva ? "Editar Sprint" : "Crear Sprint"}</button>
                        <button className={styles.buttonCancel} onClick={handleCancelSubmit}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
