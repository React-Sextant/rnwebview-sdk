# 根据fiber合成事件思想

### 1.`rn.ReactNativeContext.addEventListener("message",handler);`

不应该在每次addEventListener时添加一次，而是在事件池中进行分发

只需要执行一次message的监听

同理removeEventListener也不应该发送给native，而是直接在事件池中清除

### 2.`window.ReactNativeWebView.postMessage`
是否也可以不用在每次addEventListener时添加一次呢？

不添加的话，是否需要在WebView组件中提前量写好

添加的话，会造成发送`removeEventListener`事件时，是否所有同eventName的事件队列都被清除？

###3.缺点：
 1. 事件池需要提前写好全部的事件，包括SDK和WebView组件中
 
###4.优点：
 1. 内存得到稳定，不会存在内存抖动
 2. 可定制化事件类型


# 根据c++ bridge思想
待学习。。。
