<?php
// 导入php文件
include('./mysql.php');

 $fn = $_GET['fn'];  
 $fn();  
function lst(){
  $sql = 'select * from productcopy';
  $data = select($sql);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
}
function info(){
  $id=$_GET['id'];
  $sql="select * from productcopy where id=$id";
  $data=select($sql);
      echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
}
 // 添加数据的方法
function add(){
 $userId = $_POST['userId'];
 $gId = $_POST['gId'];
 $gNum = $_POST['gNum'];

 $sql = "insert into cart values(null,'$userId','$gId','$gNum',40)";
 //echo $sql;
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}

// 删除数据的方法
function del(){
  $id = $_GET['id'];
  $sql = "delete from product where id=$id";
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}

// 修改数据的方法
function update(){
  $id    = $_POST['id'];
  $title = $_POST['title'];
  $pos   = $_POST['pos'];
  $idea  = $_POST['idea'];

  $sql = "update product set title='$title',pos='$pos',idea='$idea' where id=$id";

  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
//获取数据
function name(){
  $sql = 'select * from usermsg';
  $data = select($sql);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
}

//添加购物车
function addcart(){
  $id = $_GET['productId'];
  $user=$_GET['username'];
  $num=$_GET['gNum'];
  $sql="insert into shopping(userName,productId,num) values('$user','$id','$num') on duplicate key update num=num+$num";
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
//添加用户
function adduser(){
 $username = $_GET['userId'];
 $psw = $_GET['passw'];
 $sql = "insert into usermsg values(null,'$username','$psw','$username')";
  $res = query($sql);
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}


?>