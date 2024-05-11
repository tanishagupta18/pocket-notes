import React, { useEffect, useRef, useState } from "react";
import styles from "./modal.module.css";
import { useNotes } from "../context/NoteContext";
const colors = [
  { id: "color1", value: "#B38BFA" },
  { id: "color2", value: "#FF79F2" },
  { id: "color3", value: "#43E6FC" },
  { id: "color4", value: "#F19576" },
  { id: "color5", value: "#0047FF" },
  { id: "color6", value: "#6691FF" },
];
function Modal({ setOpenModal }) {
  const { notes, handleAddGroup } = useNotes();
  console.log(notes);
  const [errors, setErrors] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [name, setName] = useState("");
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpenModal(false);
        }
      }
      document.addEventListener("click", handleClick, true);
      return () => document.removeEventListener("click", handleClick, true);
    },
    [setOpenModal]
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an initial errors object
    let newErrors = {};

    // Validate the name field
    if (name.trim() === "") {
      newErrors.name = "This field is required";
    } else if (doesGroupExist(notes, name)) {
      newErrors.name = "This group already exists";
    }

    // Validate the color field
    if (!selectedColor) {
      newErrors.color = "This field is required";
    }

    // Set the errors state with new errors
    setErrors(newErrors);

    // Check if there are no errors before proceeding
    if (Object.keys(newErrors).length === 0) {
      handleAddGroup(name, selectedColor);
      setName(""); // Clear the input field
      setSelectedColor(null); // Reset the selected color
      setOpenModal(false); // Close the modal
    }
  };

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal} ref={ref}>
        <h2>Create New group</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <label htmlFor="grp_name" className={styles.label}>
              Group Name
            </label>
            <input
              className={styles.input_text}
              type="text"
              id="grp_name"
              name="grp_name"
              placeholder="Enter group name"
              onChange={(e) => setName(e.target.value)}
            />
            {errors?.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formRow}>
            <label htmlFor="color" className={styles.label}>
              Choose color
            </label>
            <div
              className="color-options"
              style={{ display: "flex", gap: "10px" }}
            >
              {colors.map((color) => (
                <React.Fragment key={color.id}>
                  <input
                    type="radio"
                    id={color.id}
                    name="color"
                    value={color.value}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    style={{ display: "none" }} // Hide default radio button
                  />
                  <label
                    htmlFor={color.id}
                    className="color-label"
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: color.value,
                      cursor: "pointer",
                      border:
                        selectedColor === color.value
                          ? "2px solid black"
                          : "2px solid transparent",
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
            {errors?.color && (
              <span className={styles.error}>{errors.color}</span>
            )}
          </div>
          <div className={styles.formRow}>
            <button className={styles.button}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}
// Function to check if a group name exists in the notesData array
function doesGroupExist(notesData, groupName) {
  console.log(notesData);
  return notesData.some(
    (group) => group.group_name.toLowerCase() === groupName.toLowerCase()
  );
}
export default Modal;
