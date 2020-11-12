import React from 'react'
import {
    BackHandler,
    DeviceEventEmitter
} from 'react-native'
import { WebView } from 'react-native-webview';

class Webview extends React.Component {

    constructor(props){
        super(props);
        this.rn = {
            "BackHandler":BackHandler,
            "DeviceEventEmitter":DeviceEventEmitter,
        };
        this.payload = "";
        this.dispatchEvent = this.dispatchEvent.bind(this);
    }

    render(){
        return (
            <WebView
                ref={'webview'}
                onMessage={this.onMessage}
            />
        )
    }

    onMessage=(event)=>{
        try{
            this.payload = event.nativeEvent.data;
            let a = this.payload.split("|");

            /**
             * eg: "BackHandler|addEventListener|hardwareBackPress"
             * **/
            this.rn[a[0]][a[1]](a[2],this.dispatchEvent)

        }catch (e) {

        }
    };

    dispatchEvent(){
        this.refs.webview.postMessage(JSON.stringify([...arguments,this.payload]))
    }
}

export default Webview;
