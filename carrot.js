const startBtn = document.querySelector('.startBtn');
const timeBox = document.querySelector('.timeBox');
const gamePoint = document.querySelector('.Point');
const modalBox = document.querySelector('.modalBox');
const playGround = document.querySelector('.playGround');
const itemImg = document.querySelectorAll('.itemImg');


let time = 10;
let point = 10;
const timeset = time;
const ponitset = point;
const startTime = `00:${timeset}`;
const startPoint = "10"
const IntervalNUM = '1000'
let playing = false;
const SHOWINGModal = 'showingModal';
const SHOWINGImg = 'showingImg'


function reStartModal(){
  if(time === 0 || time > 0 && point > 0){
    modalBox.innerHTML =`
    <div class="restartBox">
      <p>You Lose :(</p>
      <button class="reStart" type="button" name="button">try!</button>
    </div>
    `
  } else if(point === 0){
    modalBox.innerHTML =`
    <div class="restartBox">
      <p>You Win :)</p>
      <button class="reStart" type="button" name="button">again!</button>
    </div>
    `
    }
  modalBox.classList.add(SHOWINGModal);
  console.log(modalBox);
}

function stopGame(){
  playing = false;
  clearInterval(timeInterval);
  startBtn.disabled = true;
  startBtn.textContent = "END";
  reStartModal();
}

function timeCount(){
  startBtn.textContent = "STOP";
  startBtn.disabled = false;
  if(time <= timeset){
    time--;
    timeBox.innerText = `00:${time >= 10 ? `${time}` : `0${time}`}`
  }
  if(time <= 0){
    stopGame()
  }
}

function showCarrot(){
  let playRect = playGround.getBoundingClientRect();
  let playRectWidth = playRect.width;
  let playRectHeight = playRect.height;

  itemImg.forEach((arr) => {
    arr.classList.add(SHOWINGImg);
    arr.style.visibility = "visible"
    let randomLeft = Math.random()*playRectWidth;
    let randombottom = Math.random()*playRectHeight;
    arr.style.transform = `translate(${randomLeft}px,${randombottom}px)`;
  })
}

function removeCarrot(e){
  if(playing && e.target.classList.contains('carrotimg')){
      e.target.style.visibility = "hidden"
      point--;
      gamePoint.textContent = `${point}`;
      if(point <= 0){
        stopGame()
      }
    }
}

function bugClick(e){
  if(playing && e.target.classList.contains('bugimg')){
    stopGame();
  }
}

function playingStart(){
  if(playing){
    return;
  }
  playing = true;
  time = timeset;
  point = ponitset;
  timeBox.innerText = `00:${time >= 10 ? `${time}` : `0${time}`}`;
  gamePoint.textContent = `${point}`;
  timeInterval = setInterval(timeCount,IntervalNUM);
  modalBox.classList.remove(SHOWINGModal);
  showCarrot();
}

function init(){
  timeBox.innerText = startTime;
  gamePoint.innerText = startPoint;
}

startBtn.addEventListener('click',playingStart);
playGround.addEventListener('click',(e) => removeCarrot(e));
playGround.addEventListener('click',(e) => bugClick(e));
modalBox.addEventListener('click',(e) =>
  {e.target.tagName = 'BUTTON' && playingStart();
  console.log(modalBox)
  }
)

init()
