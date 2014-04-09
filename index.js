// ***************************************************************************
// Set Vars
// ***************************************************************************

var options = {
	pageWidth: 600,
	fullScreenMode: false,
	doublePage: false,
	startingPageNum: 1,
	maxPages: 10
};


// vars
var visor, content1, content2, currentContentNum = 2, currentPageNum, currentImg;
var path = 'http://comics.cv.dev.wizcorp.jp/mouseguard/';


// ***************************************************************************
// Display Page
// ***************************************************************************

function displayPage(img) {
	var prev, next;

	if (currentContentNum === 1) {
		prev = content1;
		next  = content2;
		currentContentNum = 2;
	} else {
		prev = content2;
		next  = content1;
		currentContentNum = 1;
	}

	next.style.backgroundImage = "url('" + img.src + "')";
	next.style.zIndex = 1;
	prev.style.zIndex = 0;
}


// ***************************************************************************
// Load Page
// ***************************************************************************

function loadPage(pageNum, cb) {
	// get page url
	var num = pageNum;
	if (pageNum < 100) { num = '0' + pageNum; }
	if (pageNum < 10) { num = '00' + pageNum; }
	var url = path + num + '.jpg';

	var img = new Image();

	img.onload = function () {
		if (cb) { cb(img); }

		// display the laoded page
		displayPage(img);
	};

	img.src = url;

	// record current content image
	currentImg = img;
}


// ***************************************************************************
// Change Page in given direction
// ***************************************************************************

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


// ***************************************************************************
// Resize visor adjusting image ratio, and depending on fullScreenMode
// ***************************************************************************

function resizeVisor(img) {
	if (options.fullScreenMode) {
		visor.style.width = '100%';
		visor.style.height = (visor.clientWidth * img.height / currentImg.width) + 'px';
	} else {
		visor.style.width = options.pageWidth + 'px';
		visor.style.height = (options.pageWidth * img.height / currentImg.width) + 'px';
	}
}


window.onresize = function () {
	resizeVisor(currentImg);
};


// ***************************************************************************
// Toggle fullscreen
// ***************************************************************************

function toggleFullScreenMode() {
	options.fullScreenMode = !options.fullScreenMode;

	if (options.fullScreenMode) {
		visor.className = 'visor';
	} else {
		visor.className = 'visor centered';
	}

	resizeVisor(currentImg);
}


// ***************************************************************************
// Initialize Application
// ***************************************************************************

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
		toggleFullScreenMode();
	};


	visor = createElm(document.body, 'div', 'visor centered');
	visor.style.display = 'none';
	content1 = createElm(visor, 'div', 'content');
	content2 = createElm(visor, 'div', 'content');

	visor.onmousedown = function (e) {
		changePage(e.offsetX >= visor.clientWidth / 2 ? 1 : -1);
	};


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

	loadPage(currentPageNum, function (img) {
		visor.style.display = 'block';
		resizeVisor(img);
	});
}

initialize();




// ***************************************************************************
// Animation
// ***************************************************************************

/*var player = document.timeline.play(new Animation(content1, [
 { opacity: "0.5", transform: "scale(0.5)" },
 { opacity: "1.0", transform: "scale(1)" }
 ],
 { direction: "alternate",
 duration: 0.5,
 iterations: Infinity
 }));*/

//next.style.transform = 'translateX(0)';
//prev.style.transform = 'translateX(0)';


/*var playerPrev = document.timeline.play(
 new window.Animation(prev,
 [ { transform: 'translateX(-100%)' } ],
 { direction: "normal",
 duration: 0.5,
 iterations: 1,
 fill: 'both'
 }),
 new window.Animation(next,
 [ { transform: 'translateX(0)' } ],
 { direction: "normal",
 duration: 0.5,
 iterations: 1,
 fill: 'both'
 })
 );*/


/*var playerNext = document.timeline.play(new window.Animation(next,
 [ { transform: 'translateX(0)' } ],
 { direction: "normal",
 duration: 0.5,
 iterations: 1,
 fill: 'both'
 }));*/





