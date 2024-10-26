const state = {
    view: {
      squares: document.querySelectorAll(".square"),
      enemy: document.querySelector(".enemy"),
      timeLeft: document.querySelector("#time-left"),
      score: document.querySelector("#score"),
      lifes: document.querySelector("#lifes"),
    },
    values: {
      timerId: null,
      countDownTimerId: setInterval(countDown, 1000),
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 11,
      lifes: 3,
    },
  };
  
  function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
  
    if (state.values.curretTime <= 0) {
      clearInterval(state.values.countDownTimerId);
      clearInterval(state.values.timerId);
  
      state.values.lifes--;
      state.view.lifes.textContent = state.values.lifes;
      state.values.hitPosition = null;
  
      if (state.values.lifes > 0) {
        const playAgain = confirm("Game Over! Seu resultado foi:  " + state.values.result + ". Quer jogar novamente?");
        if (playAgain) {
          resetGame(); 
        }
      } else {
        alert("Acabou! O seu resultado foi: " + state.values.result);
      }
    }
  }
  
  function resetGame() {
    
    state.values.curretTime = 10; // Reset time
    state.values.result = 0; // Reset score
    state.values.hitPosition = null; // Reset hit position
  
    
    state.view.squares.forEach((square) => square.classList.remove("enemy"));
  
    
    clearInterval(state.values.countDownTimerId);
    state.values.countDownTimerId = setInterval(countDown, 1000);
    moveEnemy();
    addListenerHitBox();
  }
  
  function playSound() {
    let audio = new Audio("../src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
  }
  
  function randomSquare() {
    state.view.squares.forEach((square) => square.classList.remove("enemy"));
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
  
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
  }
  
  function moveEnemy() {
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
  }
  
  function addListenerHitBox() {
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        if (square.id === state.values.hitPosition) {
          state.values.result++;
          state.view.score.textContent = state.values.result;
          state.values.hitPosition = null;
          playSound();
        }
      });
    });
  }
  
  function initialize() {
    moveEnemy();
    addListenerHitBox();
  }
  
  initialize();