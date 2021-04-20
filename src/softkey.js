// import Navigation from "./navigation";
import Notes from './notes';

const getCurrentElement = () => document.querySelector("[nav-selected=true]");

const Enter = event => {
  const currentElement = getCurrentElement();
  // Creating a new note
  if (!currentElement) {
    window.onCustomNavigate('/new')
    setLabels({ left: 'Back', center: 'Save', right: 'Delete' });
    return;
  }
  currentElement.tagName === "INPUT"
    ? Notes.addNote(currentElement)
    : toggleToDo(currentElement);
};

const SoftRight = event => {
  const currentElement = getCurrentElement();
  if (currentElement.tagName === "INPUT") return;

  const currentIndex = parseInt(currentElement.getAttribute("nav-index"), 10);
  const allElementsSelectable = document.querySelectorAll("[nav-selectable]");
  const selectElement = allElementsSelectable[currentIndex - 1];
  // Navigation.selectElement(selectElement);

  if (currentIndex - 1 === 0) setLabels({ center: "Insert" });
  currentElement.remove();
};

const setLabels = ({ left, center, right }) => {
  document.getElementById("left").innerText = left ? left : "";
  document.getElementById("center").innerText = center ? center : "";
  document.getElementById("right").innerText = right ? right : "";
};

const addToDo = currentElement => {
  if (!currentElement.value.length) return;
  const toDos = document.getElementById("toDos");
  const node = document.createElement("SPAN");
  const text = document.createTextNode(currentElement.value);
  node.setAttribute("nav-selectable", "true");
  node.appendChild(text);
  toDos.appendChild(node);
  currentElement.value = "";
};

const toggleToDo = currentElement =>
  currentElement.classList.toggle("completed");

export default { Enter, SoftRight, setLabels };
