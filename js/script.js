const imgViewDom = $('#picture-show-modal img');

function pictureScale(scale) {
	let nowScale = Number(imgViewDom.attr('data-scale'));

	scale = nowScale * scale;
	if (scale < 1) {
		scale = 1;
	}

	imgViewDom.css('transform', `scale(${scale})`);
	imgViewDom.attr('data-scale', scale);
}

$('.card-list img').click((event) => {
	$('#picture-show-modal img').attr('src', event.target.src);
	$('#picture-show-modal').modal('show');
})

let nowMouseX = null;
let nowMouseY = null;
imgViewDom[0].addEventListener('drag', (event) => {
	let nowScale = Number(imgViewDom.attr('data-scale'));
	if (nowMouseX == null || nowMouseY == null) {
		nowMouseX = event.clientX;
		nowMouseY = event.clientY;
		return;
	}
	nowMouseX = event.clientX;
	nowMouseY = event.clientY;
	if (!(nowMouseX && nowMouseY)) {
		return;
	}

	let whileDom = imgViewDom[0];
	let imgOffsetX = whileDom.offsetLeft;
	let imgOffsetY = whileDom.offsetTop;
	while (whileDom.offsetParent !== null) {
		imgOffsetX += Number(whileDom.offsetLeft);
		imgOffsetY += Number(whileDom.offsetTop);
		whileDom = whileDom.offsetParent
	}
	console.log(imgOffsetX + ' ' + imgOffsetY + ' XX ' + nowMouseX + ' ' + nowMouseY)

	let imgWidth = Number(imgViewDom.css('width').replace('px', ''));
	let imgHeight = Number(imgViewDom.css('height').replace('px', ''));
	imgViewDom.css('transform', `scale(${nowScale}) translateX(${(nowMouseX - imgOffsetX - imgWidth / 2)}px) translateY(${(nowMouseY - imgOffsetY - imgHeight / 2)}px)`);
});

$('#picture-show-modal').on('hidden.bs.modal', function (event) {
	let nowScale = Number(imgViewDom.attr('data-scale'));
	imgViewDom.css('transform', `scale(${nowScale})`);
})