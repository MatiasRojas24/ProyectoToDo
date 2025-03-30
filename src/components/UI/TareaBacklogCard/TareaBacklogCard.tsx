import { FC, useState } from "react";
import { ITarea } from "../../../types/ITarea";
import styles from './TareaBacklogCard.module.css'
import Dropdown from "../Dropdown/Dropdown";
import { ModalViewTarea } from "../ModalViewTarea/ModalViewTarea";

type ITareaBacklogCard = {
    tarea: ITarea
    handleOpenModalEdit: (tarea: ITarea) => void
    handleDeleteTarea: (idTarea: string) => void
}

export const TareaBacklogCard: FC<ITareaBacklogCard> = ({ tarea, handleOpenModalEdit, handleDeleteTarea }) => {
    const [openViewModal, setOpenViewModal] = useState(false)
    return (
        <>
            <div className={styles.containerTareaBacklog}>
                <p>
                    Título: {tarea.titulo} - Descripción: {tarea.descripcion}
                    <div className={styles.buttons}>
                        <button className={styles.sendButton}>
                            Enviar a
                            <span className={`material-symbols-outlined ${styles.sendIcon}`}>
                                send
                            </span>
                        </button>
                        <Dropdown />
                        <button className={styles.visibilityButton}>
                            <span className="material-symbols-outlined" onClick={() => setOpenViewModal(true)}>visibility</span>
                        </button>
                        <button className={styles.editButton} onClick={() => handleOpenModalEdit(tarea)}>
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className={styles.deleteButton} onClick={() => handleDeleteTarea(tarea.id!)}>
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </p>
            </div>
            {openViewModal && <ModalViewTarea tarea={tarea} setOpenViewModal={setOpenViewModal} />}
        </>
    )
}
