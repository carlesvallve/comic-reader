console.log('Initializing...');


var blink = document.querySelector('.blink');

window.setInterval(function () {
	blink.style.visibility = getComputedStyle(blink).visibility === 'hidden'
		? 'visible'
		: 'hidden';
}, 500);
