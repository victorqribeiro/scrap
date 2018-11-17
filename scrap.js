(()=>{
	let t = 1;
	let cPos = 0;
	let mPos = document.body.offsetHeight;;
	let people = {};
	let finish = ()=>{
		window.URL = window.URL || window.webkitURL;
		let blob = new Blob([JSON.stringify(people)], {type: 'text/json'});
		let link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = 'people.json';
		link.click();
	};
	let scrap = ()=>{
		let imgs = document.images;
		for(let i = 0; i < imgs.length; i++){
			let img = imgs[i];
			let name = img.getAttribute('aria-label');
			if( img.width == 100 && name){
				people[name] = img.src;
			}
		}
		let w = window.innerHeight*t
		window.scrollTo(0,w);
		cPos = w;
		mPos = document.body.offsetHeight;
		t++;
		if( cPos < mPos){
			setTimeout( scrap, 3000 );
		}else{
			setTimeout( finish, 500 );
		}
	};
	scrap();
})();
