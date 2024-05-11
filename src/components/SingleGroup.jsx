import styles from "./singleGroup.module.css";
import sendIcon from "../assets/icons/send-icon.svg";
import sendColorIcon from "../assets/icons/send-colorful-icon.svg";
import backIcon from "../assets/icons/back-arrow.svg";
import { getGroupName } from "../utils/helper";
import { useState } from "react";
import { useNotes } from "../context/NoteContext";
import { SingleNote } from "./SingleNote";

export const SingleGroup = () => {
  const {
    currentGroup,
    setCurrentGroup,
    notes: groups,
    handleAddContent,
  } = useNotes();

  const newGrp = groups.filter((grp) => grp.id === currentGroup);

  const [content, setContent] = useState("");

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!content) {
      return;
    }
    handleAddContent(newGrp[0].id, content);
    setContent("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.groupName}>
        <div className={styles.groupContent}>
          <div
            className={styles.backArrow}
            onClick={() => {
              setCurrentGroup(null);
            }}
          >
            <img src={backIcon} alt="" />
          </div>
          <div
            className={styles.img_circle}
            style={{ backgroundColor: newGrp[0].color }}
          >
            <p>{getGroupName(newGrp[0].group_name)}</p>
          </div>

          <h4>{newGrp[0].group_name}</h4>
        </div>
      </div>

      <div className={styles.allNotes}>
        {newGrp[0].notes?.length === 0 && <p>No Notes to display!</p>}

        {newGrp[0].notes?.map((note) => (
          <SingleNote key={note.date} note={note} />
        ))}
      </div>

      <form className={styles.message_container} onSubmit={handleCreateNote}>
        <textarea
          className={styles.message}
          rows="6"
          placeholder="Here’s the sample text for sample work"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCreateNote(e);
            }
          }}
        />

        {content?.trim() ? (
          <img
            onClick={handleCreateNote}
            src={sendColorIcon}
            alt="Send"
            className={styles.sendIcon}
            title="Send"
          />
        ) : (
          <img src={sendIcon} alt="Send" className={styles.sendIcon} />
        )}
      </form>
    </div>
  );
};
