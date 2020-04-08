// console.log(jQuery);
// console.log(echarts)
(function(window,$,doc) {

    var Star = function(){    

        //  this.demo1  =  $('#san');
        //  this.demo2  =  $('#zexian1');
        //  this.demo3  =  $('#zexian2');
        //  this.body = $(doc.body);


         //执行下你下面写的函数；如果整个插件没有执行函数；一堆方法function就不调用；这里是调用的时候最开始执行的函数
         this.init();

     }

  Star.prototype = {
    constructor:Star,//构造器指向构造函数 ,防止构造器指向Object的情况；
    init: function(){ //调用下面写的函数
          
       
          this.createOne()
　　　　　
　　　},
    createOne(){

      
        var myChart1 = echarts.init(document.getElementById("zexian1"));
        var xdata = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        var ydata = [820, 932, 901, 934, 1290, 1330, 1320];


        myChart1.setOption({
            grid: {
                x: "7%",//x 偏移量
                y: "7%", // y 偏移量
                width: "87%", // 宽度
                height: "79%"// 高度
              },
        
            xAxis: {
              offset: 2,
              type: "category",
              boundaryGap: false,
              data: xdata,
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
                data: ydata,
                type: "line",
                smooth: true,
                //symbol: true,
                lineStyle: {
                  normal: {
                    color: "#7b91e7"
                  }
                },
                itemStyle: {
                  normal: {
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
        // console.log( myChart1 )





    },
    
  };
window.Star = window.Star || Star; //把这个对象附给window底下的 名字叫Star的对象；要不你调用的时候  new Star() 怕在window的环境下找不到；
}(window,jQuery,document));

