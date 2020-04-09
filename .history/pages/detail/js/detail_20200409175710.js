
(function(window,$,doc) {
    var Star = function(){   
        
         this.form = "",
         this.type = "total",
         this.init();

     }

  Star.prototype = {
    constructor:Star,
    init(){
          this.form = this.getQueryString('id');
          this.bindHandle();


          console.log(this.type )
         
　　　},
    /**
     * @Author fyt
     * @Description 获取地址栏参数
     * @Date 2020-04-09 17:25:09 星期四
     */
    getQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    },
    /**
     * @Author fyt
     * @Description 给元素绑定点击事件
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle(){

        let total = $('#total');


         


    },
    /**
     * @Author fyt
     * @Description 点击总量
     * @Date 2020-04-09 17:55:30 星期四
     */
    handleTotal(){

        console.log('total')


    },
    /**
     * @Author fyt
     * @Description 点击概述
     * @Date 2020-04-09 17:56:19 星期四
     */
    handleSummary(){


    },
    /**
     * @Author fyt
     * @Description 点击导航
     * @Date 2020-04-09 17:57:03 星期四
     */



    
  };
window.Star = window.Star || Star;
}(window,jQuery,document));

