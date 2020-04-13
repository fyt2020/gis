
import request from '../../../libs/request.js'
(function(window,$,doc) {
    var Star = function(){    
         this.init();
     }

  Star.prototype = {
    constructor:Star,
    init(){
          this.bindHandle(doc);
          this.getData('../../../data/home/home.json');
　　　},
    /**
     * @Author fyt
     * @Description 获取数据
     * @Date 2020-04-12 13:07:50 星期天
     */

    async getData(path){

      let data = await request(path);
      console.log(data)
      let {jzxNum ,spNum,dzwlNum,cbNum,clNum} = data;
      let objNum = {jzxNum ,spNum,dzwlNum,cbNum,clNum}
      this.createNum(objNum)
 


    },
        /**
     * @Author fyt
     * @Description 实时总数
     * @Date 2020-04-12 12:54:45 星期天
     */
    createNum(data){
      $('#jzxNum').text(data.jzxNum)
      $('#spNum').text(data.spNum)
      $('#dzwlNum').text(data.dzwlNum)
      $('#cbNum').text(data.cbNum)
      $('#clNum').text(data.clNum)
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

