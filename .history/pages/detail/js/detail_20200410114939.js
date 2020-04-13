
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
            jzxXdata1:[  {value: 1000, name: 'A区'},
            {value: 500, name: 'B区'},
            {value: 234, name: 'C区'},
            {value: 135, name: 'D区'},
            {value: 400, name: 'E区'}],
            jzxYdata1: ['A区', 'B区','C区','D区','E区'],
            jzxXdata2:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            jzxYdata2:[200, 932, 901, 934, 1290, 1330, 1320],
            jzxSumData:[{
                title:'提单号',
                value:'OOLUEZIA03187'
            },
            {
                title:'箱号',
                value:'OOLU8605905'
            },
            {
                title:'场位',
                value:'D1028072'
            },
            {
                title:'尺寸',
                value:'40'
            },
            {
                title:'箱主',
                value:'OOL'
            },
            {
                title:'IOS',
                value:'40'
            },
            {
                title:'空重',
                value:'E'
            },
        ]

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

        if(this.form === '101'&& this.type === 'total'){

            

            let STR = `
            <div class="right__num" id="right__num"></div>
            <div class="right__num2" id="right__num2"></div>
            <div class="right__san" id="right__san1"></div>
            <div class="right__zexian" id="right__zexian1"></div>`;

            $('.right__info').prepend(STR)

            this.navArr[0].src = '../../../css/img/jzx.png';

            let str = `<span class="num__title">${this.obj.numTitle}</span>
            <span class="num__num">${this.obj.num1}</span>`
            $('#right__num').prepend(str).css({display:'flex'});
    
            let str1 = `<p class="right__sanT">不同箱区集装箱实时分布</p>
            <div class="right__sanC" id="right__sanC"></div>`
            $('#right__san1').prepend(str1).css({display:'flex'})
    
            let str2 = `<p class="right__zexianT">港口集装箱总吞吐量变化趋势</p>
            <div class="right__zexianC" id="right__zexianC"></div>`
            $('#right__zexian1').prepend(str2).css({display:'flex'})
    
            this.createEcha__jxz()


        }else{
            let STR = `<div class="right__infoTitle">
            <img src="../../../css/img/jzxl.png" alt="" class="right__infoIcon" />
                    <div class="right__infoWbox">
                        <p class="right__infoW">集装箱信息展示</p>
                        <p class="right__infoWe">Stevedoring operation Information</p>
                    </div>
          </div>
          <ul class="right__infoCon"></ul>`;
          $('.right__info').prepend(STR);
          let str1 = ''
          $.each(this.obj.jzxSumData,(index,ele) => {
            str1 = str1 + `<li class="right__infoItem">
            <span class="right__itemTitle">${ele.title}</span>
            <span class="right__itemCon">${ele.value}</span>
            </li>`;
          });
          $('.right__infoCon').prepend(str1);
        }
        
     








    },
    createEcha__jxz(){

        // console.log(this)


        var myChart1 = echarts.init(document.getElementById("right__sanC"));
        var myChart2 = echarts.init(document.getElementById("right__zexianC"));
   
        myChart1.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'horizontal',
                left:0,
                bottom:20,
        
                textStyle: { //图例文字的样式
                    color: '#fff',
                    fontSize: 12
                },
                data: this.obj.jzxYdata1
            },
            color:['#f6ba53','#f55b72','#396edb','#46cecb','#56c762'],
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: this.obj.jzxXdata1
                }
            ]
        })

        myChart2.setOption({
            grid: {
                x: "16%",//x 偏移量
                y: "7%", // y 偏移量
                width: "80%", // 宽度
                height: "80%"// 高度
              },
        
            xAxis: {
              offset: 2,
              type: "category",
              boundaryGap: false,
              data: this.obj.jzxXdata2,
              axisLabel: {
                rotate: 0,
                color: "#9cd8ff"
              },
              axisTick: {
                show: false
              },
              axisLine: {
                symbol: ["none", "arrow"],
                symbolSize: [3, 3],
                show: false,
                lineStyle: {
                  color: "#74520f"
                  //width: 1 //这里是为了突出显示加上的
                }
              }
            },
            yAxis: {
              type: "value",
            //   max:2000,
            //   min:0,
            //   splitNumber: 2,
              minInterval: 1, 
              axisTick: {
                show: false
              },
              axisLine: {
                symbol: ["none", "arrow"],
                symbolSize: [3, 3],
                show: false, //显示坐标轴线
                color: "#ffa028",
                lineStyle: {
                  color: "#9cd8ff",
                  width: 1 //这里是为了突出显示加上的
                }
              },
              // minInterval: 10,
              splitLine: {
                show: true,
                lineStyle: {
                  type: "solid",
                  color: "#7b91e7"
                }
              }
            },
            series: [
              {
                data: this.obj.jzxYdata2,
                type: "line",
                // smooth: true,
                //symbol: true,
                lineStyle: {
                  normal: {
                    color: "#7b91e7"
                  }
                },
                itemStyle: {
                  normal: {
                    color: "#0095ff",
                    label: {
                      show: false, //开启显示
                      position: "top", //在上方显示
                      textStyle: {
                        //数值样式
                        color: "#7b91e7",
                        fontSize: 12
                      }
                    }
                  }
                },
                // itemStyle : {
                //   normal:
                //    {
                //       label: {
                //       show: true, //开启显示
                //       position: "top", //在上方显示
                //       textStyle: {
                //         //数值样式
                //         color: "#36dbf9",
                //         fontSize: 12
                //       }
                //     }
                //   }
                // },
                // #5ecbec 0%, 
                // #449ff2 55%, 
                // #2972f8 100%);
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#2972f8  " },
                      { offset: 1, color: "#000000" }
                    ])
                  }
                }
              }
            ]
          });


    },






    createViewByCl(){
        this.navArr[1].src = '../../../css/img/cl.png';
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
        this.navArr[3].src = '../../../css/img/cbl.png';
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
        this.navArr[4].src = '../../../css/img/dzwl.png';
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
        this.total.on('click',this.handleTotal.bind(_this));
        this.summary.on('click',this.handleSummary.bind(_this));
        this.navArr.each( function(){
            $(this).on('click',_this.handleNav.bind(_this))
        } )
    },
    /**
     * @Author fyt
     * @Description 点击总量
     * @Date 2020-04-09 17:55:30 星期四
     */
    handleTotal(){

       
        this.type = 'total';
        document.getElementById('total__img').src = '../../../css/img/总量.png'
        document.getElementById('sum__img').src = '../../../css/img/概述.png'
        $('.right__info').empty();

        
        switch(this.form){
            case '101':
            this.navArr[0].src = '../../../css/img/jzx.png';
            this.createViewByJzx()

            break;
            case '102':
            this.navArr[1].src = '../../../css/img/cl.png';
            this.createViewByCl()
            break;
            case '103':
            this.navArr[2].src = '../../../css/img/sp.png';
            this.createViewBySp()
            break;
            case '104':
            this.navArr[3].src = '../../../css/img/cbl.png';
            this.createViewByCb()
            break;
            case '105':
            this.navArr[4].src = '../../../css/img/dzwl.png';
            this.createViewByDzwl()
            break;
        }



    },
    /**
     * @Author fyt
     * @Description 点击概述
     * @Date 2020-04-09 17:56:19 星期四
     */
    handleSummary(){

        document.getElementById('total__img').src = '../../../css/img/zlxz.png'
        document.getElementById('sum__img').src = '../../../css/img/gxxz.png'
        this.type = 'summary';
        $('.right__info').empty();
              
          
        switch(this.form){
            case '101':
            this.navArr[0].src = '../../../css/img/jzx.png';
            this.createViewByJzx()

            break;
            case '102':
            this.navArr[1].src = '../../../css/img/cl.png';
            this.createViewByCl()
            break;
            case '103':
            this.navArr[2].src = '../../../css/img/sp.png';
            this.createViewBySp()
            break;
            case '104':
            this.navArr[3].src = '../../../css/img/cbl.png';
            this.createViewByCb()
            break;
            case '105':
            this.navArr[4].src = '../../../css/img/dzwl.png';
            this.createViewByDzwl()
            break;
        }


    




    },
    /**
     * @Author fyt
     * @Description 点击导航
     * @Date 2020-04-09 17:57:03 星期四
     */
    handleNav(e){
 
        this.reSetNav();
        this.form = e.target.id;
        this.type = 'total';
        this.handleTotal()


        // switch(this.form){
        //     case '101':
        //     this.navArr[0].src = '../../../css/img/jzx.png';
        //     this.createViewByJzx()

        //     break;
        //     case '102':
        //     this.navArr[1].src = '../../../css/img/cl.png';

        //     break;
        //     case '103':
        //     this.navArr[2].src = '../../../css/img/sp.png';
        //     break;
        //     case '104':
        //     this.navArr[3].src = '../../../css/img/cbl.png';
        //     break;
        //     case '105':
        //     this.navArr[4].src = '../../../css/img/dzwl.png';
        //     break;
        // }
    //   this.handleTotal()
    },
    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-10 09:24:01 星期五
     */
    reSetNav(){
        this.navArr[0].src = '../../../css/img/1.png';
        this.navArr[1].src = '../../../css/img/2.png';
        this.navArr[2].src = '../../../css/img/3.png';
        this.navArr[3].src = '../../../css/img/4.png';
        this.navArr[4].src = '../../../css/img/5.png';
        $('.right__info').empty();

    }



    
  };
window.Star = window.Star || Star;
}(window,jQuery,document));

