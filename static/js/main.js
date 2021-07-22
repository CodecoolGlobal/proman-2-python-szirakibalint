import { boardsManager } from "./boardsManager.js";
import * as uiManager from "./uiManager.js"
import {initDragAndDrop} from "./dragAndDrop.js"
import {dataHandler} from "./dataHandler.js"

async function realInit() {
  const boards = await dataHandler.getBoards();
  const boardIds = boards.map(board => board.id);

  const isOpen = JSON.parse(localStorage.getItem("isOpen")) ? JSON.parse(localStorage.getItem("isOpen")) : {};

  boardIds.forEach(id => isOpen[id] = isOpen[id] ? isOpen[id] : false);
  localStorage.setItem("isOpen", JSON.stringify(isOpen));
}


function init() {
  uiManager.initNewBoardDiv()
  uiManager.initNewBoardButton()
  boardsManager.loadBoards()
  initDragAndDrop()
}

export function reset () {
  const root = document.querySelector('#root')
  root.innerHTML = ''
  init()
}

await realInit();
init();
