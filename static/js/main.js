import { boardsManager } from "./boardsManager.js";
import * as uiManager from "./uiManager.js"

function init() {
  uiManager.initNewBoardDiv()
  uiManager.initNewBoardButton()
  boardsManager.loadBoards()
}

init();
