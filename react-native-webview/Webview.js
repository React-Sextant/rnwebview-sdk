import React from 'react'
import {
    BackHandler,
} from 'react-native'
import { WebView } from 'react-native-webview';

class Webview extends React.Component {

    constructor(props){
        super(props);
        this.rn = {
            "BackHandler":BackHandler,
        };
        this.hardwareBackPress = this.hardwareBackPress.bind(this);
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
            /**
             * eg: "BackHandler|addEventListener|hardwareBackPress"
             * **/
            let a = JSON.parse(event.nativeEvent.data).split("|");
            this.rn[a[0]][a[1]](a[2],this[a[2]])

        }catch (e) {

        }
    };

    hardwareBackPress(){
        this.refs.webview.postMessage(JSON.stringify([{type:"addEventListener",event:"hardwareBackPress"},...arguments]));
    }
}

export default Webview;
