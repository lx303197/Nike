class Bigger{
    constructor(){
        this.small = document.getElementById("small");
        this.A = document.getElementById("A");
        this.span = document.getElementById("C");
        this.big = document.getElementById("big");
        this.B = document.getElementById("B");
        this.getgoodsid() 
        this.addEvent();
        this.changestatus()
        this.buton=document.querySelector('#add_shopping')
        this.buton.addEventListener('click',this.addcart)
    }
     //获取商品信息
    getgoodsid(){
        this.res = window.location.search;
        let arr=this.res.split('=')
        this.res=arr[1];
        //console.log(this.res)
        ajax.get('./server/goods.php',{fn:'info',id:this.res}).then(a=>{
            let{stateCode,data}=JSON.parse(a);
            data.forEach(ele =>{
                let a =document.querySelectorAll('img')
                a[0].src=ele.goodsImg
                a[1].src=ele.goodsImg
                let b = document.getElementById('price-1');
                b.innerHTML='¥'+ele.price;
                let c = document.getElementById('name-title');
                c.innerHTML=ele.goodsName;
            })
        })
    }
    addEvent(){
        var that = this;
        this.small.onmouseover = function(){
            that.over();
        }
        this.small.onmouseout = function(){
            that.out();
        }
        this.small.onmousemove = function(){
            that.move();
        }
    }
    over(){
        this.span.style.display = "block";
        this.big.style.display = "block";
        
        var scaleW = this.B.offsetWidth / this.big.offsetWidth;
        var scaleH = this.B.offsetHeight / this.big.offsetHeight;
        
        this.span.style.width = this.small.offsetWidth / scaleW + "px";
        this.span.style.height = this.small.offsetHeight / scaleH + "px";
    }
    out(){
        this.span.style.display = "none";
        this.big.style.display = "none";
    }
    move(eve){
        var e = eve || window.event;
        var mouseX = e.pageX;
        var mouseY = e.pageY;

        var x = mouseX - this.small.offsetLeft - this.span.offsetWidth / 2;
        var y = mouseY - this.small.offsetTop - this.span.offsetHeight / 2;

        if(x<0) x=0;
        if(y<0) y=0;

        var xMax = this.small.offsetWidth - this.span.offsetWidth;
        var yMax = this.small.offsetHeight - this.span.offsetHeight;

        if(x>xMax) x = xMax;
        if(y>yMax) y = yMax;

        this.span.style.left = x + "px";
        this.span.style.top = y + "px";
        //console.log(x,y);

        var xScale = this.small.offsetWidth - this.span.offsetWidth;
        var yScale = this.small.offsetHeight - this.span.offsetHeight;
        //console.log(xScale,yScale);

        var xx = x * (this.B.offsetWidth - this.big.offsetWidth) / xScale;
        var yy = y * (this.B.offsetHeight - this.big.offsetHeight) / yScale;
        //console.log(xx,yy);
        
        this.B.style.left = -xx + "px";
        this.B.style.top = -yy + "px";
    }
    //加入购物车
    addcart(){
        this.res = window.location.search;
        let arr=this.res.split('=')
        this.res=arr[1];
        let user = localStorage.getItem('user')
        if(user){
            ajax.get('./server/goods.php',{fn:'addcart',productId:this.res,username:user,gNum:1}).then(res=>{
                let {stateCode,date}=JSON.parse(res)
                if(stateCode==200){
                    alert('加入成功')
                }               
            })
        }else{
            let carts= localStorage.getItem('carts');
            var num=1
            if(carts){
                //console.log(111)
                carts = JSON.parse(carts)               
                for(let id in carts){
                    if(id==this.res){
                        num = carts[id]-0+ num;
                   }
                    carts[this.res]=num;    
                }
                localStorage.setItem('carts', JSON.stringify(carts))
                alert('ok')
            }else{ 
                console.log(this.res)
                let goodsCart = { [this.res]:num};
                console.log(goodsCart)
                goodsCart = JSON.stringify(goodsCart);
                localStorage.setItem('carts', goodsCart)
                alert('ok')
            }
        }
        
    }
    changestatus(){
        let user = localStorage.getItem('user')
        if(user){
            document.querySelector('#change').innerHTML=localStorage.getItem('user')
        }
    }
}
new Bigger;