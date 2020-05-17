'use strict';

/*

*/
{
//タイピングする問題文を定義
const words = [
  'apple',
  'sky',
  'blue',
  'middle',
  'set',
]

let word;

//更新される変数を初期化しておく
let loc;
let score;
let miss;
let startTime;
let isPlaying = false;

//再代入を必要としない変数を宣言する
const target = document.getElementById('target');
const scoreLabel = document.getElementById('score');
const missLabel = document.getElementById('miss');
const timerLabel = document.getElementById('timer');
const timeLimit = 3 * 1000;


//打った文字をアンダーバーに変えて打った文字を分かりやすくする処理を定義する
function updateTarget(){
  let placeholder = '';
  for(let i = 0 ; i < loc; i++){
    placeholder += '_';
  }
  target.textContent = placeholder+ word.substring(loc);
}

//残り時間を表示し、カウントダウンする処理を行い、残り時間が０になった時に処理を止める
function updateTimer(){
  const timeLeft = startTime + timeLimit - Date.now();
  timerLabel.textContent = (timeLeft / 1000).toFixed(2);
  console.log(timeLeft);

  //カウントダウンの処理
  const timeoutId = setTimeout( () => {
   updateTimer();
  },10);

  if(timeLeft < 0){
    isPlaying = false;

    clearTimeout(timeoutId);
    timerLabel.textContent = '0.00';

    //アラートをすこし遅れて表示させる
    setTimeout(() => {
      showResult();
      console.log(timeLeft);
    },100);
    //リプレイと表示
    target.textContent = 'click to replay';
    
  }
}

//正答率を表示する
function showResult() {
  const accuracy = score + miss === 0 ? 0: score / (score + miss) * 100;
  alert(`${score} letters,${miss} misses,${accuracy.toFixed(2)}% accuracy!`);
}

/*クリックでゲームが始まり、順番に文字列が入れ替わる
残り時間をクリック時に呼び出す
値を初期化する
 */
window.addEventListener('click',()=>{
  if(isPlaying  === true){
    return;
  }
  isPlaying = true;

  //値の初期化処理をする
  loc = 0;
  score = 0;
  miss = 0;
  scoreLabel.textContent = score;
  missLabel.textContent = miss;
  word = words[Math.floor(Math.random() * words.length)];

  target.textContent = word;
  startTime = Date.now();
  updateTimer();
});

//
window.addEventListener('keydown',(e) =>{
  if(isPlaying !== true){
    return;
  }

  if(e.key === word[loc]){
    loc++;
    if(loc === word.length){
      word = words[Math.floor(Math.random() * words.length)];
      loc = 0;
    }
    updateTarget();
    score++;
    scoreLabel.textContent = score;
  } else {
    miss++;
    missLabel.textContent = miss;

  }
});


}