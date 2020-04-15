
// import request from '../../../libs/request.js'


(function(window,$,doc) {
    var Star = function(){
         this.init();
     }

  Star.prototype = {
    constructor:Star,
    init(){

          this.bindHandle(doc);
          this.getData(window.baseUrl.indexUrl);
　　　},
    /**
     * @Author fyt
     * @Description 给document绑定点击事件 跳转
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle(doc){
       if(doc){
        $(doc).click( function(){
          $(location).attr('href','../../../pages/home/html/home.html');
        } )
       }
    },
    /**
     * @Author fyt
     * @Description 获取数据
     * @Date 2020-04-12 11:55:03 星期天
     */
    async getData(path){
       let data = await this.request(path);
       let  { wlzbNum,wlzbNumMonth,jzxNum ,spNum,dzwlNum,cbNum,cbNumMonth,clNum,clNumMonth,wlzbTrendX,wlzbTrendY,jzxSpreadX,jzxSpreadY,jzxTrendX,jzxTrendY,cbTrendX,cbTrendY,clTrendX,clTrendY,dzwlData}  = data;
       let objNum = { wlzbNum, wlzbNumMonth,jzxNum ,spNum,dzwlNum,cbNum,cbNumMonth,clNum,clNumMonth }
       this.createOne(jzxSpreadX,jzxSpreadY,jzxTrendX,jzxTrendY);
       this.createTwo(cbTrendX,cbTrendY);
       this.createThr(clTrendX,clTrendY);
       this.createNum(objNum,dzwlData);
       this.createZhu(wlzbTrendX,wlzbTrendY);
       this.createYiBao();


    },
    /**
     * @Author fyt
     * @Description 仪表
     * @Date 2020-04-15 19:56:37 星期三
     */
    createYiBao(){

       let con__ybCon = $('.con__ybCon');
       $.each(con__ybCon,function(index,ele){
           let item = echarts.init(ele);
           let opt =    {
            tooltip: {
                formatter: '{a} <br/>{b} : {c}%'
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    radius: 50,
                    detail: {formatter: '{value}%'},
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                      color: '#333',
                      fontSize : 12,
                     
                  },
                  data: [{value: 50, name: '比率'}],
                  detail : {//最下边数值的设置
                    show : true,
                    //backgroundColor: 'rgba(0,0,0,0)',
                   // borderWidth: 0,
                   borderColor: '#ccc',
                    //width: 100,
                    //height: 40,
                    offsetCenter: ['0', '30'],       // x, y，单位px
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                       color: '#ffffff',
                        fontSize : 12
                    }
                },

                }
            ]
        }
        item.setOption(opt)
        setInterval(()=>{

          opt.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          item.setOption(opt, true);


        },2000)
        
       })
      


    },
    /**
     * @Author fyt
     * @Description 上下行业务数据量
     * @Date 2020-04-15 12:00:34 星期三
     */

    createZhu(xdata1,ydata1){

      var myChart1 = echarts.init(document.getElementById("zhuzhuang1"));
      myChart1.setOption({
        color: ["#9cd8ff"],
        grid: {
                x: "16%",//x 偏移量
                y: "7%", // y 偏移量
                width: "80%", // 宽度
                height: "80%"// 高度
              },
        tooltip: {
          trigger: "item",
          formatter: "{c}"
        },
        xAxis: {
          type: "category",
          offset: 2,
          data: xdata1,
          axisLabel: {
            rotate: 0,
            color: "#9cd8ff"
          },
          axisLine: {
            lineStyle: {
              color: "#e7e7e7",
              width: 1 //这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLabel: {
            rotate: 0,
            color: "#9cd8ff"
          },
          axisLine: {
            show: false, //显示坐标轴线
            color: "#ffa028",
            lineStyle: {
              color: "#9cd8ff",
              width: 1 //这里是为了突出显示加上的
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#7b91e7",
            }
          }
        },
        series: [
          {
            data: ydata1,
            type: "bar",
            barWidth: "32",
            itemStyle: {

              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  1,
                  0,
                  0,
                  [
                    {
                      offset: 0,
                      color: "#5f8ffd" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#1a5fff" // 100% 处的颜色
                    }
                  ],
                  false
                ),
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#9cd8ff",
                    fontSize: 14
                  }
                }
              }
            }
          }
        ]
      })

  


        
    },

    /**
     * @Author fyt
     * @Description 实时总数
     * @Date 2020-04-12 12:54:45 星期天
     */
    createNum(data,data2){
      $('#jzxNum').text(data.jzxNum)
      $('#spNum').text(data.spNum)
      $('#dzwlNum').text(data.dzwlNum)
      $('#cbNum').text(data.cbNum)
      $('#cbNumMonth').text(data.cbNumMonth)
      $('#clNum').text(data.clNum)
      $('#clNumMonth').text(data.clNumMonth)
      $('#wlzbSum').text(data.wlzbNum)
      $('#wlzb5G').text(data.wlzbNumMonth)

      let str = "";
      if(data2.length > 0){
          data2.forEach((ele)=>{
            str = str + `<div class="con__sumA">
            <span class="con__sumSubTitle">${ele.area}</span>
            <div class="con__sumP">
              <span class="con__sumPl">${ele.titleOne}</span>
              <span class="con__sumPc"> <span class="con__sumPcItem" style="width:${ Math.floor(ele.valOne/150*100 )}%"></span></span>
              <span class="con__sumPl">${ele.valOne}次</span>
            </div>
            <div class="con__sumP">
              <span class="con__sumPl">${ele.titleTwo}</span>
              <span class="con__sumPc"> <span class="con__sumPcItem" style="width:${ Math.floor(ele.valTwo/150*100 )}%"></span></span>
              <span class="con__sumPl">${ele.valTwo}次</span>
            </div>
          </div>`
          })
          $("#con__sum").append(str)
      }
    },


    /**
     * @Author fyt
     * @Description 不同箱区集装箱实时分布+港口集装箱总吞吐量变化趋势
     * @Date 2020-04-12 12:16:26 星期天
     */

    createOne(xdata1,ydata1,xdata2,ydata2){
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
              color:['#f6ba53','#f55b72','#396edb','#46cecb','#56c762','#f55b72'],
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
     * @Description 靠港作业船舶数量变化趋势
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
     * @Description 在港作业集卡数量变化趋势
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

