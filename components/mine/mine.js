import React,{Component} from 'react';
import {View,Text,Image} from 'react-native';
import BaseComponent from '../../Tool/BaseComponent';


export default class Mine extends BaseComponent{
    constructor(props){
        super(props);
    };
	render(){
        let thiz = this;
		return (
			<View style={{flex:1,backgroundColor:'red',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:30,color:'white'}} onPress={()=>thiz.toastAndroid("这是一个弹窗")}>弹窗</Text>
            </View>
		)
	}
}