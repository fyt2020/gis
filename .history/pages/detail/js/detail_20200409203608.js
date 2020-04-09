
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

          this.createView();//右边数据展示
          this.bindHandle();//绑定事件



　　　},
    /**
     * @Author fyt
     * @Description 
     * @Date 2020-04-09 18:14:04 星期四
     */
    createView(){
 
        let _this = this;
     



        switch(this.form){
            case '101'://集装箱
            _this.obj.numTitle = '在港集装箱实时总数'
            _this.obj.num1 = '3000'
            this.createViewByJzx();
            break;
            case '102'://车辆
            _this.obj.numTitle = '今日港口集卡总数';
            _this.obj.numTitle2= '港区内运行集卡实时总数';
            _this.obj.num1 = '18';
            _this.obj.num2 = '13';

            this.createViewByCl();
            break;
            case '103'://视频
            _this.obj.numTitle = '港口摄像头总数'
            _this.obj.num1 = '300'
            this.createViewBySp();
            break;
            case '104'://船舶
            _this.obj.numTitle = '最近一月靠港船舶总数';
            _this.obj.numTitle2= '在港作业船舶实时总数';
            _this.obj.num1 = '8';
            _this.obj.num2 = '3';
            this.createViewByCb();
            break;
            case '105'://电子围栏
            _this.obj.numTitle = '港口电子围栏总数'
            _this.obj.num1 = '343'
            this.createViewByDzwl();
            break;
        
        }






    },
    createViewByJzx(){



        let right__num = $('#right__num');
        this.navArr[0].src = '../../../css/img/jzx.png';
        let str = `<span class="num__title">${this.obj.numTitle}</span>
        <span class="num__num">${this.obj.num1}</span>`
        right__num.prepend(str).css({display:'flex'});
        
    





    },
    createViewByCl(){
        this.navArr[1].src = './../../css/img/cl.png';
        let right__num2 =  $('#right__num2');
        let str = `<div class="num2__left">
        <span class="num__smallW">${this.obj.numTitle}</span>
        <span class="num__numSn">${this.obj.num1}</span>
       </div>
    <div class="num2__right">
        <span class="num__smallW">${this.obj.numTitle2}</span>
        <span class="num__numSn">${this.obj.num2}</span>
    </div>`;
    right__num2.prepend(str).css({display:'flex'});

        
    },
    createViewBySp(){
        this.navArr[2].src = '../../../css/img/sp.png';
        

        let right__num = $('#right__num');
        let str = `<span class="num__title">${this.obj.numTitle}</span>
        <span class="num__num">${this.obj.num1}</span>`
        right__num.prepend(str).css({display:'flex'});



        
    },
    createViewByCb(){
        this.navArr[3].src = '../../../css/img/cb.png';
        let right__num2 =  $('#right__num2');
        let str = `<div class="num2__left">
        <span class="num__smallW">${this.obj.numTitle}</span>
        <span class="num__numSn">${this.obj.num1}</span>
    </div>
    <div class="num2__right">
        <span class="num__smallW">${this.obj.numTitle2}</span>
        <span class="num__numSn">${this.obj.num2}</span>
    </div>`;
    right__num2.prepend(str).css({display:'flex'});



        
    },  
    createViewByDzwl(){
        this.navArr[1].src = './../../css/img/cl2.png';
        let right__num = $('#right__num');
        let str = `<span class="num__title">${this.obj.numTitle}</span>
        <span class="num__num">${this.obj.num1}</span>`
        right__num.prepend(str).css({display:'flex'});

        
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

