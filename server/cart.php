<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();

function getgoods(){
  $userId= $_GET['userId'];
  $sql="select * from shopping where userName='$userId'";
  $data = select($sql);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
}
function lst()
{
  $id = $_POST['goodsId'];
  $id = substr($id,0,strlen($id)-1);
  $sql = "select * from product_copy where id in ($id)";
 // echo $sql;
 $data = select($sql);
 echo json_encode([
  'stateCode'=>200,
  'state'=>'success',
  'data'=>$data
]);
}

function update(){
  $gId = $_GET['goodsId'];
  $num = $_GET['goodsNum'];
  $user = $_GET['userId'];
  $sql = "update shopping set num='$num' where productId='$gId' and userName='$user'";
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
  };

}

function delete(){
  $gId = $_GET['goodsId'];
  $user = $_GET['userId'];
  $sql = "delete from shopping where productId='$gId' and userName='$user'";
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
  };
}
function dzt(){
  $id=$_GET['goodsid'];
  $id = substr($id,0,strlen($id)-1);
  $sql = "select * from productcopy where id in ($id)";
  $data = select($sql);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
}
?>