import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSprintStore } from '../../../store/sprintStore';
import styles from './SprintList.module.css';

export const SprintList = () => {
  const navigate = useNavigate();
  const { sprints, obtenerSprints, eliminarSprint } = useSprintStore();

  useEffect(() => {
    obtenerSprints();
  }, [obtenerSprints]);

  const handleEliminar = (id: string) => {
    if (confirm('¿Estás seguro de que querés eliminar este sprint?')) {
      eliminarSprint(id);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Sprints</h1>
      <button className={styles.crearButton} onClick={() => navigate('/sprints/new')}>
        Crear nuevo sprint
      </button>
  
      <div className={styles.listaSprints}>
        {sprints.map((sprint) => (
          <div key={sprint.id} className={styles.card}>
            <h3>{sprint.nombre}</h3>
            <p>Inicio: {sprint.fechaInicio}</p>
            <p>Cierre: {sprint.fechaCierre}</p>
            <div className={styles.botones}>
              <button onClick={() => navigate(`/sprints/edit/${sprint.id}`)} className={styles.btnEditar}>Editar</button>
              <button onClick={() => handleEliminar(sprint.id!)} className={styles.btnEliminar}>Eliminar</button>
              <button onClick={() => navigate(`/sprints/${sprint.id}`)} className={styles.btnVer}>Ver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};
