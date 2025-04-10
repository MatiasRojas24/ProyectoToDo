import { useNavigate, useParams } from "react-router";
import { useSprintStore } from "../../../store/sprintStore";
import { useEffect, useState } from "react";
import { ISprint } from "../../../types/ISprint";
import styles from './SprintForm.module.css'



export const SprintForm = () => {
 const {id}= useParams();
 const navigate = useNavigate();
 const editing= Boolean(id);

 const{sprints, agregarSprint, actualizarSprint} = useSprintStore();

 const[formData,setFormData]= useState<ISprint>({
    nombre: '',
    fechaInicio: '',
    fechaCierre: '',
    tareas: [],
  });

  useEffect(()=>{
    if(editing){
      const sprintToEdit = sprints.find(sprint => sprint.id === id);
      if(sprintToEdit){
        setFormData(sprintToEdit);
      }
    }
  },[editing,id,sprints]);



  const handleChange =(e: React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value}= e.target;
    setFormData((prev)=> ({...prev,[name]: value}));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(editing && formData.id){
      actualizarSprint(formData);
    }else{
        const nuevoSprint = {...formData, id: crypto.randomUUID()};
        agregarSprint(nuevoSprint);
    }
    navigate('/sprint');
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{editing ? 'Editar Sprint' : 'Crear Sprint'}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.inputField}
          type="text"
          name="nombre"
          placeholder="Nombre del sprint"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          className={styles.inputField}
          type="date"
          name="fechaInicio"
          value={formData.fechaInicio}
          onChange={handleChange}
          required
        />
        <input
          className={styles.inputField}
          type="date"
          name="fechaCierre"
          value={formData.fechaCierre}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.submitButton}>
          {editing ? 'Guardar cambios' : 'Crear Sprint'}
        </button>
      </form>
    </div>
  ); 
}