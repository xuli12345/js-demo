/*
** Create by 张晓坤 on 2018/10/30
*/

/**
* 1.匀速动画
* @param ele 要移动的元素
* @param target 要移动的目标距离
*/
function animationMove (ele,target) {
    //1.清除以前的定时器，以本次点击为准
    clearInterval(ele.timeID);
    //2.开始本次移动
    ele.timeID = setInterval(function (  ) {
        //1.获取元素当前位置
        var currentLeft = ele.offsetLeft;
        //2.开始移动
        var isLeft = target>=currentLeft?true:false;//计算移动方向
        isLeft?currentLeft+=10:currentLeft-=10;
        ele.style.left = currentLeft + 'px';
        //3.边界检测
        if (isLeft?currentLeft>=target:currentLeft<=target){
            //(1)清除定时器
            clearInterval(ele.timeID);
            //(2)元素复位
            ele.style.left = target + 'px';
        }
    },50);
}

/**2.缓动动画
 *
 * @param ele 要移动的元素
 * @param attrs 要移动的属性对象
 * @param fn:完成回调函数   如果传了就执行，不传就不执行
 */
function animationSlow ( ele, attrs, fn  ) {
    //1.清除以前的定时器，本次移动为准
    clearInterval ( ele.timeID )
    //2.开始本次移动
    ele.timeID = setInterval ( function () {
        /*开关思想：当某种操作结果只有两种状态，可以使用布尔类型值表示这两种状态isAllOk
        1.提出假设 isAllOk = true
        2.验证假设
        3.根据开关状态实现需求
         */
        //一：提出假设
        var isAllOk = true
        for ( var key in attrs ) {//遍历对象所有属性值
            if (key == 'zIndex' || key == 'backgroundColor'){
                ele.style[key] = attrs[key];
            }else if(key == 'opacity'){
                var attr = key
                var target = attrs[ key ] * 100;//这样写下面的target变量名不用修改
                //2.1 获取元素当前位置
                /*细节：透明度范围0-1小数，不能用parseInt取整，只能用parseFloat取整*/
                var current = parseFloat ( getStyle ( ele, attr ) ) * 100;
                //2.2 计算本次移动距离 = (目标位置-当前位置)/10
                var step = ( target - current ) / 10
                //取整: 正数：向上取整  负数：向下取整
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.2 开始移动
                current += step
                ele.style[ attr ] = current / 100;//赋值的时候缩小100倍
                //2.4 终点检测
                //二：验证假设：只要有任何属性没有到达终点
                if ( current != target ) {
                    isAllOk = false
                }
            }else{
                var attr = key
                var target = attrs[ key ]//这样写下面的target变量名不用修改
                //2.1 获取元素当前位置
                var current = parseInt ( getStyle ( ele, attr ) )
                //2.2 计算本次移动距离 = (目标位置-当前位置)/10
                var step = ( target - current ) / 10
                //取整: 正数：向上取整  负数：向下取整
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.2 开始移动
                current += step
                ele.style[ attr ] = current + "px"
                //2.4 终点检测
                //二：验证假设：只要有任何属性没有到达终点
                if ( current != target ) {
                    isAllOk = false
                }
            }
        }
        //三：根据开关状态实现需求
        if ( isAllOk ) {//运动结束：全部到达终点，才清除定时器
            clearInterval ( ele.timeID )
            //动画结束，如果调用者传递了第三个参数则执行回调函数代码
            if ( typeof  fn == "function" ) {
                fn ()//执行调用者传递过来的代码
            }
        }
    }, 50 )
}


/**2.缓动动画
 * @param ele 要移动的元素
 * @param attrs 要移动的属性对象
 * @param targetColor 渐变颜色
 * @param fn:完成回调函数   如果传了就执行，不传就不执行
 * @param s 渐变倍数（与渐变速度成正比，倍数越大渐变越慢），默认10倍
 */
function animationSlows ( ele, attrs, targetColor , fn ,s = 10 ) {
    //1.清除以前的定时器，本次移动为准
    clearInterval ( ele.timeID )
    targetColor = getColorList(targetColor);//获取RGB数组
    //2.开始本次移动
    ele.timeID = setInterval ( function () {
        /*开关思想：当某种操作结果只有两种状态，可以使用布尔类型值表示这两种状态isAllOk
        1.提出假设 isAllOk = true
        2.验证假设
        3.根据开关状态实现需求
         */
        //一：提出假设
        var isAllOk = true
        for ( var key in attrs ) {//遍历对象所有属性值
            if (key == 'zIndex' || key == 'backgroundColor'){
                ele.style[key] = attrs[key];
            }else if(key == 'opacity'){
                var attr = key
                var target = attrs[ key ] * 100;//这样写下面的target变量名不用修改
                //2.1 获取元素当前位置
                /*细节：透明度范围0-1小数，不能用parseInt取整，只能用parseFloat取整*/
                var current = parseFloat ( getStyle ( ele, attr ) ) * 100;
                //2.2 计算本次移动距离 = (目标位置-当前位置)/10
                var step = ( target - current ) / 10
                //取整: 正数：向上取整  负数：向下取整
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.2 开始移动
                current += step
                ele.style[ attr ] = current / 100;//赋值的时候缩小100倍
                //2.4 终点检测
                //二：验证假设：只要有任何属性没有到达终点
                if ( current != target ) {
                    isAllOk = false
                }
            }else{
                var attr = key
                var target = attrs[ key ]//这样写下面的target变量名不用修改
                //2.1 获取元素当前位置
                var current = parseInt ( getStyle ( ele, attr ) )
                //2.2 计算本次移动距离 = (目标位置-当前位置)/10
                var step = ( target - current ) / 10
                //取整: 正数：向上取整  负数：向下取整
                step = step > 0 ? Math.ceil ( step ) : Math.floor ( step )
                //2.2 开始移动
                current += step
                ele.style[ attr ] = current + "px"
                //2.4 终点检测
                //二：验证假设：只要有任何属性没有到达终点
                if ( current != target ) {
                    isAllOk = false
                }
            }
        }
        //三：根据开关状态实现需求
        if ( isAllOk ) {//运动结束：全部到达终点，才清除定时器
            clearInterval ( ele.timeID )
            //动画结束，如果调用者传递了第三个参数则执行回调函数代码
            if ( typeof  fn == "function" ) {
                fn ()//执行调用者传递过来的代码
            }
        }
        if ( targetColor ){
            gradual(ele , targetColor);
        }

    }, 50 )
}


function gradual(ele, targetColor , step = 20) {
    //颜色渐变
    //获取当前背景颜色,转换为RBG数组
    ele.rgbArr = getColorList(getStyle ( ele, 'background-color' ));
    //转换当前颜色为RBG数组
    //申明变量,计算每步的差值,(目标颜色-当前颜色)/10
    var sR = (targetColor[0]-ele.rgbArr[0])/step;
    var sG = (targetColor[1]-ele.rgbArr[1])/step;
    var sB = (targetColor[2]-ele.rgbArr[2])/step;
    //取整
    sR = sR > 0 ? Math.ceil(sR):Math.floor(sR);
    sG = sG > 0 ? Math.ceil(sG):Math.floor(sG);
    sB = sB > 0 ? Math.ceil(sB):Math.floor(sB);
    //赋值
    var bgc = 'rgb('+parseInt((sR+ele.rgbArr[0]))+','+parseInt((sG+ele.rgbArr[1]))+','+parseInt((sB+ele.rgbArr[2]))+')'

    ele.style.backgroundColor = bgc;
    if ( ele.rgbArr == targetColor ){// 判断是否和目标颜色一样
        //  clearInterval(ele.timeID);
    }
}



/**RGB转换为RGB数组
     * @param Color RBG颜色（数值，百分比） or Hex颜色
     * @return {string[]}   RGB颜色数组
     */
    function getColorList ( Color ) {
        if(Color.indexOf('%') != -1){//百分比RGB颜色
            Color = Color.replace('rgb(','').replace(')','').split('%, ');//获取R,G,B数组
            Color[2] = Color[2].replace('%','');
            for (var i =0; i < Color.length; i++) {
                Color[i] = parseInt((Color[i]*255)/100);
            }
        }else if(Color.indexOf('#') != -1){//Hex颜色
            Color = Color.replace('#','');//替换掉#，便于循环
            var temp = []
            for (var i = 0; i < 3; i++) {//隔两位取值
                temp[i] = parseInt(Color.substr(i*2,2),16);
            }
            Color = temp;
        }else {//数值RGB颜色
            Color = Color.replace('rgb(','').replace(')','').split(', ');//获取R,G,B数组
            for(var i = 0; i < Color.length; i++) {//将RGB转换16进制颜色
                Color[i] = parseInt(Color[i]);//转成数字
            }
        }
        
        return Color;
            //转换进制
            // hexArr[i] = hexColor[i] < 10 ? "0" + hexColor[i].toString ( 16 ) : hexColor[i].toString ( 16 );
    }




/**获取元素样式属性
 *
 * @param ele 要获取的元素
 * @param attribute 要获取的属性名字符串
 */
function getStyle ( ele, attribute ) {
    //能力检测
    if ( window.getComputedStyle ) {//谷歌火狐
        return window.getComputedStyle ( ele, null )[ attribute ]
    } else {//IE8浏览器
        return ele.currentStyle[ attribute ]
    }
}