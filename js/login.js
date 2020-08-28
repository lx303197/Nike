class logIn{
    constructor(){
        this.loginbut=document.querySelector('.logIn')
        //console.log(this.loginbut)
        this.loginbut.addEventListener('click',this.getmsg.bind(this))
        this.changestatus()
        
    }
    //获取数据
    getmsg(){
        let user = document.querySelector('.accOunt').value;
        //console.log(user)
        let pasw = document.querySelector('.passWorld').value;

        console.log(user,pasw);

        ajax.get('./server/goods.php',{fn:'name'}).then(res=>{
            let{stateCode,data}=JSON.parse(res);
            let a = 0
            if(stateCode==200){
                console.log(a);
                data.forEach(ele => {
                    console.log(ele);
                    console.log();
                    if(ele.userId==user&&ele.password==pasw){                     
                        a = 1;
                        localStorage.setItem('user',ele.userId)
                        location.href="./index.html"
                    }
                }); 
                if(a!=1){
                alert('账号/密码错误,请重新输入')
                document.querySelector('.accOunt').value='';
                document.querySelector('.passWorld').value='';
            }
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
new logIn