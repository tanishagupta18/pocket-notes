import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { capitalizeWords } from "../utils/helper";
const NoteContext = createContext();
const notesData = [
  {
    id: 1,
    group_name: "My Notes",
    notes: [
      {
        date: "9 Mar 2023 10:10AM",
        text: "Every productivity book on the planet, from David Allen to Benjamin Franklin, tells you more or less the same thing: wake up at the ass-crack of dawn and drink some stimulating liquid, segment your work periods into bite-sized chunks organized by urgency and importance, keep fastidious lists and calendars, and schedule appointments 15 weeks in advance and be early to everything.",
      },
      {
        date: "9 Mar 2023 10:10AM",
        text: "Every productivity book on the planet, from David Allen to Benjamin Franklin, tells you more or less the same thing: wake up at the ass-crack of dawn and drink some stimulating liquid, segment your work periods into bite-sized chunks organized by urgency and importance, keep fastidious lists and calendars, and schedule appointments 15 weeks in advance and be early to everything.",
      },
    ],
  },
  {
    id: 2,
    group_name: "Second",
    notes: [
      {
        date: "10 Mar 2023 11:00AM",
        text: "Another note with different content.",
      },
      {
        date: "10 Mar 2023 1:30PM",
        text: "Yet another unique note.",
      },
    ],
  },
];
function NoteProvider({ children }) {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notesData")) || []
  );
  const [currentGroup, setCurrentGroup] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Call on mount
    window.addEventListener("resize", handleResize); // Listen for resize events

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  function handleAddGroup(group, selectedColor) {
    const newGroup = {
      id: Date.now(),
      group_name: capitalizeWords(group),
      color: selectedColor,
      notes: [],
    };

    // Update notes state
    setNotes((prevNotes) => [...prevNotes, newGroup]);

    // Update localStorage with the new notes data
    localStorage.setItem("notesData", JSON.stringify([...notes, newGroup]));
  }
  function handleAddContent(groupId, content) {
    const currentDate = new Date().toISOString();

    setNotes((curr) => {
      // Find the group with the given groupId and update its notes array
      const updatedNotes = curr.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            notes: [{ date: currentDate, content: content }, ...group.notes],
          };
        }
        return group; // Return unchanged for other groups
      });
      localStorage.setItem("notesData", JSON.stringify(updatedNotes));
      return updatedNotes; // Return the updated notes array
    });
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        handleAddGroup,
        handleAddContent,
        currentGroup,
        setCurrentGroup,
        isMobileView,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

function useNotes() {
  const context = useContext(NoteContext);
  return context;
}
export { NoteProvider, useNotes };
