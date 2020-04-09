
(function(window,$,doc) {
    var Star = function(){    
         this.init();
     }

  Star.prototype = {
    constructor:Star,
    init(){
          this.bindHandle(doc);
　　　},
    /**
     * @Author fyt
     * @Description 给document绑定点击事件 跳转
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle(doc){
       if(doc){
        $(doc).click( function(){
          $(location).attr('href','../../homeNav/html/homeNav.html' );
        } )
       }
    },
  };
window.Star = window.Star || Star;
}(window,jQuery,document));

