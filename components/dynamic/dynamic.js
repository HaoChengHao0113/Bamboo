import React,{Component} from 'react';
import {View,Text,Image,TouchableWithoutFeedback,ScrollView} from 'react-native';
import BaseComponent from '../../Tool/BaseComponent';

import ViewShot from "react-native-view-shot";
import {captureRef} from "react-native-view-shot";
let ReactNative = require('react-native');

export default class Dynamic extends BaseComponent{

	constructor(props){
		super(props);
		this.state={
			img:''
		}
	}

snapshot(){
	// console.log("11111");
	// captureRef(this.mainViewRef.current, {
	//   format: "jpg",
	//   quality: 0.8,
	//   result: "tmpfile",
	//   snapshotContentContainer: true
	// })
	// .then((uri)=>{
	// 	console.log("Image saved to", uri)
	// })
	// .catch((error)=>{
	// 	console.log("---------------error", error)
	// })  
	 this.refs.code.capture().then(uri => {
      console.log("do something with ", uri);
      this.setState({img:uri})
    });
}

	componentDidMount(){
		let thiz = this;
		var code=thiz.refs.code;
		// thiz.snapshot();
	}
	

	render(){
		let thiz = this;
		return (
			<ScrollView>
			<View>
				<TouchableWithoutFeedback onPress={()=>{
				}}>
					<ViewShot ref="code" style={{width:BaseComponent.W,height:400,backgroundColor:'white'}} options={{ format: "jpg", quality: 1 }}>
						<Image style={{width:BaseComponent.W,height:400}} resizeMode="stretch" source={require('../../image/home/pic1.jpg')}/>	
						<Image style={{width:BaseComponent.W*80/375,height:BaseComponent.W*80/375,position:'absolute',left:BaseComponent.W*145/375,top:160}} resizeMode="stretch" source={require('../../image/home/pic3.jpeg')}/>
					</ViewShot>
				</TouchableWithoutFeedback>	
				<Text style={{fontSize:20}} onPress={()=>{
					thiz.snapshot();
				}}>点击合并为一张图片</Text>
				<Image style={{width:200,height:200}} source={{uri:thiz.state.img}}/>
			</View>
			</ScrollView>
		)
	}
}