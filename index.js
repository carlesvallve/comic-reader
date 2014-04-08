console.log('Initializing...');


// Options

var options = {
	pageWidth: 600,
	fullScreenMode: false,
	doublePage: false,
	startingPageNum: 1,
	maxPages: 10
};


// vars
var visor, content1, content2, currentContent = 2, currentPageNum, currentImg;
var path = './assets/mouseguard/';


// Display Page

function displayPage(img) {
	if (currentContent === 1) {
		content2.style.backgroundImage = "url('" + img.src + "')";
		content2.style.opacity = 1;
		content1.style.opacity = 0;
		currentContent = 2;
	} else {
		content1.style.backgroundImage = "url('" + img.src + "')";
		content1.style.opacity = 1;
		content2.style.opacity = 0;
		currentContent = 1;
	}
}


// Load Page

function loadPage(pageNum, resize) {
	var num = pageNum;
	if (pageNum < 100) { num = '0' + pageNum; }
	if (pageNum < 10) { num = '00' + pageNum; }

	var img = new Image();

	img.onload = function () {
		if (resize) {
			visor.style.width = options.pageWidth + 'px';
			visor.style.height = (options.pageWidth * img.height / img.width) + 'px';
			visor.style.display = 'block';
		}

		currentImg = img;
		displayPage(img);
	};

	img.src = path + num + '.jpg';
}


// Change Page in given direction

function changePage(dir) {
	currentPageNum += dir;

	if (currentPageNum < 1) {
		currentPageNum = 1;
		return;
	}

	if (currentPageNum > options.maxPages) {
		currentPageNum = options.maxPages;
		return;
	}

	loadPage(currentPageNum);
}


// Resize visor adjusting image ratio, and depending on fullScreenMode

function resizeVisor() {
	if (options.fullScreenMode) {
		visor.style.width = '100%';
		visor.style.height = (visor.clientWidth * currentImg.height / currentImg.width) + 'px';
	} else {
		visor.style.width = options.pageWidth + 'px';
		visor.style.height = (options.pageWidth * currentImg.height / currentImg.width) + 'px';
	}
}


// Toggle fullscreen

function toggleFullScreenMode() {
	options.fullScreenMode = !options.fullScreenMode;

	if (options.fullScreenMode) {
		visor.className = 'visor';
	} else {
		visor.className = 'visor centered';
	}

	resizeVisor();
}

// Initialize Application

function initialize() {

	// Create elements

	function createElm(parent, elmType, className) {
		var elm = document.createElement(elmType);
		elm.id = className;
		elm.className = className;
		parent.appendChild(elm);
		return elm;
	}

	var menu = createElm(document.body, 'div', 'menu');

	var title = createElm(menu, 'span', 'title');
	title.innerHTML = 'Comic Reader';

	var btn = createElm(menu, 'button', 'fullScreenButton');
	btn.innerHTML = 'Full Screen';
	btn.onclick = function () {
		console.log('Clicked on button!');
		toggleFullScreenMode();
	};


	visor = createElm(document.body, 'div', 'visor centered');
	visor.style.display = 'none';
	content1 = createElm(visor, 'div', 'content');
	content2 = createElm(visor, 'div', 'content');


	// Create Navigation

	document.onkeydown = function (evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
				changePage(-1);
				break;
			case 39:
				changePage(1);
				break;
			case 38:
				console.log('Up');
				break;
			case 40:
				console.log('Down');
				break;
		}
	};


	// Load starting page

	currentPageNum = options.startingPageNum;
	loadPage(currentPageNum, true);
}

initialize();

window.onresize = function () {
	console.log('RESIZE!');
	resizeVisor();
};





