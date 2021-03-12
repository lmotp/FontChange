const box = document.querySelector('.box');
const container = document.querySelector('.container');
const btn = document.querySelector('.btn');
const copywindow = document.querySelector('.copywindow');
const copyContent = document.querySelector('.copyContent');
const API_KEY;
let fontsList = [];

// 폰트색상 변경
const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// 폰트 변경
box.addEventListener('click', () => {
  const changeColor = getRandomColor();
  const choosedFont = loadRandomFont(fontsList);
  updateFont(box, choosedFont);
  box.style.color = changeColor;
  copyContent.textContent = `font-family: ${choosedFont} / color: ${changeColor}`;
  copyToClipboard(`font-family: ${choosedFont} color: ${changeColor}`);
});

async function loadFontsList() {
  try {
    const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`);
    const data = await result.json();
    return data.items;
  } catch (error) {}
}

const loadRandomFont = (fontsList) => {
  const randomIndex = Math.floor(Math.random() * fontsList.length);
  const choosedFont = fontsList[randomIndex].family;
  WebFont.load({
    google: {
      families: [choosedFont],
    },
  });

  return choosedFont;
};

function updateFont(box, choosedFont) {
  box = document.querySelector('.box');
  box.style.fontFamily = choosedFont;
  box.setAttribute('title', choosedFont);
}

async function main() {
  fontsList = await loadFontsList();
  const choosedFont = loadRandomFont(fontsList);
  updateFont(box, choosedFont);
}
main();

// 클립보드 복사
const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

// btn 이벤트
btn.addEventListener('click', (e) => {
  if (!box.style.color) {
    e.preventDefault();
  } else {
    copywindow.style.opacity = 1;
    copywindow.style.top = '-230px';
    setTimeout(() => {
      copywindow.style.opacity = 0;
      copywindow.style.top = '-550px';
    }, 3000);
  }
});
