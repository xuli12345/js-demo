/*
** Create by Man on 2018/8/21
*/

//把生成下一行代码生成封装函数
function next (  ) {
    //倒着遍历,把上一行的a标签的类名替换给下一行
    for (var i=rowList.length-1;i>=0;i--){
        if (i==0){//检测:如果这一行为第一行,则跳过这次循环,不执行将上一行的替换操作
            continue;
        }//遍历每行的格子,获取i行和i-1行,将i-1行的所有格子的样式替换给i行的所有格子
        for (var j = 0;j<blockList.length;j++){
            var col1 = rowList[i-1].children[j];
            var col2 = rowList[i].children[j];
            col2.className=col1.className;
        }
    }
    //生成一个0-3随机数,向下取整并作为第一行黑块生成的格子下标
    var newNum = Math.floor(Math.random()*3);
    for (var i = 0;i<row1.children.length;i++){
        if (i==newNum){
            row1.children[i].className = 'black';
        }else{
            row1.children[i].className = '';
        }
    }
}

//设置定时器,每隔一段时间,执行下一行替换函数
function startTime (  ) {
    timerID = setInterval(function (  ) {
        for (var i =0;i<blockList.length;i++){//遍历第四行的所有格子
            if (row4.children[i].className=='black'){//判断第4行的格子有没有加black类,如果有则表示上一次结束前没有清除,
                clearInterval(timerID);
                failed();
                speedLevel=1000;
                return;
            }
        }
        // 如果都没有,再执行下一行赋值函数
        next();
    },speedLevel);
}

//判断按下的键是否为目标键,封装成函数
function isKey ( key ) {
    if (key.className!='black'){//如果按下的键没有black类,则弹出失败并清除定时器
        clearInterval(timerID);
        failed();
    }else{//否则就清除上一次的定时器,执行一次下一行赋值函数,再开启定时器
        clearInterval(timerID);
        next();
        startTime();
        sum++;
    }
}

//动画函数动画
function animateSlow ( obj,attrs,callback ) {
    //1.清除定时器
    clearInterval(obj.timerID);
    //2.设置定时器
    obj.timerID = setInterval(function(){
        //3.遍历对象属性
        //3.7创建一个开关,判断每一次移动是否都移动到了目标距离,而不是还没到目标距离就进行下一次的动画
        var allOK = true;
        for(var key in attrs){
            //拓展,如果有属性为浮点数值的(例如opacity);就要另做计算
            if (key=='opacity'){
                //获取目标属性值
                var target = attrs[key];
                //这里不是attrs.key是因为,如果是点语法的话,意思就是获取attrs的名为key的属性的值,
                // 而字符串语法则是获取attrs中,属性名为key这个变量的值的属性的值,这个key的值是会改变的
                //获取当前属性,转成浮点类型数值,乘100方便计算
                var current = parseFloat(getStyle(obj,key))*100;
                //获取当前改变的数值
                var step = (target*100-current)/10;
                //取整
                step = step>0?Math.ceil(step):Math.floor(step);
                //改变当前属性值
                current +=step;
                //赋值(赋值的时候需要把计算后的值除以100,变回正常的值)
                obj.style[key] = current/100;//这里需要注意,不需要加单位,因为原本就不带单位,如果加了单位,则会停止运行
                //判断是否到达目标属性值(这里也需要除以100计算)
                if (current/100!=target){
                    //改变开关值
                    allOK = false;
                }
            }else if (key=='zIndex'){//如果有目标属性为需要直接改变的,就直接赋值,不需要动画
                obj.style.zIndex = attrs[key];
            }else if ( key=='backgroundColor' ){
                obj.style.backgroundColor = attrs[key];
            }else if (key=='borderRadius'){
                var target = attrs[key];
                var current = parseInt(getStyle(obj,key));
                var step = (target-current)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                current +=step;
                obj.style['border-radius'] = current + '%';
                if (current!=target){
                    allOK = false;
                }
            }else{
                //3.1获取目标属性
                var target = attrs[key];
                //3.2获取当前属性
                var current = parseInt(getStyle(obj,key));//获取的是字符串,需要转换成数字类型
                //3.3获取每次移动的距离(缓动)
                var step = (target-current)/10;
                //3.4距离取整,判断如果移动距离大于0,向上取整,如果小于0,向下取整
                step = step>0?Math.ceil(step):Math.floor(step);
                //3.5获取移动后的距离
                current +=step;
                //3.6赋值给对象
                obj.style[key] = current + 'px';
                //3.7.1如果这个属性没到目标距离,就让开关变为false,表示还没到
                if (current!=target){
                    allOK = false;
                }
            }
        }
        //4.判断开关是否为开,如果为开,则证明这一次移动是所有属性都到达了目标点
        if (allOK){
            //4.1到达后清除定时器
            clearInterval(obj.timerID);
            //5.这次动画结束后,判断我 有没有传入下一次动画(回调函数)
            if (typeof callback == 'function'){
                callback();
            }
        }
    },50);
}

//改变难度和速度值封装函数
function level (  ) {
    if(sum%20==0&&sum!=0){
        hardLevel++;
        hardLevel = hardLevel>6?6:hardLevel;
        speedLevel-=200;
        speedLevel = speedLevel<50?50:speedLevel;
    }
    hard.innerText = '难度: ' + hardLevel;
    speed.innerText = '每 ' + speedLevel/1000 + ' 秒一个';
}

//失败提示封装函数
function failed (  ) {
    clearInterval(timerID);
    fTips.innerText = '本次共消除了' + sum + '个方块鸭';
    failedBox.style.display = 'block';
    document.body.style.backgroundColor = 'rgba(0,0,0,.7)';
    isFailed = true;
    ul.style.opacity = 0.4;
    start.style.opacity = 0.4;
    keyList.style.opacity = 0.4;
    failedBox.onclick = function ( e ) {
        e = e||window.event;
        console.log ( speedLevel );
        clearInterval(timerID);
        ul.style.opacity = 1;
        start.style.opacity = 1;
        keyList.style.opacity = 1;
        document.body.style.backgroundColor = '';
        failedBox.style.display = 'none';
        isFailed = false;
        sum=0;
        start.value = sum;
        hardLevel = 1;
        speedLevel = 1000;
        hard.innerText = '难度: ' + hardLevel;
        speed.innerText = '每 ' + speedLevel/1000 + ' 秒一个';
        for (var i = 0;i<aList.length;i++){
            aList[i].className = '';
        }
        startTime();
        e.stopPropagation();
    }
}

//获取对象的样式属性
    function getStyle ( obj,attr ) {
        //能力检测
        if (obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return window.getComputedStyle(obj,null)[attr];
        }
    }