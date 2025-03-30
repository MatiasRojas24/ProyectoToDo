import { useState } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownToggle}
        onClick={() => setIsOpen(!isOpen)}
      >
        Seleccione una Sprint ▼
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownItem}>Opción 1</button>
          <button className={styles.dropdownItem}>Opción 2</button>
          <button className={styles.dropdownItem}>Opción 3</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
