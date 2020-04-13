export default async function (path,opt){


   
         const url = "./api/data.json?" + `${new Date().getTime()}`;
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
        }catch(e){
                console.log("请求错误2")
        }
 
    
}