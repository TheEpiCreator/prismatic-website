const themeMap = {
  "theme-dark": "theme-dark-solar",
  "theme-dark-solar": "theme-light",
  "theme-light": "theme-dark",
  undefined: "theme-dark",
};

const theme = localStorage.getItem('theme') || (tmp = Object.keys(themeMap)[0], localStorage.setItem('theme', tmp), tmp);

const htmlClass = document.documentElement.classList;
htmlClass.add(theme);
updateRelevant();

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];
  let newIcon;

  htmlClass.replace(current, next);
  localStorage.setItem('theme', next);
  updateRelevant();
}

function setTheme(elements, theme) {
  for (let item of elements) {
    let match = item.getAttribute('src').match(/(.+?)(\-dark|\-light)?\.(.+$)/m);
    console.log(match);
    item.setAttribute('src', `${match[1]}-${theme}.${match[3]}`);
  }
}

function updateRelevant() {
  switch (localStorage.getItem('theme')) {
    case 'theme-dark':
    case 'theme-dark-solar':
      setTheme(document.getElementsByClassName('theme-img'), 'dark')

      // Icon
      newIcon = 'images/icons/icon-dark.ico';
      break;
    default:
      setTheme(document.getElementsByClassName('theme-img'), 'light')

      // Icon
      newIcon = 'images/icons/icon-light.ico';
  }
  document.getElementById('icon').setAttribute('href', newIcon);
}

document.getElementById('themeButton').onclick = toggleTheme;
