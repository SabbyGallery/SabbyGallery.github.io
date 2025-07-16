// THEME TOGGLE
const buttonLight = document.getElementById('lightToggle');
const lightIcon = document.getElementById('lighticon');
const emblem = document.getElementById('emblem');

if (theme === 'system') {
	theme = (window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
}

document.documentElement.dataset.theme = theme;
setTheme(theme);

function setTheme(theme) {
	document.documentElement.dataset.theme = theme;
	// Update Icons/Emblems
	if (theme === 'light') {
		lightIcon.classList.remove("fa-sun");
		lightIcon.classList.add("fa-moon");
	} else {
		lightIcon.classList.remove("fa-moon");
		lightIcon.classList.add("fa-sun");
	}
}

buttonLight.addEventListener('click', () => {
	buttonLight.querySelector('.visually-hidden').textContent = `${theme} mode`;
	theme = (theme === 'light') ? 'dark' : 'light';
	localStorage.setItem('theme', theme);
	setTheme(theme);
});


//TWEMOJI
// twemoji.parse(document.body)
