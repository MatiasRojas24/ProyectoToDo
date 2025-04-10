import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

type ISidebar = {
  setOpenSprint: (state: boolean) => void;
  setOpenBacklog: (state: boolean) => void;
};

export const Sidebar: FC<ISidebar> = ({ setOpenSprint, setOpenBacklog }) => {
  const navigate = useNavigate();

  const handleOpenBacklog = () => {
    setOpenSprint(false);
    setOpenBacklog(true);
  };

  const handleOpenSprint = () => {
    setOpenBacklog(false);
    setOpenSprint(true);
  };

  const handleCrearSprint = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/sprints/new");
  };

  const handleVerSprints = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/sprint");
  };

  return (
    <aside className={styles.sidebar}>
      <button onClick={handleOpenBacklog} className={styles.backlogButton}>
        Backlog
        <span className={`material-symbols-outlined ${styles.backlogIcon}`}>
          import_contacts
        </span>
      </button>
      <button onClick={handleVerSprints} className={styles.backlogButton}>
          Ver Sprints
      <span className={`material-symbols-outlined ${styles.backlogIcon}`}>
      list
    </span>
  </button>

      <div className={styles.containerListSprints}>
        <h3>
          Lista de Sprints
          <button
            className={styles.buttonAddSprint}
            onClick={handleCrearSprint}
          >
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
        </h3>

        <hr />
        <div
          onClick={(e) => {
            e.stopPropagation();
            handleOpenSprint();
          }}
          className={styles.containerSprints}
        >
          <h4>Sprint Prueba</h4>
          <p>Inicio: 2025-03-04</p>
          <p>Cierre: 2025-03-11</p>
          <div className={styles.buttons}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("hola");
              }}
              className={styles.visibilityButton}
            >
              <span className="material-symbols-outlined">visibility</span>
            </button>
            <button className={styles.editButton}>
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className={styles.deleteButton}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
