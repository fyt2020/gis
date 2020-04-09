
(function(window,$,doc) {
    var Star = function(){   
        
         this.form = "",
         this.type = "",
         this.init();

     }

  Star.prototype = {
    constructor:Star,
    init(){
          this.form = this.getQueryString('id');

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
     * @Description 给元素绑定点击事件跳转
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle(){



    },
  };
window.Star = window.Star || Star;
}(window,jQuery,document));

