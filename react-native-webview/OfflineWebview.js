import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import WebView from 'react-native-webview';
import NetInfo from "@react-native-community/netinfo";

/**
 * React Native WebView 离线模式下如何打开网页
 *
 * @link https://www.jianshu.com/p/22f2fa946369
 * @author https://github.com/1uokun
 * **/
export default class extends Component {

    constructor(props) {
        super(props);
        this.state={
            html:'',
            offline:true,
            uri:"https://developer.mozilla.org/en-US/"
        }
    }

    async onLoadStart(){
        NetInfo.fetch().then(async state => {
            // if offline, load storage html
            this.setState({
                offline:!state.isConnected,
                html:await AsyncStorage.getItem(this.state.uri)
            })
        });
    };

    onLoadEnd(){
        // storage SPA html
        if(!this.state.offline){
            fetch(this.state.uri,{method:"get"})
                .then(res=>{return res.text()})
                .then(res=>{
                    AsyncStorage.setItem(this.state.uri,`<base href="${this.state.uri}">`+res); //<base> is optional
                    this.setState({html:res})
                })
        }
    };

    render() {
        const { html,offline,uri } = this.state;
        return (
            <WebView
                source={offline?{html}:{uri}}
                onLoadStart={this.onLoadStart.bind(this)}
                onLoadEnd={this.onLoadEnd.bind(this)}
                cacheEnabled={true}
            />
        );
    }
}
