
(function(window,$,doc) {
    var Star = function(){   
        
         this.form = "",
         this.type = "total",
         this.total = $('#total');
         this.summary = $('#summary');
         this.navArr = $('.detail__navTag');
         this.obj = {
            numTitle:'',
            numTitle2:'',
            num1:'',
            num2:'',
        }
         this.init();
       

     }

  Star.prototype = {
    constructor:Star,
    init(){
          
          this.form = this._getQueryString('id');
          this.createView();
          this.bindHandle();



　　　},
    /**
     * @Author fyt
     * @Description 
     * @Date 2020-04-09 18:14:04 星期四
     */
    createView(){
 
        let _this = this;
        console.log(_this.obj)



        switch(this.form){
            case '101':
            _this.obj.numTitle = '在港集装箱实时总数'
            _this.obj.num1 = '3000'
            
            this.createViewByJzx();
            break;
            case '102':

            _this.obj.numTitle = '在港集装箱实时总数'
             _this.obj.num1 = '3000'

            this.createViewByCl();
            break;
            case '103':

            _this.obj.numTitle = '在港集装箱实时总数'
            _this.obj.num1 = '3000'
            this.createViewBySp();
            break;
            case '104':
            _this.obj.numTitle = '最近一月靠港船舶总数';
            _this.obj.numTitle2= '在港作业船舶实时总数';
            _this.obj.num1 = '8';
            _this.obj.num2 = '3';
            this.createViewByCb();
            break;
            case '104':
            _this.obj.numTitle = '在港集装箱实时总数'
            _this.obj.num1 = '3000'
            this.createViewByDzwl();
            break;
        
        }






    },
    createViewByJzx(){

        let right__num = $('#right__num');
        let str = `<span class="num__title">${this.obj.numTitle}</span>
        <span class="num__num">${this.obj.num1}</span>`
        right__num.prepend(str).css({display:'flex'});
        
        // console.log(right__num )





    },
    createViewByCl(){

        
    },
    createViewBySp(){

        
    },
    createViewByCb(){

        
    },  
    createViewByDzwl(){

        
    },


    /**
     * @Author fyt
     * @Description 获取地址栏参数
     * @Date 2020-04-09 17:25:09 星期四
     */
    _getQueryString(name){
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
        let _this = this;
        this.total.on('click',this.handleTotal);
        this.summary.on('click',this.handleSummary);
        this.navArr.each( function(){
            $(this).on('click',_this .handleNav)
        } )
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
    handleSummary(data){

        console.log('sum')


    },
    /**
     * @Author fyt
     * @Description 点击导航
     * @Date 2020-04-09 17:57:03 星期四
     */
    handleNav(e){

        console.log(e.target.id)


    }



    
  };
window.Star = window.Star || Star;
}(window,jQuery,document));

