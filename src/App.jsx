import "./App.css";
import NoteGroup from "./components/NoteGroup";
import SideBar from "./components/SideBar";
import { useNotes } from "./context/NoteContext";

function App() {
  const { isMobileView, currentGroup } = useNotes();
  return (
    <div className="container">
      {isMobileView ? (
        !currentGroup ? (
          <SideBar />
        ) : (
          <NoteGroup />
        )
      ) : (
        <>
          <SideBar />
          <NoteGroup />
        </>
      )}
    </div>
  );
}

export default App;
