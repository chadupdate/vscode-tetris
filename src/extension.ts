// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-tetris.game', () => {
			const panel = vscode.window.createWebviewPanel(
				'tetrisGame',
				'Tetris Game',
				vscode.ViewColumn.One,
				{enableScripts: true,retainContextWhenHidden: true}
			);

			// 设置HTML内容
			panel.webview.html = getWebviewContent();
		})
	);
}

function getWebviewContent():string {
	return `<!DOCTYPE html>
	<html lang="en">
	
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1.0">
	  <title>Tetris</title>
	  
	  <style>
		body {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.grid {
	  width: 300px;
	  height: 600px;
	  background-color: aquamarine;
	  display: flex;
	  flex-wrap: wrap;
	}
	
	.grid div {
	  height: 30px;
	  width: 30px; 
	}
	
	#container {
	  margin-top: 10vh;
	  border: burlywood 7px solid;
	  display: flex;
	  border-radius: 2%;
	}
	
	.tetromino {    
	  border: solid 3px;
	  border-color: white gray gray white;
	  -webkit-box-sizing: border-box;
	  -moz-box-sizing: border-box;
	  box-sizing: border-box;
	}
	
	.mini-grid {
	  margin: 0px 50px 10px 50px;
	  width: 120px;
	  height: 120px;
	  display: flex;
	  flex-wrap: wrap;
	  background-color: darkseagreen;
	  border: black 4px double;
	}
	
	.mini-grid div {
	  height: 30px;
	  width: 30px;
	}
	
	.info {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  background-color: rgb(132, 181, 209);
	}
	
	h2 {
	  border: black 4px double;
	  padding: 10px 25px 10px 25px;
	}
	
	h3 {
	  border: black 4px double;
	  padding: 10px 15px 10px 15px;
	  border-radius: 20px;
	}
	
	#start-button {
	  position: relative;
	  background-color: rgb(177, 153, 223);
	  border: none;
	  font-size: 16px;
	  color: #FFFFFF;
	  padding: 10px;
	  width: 130px;
	  text-align: center;
	  transition-duration: 0.4s;
	  text-decoration: none;
	  overflow: hidden;
	  cursor: pointer;
	  margin-top: 15px;
	}
	
	#start-button:after {
	  content: "";
	  background: #f1f1f1;
	  display: block;
	  position: absolute;
	  padding-top: 300%;
	  padding-left: 350%;
	  margin-left: -20px !important;
	  margin-top: -120%;
	  opacity: 0;
	  transition: all 0.8s
	}
	
	#start-button:active:after {
	  padding: 0;
	  margin: 0;
	  opacity: 1;
	  transition: 0s
	}
	
	.intro {  
	  width: 75%;  
	}
	
	.keyBoard0 {
	  display: flex;
	  align-items: center;
	  justify-content: space-around;  
	  margin: 20px 0 20px 0;
	}
	
	.keyBoard1 {
	  display: flex;
	  justify-content: center;  
	  margin-top: 10px;
	}
	
	.keyBoard2 {  
	  display: flex;
	  justify-content: center;
	  margin: 5px 0px 5px 0px;
	}
	
	.keyBoard3 {  
	  display: flex;
	  justify-content: center;
	}
	
	.keyBoard3 div{  
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  margin: 5px;
	}
	
	.keyBoard3 p {
	  margin-top: 5px;
	}
	
	.intro button {
	  height: 35px;
	  width: 35px;
	}
	
	.keyBoard0 button {
	  width: 70px;
	}
	
	.controller {
	  background-color: gainsboro;
	  display: flex;
	  justify-content: center;
	  padding: 5px 10px 15px 10px;  
	}
	
	@media (max-width: 768px) {
	  .info {
		display: none;
	  }
	
	  .intro {    
		justify-content: center;
	  }
	  
	  #container {
		flex-direction: column;
	  }
	}
	
	@media screen and (min-width: 768px) {
	  .controller {
		display: none;
	  }
	}
	  </style>
	
	</head>
	
	<body>
	  <div id="container">
		<div class="grid"></div>
			<div class="controller">
			  <button id="start-button1">Start / Pause</button>
			  <div class="intro">
				<div class="keyBoard1" disabled>Rotate</div>
				<div class="keyBoard2" disabled>
				  <button class="upForMobile">↑</button>
				</div>
				<div class="keyBoard3" disabled>
				  <div>
					<button class="leftForMobile">←</button>
					<P>Right</P>
				  </div>
				  <div>
					<button class="downForMobile">↓</button>
					<P>Down</P>
				  </div>
				  <div>
					<button class="rightForMobile">→</button>
					<P>Left</P>
				  </div>
				</div>
			
			  </div>
			</div>
		<div class="info">
		  <h2>NEXT</h2>
		  <div class="mini-grid"></div>
		  <h3>Score: <span id="score">0</span></h3>
		  <button id="start-button">Start / Pause</button>
		  <div class="intro">
			<div class="keyBoard0" disabled>
			  <button class="rotate">Ctrl</button><span>Rotate</span></div>
			<div class="keyBoard1" disabled>Rotate</div>
					<div class="keyBoard2" disabled>
					  <button class="up">↑</button>
					</div>
			<div class="keyBoard3" disabled>
			  <div>
				<button class="left">←</button>
				<P>Right</P>
			  </div>
			  <div>
				<button class="down">↓</button>
				<P>Down</P>
			  </div>
			  <div>
				<button class="right">→</button>
				<P>Left</P>
			  </div>
			</div>
		
		  </div>
		</div>
	
	  </div>
	
	  <script type=""text/javascript">
	  const view = {
	  creatGirds() {
		const grid = document.querySelector(".grid")
		let girds = ""
		for (let i = 0; i < 210; i++) {
		  if (i < 200) {
			girds += "<div></div>"
		  } else {
			girds += "<div class='taken'></div>"
		  }
		}
		grid.innerHTML = girds
		const miniGrid = document.querySelector(".mini-grid")
		miniGrids = ""
		for (let j = 0; j < 16; j++) {
		  miniGrids += "<div class=''></div>"
		}
		miniGrid.innerHTML = miniGrids
	  },
	  draw() {
		model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].classList.add("tetromino"))
		model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].style.backgroundColor = model.colors[model.index])
	  },
	  undraw() {
		model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].classList.remove("tetromino"))
		model.currentTetromino.forEach(index => model.squares[model.currentPosition + index].style.backgroundColor = "")
	  },
	  displayNextTetromino() {
		const displaySquares = document.querySelectorAll(".mini-grid div")
		displaySquares.forEach(square => {
		  square.classList.remove("tetromino")
		  square.style.backgroundColor = ""
		})
		model.nextTetromino.forEach(index => {
		  displaySquares[1 + index].classList.add("tetromino")
		  displaySquares[1 + index].style.backgroundColor = model.colors[model.nextIndex]
		})
	  },
	  checkAndRemoveGrids() {
		for (let i = 0; i < 200; i += model.width) {
		  const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9]
		  const isARowTetrominoes = row.every(index => model.squares[index].classList.contains("taken"))
		  if (isARowTetrominoes) {
			model.numOfRemovedRow++
			const grid = document.querySelector(".grid")
			row.forEach(index => {
			  model.squares[index].classList.remove("tetromino", "taken")
			  model.squares[index].style.backgroundColor = ""
			})
			const squaresRemoved = model.squares.splice(i, model.width)
			model.squares = squaresRemoved.concat(model.squares)
			model.squares.forEach(cell => grid.appendChild(cell))
		  }
		}
	  }
	}
	
	const controller = {
	  displayGame() {
		model.initiGame()
		view.draw()
		model.createNextNextTetromino()
		view.displayNextTetromino()
		document.addEventListener("keyup", controller.control)
		document.addEventListener("keydown", controller.rush)
		model.timerId = setInterval(this.moveDown, model.speed)
		this.pause()
		this.mouseControl()
	  },
	  moveDown() {
		const currentPosition = model.currentPosition
		const current = model.currentTetromino
		const squares = model.squares
		const width = model.width
		const isCollision = current.some(index => squares[currentPosition + index + width].classList.contains("taken"))
		if (isCollision) {
		  controller.freeze()
		} else {
		  view.undraw()
		  model.currentPosition += model.width
		  view.draw()
		}
	  },
	  rush(event) {
		switch (event.keyCode) {
		  // case 37:
		  //   controller.moveLeft()
		  //   break;
		  // case 39:
		  //   controller.moveRight()
		  //   break;
		  case 40:
			controller.moveDown()
			break;
		}
	  },
	  freeze() {
		const currentPosition = model.currentPosition
		const width = model.width
		const current = model.currentTetromino
		const squares = model.squares
		const isCollision = current.some(index => squares[currentPosition + index + width].classList.contains("taken"))
		if (isCollision) {
		  current.forEach(index => squares[currentPosition + index].classList.add("taken"))
		  model.renewTetromino()
		  model.createNextNextTetromino()
		  view.displayNextTetromino()
		  view.checkAndRemoveGrids()
		  view.draw()
		  model.addScore()
		  this.gameOver()
		}
	  },
	  moveLeft() {
		const current = model.currentTetromino
		const width = model.width
		const squares = model.squares
		const currentPosition = model.currentPosition
	
		const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
		const isCollision = current.some(index => squares[currentPosition + index - 1].classList.contains("taken"))
		if (!isAtLeftEdge && !isCollision) {
		  view.undraw()
		  model.currentPosition--
		  view.draw()
		}
	  },
	  moveRight() {
		const width = model.width
		const squares = model.squares
		const current = model.currentTetromino
		const currentPosition = model.currentPosition
		const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
		const isCollision = current.some(index => squares[currentPosition + index + 1].classList.contains("taken"))
		if (!isAtRightEdge && !isCollision) {
		  view.undraw()
		  model.currentPosition++
		  view.draw()
		}
	  },
	  rotate() {
		const width = model.width
		const squares = model.squares
		const currentPosition = model.currentPosition
		const nextRotation = model.currentRotation + 1 === model.currentTetromino.length ? 0 : model.currentRotation + 1
		// 下一個旋轉位置
		const nextTetromino = model.createTetromino(nextRotation)
		const nextIsAtLeftEdge = nextTetromino.some(index => (currentPosition + index) % width === 0)
		const nextIsAtRightEdge = nextTetromino.some(index => (currentPosition + index) % width === width - 1)
		// 目前位置
		const current = model.currentTetromino
		const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
		const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1 || (currentPosition + index) % width === width - 2)
		const backWard = nextTetromino.filter(index => (currentPosition + index) % width === 0 || (currentPosition + index) % width === 1)
		const isCollision = nextTetromino.some(index => squares[currentPosition + index].classList.contains("taken"))
		if (isCollision) {
		  return
		} else {
		  view.undraw()
		  if (nextIsAtLeftEdge & isAtRightEdge) {        
			// 另一種想法，如果有兩格跑到另一側，那就退後兩格
			model.currentPosition -= backWard.length
		  } else if (nextIsAtRightEdge & isAtLeftEdge) {
			model.currentPosition++
		  }
		  model.currentRotation++
		  if (model.currentRotation === model.currentTetromino.length) {
			model.currentRotation = 0
		  }
		  model.currentTetromino = model.createTetromino()
		  view.draw()
		}
	  },
	  control(event) {
		switch (event.keyCode) {
		  case 37:
			controller.moveLeft()
			break;
		  case 38:
			controller.rotate()
			break;
		  case 17:
			controller.rotate()
			break;
		  case 39:
			controller.moveRight()
			break;
		  case 40:
			controller.moveDown()
			break;
		}
	  },
	  mouseControl() {
		const control = {
		  rotate: controller.rotate,
		  up: controller.rotate,
		  down: controller.moveDown,
		  right: controller.moveRight,
		  left: controller.moveLeft
		}
		const controlForMobile = {      
		  upForMobile: controller.rotate,
		  downForMobile: controller.moveDown,
		  rightForMobile: controller.moveRight,
		  leftForMobile: controller.moveLeft
		}
		const arr = Object.keys(control)
		const arrForMobile = Object.keys(controlForMobile)
		arr.forEach(name => {
		  utility.addController(name, control)
		})
		arrForMobile.forEach(name => {
		  utility.addController(name, controlForMobile)
		})
	  },
	  pause() {
		const startBtn = document.getElementById("start-button")
		startBtn.addEventListener("click", () => {
		  if (model.timerId) {
			clearInterval(model.timerId)
			model.timerId = null
		  } else {
			model.timerId = setInterval(this.moveDown, model.speed)
		  }
		})
		const startBtn1 = document.getElementById("start-button1")
		startBtn1.addEventListener("click", () => {
		  if (model.timerId) {
			clearInterval(model.timerId)
			model.timerId = null
		  } else {
			model.timerId = setInterval(this.moveDown, model.speed)
		  }
		})
	  },
	  gameOver() {
		const score = document.querySelector("h3")
		const isCollision = model.currentTetromino.some(index => model.squares[model.currentPosition + index].classList.contains("taken"))
		if (isCollision) {
		  score.innerText = "Game Over！"
		  clearInterval(model.timerId)
		}
	  }
	}
	
	const model = {
	  tetrominoes(width = this.width) {
		const tetrominoJ = [
		  [1, width + 1, width * 2 + 1, 2],
		  [width, width + 1, width + 2, width * 2 + 2],
		  [1, width + 1, width * 2 + 1, width * 2],
		  [width, width * 2, width * 2 + 1, width * 2 + 2]
		]
		const tetrominoL = [
		  [0, 1, width + 1, width * 2 + 1],
		  [width, width + 1, width + 2, 2],
		  [1, width + 1, width * 2 + 1, width * 2 + 2],
		  [width, width + 1, width + 2, width * 2]
		]
		const tetrominoS = [
		  [0, width, width + 1, width * 2 + 1],
		  [width + 1, width + 2, width * 2, width * 2 + 1],
		  [0, width, width + 1, width * 2 + 1],
		  [width + 1, width + 2, width * 2, width * 2 + 1]
		]
		const tetrominoZ = [
		  [1, width, width + 1, width * 2],
		  [width, width + 1, width * 2 + 1, width * 2 + 2],
		  [1, width, width + 1, width * 2],
		  [width, width + 1, width * 2 + 1, width * 2 + 2]
		]
		const tetrominoT = [
		  [1, width, width + 1, width + 2],
		  [1, width + 1, width + 2, width * 2 + 1],
		  [width, width + 1, width + 2, width * 2 + 1],
		  [1, width, width + 1, width * 2 + 1]
		]
		const tetrominoO = [
		  [0, 1, width, width + 1],
		  [0, 1, width, width + 1],
		  [0, 1, width, width + 1],
		  [0, 1, width, width + 1]
		]
		const tetrominoI = [
		  [1, width + 1, width * 2 + 1, width * 3 + 1],
		  [width, width + 1, width + 2, width + 3],
		  [1, width + 1, width * 2 + 1, width * 3 + 1],
		  [width, width + 1, width + 2, width + 3]
		]
		return [
		  tetrominoJ,
		  tetrominoL,
		  tetrominoS,
		  tetrominoZ,
		  tetrominoT,
		  tetrominoO,
		  tetrominoI
		]
	  },
	  width: 10,
	  currentPosition: 4,
	  currentRotation: 0,
	  currentTetromino() {
		return this.createTetromino()
	  },
	  currentTetromino: [],
	  nextTetromino: [],
	  index: -1,
	  nextIndex: -1,
	  score: 0,
	  speed: 1000,
	  numOfRemovedRow: 0,
	  timerId: null,
	  colors: ["yellow", "greenyellow", "orange", "pink", "cyan", "darksalmon", "cornflowerblue"],
	  createTetromino(currentRotation = this.currentRotation, index = this.index, width) {
		return this.tetrominoes(width)[index][currentRotation]
	  },
	  renewTetromino() {
		// 將下一個Tetromino移動到現在的Tetromino，使用nextIndex提取
		model.currentTetromino = model.createTetromino(0, model.nextIndex, model.width)
		// 重新建立位置
		model.currentPosition = 4
		// 紀錄現在的index，使旋轉時知道是哪種Tetromino在旋轉
		model.index = model.nextIndex
		// 指定下一個Tetromino
		model.nextIndex = utility.randomIndex(model.tetrominoes())
	  },
	  initiGame() {
		view.creatGirds()
		model.index = utility.randomIndex(model.tetrominoes())
		model.currentTetromino = model.createTetromino()
		model.squares = Array.from(document.querySelectorAll(".grid div"))
	  },
	  createNextNextTetromino() {
		model.nextIndex = utility.randomIndex(model.tetrominoes())
		model.nextTetromino = model.createTetromino(0, model.nextIndex, 4)
	  },
	  addScore() {
		const score = document.getElementById("score")
		switch (model.numOfRemovedRow) {
		  case 0:
			break
		  case 1:
			model.score += 2
			model.speed = model.speed < 100 ? 100 : model.speed - 10
			break
		  case 2:
			model.score += 4
			model.speed = model.speed < 100 ? 100 : model.speed - 20
			break
		  case 3:
			model.score += 8
			model.speed = model.speed < 100 ? 100 : model.speed - 40
			break
		  case 4:
			model.score += 16
			model.speed = model.speed < 100 ? 100 : model.speed - 80
			break
		}
		clearInterval(model.timerId)
		model.timerId = null
		model.timerId = setInterval(controller.moveDown, model.speed)
		model.numOfRemovedRow = 0
		score.innerText = model.score
	  }
	}
	
	const utility = {
	  randomIndex(array) {
		return Math.floor(Math.random() * array.length)
	  },
	  addController(name, movement) {
		const site = document.querySelector("."+name)
		console.log(site)
		site.addEventListener("click", () => {
		  movement[name]()
		})
	  }
	}
	
	controller.displayGame()
	  </script>
	</body>
	
	</html>`;
  }

// This method is called when your extension is deactivated
export function deactivate() {}
