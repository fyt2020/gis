
(function(window,$,doc) {
    var Star = function(){    
         this.init();
     }

  Star.prototype = {
    constructor:Star,
    init(){
          this.bindHandle();
　　　},
    /**
     * @Author fyt
     * @Description 给元素绑定点击事件跳转
     * @Date 2020-04-09 09:42:52 星期四
     */

    bindHandle(){
      let _this = this;

    var imgArr = $('.con__img');
    imgArr.each(function(){
          $(this).on('click',function(){
            let id = $(this).attr("id")
            $(location).attr('href',`../../detail/html/detail.html?id=${id}` );
          })
          $(this).on('mouseenter',function(){
            let id = $(this).attr("id");
            _this.handleEnter(this,id)


          
              
          });
          $(this).on('mouseleave',function(){
            let id = $(this).attr("id")
            _this.handleLeave(this,id)
            console.log(id)
              
          });

    })
    },

    /**
     * @Author fyt
     * @Description
     * @Date 2020-04-10 16:56:31 星期五
     */

    handleEnter(ele,id){

      switch(id){
        case '101':
        ele.src = '../../../css/img/jzx.png';

       
        break;
        case '102':
          ele.src = '../../../css/img/cl.png';
        
        
        break;
        case '103':
          ele.src = '../../../css/img/sp.png';
        
        break;
        case '104':
          ele.src = '../../../css/img/cb.png';
        
        break;
        case '105':
       
          ele.src = '../../../css/img/dzwl.png';
        break;
    }


    },
    handleLeave(ele,id){

      switch(id){
        case '101':
        ele.src = '../../../css/img/jzx2.png';

       
        break;
        case '102':
          ele.src = '../../../css/img/cl2.png';
        
        
        break;
        case '103':
          ele.src = '../../../css/img/sp2.png';
        
        break;
        case '104':
          ele.src = '../../../css/img/cb2.png';
        
        break;
        case '105':
       
          ele.src = '../../../css/img/dzwl2.png';
        break;
    }


    }

  };
window.Star = window.Star || Star;
}(window,jQuery,document));

