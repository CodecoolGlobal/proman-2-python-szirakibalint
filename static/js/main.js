import { boardsManager } from "./boardsManager.js";
import * as uiManager from "./uiManager.js"
import {initDragAndDrop} from "./dragAndDrop.js"
import {dataHandler} from "./dataHandler.js"

export async function updateIsOpen() {
  const boards = await dataHandler.getBoards();
  const boardIds = boards.map(board => board.id);
  const isOpen = JSON.parse(localStorage.getItem("isOpen")) ? JSON.parse(localStorage.getItem("isOpen")) : {};
  boardIds.forEach(id => isOpen[id] = isOpen[id] ? isOpen[id] : false);
  localStorage.setItem("isOpen", JSON.stringify(isOpen));
}


async function init() {
  uiManager.initNewBoardDiv()
  uiManager.initNewBoardButton()
  await boardsManager.loadBoards()
  initDragAndDrop()
}

export async function reset () {
  const root = document.querySelector('#root')
  root.innerHTML = ''
  await init()
}

await updateIsOpen();
await init();
