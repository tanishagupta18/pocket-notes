import { useState } from "react";
import { useNotes } from "../context/NoteContext";
import Modal from "./Modal";
import styles from "./sideBar.module.css";
import { getGroupName } from "../utils/helper";
function SideBar() {
  const { notes: notesData, currentGroup, setCurrentGroup } = useNotes();
  const [openModal, setOpenModal] = useState(false);
  // const { currentGroup, setCurrentGroup } = useState(null);
  return (
    <aside className={styles.container}>
      <h1 className={styles.heading1}>Pocket Notes</h1>
      {notesData && (
        <nav>
          <ul className={styles.groups_list}>
            {notesData.map((group) => (
              //   console.log(group)
              <NavLink
                groupName={group.group_name}
                color={group.color}
                key={group.id}
                onClick={() => setCurrentGroup(group.id)}
                isActive={group.id === currentGroup}
              />
            ))}
          </ul>
        </nav>
      )}
      <div className={styles.addBtn} onClick={() => setOpenModal(true)}>
        +
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} />}
      {/* <Uploader /> */}
    </aside>
  );
}

function NavLink({ groupName, color, onClick, isActive }) {
  //console.log(groupName);
  const style = isActive ? { backgroundColor: "#2F2F2F2B" } : {};
  return (
    <li className={styles.navlink} onClick={onClick} style={style}>
      <span className={styles.img_circle} style={{ backgroundColor: color }}>
        {getGroupName(groupName)}
      </span>{" "}
      {groupName}
    </li>
  );
}

export default SideBar;
