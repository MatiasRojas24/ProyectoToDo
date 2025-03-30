type EstadoTarea = "pendiente" | "completado" | "en proceso"
export interface ITarea {
    id?: string;
    titulo: string;
    descripcion: string;
    estado?: EstadoTarea;
    fechaLimite: string
}