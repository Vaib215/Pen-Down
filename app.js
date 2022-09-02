const newNoteText = document.querySelector("body > form > textarea");
const clearBtn = document.querySelector("#clear-button");
const addBtn = document.querySelector("#add-button");
const themeBtn = document.querySelector("#theme-button");
const notesWrapper = document.querySelector(".notes-wrapper");

let notes = ["Add a new note that will change your life. Made by Vaib."];

const populateUI = () => {
  if (localStorage.getItem("notes")) {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notesWrapper.innerHTML = notes
    .map(note => {
      return `<div class="note-wrapper">
        <p>
        ${note}
        </p>
        <button id="delete-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2 4.8H13.8C13.8 4.32261 13.6104 3.86478 13.2728 3.52721C12.9352 3.18965 12.4774 3 12 3C11.5226 3 11.0648 3.18965 10.7272 3.52721C10.3896 3.86478 10.2 4.32261 10.2 4.8V4.8ZM8.99999 4.8C8.99999 4.00435 9.31606 3.24129 9.87867 2.67868C10.4413 2.11607 11.2043 1.8 12 1.8C12.7956 1.8 13.5587 2.11607 14.1213 2.67868C14.6839 3.24129 15 4.00435 15 4.8H21C21.1591 4.8 21.3117 4.86322 21.4243 4.97574C21.5368 5.08826 21.6 5.24087 21.6 5.4C21.6 5.55913 21.5368 5.71174 21.4243 5.82427C21.3117 5.93679 21.1591 6 21 6H19.7352L18.3024 18.4128C18.2011 19.2902 17.7808 20.0998 17.1214 20.6875C16.4621 21.2752 15.6096 21.5999 14.7264 21.6H9.27359C8.39034 21.5999 7.53793 21.2752 6.87856 20.6875C6.21919 20.0998 5.79887 19.2902 5.69759 18.4128L4.26479 6H2.99999C2.84086 6 2.68825 5.93679 2.57573 5.82427C2.46321 5.71174 2.39999 5.55913 2.39999 5.4C2.39999 5.24087 2.46321 5.08826 2.57573 4.97574C2.68825 4.86322 2.84086 4.8 2.99999 4.8H8.99999ZM6.88919 18.276C6.9569 18.8609 7.23725 19.4005 7.6769 19.7921C8.11654 20.1837 8.68481 20.4001 9.27359 20.4H14.7264C15.3152 20.4001 15.8834 20.1837 16.3231 19.7921C16.7627 19.4005 17.0431 18.8609 17.1108 18.276L18.5268 6H5.47319L6.88919 18.276ZM10.2 9C10.3591 9 10.5117 9.06322 10.6243 9.17574C10.7368 9.28826 10.8 9.44087 10.8 9.6V16.8C10.8 16.9591 10.7368 17.1117 10.6243 17.2243C10.5117 17.3368 10.3591 17.4 10.2 17.4C10.0409 17.4 9.88825 17.3368 9.77573 17.2243C9.66321 17.1117 9.59999 16.9591 9.59999 16.8V9.6C9.59999 9.44087 9.66321 9.28826 9.77573 9.17574C9.88825 9.06322 10.0409 9 10.2 9ZM14.4 9.6C14.4 9.44087 14.3368 9.28826 14.2243 9.17574C14.1117 9.06322 13.9591 9 13.8 9C13.6409 9 13.4883 9.06322 13.3757 9.17574C13.2632 9.28826 13.2 9.44087 13.2 9.6V16.8C13.2 16.9591 13.2632 17.1117 13.3757 17.2243C13.4883 17.3368 13.6409 17.4 13.8 17.4C13.9591 17.4 14.1117 17.3368 14.2243 17.2243C14.3368 17.1117 14.4 16.9591 14.4 16.8V9.6Z" fill="currentColor"/>
</svg>
        </button>
        </div>`;
    })
    .join("");
};

const toggleMode = e => {
  e.preventDefault();
  if (localStorage.getItem("theme")) {
    localStorage.setItem(
      "theme",
      localStorage.getItem("theme") === "dark" ? "light" : "dark"
    );
  } else {
    localStorage.setItem("theme", "light");
  }
  document
    .querySelector("html")
    .setAttribute("data-theme", localStorage.getItem("theme"));
};

const deleteNote = e => {
  e.preventDefault();
  if (e.target.id === "delete-button") {
    let noteToBeDeleted = e.target.parentElement.textContent.trim();
    notes = notes.filter(note => {
      return note.trim() !== noteToBeDeleted.trim();
    });
    localStorage.setItem("notes", JSON.stringify(notes));
    populateUI();
  }
};

const addNote = e => {
  e.preventDefault();
  if (newNoteText.value.trim() !== "") {
    notes.push(newNoteText.value);
  }
  localStorage.setItem("notes", JSON.stringify(notes));
  newNoteText.value = "";
  populateUI();
};

const clearNote = e => {
  e.preventDefault();
  newNoteText.value = "";
};

const handleClick = e => {
  if (e.target.id || e.target.classList) {
    if (e.target.id === "add-button") addNote(e);
    else if (e.target.id === "clear-button") clearNote(e);
    else if (e.target.id === "delete-button") deleteNote(e);
    else if (e.target.id === "theme-button") toggleMode(e);
  }
};

if (localStorage.getItem("theme") !== null) {
  document
    .querySelector("html")
    .setAttribute("data-theme", localStorage.getItem("theme"));
}

populateUI();
document.addEventListener("click", handleClick);
