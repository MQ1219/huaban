window.onload = function(){
	let palette = new Palette();
	let center = document.querySelectorAll('.center>li');

	center.forEach(element=>{
		let type = element.id;
		element.onclick = function(){
			center.forEach(ele=>{
                ele.classList.remove('ack');
            })
            element.classList.add('ack');
            palette[type]();
		}
	})
	
}