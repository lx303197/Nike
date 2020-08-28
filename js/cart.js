class cart{
    constructor(){
        this.list()
        this.changestatus()
    }
    list(){
        //判断是否登录
        let user = localStorage.getItem('user')
        //console.log(user)
        let goodsid=''
        if(user){
            ajax.get('./server/cart.php',{fn:'getgoods',userId:user}).then(res=>{
                let {stateCode,data}=JSON.parse(res)
                //console.log(data)
                if(stateCode==200){
                    if(!data) return;
                    let goodsIdname={}
                    data.forEach(ele => {
                        goodsid+=ele.productId+',';
                        goodsIdname[ele.productId]=ele.num;
                    });
                    cart.getgoods(goodsid,goodsIdname)
                }
            })
        }else{
            let cartgood = localStorage.getItem('carts');
            // console.log(cartgood)
            if(!cartgood){
                return;
            }
            cartgood=JSON.parse(cartgood);
            for(var attr in cartgood){
                goodsid+=attr+',';
                
            }
            // console.log(goodsid)
            cart.getgoods(goodsid)
        }
    }

    //根据id获取商品
    static getgoods(pro1,pro2=''){
        pro2= pro2||JSON.parse(localStorage.getItem('carts'));
        ajax.get('./server/cart.php',{fn:'dzt',goodsid:pro1}).then(res=>{
            let {stateCode,data}=JSON.parse(res);
            let str ='';
            if(stateCode==200){
                data.forEach(ele=>{
                    str+=`<div class="goods">
                     <div class="goodimg"><img src="${ele.goodsImg}" alt=""></div>
                     <div class="goodinfo">
                         <p class="goodname">${ele.goodsName}</p>
                         <div class="goodsnum">数量:<input type="text" value="${pro2[ele.id]}" class="inup"><i class="b" id="add" onclick="cart.addGoodsNum(this,'${ele.id}')">+</i>&nbsp;<i class="b" id="lose" onclick="cart.losGoodsNum(this,'${ele.id}')">-</i></div>
                         <button class="removed" onclick="cart.delGoods(this,'${ele.id}')">删除</button><em class="dd"></em>
                    </div>
                     <div class="test">&nbsp;</div>
                     <div class="goodprice">
                         <p class="goodsmoney">${ele.price}</p>
                     </div>
                 </div>`;
                })
            }
            document.querySelector('.cart-list').innerHTML=str;
            cart.getallmoney()

        })
//

    }
    //商品删除
    static delGoods(oBj,id){
        let user = localStorage.getItem('user');
        if(user){
            ajax.get('./server/cart.php',{fn:'delete',userId:user,goodsId:id}).then(res=>{
                let{stateCode}=JSON.parse(res)
                if(stateCode==200){
                }
            })
        }else{
            let locgood =JSON.parse(localStorage.getItem('carts')) ;
            delete locgood[id];
            localStorage.setItem('carts',JSON.stringify(locgood))
        }
        oBj.parentNode.parentNode.remove();
        alert('删除成功')
    }

    //数量加
    static addGoodsNum(Obj,goodid){
        let intobj = Obj.previousElementSibling
        intobj.value=intobj.value-0+1
        let goodnum=intobj.value;
        if(localStorage.getItem('user')){
            let id = localStorage.getItem('user');
            ajax.get('./server/cart.php',{fn:'update',goodsId:goodid,goodsNum:goodnum,userId:id}).then(res=>{
                //console.log(res);
            })
        }else{
            let cartgood = localStorage.getItem('carts');
            cartgood = JSON.parse(cartgood)
            cartgood[goodid]=intobj.value;
            localStorage.setItem('carts',JSON.stringify(cartgood))
        }
        cart.getmoney(Obj,intobj.value)
    
    }
    static losGoodsNum(Obj,goodid){
        let intobj = Obj.previousElementSibling.previousElementSibling;
        intobj.value=intobj.value-1;
        let goodnum=intobj.value;
        if(intobj.value==1){
            intobj.value=1
        }
        if(localStorage.getItem('user')){
            let id = localStorage.getItem('user');
            ajax.get('./server/cart.php',{fn:'update',goodsId:goodid,goodsNum:goodnum,userId:id}).then(res=>{
                //console.log(res);
            })
        }else{
            let cartgood = localStorage.getItem('carts');
            cartgood = JSON.parse(cartgood)
            cartgood[goodid]=intobj.value;
            localStorage.setItem('carts',JSON.stringify(cartgood))
        }
        let bo =document.body
        bo.onmouseenter=cart.getmoney(Obj,intobj.value)
        cart.getmoney(Obj,intobj.value)
    
    }
    //获取价钱
    static getmoney(Obj,V){
        let pric = Obj.parentNode.parentNode.nextElementSibling.nextElementSibling;
        let money =pric.querySelector('.goodsmoney');
        let qian = (V-0)*(money.innerHTML-0) 
        let yinc = Obj.parentNode.nextElementSibling.nextElementSibling
        
        yinc.innerHTML=qian

        let input = document.querySelectorAll('.inup')
        let num =0
        input.forEach(ele=>{
            num=ele.value-0+num
        })
        document.querySelector('.xj').innerHTML=num;

        let all = document.querySelector('.allmoney');
        let pr = document.querySelectorAll('.dd')
        let am =0
        pr.forEach(res=>{
            am = res.innerHTML-0+am
        })
        console.log(am)
        all.innerHTML=am

    }

    static getallmoney(){
        // let goods = document.getElementsByClassName('goods');
        let goods = document.querySelectorAll('.goods');
        let a
        goods.forEach(ele=>{
            a =(ele.querySelector('.goodsmoney').innerHTML-0)*(ele.querySelector('.inup').value-0)
            ele.querySelector('em').innerHTML=a
            
        })
        let num = document.querySelectorAll('.inup')
        let s=0
        num.forEach(h=>{
            s= h.value - 0 + s
            console.log(h.value)
        })
        document.querySelector('.xj').innerHTML=s

        let allxj = document.querySelectorAll('em')
        let m=0
        allxj.forEach(n=>{
            m = n.innerHTML-0+m
        })
       let zongji = document.querySelector('.allmoney')
       zongji.innerHTML=m

       let zongjiabut = document.querySelector('.addcart')
       zongjiabut.onclick=a=>{
           alert(`确定购买并花费￥${m}吗？`)
           location.href="index.html";
       }
        
    }
    changestatus(){
        let user = localStorage.getItem('user')
        if(user){
            document.querySelector('#change').innerHTML=localStorage.getItem('user')
        }
    }




}
new cart