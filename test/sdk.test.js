import {rn} from '../src/rn-sdk'


// 指定类型添加与监听
let handler = function(e){
    console.log("只执行一次",e);
    rn.BackHandler.removeEventListener("hardwareBackPress",handler)
};
rn.BackHandler.addEventListener("hardwareBackPress",handler);
rn.BackHandler.addEventListener("hardwareBackPress",function(e){
    console.log("理应继续",e)
});


// 全局message监听
rn.ReactNativeContext.addEventListener("message",function(e){
    console.log(e)
});
