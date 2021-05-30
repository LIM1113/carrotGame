'use strict'

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
const SHOWINGImg = 'showingImg';
let timeInterval = undefined;

/*오디오 설정*/
const carrotSound = new Audio("carrot/sound/carrot_pull.mp3");
const winSound = new Audio("carrot/sound/game_win.mp3");
const loseSound = new Audio("carrot/sound/bug_pull.mp3");
const bgSound = new Audio("carrot/sound/bg.mp3");

/*재시작 모달*/
function reStartModal(){
  if(time === 0 || time > 0 && point > 0){
    modalBox.innerHTML =`
    <div class="restartBox">
      <p>You Lose :(</p>
      <button class="reStart" type="button" name="button">try!</button>
    </div>
    `
    playSound(loseSound);
  } else if(point === 0){
    modalBox.innerHTML =`
    <div class="restartBox">
      <p>You Win :)</p>
      <button class="reStart" type="button" name="button">again!</button>
    </div>
    `
    playSound(winSound);
    }
  modalBox.classList.add(SHOWINGModal);
}

/*게임 stop*/
function stopGame(){
  playing = false;
  pauseSound(bgSound);
  clearInterval(timeInterval);
  startBtn.disabled = true;
  startBtn.textContent = "END";
  reStartModal();
}

/*시간 카운트*/
function timeCount(){
  startBtn.textContent = "STOP";
  startBtn.disabled = false;
  if(time <= timeset && time >= 1){
    playing = true;
    time--;
    timeBox.innerText = `00:${time >= 10 ? `${time}` : `0${time}`}`
  }
  if(time <= 0){
    playing = false;
    stopGame()
  }
}

/*랜덤한 위치에 당근과 벌레 display*/
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

/*당근 선택시 당근 hidden*/
function removeCarrot(e){
  if(playing && e.target.classList.contains('carrotimg')){
      e.target.style.visibility = "hidden"
      point--;
      playSound(carrotSound)
      gamePoint.textContent = `${point}`;
      if(point <= 0){
        stopGame()
      }
    }
}

function playSound(sound){
  sound.currentTime = 0;
  sound.play();
}

function pauseSound(sound){
  sound.pause();
}

/*버그 클릭 시 게임 stop*/
function bugClick(e){
  if(playing && e.target.classList.contains('bugimg')){
    playSound(loseSound);
    stopGame();
  }
}

/*게임 시작*/
function playingStart(){
  if(playing){
    return;
  }
  playing = true;
  playSound(bgSound);
  time = timeset;
  point = ponitset;
  timeBox.innerText = `00:${time >= 10 ? `${time}` : `0${time}`}`;
  gamePoint.textContent = `${point}`;
  timeInterval = setInterval(timeCount,IntervalNUM);
  modalBox.classList.remove(SHOWINGModal);
  showCarrot();
}

/*클릭 이벤트 설정&*/
startBtn.addEventListener('click',() => {
  playingStart();
});
playGround.addEventListener('click',(e) => {
  removeCarrot(e);
  bugClick(e);
});
modalBox.addEventListener('click',(e) =>{
    if(e.target.tagName === 'BUTTON'){
    playingStart();
    }
  }
)

/*최초 로딩시 시간, 포인트 설정*/
function init(){
  timeBox.innerText = startTime;
  gamePoint.innerText = startPoint;
}

init()
