import request from "../../../libs/request.js";
(function (window, $, doc) {
  var Star = function () {
    this.form = "";
    this.type = "total";
    this.total = $("#total");
    this.summary = $("#summary");
    this.navArr = $(".detail__navTag");
    this.obj = {
      numTitle: "在港集装箱实时总数",
      jzxXdata1: [],
      jzxYdata1: [],
      jzxXdata2: [],
      jzxYdata2: [],
      jzxSumData: [],

      clNumTitle1: "今日港口集卡总数",
      clNumTitle2: "港区内运行集卡实时总数",
      clNumVal1: "28",
      clNumVal2: "34",
      clInfoData: [],
      clInfoDataS1: [],
      clInfoDataS2: [],

      cdNumTitle1: "最近一月靠港船舶总数",
      cdNumTitle2: "在港作业船舶实时总数",
      cdNumVal1: "8",
      cdNumVal2: "3",
      cdInfoData: [],
      cdInfoDataS: [],

      spNumTitle1: "港口摄像头总数",
      spNumVal1: "500",
      spXdata1: [],
      spYdata1: [],
      spSumData: [],

      dzwlNumTitle: "港口电子围栏总数",
      dzwlNumVal: "13",
      dzwlInfoData: [
        {
          title: "堆场A区电子围栏001",
          value:
            "北纬N34°42′24.46″ 东经E103°39′52.78″北纬N40°48′15.51″ 东经E104°54′43.51″",
        },
        {
          title: "危险品堆场区电子围栏002",
          value:
            "北纬N34°42′24.46″ 东经E103°39′52.78″北纬N40°48′15.51″ 东经E104°54′43.51″",
        },
        {
          title: "自动驾驶区电子围栏003",
          value:
            "北纬N34°42′24.46″ 东经E103°39′52.78″北纬N40°48′15.51″ 东经E104°54′43.51″",
        },
      ],
      dzwlInfoDataSum1: [
        {
          title: "名称",
          value: "D1290",
        },
        { title: "有效时间段", value: "2023-09-12" },
      ],

      dzwlInfoDataSum2: [
        {
          title: "人员闯入6次",
          value: "北纬N34°42′24.46″ 东经E103°39′52.78″",
        },
        {
          title: "人员闯入6次",
          value: "北纬N34°42′24.46″ 东经E103°39′52.78″",
        },
        {
          title: "人员闯入6次",
          value: "北纬N34°42′24.46″ 东经E103°39′52.78″",
        },
        {
          title: "人员闯入6次",
          value: "北纬N34°42′24.46″ 东经E103°39′52.78″",
        },
        {
          title: "人员闯入6次",
          value: "北纬N34°42′24.46″ 东经E103°39′52.78″",
        },
        {
          title: "人员闯入6次",
          value: "北纬N34°42′24.46″ 东经E103°39′52.78″",
        },
      ],
    };
    this.init();
  };

  Star.prototype = {
    constructor: Star,
    init() {
      this.form = this._getQueryString("id");
      this.createView(); //右边数据展示
      this.bindHandle(); //绑定事件
    },
    /**
     * @Author fyt
     * @Description 获取数据
     * @Date 2020-04-13 09:47:59 星期一
     */
    async getData(path) {
      let data = await request(path);
      return data;
    },

    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-09 18:14:04 星期四
     */
    createView() {
      let _this = this;
      this.handleSwitch();
    },

    createViewByJzx() {
      if (this.form === "101" && this.type === "total") {
        this.getData("../../../data/detail/jzxData.json")
          .then((res) => {
            let { jzxNum, jzxSpreadX, jzxSpreadY, jzxTrendX, jzxTrendY } = res;
            let STR = `
              <div class="right__num" id="right__num"></div>
              <div class="right__num2" id="right__num2"></div>
              <div class="right__san" id="right__san1"></div>
              <div class="right__zexian" id="right__zexian1"></div>`;
            $(".right__info").prepend(STR);
            let str = `<span class="num__title">${this.obj.numTitle}</span>
              <span class="num__num">${jzxNum}</span>`;
            $("#right__num").prepend(str).css({ display: "flex" });

            let str1 = `<p class="right__sanT">不同箱区集装箱实时分布</p>
              <div class="right__sanC" id="right__sanC"></div>`;
            $("#right__san1").prepend(str1).css({ display: "flex" });

            let str2 = `<p class="right__zexianT">港口集装箱总吞吐量变化趋势</p>
              <div class="right__zexianC" id="right__zexianC"></div>`;
            $("#right__zexian1").prepend(str2).css({ display: "flex" });

            this.createEcha__jxz(jzxSpreadX, jzxSpreadY, jzxTrendX, jzxTrendY);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getData("../../../data/detail/jzxSumData.json")
          .then((res) => {
            let { jzxSumData } = res;
            let STR = `<div class="right__infoTitle">
                 <img src="../../../css/img/jzxl.png" alt="" class="right__infoIcon" />
                         <div class="right__infoWbox">
                             <p class="right__infoW">集装箱信息展示</p>
                             <p class="right__infoWe">Stevedoring operation Information</p>
                         </div>
               </div>
               <ul class="right__infoCon"></ul>`;
            $(".right__info").prepend(STR);
            let str1 = "";
            $.each(jzxSumData, (index, ele) => {
              str1 =
                str1 +
                `<li class="right__infoItem">
                 <span class="right__itemTitle">${ele.title}</span>
                 <span class="right__itemCon">${ele.value}</span>
                 </li>`;
            });
            $(".right__infoCon").prepend(str1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * @Author fyt
     * @Description 生成集装箱图表
     * @Date 2020-04-10 18:05:50 星期五
     */
    createEcha__jxz(sanX, sanY, zexianX, zexianY) {
      var myChart1 = echarts.init(document.getElementById("right__sanC"));
      var myChart2 = echarts.init(document.getElementById("right__zexianC"));

      myChart1.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: 0,
          bottom: 20,

          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
          data: sanX,
        },
        color: ["#f6ba53", "#f55b72", "#396edb", "#46cecb", "#56c762"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: sanY,
          },
        ],
      });

      myChart2.setOption({
        grid: {
          x: "16%", //x 偏移量
          y: "7%", // y 偏移量
          width: "80%", // 宽度
          height: "80%", // 高度
        },

        xAxis: {
          offset: 2,
          type: "category",
          boundaryGap: false,
          data: zexianX,
          axisLabel: {
            rotate: 0,
            color: "#9cd8ff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: false,
            lineStyle: {
              color: "#74520f",
              //width: 1 //这里是为了突出显示加上的
            },
          },
        },
        yAxis: {
          type: "value",
          //   max:2000,
          //   min:0,
          //   splitNumber: 2,
          minInterval: 1,
          axisTick: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: false, //显示坐标轴线
            color: "#ffa028",
            lineStyle: {
              color: "#9cd8ff",
              width: 1, //这里是为了突出显示加上的
            },
          },
          // minInterval: 10,
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#7b91e7",
            },
          },
        },
        series: [
          {
            data: zexianY,
            type: "line",
            // smooth: true,
            //symbol: true,
            lineStyle: {
              normal: {
                color: "#7b91e7",
              },
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
                    fontSize: 12,
                  },
                },
              },
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
                  { offset: 1, color: "#000000" },
                ]),
              },
            },
          },
        ],
      });
    },
    createViewByCl() {
      if (this.form === "102" && this.type === "total") {
        this.getData("../../../data/detail/clData.json")
          .then((res) => {
            let { clNum, clNumMonth, clInfoData, clTrendX, clTrendY } = res;

            let STR = `<div class="right__num2" id="right__num2"></div>
            <div class="right__zexian" id="right__zexian1"></div>
            <div class="right__cbInfo">
            <p class="cbInfo__title">当前在作业集卡名称列表</p>
            <ul class="cbInfo__box" id="cbInfo__box"></ul></div>`;
            $(".right__info").prepend(STR);

            let str = `<div class="num2__left">
               <span class="num__smallW">${this.obj.clNumTitle1}</span>
               <span class="num__numSn">${clNum}</span>
               </div>
               <div class="num2__right">
               <span class="num__smallW">${this.obj.clNumTitle2}</span>
               <span class="num__numSn">${clNumMonth}</span>
             </div>`;
            let str1 = ``;
            $.each(clInfoData, (index, ele) => {
              str1 =
                str1 +
                `<li class="cbInfo__item">
                <span class="right__icr"></span>
                <span class="right__itemw"> ${ele.value}</span>
                </li>`;
            });
            $("#cbInfo__box").prepend(str1);
            let str2 = `<p class="right__zexianT">在港作业集卡数量变化趋势</p>
             <div class="right__zexianC" id="right__zexianC"></div>`;
            $("#right__zexian1").prepend(str2).css({ display: "flex" });
            $("#right__num2").prepend(str).css({ display: "flex" });
            this.createEcha__cl(clTrendX, clTrendY);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getData("../../../data/detail/clSumData.json")
          .then((res) => {
            let { clInfoDataS1, clInfoDataS2 } = res;
            console.log(clInfoDataS2)

            let STR = `<div class="right__infoTitle">
            <img src="../../../css/img/cls.png" alt="" class="right__infoIcon" />
                    <div class="right__infoWbox">
                        <p class="right__infoW">当前港口车辆</p>
                        <p class="right__infoWe">Stevedoring operation Information</p>
                    </div>
          </div>
          <div class="right__cbInfo">
          <p class="cbInfo__title">外集卡数据</p>
          <ul class="cbInfo__box" id="cbInfo__box"></ul></div>
          <div class="right__cbInfo">
          <p class="cbInfo__title">内集卡数据</p>
          <ul class="cbInfo__box" id="cbInfo__box1"></ul></div>
          `;
            $(".right__info").prepend(STR);

            let str1 = "",
              str2 = "";
            $.each(clInfoDataS1, (index, ele) => {
              str1 =
                str1 +
                `<li class="right__infoItem">
            <span class="right__itemTitle">${ele.title}</span>
            <span class="right__itemCon">${ele.value}</span>
            </li>`;
            });
            $(".cbInfo__box").prepend(str1);

            $.each(clInfoDataS2, (index, ele) => {
              str2 =
                str2 +
                `<li class="right__infoItem">
            <span class="right__itemTitle">${ele.title}</span>
            <span class="right__itemCon">${ele.value}</span>
            </li>`;
            });
            console.log(str2)
            $(".cbInfo__box1").prepend(str2);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * @Author fyt
     * @Description 生成车辆图表
     * @Date 2020-04-10 18:06:13 星期五
     */
    createEcha__cl(zexianX, zexianY) {
      var myChart2 = echarts.init(document.getElementById("right__zexianC"));

      myChart2.setOption({
        grid: {
          x: "16%", //x 偏移量
          y: "7%", // y 偏移量
          width: "80%", // 宽度
          height: "80%", // 高度
        },

        xAxis: {
          offset: 2,
          type: "category",
          boundaryGap: false,
          data: zexianX,
          axisLabel: {
            rotate: 0,
            color: "#9cd8ff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: false,
            lineStyle: {
              color: "#74520f",
              //width: 1 //这里是为了突出显示加上的
            },
          },
        },
        yAxis: {
          type: "value",
          //   max:2000,
          //   min:0,
          //   splitNumber: 2,
          minInterval: 1,
          axisTick: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: false, //显示坐标轴线
            color: "#ffa028",
            lineStyle: {
              color: "#9cd8ff",
              width: 1, //这里是为了突出显示加上的
            },
          },
          // minInterval: 10,
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#7b91e7",
            },
          },
        },
        series: [
          {
            data: zexianY,
            type: "line",
            // smooth: true,
            //symbol: true,
            lineStyle: {
              normal: {
                color: "#7b91e7",
              },
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
                    fontSize: 12,
                  },
                },
              },
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
                  { offset: 1, color: "#000000" },
                ]),
              },
            },
          },
        ],
      });
    },
    createViewBySp() {
      if (this.form === "103" && this.type === "total") {
        this.getData("../../../data/detail/spData.json")
          .then((res) => {
            let { spNum, spXdata1, spYdata1 } = res;
            let STR = `
              <div class="right__num" id="right__num"></div>
              <div class="right__san1" id="right__san1"></div>
              `;
            $(".right__info").prepend(STR);

            let str = `<span class="num__title">${this.obj.spNumTitle1}</span>
              <span class="num__num">${spNum}</span>`;
            $("#right__num").prepend(str).css({ display: "flex" });

            let str1 = `<p class="right__sanT1">在港摄像头分布情况</p>
              <div class="right__sanC1" id="right__sanC"></div>`;
            $("#right__san1").prepend(str1).css({ display: "flex" });

            this.createEcha__sp(spYdata1, spXdata1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getData("../../../data/detail/spSumData.json")
          .then((res) => {
            let { spSumData } = res;

            let STR = `<div class="right__infoTitle">
            <img src="../../../css/img/sxt.png" alt="" class="right__infoIcon" />
                    <div class="right__infoWbox">
                        <p class="right__infoW">摄像头信息展示</p>
                        <p class="right__infoWe">Stevedoring operation Information</p>
                    </div>
          </div>
          <ul class="right__infoCon"></ul>`;
            $(".right__info").prepend(STR);
            let str1 = "";
            $.each(spSumData, (index, ele) => {
              str1 =
                str1 +
                `<li class="right__infoItem">
            <span class="right__itemTitle">${ele.title}</span>
            <span class="right__itemCon">${ele.value}</span>
            </li>`;
            });
            $(".right__infoCon").prepend(str1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * @Author fyt
     * @Description 生成视频图表
     * @Date 2020-04-10 18:06:24 星期五
     */
    createEcha__sp(sanX, sanY) {
      var myChart1 = echarts.init(document.getElementById("right__sanC"));
      myChart1.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: 0,
          bottom: 0,

          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 12,
          },
          data: sanX,
        },
        color: [
          "#f6ba53",
          "#f55b72",
          "#396edb",
          "#46cecb",
          "#56c762",
          "#56c762",
        ],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: sanY,
          },
        ],
      });
    },
    createViewByCb() {
      if (this.form === "104" && this.type === "total") {
        this.getData("../../../data/detail/cbData.json")
          .then((res) => {
            let { cbNum, cbNumMonth, cbInfoData, cbTrendX, cbTrendY } = res;

            let STR = `<div class="right__num2" id="right__num2"></div>
          <div class="right__zexian" id="right__zexian1"></div>
          <div class="right__cbInfo">
          <p class="cbInfo__title">当前在作业港船舶名称列表</p>
          <ul class="cbInfo__box" id="cbInfo__box"></ul></div>`;
            $(".right__info").prepend(STR);
            let str = `<div class="num2__left">
             <span class="num__smallW">${this.obj.cdNumTitle1}</span>
             <span class="num__numSn">${cbNum}</span>
             </div>
             <div class="num2__right">
             <span class="num__smallW">${this.obj.cdNumTitle2}</span>
             <span class="num__numSn">${cbNumMonth}</span>
           </div>`;
            let str1 = ``;
            $.each(cbInfoData, (index, ele) => {
              str1 =
                str1 +
                `<li class="cbInfo__item">
              <span class="right__icr"></span>
              <span class="right__itemw"> ${ele.value}</span>
              </li>`;
            });
            $("#cbInfo__box").prepend(str1);
            let str2 = `<p class="right__zexianT">靠港作业船舶数量变化趋势</p>
           <div class="right__zexianC" id="right__zexianC"></div>`;
            $("#right__zexian1").prepend(str2).css({ display: "flex" });
            $("#right__num2").prepend(str).css({ display: "flex" });
            this.createEcha__cb(cbTrendX, cbTrendY);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getData("../../../data/detail/cbSumData.json")
          .then((res) => {
            let { cdInfoDataS } = res;
            let STR = `<div class="right__infoTitle">
           <img src="../../../css/img/cbd.png" alt="" class="right__infoIcon" />
                   <div class="right__infoWbox">
                       <p class="right__infoW">当前港口船舶</p>
                       <p class="right__infoWe">Stevedoring operation Information</p>
                   </div>
         </div>
         <ul class="right__infoCon"></ul>`;
            $(".right__info").prepend(STR);

            let str1 = "";

            $.each(cdInfoDataS, (index, ele) => {
              str1 =
                str1 +
                `<li class="right__infoItem">
           <span class="right__itemTitle">${ele.title}</span>
           <span class="right__itemCon">${ele.value}</span>
           </li>`;
            });

            $(".right__infoCon").prepend(str1);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * @Author fyt
     * @Description 生成船舶图表
     * @Date 2020-04-10 18:07:08 星期五
     */
    createEcha__cb(zexianX, zexianY) {
      var myChart2 = echarts.init(document.getElementById("right__zexianC"));
      myChart2.setOption({
        grid: {
          x: "16%", //x 偏移量
          y: "7%", // y 偏移量
          width: "80%", // 宽度
          height: "80%", // 高度
        },

        xAxis: {
          offset: 2,
          type: "category",
          boundaryGap: false,
          data: zexianX,
          axisLabel: {
            rotate: 0,
            color: "#9cd8ff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: false,
            lineStyle: {
              color: "#74520f",
              //width: 1 //这里是为了突出显示加上的
            },
          },
        },
        yAxis: {
          type: "value",
          //   max:2000,
          //   min:0,
          //   splitNumber: 2,
          minInterval: 1,
          axisTick: {
            show: false,
          },
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [3, 3],
            show: false, //显示坐标轴线
            color: "#ffa028",
            lineStyle: {
              color: "#9cd8ff",
              width: 1, //这里是为了突出显示加上的
            },
          },
          // minInterval: 10,
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#7b91e7",
            },
          },
        },
        series: [
          {
            data: zexianY,
            type: "line",
            // smooth: true,
            //symbol: true,
            lineStyle: {
              normal: {
                color: "#7b91e7",
              },
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
                    fontSize: 12,
                  },
                },
              },
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
                  { offset: 1, color: "#000000" },
                ]),
              },
            },
          },
        ],
      });
    },
    createViewByDzwl() {
      if (this.form === "105" && this.type === "total") {
        this.getData("../../../data/detail/dzwlData.json")
          .then((res) => {
            let { dzwlNum, dzwlInfoData } = res;
            let STR = `
          <div class="right__num" id="right__num"></div>
          <div class="right__cbInfo">
          <p class="cbInfo__title">港口电子围栏</p>
          <ul class="cbInfo__box" id="cbInfo__box"></ul></div>`;
            $(".right__info").prepend(STR);

            let str = `<span class="num__title">${this.obj.dzwlNumTitle}</span>
          <span class="num__num">${dzwlNum}</span>`;
            $("#right__num").prepend(str).css({ display: "flex" });

            let str1 = "";
            $.each(dzwlInfoData, (index, ele) => {
              str1 =
                str1 +
                `<li class="right__infoItemDzwl">
            <span class="right__itemLogo"></span>
            <span class="right__itemTitle">
               <span class="Dzwl__itemTitle">${ele.title}</span>
               <span class="Dzwl__itemCon">${ele.value}</span>
            </span>
            </li>`;
            });
            $(".cbInfo__box").prepend(str1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.getData("../../../data/detail/dzwlSumData.json")
          .then((res) => {
            let { dzwlInfoDataSum1, dzwlInfoDataSum2 } = res;
            let STR = `<div class="right__infoTitle">
             <img src="../../../css/img/dzwls.png" alt="" class="right__infoIcon" />
                     <div class="right__infoWbox">
                         <p class="right__infoW">港口电子围栏信息</p>
                         <p class="right__infoWe">Stevedoring operation Information</p>
                     </div>
           </div>
           <div class="right__cbInfo">
                <p class="cbInfo__title">港区电子围栏实时运行情况</p>
                <ul class="cbInfo__box" id="cbInfo__box"></ul>
           </div>
                <div class="right__dzwlInfo">
                <div class="con__sumA">
                    <span class="con__sumTitle">人员和车辆闯入预警情况</span>
                    <span class="con__sumSubTitle">A区域电子围栏</span>
                    <div class="con__sumP">
                    <span class="con__sumPl">车辆闯入</span>
                    <span class="con__sumPc egi"></span>
                    <span class="con__sumPl">80%</span>
                </div>
                 <div class="con__sumP">
                   <span class="con__sumPl">人员闯入</span>
                   <span class="con__sumPc two"></span>
                   <span class="con__sumPl">20%</span>
                 </div>
             </div>
           </div>
           <ul class="cbInfo__box" id="cbInfo__box1"></ul>
           `;
            $(".right__info").prepend(STR);
            let str1 = "";
            $.each(dzwlInfoDataSum1, (index, ele) => {
              str1 =
                str1 +
                `<li class="right__infoItem">
             <span class="right__itemTitle">${ele.title}</span>
             <span class="right__itemCon">${ele.value}</span>
             </li>`;
            });
            $("#cbInfo__box").prepend(str1);

            let str2 = "";
            $.each(dzwlInfoDataSum2, (index, ele) => {
              str2 =
                str2 +
                `<li class="right__infoItemDzwl1">
             <span class="right__itemIrc"></span>
             <span class="right__itemTitle">
                <span class="Dzwl__itemTitle">${ele.title}</span>
                <span class="Dzwl__itemCon">${ele.value}</span>
             </span>
             </li>`;
            });
            $("#cbInfo__box1").prepend(str2);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    /**
     * @Author fyt
     * @Description 获取地址栏参数
     * @Date 2020-04-09 17:25:09 星期四
     */
    _getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    /**
     * @Author fyt
     * @Description 给元素绑定点击事件
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle() {
      let _this = this;
      this.total.on("click", this.handleTotal.bind(_this));
      this.summary.on("click", this.handleSummary.bind(_this));
      this.navArr.each(function () {
        $(this).on("click", _this.handleNav.bind(_this));
      });
    },
    /**
     * @Author fyt
     * @Description 处理不同数据
     * @Date 2020-04-10 16:37:22 星期五
     */

    handleSwitch() {
      switch (this.form) {
        case "101":
          this.navArr[0].src = "../../../css/img/11.png";
          this.createViewByJzx();
          break;
        case "102":
          this.navArr[1].src = "../../../css/img/22.png";
          this.createViewByCl();
          break;
        case "103":
          this.navArr[2].src = "../../../css/img/33.png";
          this.createViewBySp();
          break;
        case "104":
          this.navArr[3].src = "../../../css/img/44.png";
          this.createViewByCb();
          break;
        case "105":
          this.navArr[4].src = "../../../css/img/55.png";
          this.createViewByDzwl();
          break;
      }
    },
    /**
     * @Author fyt
     * @Description 点击总量
     * @Date 2020-04-09 17:55:30 星期四
     */
    handleTotal() {
      this.type = "total";
      document.getElementById("total__img").src = "../../../css/img/总量.png";
      document.getElementById("sum__img").src = "../../../css/img/概述.png";
      $(".right__info").empty();
      this.handleSwitch();
    },
    /**
     * @Author fyt
     * @Description 点击概述
     * @Date 2020-04-09 17:56:19 星期四
     */
    handleSummary() {
      document.getElementById("total__img").src = "../../../css/img/zlxz.png";
      document.getElementById("sum__img").src = "../../../css/img/gxxz.png";
      this.type = "summary";
      $(".right__info").empty();
      this.handleSwitch();
    },
    /**
     * @Author fyt
     * @Description 点击导航
     * @Date 2020-04-09 17:57:03 星期四
     */
    handleNav(e) {
      this.reSetNav();
      this.form = e.target.id;
      this.handleTotal();
    },
    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-10 09:24:01 星期五
     */
    reSetNav() {
      this.navArr.each((index, ele) => {
        ele.src = `../../../css/img/${index + 1}.png`;
      });
      $(".right__info").empty();
    },
  };
  window.Star = window.Star || Star;
})(window, jQuery, document);
