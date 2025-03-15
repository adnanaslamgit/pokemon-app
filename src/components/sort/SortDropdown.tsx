import React from "react";
import styles from "./SortDropdown.module.scss";

interface SortDropdownProps {
  sortKey: string;
  setSortKey: (key: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ sortKey, setSortKey }) => {
  return (
    <div className={styles.sortContainer}>
      <select 
        value={sortKey} 
        onChange={(e) => setSortKey(e.target.value)} 
        className={styles.sortSelect}
      >
        <option value="name">🔠 Sort by Name</option>
        <option value="height">📏 Sort by Height</option>
        <option value="weight">⚖️ Sort by Weight</option>
      </select>
    </div>
  );
};

export default SortDropdown;
