// 运动三要素: 谁运动  运动方向  停止目标
// 
// ele 运动的元素对象
// obj {left:500,top:400}  运动方向和目标
// cb 运动结束的回调函数
var times = '';
function startMove (eleObj, obj, cb) {
  clearInterval(times);
  //清空定时器的开关
  var onOff = false;
  // 1 设置定时器
  times = setInterval(function () {
    // 2 遍历运动的方向和目标
    for (var attr in obj) {
      // console.log(attr, obj[attr]);
      // 3 获取元素的实时位置.方便计算speed
      var pos = parseInt(getPos(eleObj, attr));
      // console.log('pos', pos);
      // 4 计算speed值,并且取整
      var speed = (obj[attr] - pos) / 10;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      // console.log('speed', speed);
      // 5 临界值的判断.到达临界值给开关true,避免直接清空定时器,
      //影响另一个属性运动
      if (pos + speed == obj[attr])
        onOff = true;
      // 6 让元素动起来
      eleObj.style[attr] = pos + speed + 'px';
    }


    if (onOff) {
      clearInterval(times);
      // 判断是否有回调函数,存在且调用
      //console.log(222);
      if (cb) cb();
    }

  }, 30);
}

// 获取元素的指定的css属性的值
function getPos (ele, attr) {
  if (ele.currentStyle)
    return ele.currentStyle[attr]
  else
    return getComputedStyle(ele)[attr]
}