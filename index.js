console.log('Initializing...');


// set vars
var path = './assets/mouseguard/';
var images = [];
var i, num, url;
var maxPages = 10;
var pageScale = 0.25;


// Create elements

function initialize() {

	function createDiv(parent, className) {
		var div = document.createElement('div');
		div.id = className;
		div.className = className;
		parent.appendChild(div);
		return div;
	}

	var title = createDiv(document.body, 'title');
	title.innerHTML = 'Comic Reader';

	var pageWidth = images[1].width * pageScale;
	var pageHeight = images[1].height * pageScale;

	var visor = createDiv(document.body, 'visor');
	visor.style.width = (10 + (4 + pageWidth) * maxPages) + 'px';
	visor.style.height = (10 + (4 + pageHeight) * maxPages) + 'px';

	var pages = [];

	for (i = 1; i <= maxPages; i++) {
		var page = createDiv(visor, 'page');

		num = i;
		if (i < 100) { num = '0' + i; }
		if (i < 10) { num = '00' + i; }

		url = path + num + '.jpg';
		page.style.backgroundImage = "url('" + url + "')";
		page.style.width = pageWidth + 'px';
		page.style.height = pageHeight + 'px';

		pages.push(page);
	}
}


// load comic pages
var c = 0;

function loadImage(i, url) {
	console.log('loading', url);
	var img = new Image();
	img.onload = function () {
		images[i] = img;
		console.log(img);
		c++;
		if (c === maxPages) {
			initialize();
		}
	};
	img.src = url;
}


for (i = 1; i <= maxPages; i++) {
	num = i;
	if (i < 100) { num = '0' + i; }
	if (i < 10) { num = '00' + i; }

	url = path + num + '.jpg';
	loadImage(i, url);
}




