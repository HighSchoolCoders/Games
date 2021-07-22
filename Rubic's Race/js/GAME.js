class GAME {
  colors = ["white", "yellow", "blue", "green", "red", "orange"];
  constructor(element) {
    this.element = element;
    this.element.innerHTML = this.createGameDiv();
    this.cells = element.querySelectorAll(".cell");
    this.smallCells = element.querySelectorAll(".small");
    this.randomizer = element.querySelector(".randomizer");
    this.randomizeCells = this.randomizer.querySelectorAll(".cell");
    this.addAttributes();
    this.createElements();
    console.log("Body is been loaded...");
    this.setDrag(true);
    this.randomize();
  }

  addAttributes() {
    this.smallCells.forEach((cell) => {
      cell.onclick = () => {
        this.clickMove(cell);
      };
      cell.addEventListener("dragstart", () => {
        cell.classList.add("dragging");
      });

      cell.addEventListener("dragend", () => {
        this.setDrag(false);
        this.element.querySelector(".dragging").classList.remove("dragging");
        this.checkForWin();
        this.setDrag(true);
      });
    });
    this.cells.forEach((cell) => {
      cell.addEventListener("dragover", () => {
        const draggable = this.element.querySelector(".dragging");
        var cls = cell.querySelector(".small");
        if (cls.className.length < 6) {
          var temp = draggable.className;
          draggable.className = "small";
          cls.className = temp;
        }
      });
    });
  }

  createGameDiv() {
    return `<div class="container"><div class="lid"><div class="border_outer"></div><div class="border_inner"></div><div class="text"><p>RUBIK'S</p><p>RACE</p></div></div><div class="game-board">${this.gameBoard()}</div></div><div class="randomizer"><div class="cells"><div class="cell yellow"></div><div class="cell yellow"></div><div class="cell yellow"></div><div class="cell blue"></div><div class="cell blue"></div><div class="cell blue"></div><div class="cell green"></div><div class="cell green"></div><div class="cell orange"></div></div><p>RANDOMIZER</p></div></div>`;
  }

  gameBoard() {
    var content = "";
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 4; j++)
        content += `<div class="cell"><div class="small ${
          this.colors[i]
        }" id="${i * 5 + (j + 1)}"></div></div>`;
      if (i == 4) {
        content += `<div class="cell"><div class="small" id="${
          i * 5 + (j + 1)
        }"></div></div>`;
        continue;
      }
      content += `<div class="cell"><div class="small ${this.colors[5]}" id="${
        i * 5 + (j + 1)
      }"></div></div>`;
    }
    return content;
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * 6)];
  }

  randomize() {
    this.randomizeCells.forEach((cell) => {
      cell.className = `cell ${this.randomColor()}`;
    });
    this.checkRepeatMoreThan4();
  }

  createElements() {
    this.gameArr = [];

    for (var i = 0; i < 5; i++) {
      var temp = [];
      for (var j = 0; j < 5; j++) temp.push(this.smallCells[i * 5 + j]);
      this.gameArr.push(temp);
    }

    this.arr = [];
    for (var i = 1; i <= 3; i++)
      for (var j = 1; j <= 3; j++) this.arr.push(this.smallCells[i * 5 + j]);
  }

  tileAllMatches() {
    for (var i = 0; i < 9; i++) {
      var temp = this.randomizeCells[i].className.split(" ")[1];
      if (!this.arr[i].classList.contains(temp)) return false;
    }
    return true;
  }

  checkForWin() {
    if (this.tileAllMatches()) {
      this.element.querySelector(".lid").classList.toggle("active");
      setTimeout(() => {
        this.arr.forEach((item) => {
          item.parentElement.style.zIndex = 5;
        });
      }, 2500);
    }
  }

  checkPosition() {
    var x, y; // x = array, y = sub-array
    for (var i = 0; i < 5; i++)
      for (var j = 0; j < 5; j++)
        if (this.gameArr[i][j].className.length <= 5) {
          (x = i), (y = j);
          break;
        }
    return { x: x, y: y };
  }

  setDrag(bool) {
    if (bool) {
      var temp = this.checkPosition();
      this.x = temp.x;
      this.y = temp.y;
    }
    if (this.x != 0) this.toggleClass(this.x - 1, this.y, bool);
    if (this.x != 4) this.toggleClass(this.x + 1, this.y, bool);
    if (this.y != 0) this.toggleClass(this.x, this.y - 1, bool);
    if (this.y != 4) this.toggleClass(this.x, this.y + 1, bool);
  }

  toggleClass(x, y, bool) {
    this.gameArr[x][y].setAttribute("draggable", bool);
    if (bool) this.gameArr[x][y].classList.add("move");
    else this.gameArr[x][y].classList.remove("move");
  }

  clickMove(el) {
    var p = {
      x: Math.floor((el.id - 1) / 5),
      y: Math.floor((el.id - 1) % 5),
    };

    if (p.x != 0 && this.gameArr[p.x - 1][p.y].className.length <= 5)
      this.move(el);
    if (p.x != 4 && this.gameArr[p.x + 1][p.y].className.length <= 5)
      this.move(el);
    if (p.y != 0 && this.gameArr[p.x][p.y - 1].className.length <= 5)
      this.move(el);
    if (p.y != 4 && this.gameArr[p.x][p.y + 1].className.length <= 5)
      this.move(el);

    this.checkForWin();
  }

  move(el) {
    this.setDrag(false);
    var temp = el.className;
    el.className = "small";
    this.gameArr[this.x][this.y].className = temp;
    this.setDrag(true);
  }

  checkRepeatMoreThan4() {
    this.colors.forEach((color) => {
      var i = 0;
      this.randomizeCells.forEach((item) => {
        if (item.classList.contains(color)) i++;
      });
      if (i > 4) this.randomize();
    });
  }
}

const app = document.getElementById("app");
const game = new GAME(app);

// document.querySelector("svg.fa-redo-alt").onclick = () => {
//   game.spin();
//   game.randomize();
// };

function spin() {
  var refresh = gsap.timeline({ defaults: { duration: 0.5 } });
  refresh
    .to("svg.fa-redo-alt", { rotate: "720deg" })
    .to("svg.fa-redo-alt", { rotate: "0deg", duration: 0 });
}



// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   e.returnValue = '';
// });
