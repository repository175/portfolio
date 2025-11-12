'use strict';

// +ボタンを押したときの動作
// 定数addBtnにid="add"（＋ボタン要素）を代入
const addBtn = document.getElementById('add');

// 定数formにform要素（addの親要素）を代入（35行目で使用する）
const form = document.getElementById('form');

// ＋を押したらclassListでdiv.input-rowと削除ボタンを追加する関数
// @param: none
// @return: none
addBtn.onclick = function () {
  const row = document.createElement('div');
  row.classList.add('input-row');

  // 新しい入力欄<input>を作成
  const input = document.createElement('input');
  input.type = "text";
  input.name = "human[]";

  // 入力欄を増やしたら削除ボタンも作成
  const removeBtn = document.createElement('button');
  removeBtn.type = "button";
  removeBtn.textContent = "-";
  removeBtn.classList.add("remove"); // cssで操作する用にクラスをつける

  // 削除ボタンを押したら入力欄を削除する関数
  // @param: none
  // @return: none
  removeBtn.onclick = function () {
    row.remove();
  };

  // 入力欄 9行目で作ったrowの中にinputを子要素として追加
  row.appendChild(input);

  // 削除ボタンを追加
  row.appendChild(removeBtn);

  // +ボタンの前に追加
  form.insertBefore(row, addBtn);
};

const printBtn = document.getElementById('print');
// 印刷ボタンをクリックしたときの動作
// @param: none
// @return: none
printBtn.onclick = function () {
  window.print(); // 印刷用ダイアログを表示
};


const aboutBtn = document.getElementById('about');
// 参考文献をクリック
// @param: none
// @return: none
aboutBtn.onclick = function () {
  location.href = "about.html";
};

const startBtn = document.getElementById('start');

// 配列human = 入力された人の名前
// 配列shuffled = シャッフル後の人の名前
// スタートボタンを押したときの動き（関数）
// @param: none
// @return: none
startBtn.onclick = function () {
  // 入力された値を配列human[]へ
  const human = [];
  const inputs = document.querySelectorAll('input[name="human[]"]');

  // 入力欄が空欄でなければ配列に追加する関数
  // @param: input
  // @return: none
  // forEachでinputsの中身を1つずつ処理していく
  inputs.forEach(function (input) {
    const value = input.value.trim(); // もし空白が入っていたら前後の空白を削除する
    if (value !== "") {
      human.push(value);
    }
  });

  const shuffled = shuffle(human);
  // 配列をシャッフルする関数 shuffle ... functionはonclickの外に置いたほうが良い
  // @param: human
  // @return: result ... 1回目: shuffled   2回目: shuffledSeatIndex
  function shuffle(human) {
    const copy = human.slice(); // 配列humanをコピーする
    const result = []; // シャッフル後の配列
    // copyが空になるまで（要素数が1以上の間）
    while (copy.length > 0) {
      const index = Math.floor(Math.random() * copy.length); // ランダムなインデックスをつくる(元の配列の要素数と同じだけ)
      result.push(copy.splice(index, 1)[0]); // ランダムな要素を1つずつ取り出して配列resultに追加 [0]を指定するのは先頭の数を取り出すため
    }
    return result; // シャッフルされた配列resultをリターン
  }

  // 座席表に反映
  // 配列seats ... 有効な席（×以外）
  const seats = [];
  const allSeats = document.querySelectorAll('.seat_num');

  // allSeats（.seat_num)が×でなければ配列seatsに代入
  allSeats.forEach(function (seat) {
    if (seat.textContent !== "×") {
      seats.push(seat);
    }
  });

  //  配列seatIndex = 座席のインデックス番号
  //  配列shuffledIndex = シャッフルしたランダムな席順
  // 124,129行目の[i]になる
  const seatIndex = [];
  for (let i = 0; i < seats.length; i += 1) {
    seatIndex.push(i);
  }
  const shuffledSeatIndex = shuffle(seatIndex);


  // シャッフルした名前をランダムな席にいれる
  // shuffled ... 85行目 シャッフル後の人の名前
  // seats ... 102行目 .seat_numたち
  // shuffledSeatIndex ... 119行目　シャッフルした座席のインデックス
  for (let i = 0; i < shuffled.length; i += 1) {
    seats[shuffledSeatIndex[i]].textContent = shuffled[i];
  }

  // 余った席は空欄にする
  // shuffled　... シャッフル後の人の名前
  // seats ... .seat_numたち
  for (let i = shuffled.length; i < seats.length; i += 1) {
    seats[shuffledSeatIndex[i]].textContent = "";
  }
};
