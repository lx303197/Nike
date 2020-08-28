class index{
    constructor(){
        //获取节点
        this.boxobj= document.querySelector('.box');
        this.imgboxobj =document.querySelector('.imgbox');
        this.imgobj= document.querySelectorAll('img');
        this.butl = document.querySelector('#left')
        this.butr = document.querySelector('#right')
        this.getwidth()
        this.index=0;
        this.sethappen()
        this.times='';
        this.autoPlay()
        this.changestatus()
        
        
    }
    getwidth(){
        this.imgboxobj.style.width=this.imgobj.length*this.imgobj[0].offsetWidth+'px';
    }
    sethappen(){
        this.boxobj.addEventListener('mouseenter',this.but_ok.bind(this));
        this.boxobj.addEventListener('mouseleave',this.but_no.bind(this));
        this.butr.addEventListener('click',this.rightmove.bind(this));
        this.butl.addEventListener('click',this.leftmove.bind(this));
        
    }
    but_ok(){
        //console.log(this)
        this.butl.style.display='block';
        this.butr.style.display= 'block';
        this.stopPlay()
    }
    but_no(){
        this.butr.style.display='none';
        this.butl.style.display='none';
        this.autoPlay()
        
    }
    rightmove(){
        this.index++
        
        if(this.index==this.imgobj.length){
            this.imgboxobj.style.left=0;
            this.index=1
        }
        startMove(this.imgboxobj,{left:-this.imgobj[0].offsetWidth*this.index});
        
    }
    leftmove(){
        
        if(this.index==0){
            this.index=this.imgobj.length-1;
            this.imgboxobj.style.left=-this.index*this.imgobj[0].offsetWidth+'px'
            //console.log(this.imgobj.length);
            
        }
        this.index--
        startMove(this.imgboxobj,{left:-this.imgobj[0].offsetWidth*this.index});
        
    }
    autoPlay(){
        var that = this;
        this.times=setInterval(function(){
            that.rightmove()
        },2000)
    }
    stopPlay(){
        clearInterval(this.times)
    }
    changestatus(){
        let user = localStorage.getItem('user')
        if(user){
            document.querySelector('#change').innerHTML=localStorage.getItem('user')
        }
    }
}   
new index()
