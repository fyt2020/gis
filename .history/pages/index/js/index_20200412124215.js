
import request from '../../../libs/request.js'


(function(window,$,doc) {
    var Star = function(){    
         this.init();     
     }

  Star.prototype = {
    constructor:Star,
    init(){
     
          this.bindHandle(doc);
          this.getData('../../../data/index/index.json');
          // console.log(request)
　　　},
    /**
     * @Author fyt
     * @Description 给document绑定点击事件 跳转
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle(doc){
       if(doc){
        $(doc).click( function(){
          $(location).attr('href','../../home/html/home.html');
        } )
       }
    },
    /**
     * @Author fyt
     * @Description 获取数据
     * @Date 2020-04-12 11:55:03 星期天
     */
    async getData(path){
       let data = await request(path);
       let  { jzxNum ,spNum,dzwlNum,cbNum,clNum,jzxSpreadX,jzxSpreadY,jzxTrendX,jzxTrendY,cbTrendX,cbTrendY,clTrendX,clTrendY}  = data;
       this.createOne(jzxSpreadX,jzxSpreadY,jzxTrendX,jzxTrendY);
       this.createTwo(cbTrendX,cbTrendY);
       this.createThr(clTrendX,clTrendY);
     

    },
    /**
     * @Author fyt
     * @Description 不同箱区集装箱实时分布+港口集装箱总吞吐量变化趋势
     * @Date 2020-04-12 12:16:26 星期天
     */

    createOne(xdata1,ydata1,xdata2,ydata2,num){
        var myChart1 = echarts.init(document.getElementById("zexian1"));
        var myChart2 = echarts.init(document.getElementById("san"));
        myChart1.setOption({
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
              data: xdata2,
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
                data: ydata2,
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
        myChart2.setOption({
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
                  data: xdata1
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
                      data: ydata1
                  }
              ]
        })
    },
    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-12 12:25:16 星期天
     */
    createTwo(xdata1,ydata1){

      
        var myChart1 = echarts.init(document.getElementById("zexian2"));
        myChart1.setOption({
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
              data: xdata1,
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
                data: ydata1,
                type: "line",
                // smooth: true,
                // symbol: true,
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
        // console.log( myChart1 )





    },
    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-12 12:25:19 星期天
     */
    createThr(xdata1,ydata1){
        var myChart1 = echarts.init(document.getElementById("zexian3"));
        myChart1.setOption({
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
              data: xdata1,
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
                data: ydata1,
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
  };
window.Star = window.Star || Star;
}(window,jQuery,document));
