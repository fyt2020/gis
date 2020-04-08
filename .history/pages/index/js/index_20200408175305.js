// console.log(jQuery);
// console.log(echarts)
(function(window,$,doc) {


    //一般习惯将这个构造函数名手写字母大写
    var Star = function(id){    

         this.demo1  =  $('#san');
         this.demo2  =  $('#zexian1');
         this.demo3  =  $('#zexian2');

         //执行下你下面写的函数；如果整个插件没有执行函数；一堆方法function就不调用；这里是调用的时候最开始执行的函数
         this.init();

     }

  Star.prototype = {
    constructor:Star,//构造器指向构造函数 ,防止构造器指向Object的情况；
    init: function(){ //调用下面写的函数
　　　　　　this.otherMethod()
　　　　},
    otherMethod: function(){}
  };
window.Star = window.Star || Star; //把这个对象附给window底下的 名字叫Star的对象；要不你调用的时候  new Star() 怕在window的环境下找不到；
}(window,jQuery,document));

