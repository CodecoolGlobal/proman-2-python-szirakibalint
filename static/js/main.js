import { boardsManager } from "./boardsManager.js";
import * as uiManager from "./uiManager.js"

function init() {
  uiManager.initNewBoardDiv()
  uiManager.initNewBoardButton()
  boardsManager.loadBoards()
}

export function reset () {
  const root = document.querySelector('#root')
  root.innerHTML = ''
  init()
}

init();
