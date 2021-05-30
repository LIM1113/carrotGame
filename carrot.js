const startBtn = document.querySelector('.startBtn');
const timeBox = document.querySelector('.timeBox');
const gamePoint = document.querySelector('.Point');
const modalBox = document.querySelector('.modalBox');
const playGround = document.querySelector('.playGround');
const itemImg = document.querySelectorAll('.itemImg');
const audioBg = document.querySelector('#audioBg')
const audioCarrot = document.querySelector('#audioCarrot')
const audioWin = document.querySelector('#audioWin')
const audioLose = document.querySelector('#audioLose')

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

/*오디오 설정*/
function loadAudio(){
  audioBg.load();
  audioBg.volume = 0.2;
  if(playing){
  audioCarrot.autoplay = true;
  } else if (!playing){
    audioBg.pause();
  }
}

function audioCarrotBg(e){
  if(playing && e.target.classList.contains('carrotimg')){
  audioCarrot.autoplay = true;
  audioCarrot.load();
  audioCarrot.volume = 0.5;
  }
}

function audioWinBg(){
  audioWin.autoplay = true;
  audioWin.load();
  audioWin.volume = 0.5;
}

function audioLoseBg(e){
  if(playing && e.target.classList.contains('bugimg')){
    audioLose.load();
    audioLose.autoplay = true;
    audioLose.volume = 0.5;
  }
}

/*재시작 모달*/
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
    audioWinBg();
    }
  modalBox.classList.add(SHOWINGModal);
}

/*게임 stop*/
function stopGame(){
  playing = false;
  loadAudio();
  clearInterval(timeInterval);
  startBtn.disabled = true;
  startBtn.textContent = "END";
  reStartModal();
}

/*시간 카운트*/
function timeCount(){
  startBtn.textContent = "STOP";
  startBtn.disabled = false;
  if(time <= timeset){
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
      gamePoint.textContent = `${point}`;
      if(point <= 0){
        stopGame()
      }
    }
}

/*버그 클릭 시 게임 stop*/
function bugClick(e){
  if(playing && e.target.classList.contains('bugimg')){
    stopGame();
  }
}

/*게임 시작*/
function playingStart(){
  if(playing){
    return;
  }
  playing = true;
  loadAudio();
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
  audioCarrotBg(e);
  audioLoseBg(e);
  removeCarrot(e);
  bugClick(e);
});
modalBox.addEventListener('click',(e) =>
  {e.target.tagName = 'BUTTON' && playingStart();
  }
)

/*최초 로딩시 시간, 포인트 설정*/
function init(){
  timeBox.innerText = startTime;
  gamePoint.innerText = startPoint;
}

init()
