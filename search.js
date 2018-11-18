(()=>{
	let imgToFind = 'https://scontent.fpoa16-1.fna.fbcdn.net/v/t1.0-9/20292628_1441846932571303_2480010471403410393_n.jpg?_nc_cat=103&_nc_ht=scontent.fpoa16-1.fna&oh=6e082d65d0068a635624e3618b378d58&oe=5C6697C1';
	let toDataUrl = function(url, callback) {
		let xhr = new XMLHttpRequest();
		xhr.onload = function() {
		  var reader = new FileReader();
		  reader.onloadend = function() {
		    callback(reader.result);
		  }
		  reader.readAsDataURL(xhr.response);
		};
		xhr.open('GET', url);
		xhr.responseType = 'blob';
		xhr.send();
	};
	let looked = {};
	let t = 1;
	let cPos = 0;
	let mPos = document.body.offsetHeight;
	let canvas = document.createElement('canvas');
	canvas.width = canvas.height = 100;
	let c = canvas.getContext('2d',{alpha: false});
	let imgdata;
	let possible = [];
	let searchImg = new Image();
	toDataUrl(imgToFind,(r)=>{ 
		searchImg.src = r;
	});
	searchImg.onload = ()=>{
		c.drawImage(searchImg,0,0,canvas.width,canvas.height);
		imgdata = c.getImageData(0,0,canvas.width,canvas.height);
		scrap();
	}
	let finish = ()=>{
		console.log( possible );
	};
	let scrap = ()=>{
		let imgs = document.images;
		for(let i = 0; i < imgs.length; i++){
			let im = imgs[i];
			let name = im.getAttribute('aria-label');
			let end = im.src;
			if(looked[end])
				continue;
			looked[end] = true;
			let img = new Image();
			toDataUrl(im.src, (r)=>{
				img.src = r;
			});
			img.onload = ()=>{
				c.clearRect(0,0,canvas.width,canvas.height);
				c.drawImage(img,0,0);
				let data = c.getImageData(0,0,canvas.width,canvas.height);
				let s = 0;
				for(let j = 0; j < data.data.length; j+=4){
					if( imgdata.data[j] == data.data[j] && 
							imgdata.data[j+1] == data.data[j+1] &&
							imgdata.data[j+2] == data.data[j+2] ){
							s += 1;
					}
				}		
				if( s > 100 && name ){
					looked[name] = true;
					possible.push( { score: s, name: name, src: end} );
				}
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
