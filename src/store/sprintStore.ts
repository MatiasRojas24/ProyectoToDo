import { create } from 'zustand';
import { ISprint } from '../types/ISprint';
import axios from 'axios';

interface SprintStore {
  sprints: ISprint[];
  obtenerSprints: () => Promise<void>;
  agregarSprint: (sprint: ISprint) => Promise<void>;
  actualizarSprint: (sprint: ISprint) => Promise<void>;
  eliminarSprint: (id: string) => Promise<void>;
}

export const useSprintStore = create<SprintStore>((set, get) => ({
  sprints: [],

  obtenerSprints: async () => {
    try {
      const response = await axios.get<{ sprints: ISprint[] }>('http://localhost:3000/sprintList');
      set({ sprints: response.data.sprints });
    } catch (error) {
      console.error('Error al obtener sprints:', error);
    }
  },

  agregarSprint: async (nuevoSprint) => {
    try {
      const estadoActual = get().sprints;
      const nuevosSprints = [...estadoActual, nuevoSprint];
      await axios.put('http://localhost:3000/sprintList', { sprints: nuevosSprints });
      set({ sprints: nuevosSprints });
    } catch (error) {
      console.error('Error al agregar sprint:', error);
    }
  },

  actualizarSprint: async (sprintEditado) => {
    try {
      const sprintsActualizados = get().sprints.map((s) =>
        s.id === sprintEditado.id ? sprintEditado : s
      );
      await axios.put('http://localhost:3000/sprintList', { sprints: sprintsActualizados });
      set({ sprints: sprintsActualizados });
    } catch (error) {
      console.error('Error al actualizar sprint:', error);
    }
  },

  eliminarSprint: async (id) => {
    try {
      const nuevos = get().sprints.filter((s) => s.id !== id);
      await axios.put('http://localhost:3000/sprintList', { sprints: nuevos });
      set({ sprints: nuevos });
    } catch (error) {
      console.error('Error al eliminar sprint:', error);
    }
  },
}));
