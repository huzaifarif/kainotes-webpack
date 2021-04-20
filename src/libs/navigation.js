const selectdefault = () => {
  const firstElement = document.querySelectorAll("[nav-selectable]")[0];
  firstElement.setAttribute("nav-selected", "true");
  firstElement.setAttribute("nav-index", "0");
  firstElement.focus();
};

const getAllElements = () => document.querySelectorAll("[nav-selectable]");

const getTheIndexOfTheSelectedElement = () => {
  const element = document.querySelector("[nav-selected=true]");
  return element ? parseInt(element.getAttribute("nav-index"), 10) : 0;
};

const selectElement = selectElement =>
  [].forEach.call(getAllElements(), (element, index) => {
    const selectThisElement = element === selectElement;
    element.setAttribute("nav-selected", selectThisElement);
    element.setAttribute("nav-index", index);
    if (element.nodeName === 'INPUT' || 'TEXTAREA') {
      selectThisElement ? element.focus() : element.blur();
    }
  });

const Down = event => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement();
  const goToFirstElement = currentIndex + 1 > allElements.length - 1;
  const setIndex = goToFirstElement ? 0 : currentIndex + 1;
  selectElement(allElements[setIndex] || allElements[0]);
};

const Up = event => {
  const allElements = getAllElements();
  const currentIndex = getTheIndexOfTheSelectedElement();
  const goToLastElement = currentIndex === 0;
  const setIndex = goToLastElement ? allElements.length - 1 : currentIndex - 1;
  selectElement(allElements[setIndex] || allElements[0]);
};

export default { Down, Up, selectElement, selectdefault, getTheIndexOfTheSelectedElement };
