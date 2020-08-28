class details{
    constructor(){
        this.lst();
        this.changestatus()
    }
    lst(){
        ajax.get('./server/goods.php',{fn:'lst'}).then(res => {
            let{stateCode, data}=JSON.parse(res);
            if(stateCode == 200){
              let str = '';
              data.forEach(ele =>{
                //console.log(123);
                str += `<a href="./amplifier.html?id=${ele.id}"><div class="goods">
                <img src="${ele.goodsImg}" alt="">
                <p class="msg">
                    <span class="left-lis" >${ele.goodsName}</span>
                    <span class="good-p">￥${ele.price}</span>
                </p>
                <span class="colors">颜色</span>
            </div>
            </a>
            `;
            });
            document.getElementById('good-list').innerHTML = str;
            }     
        })     
    }
    changestatus(){
        let user = localStorage.getItem('user')
        if(user){
            document.querySelector('#change').innerHTML=localStorage.getItem('user')
        }
    }

}
new details;
