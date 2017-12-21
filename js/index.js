class Palette{
	constructor(){
		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext("2d");
		this.cw = this.canvas.width;
		this.ch = this.canvas.height;
		this.history = [];
		this.undos =  document.querySelector('#undo');

	}
	line(){
		let that = this;
		this.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX,my = e.offsetY;
				that.ctx.clearRect(0, 0, that.cw,that.ch)
				if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0,)
				}
				that.ctx.beginPath();
           		that.ctx.moveTo(ox,oy);
           		that.ctx.lineTo(mx, my)
				that.ctx.stroke();
			}
			that.canvas.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
			}
		}
		that.undo()	
	}

	pencil(){
		let that = this;
		this.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.ctx.beginPath();
           	that.ctx.moveTo(ox,oy);
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX,my = e.offsetY;
				that.ctx.clearRect(0, 0, that.cw,that.ch)
				if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0,)
				}
				
           		that.ctx.lineTo(mx, my)
				that.ctx.stroke();
			}
			that.canvas.onmouseup = function(){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
			}
		}
		that.undo()	
	}

	circle(){
		let that = this;
		this.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX,my = e.offsetY;
				let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
				that.ctx.clearRect(0, 0,that.cw,that.ch)
				if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0,)
				}
				
            	that.ctx.beginPath();
            	that.ctx.moveTo(ox+r,oy);
            	that.ctx.arc(ox,oy,r,0,Math.PI*2);
            	that.ctx.stroke();
			}
			that.canvas.onmouseup = function(e){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
			}
		}
		that.undo()	
	}

	rect(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX,my = e.offsetY;
				that.ctx.clearRect(0, 0,that.cw,that.ch)
				if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0,)
				}
				that.ctx.strokeRect(ox,oy,mx-ox,my-oy);        	
			}
			that.canvas.onmouseup = function(e){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
			}
		}
		that.undo()	
	}
	
	poly(){
		let that = this;
		that.canvas.onmousedown = function(e){
			let ox = e.offsetX,oy = e.offsetY;
			that.canvas.onmousemove = function(e){
				let mx = e.offsetX,my = e.offsetY;
				let r = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
				ppoly(r,ox,oy);
			}
			that.canvas.onmouseup = function(e){
				that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
				that.canvas.onmousemove = null;
				that.canvas.onmouseup = null;
			}
		}
		function ppoly(r,ox,oy,num=6){
			let rad = 2 * Math.PI / num;
			that.ctx.clearRect(0, 0,that.cw,that.ch)
			if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0,)
				}
            that.ctx.beginPath();
            that.ctx.moveTo(ox+r,oy);
            for(let i = 0;i<num;i++){
                let x = ox + r*Math.cos(rad*i);
                let y = oy + r*Math.sin(rad*i);
                that.ctx.lineTo(x,y);
            }
            that.ctx.closePath();
            that.ctx.stroke();
		}
		that.undo()	
	}	

	polyj(){
		let that = this;
        this.canvas.onmousedown = function(e){
            let ox = e.offsetX,oy = e.offsetY;
            that.canvas.onmousemove = function(e){
                let mx = e.offsetX, my = e.offsetY;
                let br = Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2));
                let xr = (Math.sqrt(Math.pow(mx-ox,2)+Math.pow(my-oy,2)))/3;
                jiao(br,xr,ox,oy);
            }
            that.canvas.onmouseup = function(){
            	that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
        function jiao(br,xr,ox,oy,num=6){
            that.ctx.clearRect(0,0,that.cw,that.ch)
            if(that.history.length){
					that.ctx.putImageData(that.history[that.history.length-1],0,0,)
				}
            let a = Math.PI / num;
            that.ctx.beginPath();
            that.ctx.moveTo(ox+br,oy);
            let x,y;
            for(let i = 0;i < num*2;i++){
                if(i%2==0){
                    x = ox + br * Math.cos(a * i);
                    y = oy + br * Math.sin(a * i);
                }else{
                    x = ox + xr * Math.cos(a * i);
                    y = oy + xr * Math.sin(a * i);
                }
                that.ctx.lineTo(x,y);
            }
            that.ctx.closePath();
            that.ctx.stroke();
        }
		that.undo()	
	}

	hidden(){
		 let that = this;
	}

	undo(){
		let that = this;
		window.onkeydown = function(e){
			if(e.ctrlKey && e.key == 'z'){
				if(that.history.length){
					let del = that.history.pop();
					if(that.history.length>0){
						that.ctx.putImageData(that.history[that.history.length-1],0,0)
					}
				}				
			}
		}
		that.undos.onclick = function(){
			
			if(that.history.length){
				let del = that.history.pop();
				if(that.history.length>0){
					that.ctx.putImageData(that.history[that.history.length-1],0,0)
				}
			}			
		}
	}

}
