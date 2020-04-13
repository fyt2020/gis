

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
     /**
     * @Author fyt
     * @Description 封装请求
     * @Date 2020-04-13 17:33:19 星期一
     */
    async request(path,opt){
      const url = path;
      const options = Object.assign({
       method:"GET",
       headers: {
             'content-type': 'application/json'
         }
      },opt);
      try{
       const response = await fetch(url,options);
       const { data, status } = await response.json();
       if(status == 0){
            return data
       }else{   
             console.log("请求错误1")
       }
     }catch(err){
             console.log(err)
     }
    }
  };
window.Star = window.Star || Star;
}(window,jQuery,document));

