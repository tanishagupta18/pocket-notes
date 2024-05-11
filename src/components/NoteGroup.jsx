import { useNotes } from "../context/NoteContext";
import Empty from "./Empty";
import styles from "./noteGroup.module.css";
import { SingleGroup } from "./SingleGroup";

function NoteGroup() {
  const { currentGroup } = useNotes();
  return (
    <main className={styles.container}>
      {currentGroup ? <SingleGroup /> : <Empty />}
    </main>
  );
}

export default NoteGroup;
