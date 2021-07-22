import { boardsManager } from "./boardsManager.js";
import * as uiManager from "./uiManager.js"
import {initDragAndDrop} from "./dragAndDrop.js"

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

init();
