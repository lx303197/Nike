class signup {
    constructor() {
        this.userinp = document.querySelector('.accOunt');
        this.pswdinp = document.querySelector('.passWorld');
        this.sIgn = document.querySelector('.logIn')
        //console.log(this.sIgn)
        this.userinp.addEventListener('blur', this.layout.bind(this));
        this.pswdinp.addEventListener('blur', this.layoutpass.bind(this));
        this.sIgn.addEventListener('click', this.sign.bind(this))

        this.name_layout = 0;
        this.pasw_layout = 0;

        this.changestatus()
    }
    //账号验证格式
    layout() {
        let email = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,3}$/;
        let phone = /^1{1}[3-9]{1}\d{9}$/;
        let username = this.userinp.value;
        if(email.test(username)||phone.test(username)){
            this.userinp.style.border='1px solid green'
            this.name_layout = 1;
        }else{
            this.userinp.style.border='1px solid red'
            this.userinp.value=''
            this.userinp.placeholder='格式错误'
        }
        // console.log(that.name_layout)
    }

    layoutpass() {
        //至少8-16个字符，至少1个大写字母1个小写字母和1个数字其他可以是任意字符
        let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
        let passworld=this.pswdinp.value
        if(reg.test(passworld)){
            this.pswdinp.style.border='1px solid green';
            this.pasw_layout=1;
        }else{
            this.pswdinp.value="";
            this.pswdinp.placeholder="格式错误！";
            this.pswdinp.style.border='1px solid red';
        }
    }

    sign() {
        console.log(this.name_layout);
        console.log(this.pasw_layout);
        if (this.name_layout && this.pasw_layout){
            // console.log(111)
            let username = this.userinp.value;
            let mima1 = this.pswdinp.value;
            let flag = false;
            ajax.get('./server/goods.php', { fn: 'name' }).then(res => {
                let { stateCode, data } = JSON.parse(res);
                if (stateCode == 200) {
                    // console.log(data)
                    data.forEach(ele => {

                        console.log(ele);
                        if (ele.userId == username) {
                            flag = true;
                            return;
                        }
                    });
                    if (flag) {
                        
                    } else {
                        ajax.get('./server/goods.php', { fn: 'adduser', userId: username, passw: mima1 }).then(res => {
                            alert('注册成功')
                            localStorage.setItem('user',username)
                            
                            //console.log(document.querySelector('#change'))
                            location.href = "./index.html"
                        })
                    }
                }
            })
            if (flag) {
                alert('账号已注册')
            }
        }else {
            alert('请输入正确账号 / 密码')

        }
    }
    changestatus(){
        let user = localStorage.getItem('user')
        if(user){
            document.querySelector('#change').innerHTML=localStorage.getItem('user')
        }
    }
}
new signup