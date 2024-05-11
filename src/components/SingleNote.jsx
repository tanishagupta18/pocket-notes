import styles from "./singleNote.module.css";
import { format } from "date-fns";

export const SingleNote = ({ note }) => {
  const storedDate = new Date(note.date);
  return (
    <div className={styles.container}>
      <div className={styles.actual_note}>{note.content}</div>
      <div className={styles.date_time_area}>
        <span>{format(storedDate, "dd MMM yyyy")}</span>
        <span>●</span>
        <span>{format(storedDate, "h:mm a")}</span>
      </div>
    </div>
  );
};
