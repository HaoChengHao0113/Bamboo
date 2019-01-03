/**
 * @name musicPlayer.js
 * @auhor 程浩
 * @date 2018.12.28
 * @desc 音乐播放界面
 */
import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView,TouchableOpacity,Animated,TouchableWithoutFeedback,PanResponder} from 'react-native';


import BaseComponent from '../../Tool/BaseComponent';


export default class musicPlayer extends BaseComponent{

	constructor(props){
		super(props);
		this.state={
			rotateValue: new Animated.Value(340),
		}
	}

	componentWillMount(){
	   this._panResponder = PanResponder.create({
	     // 要求成为响应者：
	     onStartShouldSetPanResponder: (evt, gestureState) => true,
	     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
	     onMoveShouldSetPanResponder: (evt, gestureState) => true,
	     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
	 
	     onPanResponderGrant: (evt, gestureState) => {
	       // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
	 		console.log("---------------------------start----------------------------------------");
	       // gestureState.{x,y} 现在会被设置为0
	     },
	     onPanResponderMove: (evt, gestureState) => {
	       // 最近一次的移动距离为gestureState.move{X,Y}
	 		console.log("---------------------------move----------------------------------------");
	       // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
	     },
	     onPanResponderTerminationRequest: (evt, gestureState) => true,
	     onPanResponderRelease: (evt, gestureState) => {
	       // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
	       // 一般来说这意味着一个手势操作已经成功完成。
	       console.log("---------------------------start_end----------------------------------------");
	     },
	     onPanResponderTerminate: (evt, gestureState) => {
	       // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
	     },
	     onShouldBlockNativeResponder: (evt, gestureState) => {
	       // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
	       // 默认返回true。目前暂时只支持android。
	       return true;
	     }
	   });
	 }
			
	componentDidMount(){
		let thiz = this;
		thiz.needleAnimated();	
	};

	//唱针动画
	needleAnimated=()=>{
		let thiz = this;
		setTimeout(function(){
				Animated.timing(thiz.state.rotateValue,{
				toValue:360,
				duration:1000
			}).start();
		},2000);
		
	}

	//渲染界面
	render(){
		let thiz = this;
		
		return (
			<View style={{flex:1,backgroundColor:'#9e9e9e'}}>
				{/*顶部导航栏*/}
				<View style={{width:BaseComponent.W,height:BaseComponent.W*70/375,paddingTop:thiz.isIphoneX(30,BaseComponent.SH),flexDirection:'row',alignItems:'center'}}>
					<TouchableOpacity onPress={()=>{
						thiz.goBack();
					}}>
						<View style={{width:BaseComponent.W*25/375,height:'100%',justifyContent:'center',marginLeft:BaseComponent.W*10/375}}>
							<Image style={{width:'100%',height:BaseComponent.W*22/375}} source={require('../../image/home/back.png')}/>
						</View>
					</TouchableOpacity>		

					<View style={{width:BaseComponent.W*200/375,height:'100%',marginLeft:BaseComponent.W*10/375}}>
						<Text style={{fontSize:BaseComponent.W*15/375,color:'white'}}>苦中作乐</Text>
						<View style={{width:'100%',height:BaseComponent.W*20/375,flexDirection:'row',alignItems:'center'}}>
							<Text style={{fontSize:BaseComponent.W*13/375,color:'white',maxwidth:BaseComponent.W*200/375}} numberOfLines={1}>石白其</Text>
							<Image style={{width:BaseComponent.W*15/375,height:BaseComponent.W*15/375}} source={require('../../image/home/rightback.png')}/>
						</View>
					</View>

					<View style={{width:BaseComponent.W*75/375,height:'70%',backgroundColor:"#8c8c8c",borderRadius:BaseComponent.W*30/375,flexDirection:'row',alignItems:'center'}}>
						<Image style={{width:BaseComponent.W*30/375,height:'100%',borderRadius:BaseComponent.W*30/375,}} source={require('../../image/home/pic6.jpg')}/>
						<Image style={{width:BaseComponent.W*15/375,height:BaseComponent.W*15/375}} source={require('../../image/home/add.png')}/>
						<Text style={{fontSize:BaseComponent.W*12/375,color:'white'}}>关注</Text>
					</View>

					<View style={{width:BaseComponent.W*30/375,height:'100%',justifyContent:'center',alignItems:'center',marginLeft:BaseComponent.W*10/375}}>
						<Image style={{width:BaseComponent.W*20/375,height:BaseComponent.W*20/375}} source={require('../../image/home/share.png')}/>
					</View>
				</View>
				
				{/*唱针和唱盘和下载，收藏区域*/}
				<View style={{width:BaseComponent.W,height:BaseComponent.W*400/375,backgroundColor:'blue'}} {...this._panResponder.panHandlers}>
					<View style={{width:BaseComponent.W,height:BaseComponent.W*80/375,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
						<Animated.Image style={{marginLeft:BaseComponent.W*15/375,marginTop:-BaseComponent.W*10/375,width:BaseComponent.W*50/375,height:'100%', transform:[{rotate:thiz.state.rotateValue.interpolate({inputRange: [340, 360],outputRange: ['340deg', '360deg']})}]}} source={require('../../image/home/ic_needle.png')} resizeMode="cover"/>
					</View>
				</View>	
			</View>
		)
	}

}
