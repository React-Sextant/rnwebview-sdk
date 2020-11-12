export const rn = {
    init:function(){
        if(window.ReactNativeWebView){
            console.log("当前浏览器环境：react-native-webview");
        }
    },

    //https://stackoverflow.com/a/41727309/10506271
    ReactNativeContext:navigator.appVersion.includes('Android')?document:window,

    // type
    type:"",

    // EventListener hook
    listens:{
        hardwareBackPress:[]
    },
    addEventListener:function(eventName,handler){
        window.ReactNativeWebView.postMessage(this.type+"|addEventListener|"+eventName.toString());

        rn.ReactNativeContext.addEventListener("message",handler);
        this.listens[eventName].push(eventName)
    },
    removeEventListener:function(eventName,handler){
        rn.ReactNativeContext.removeEventListener("message",handler);
        if(this.listens[eventName].length < 2){
            this.removeAllListeners(eventName)
        }
    },
    removeAllListeners:function(eventName){
        window.ReactNativeWebView.postMessage(this.type+"|removeEventListener|"+eventName.toString());

        this.listens[eventName] = []
    },
    emit:function(eventName,payload){

    }
};

// TODO:It will be changed just like EventTarget
// Object.defineProperties(rn,{
//     BackHandler:{
//         get:function(){
//             rn.type = "BackHandler";
//             return rn
//         }
//     }
// });
