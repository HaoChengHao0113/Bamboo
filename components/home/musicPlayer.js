/**
 * @name musicPlayer.js
 * @auhor 程浩
 * @date 2018.12.28
 * @desc 音乐播放界面
 */
import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView,TouchableOpacity,Animated,TouchableWithoutFeedback} from 'react-native';


import BaseComponent from '../../Tool/BaseComponent';


export default class musicPlayer extends BaseComponent{

	constructor(props){
		super(props);
		this.state={
			rotateValue: new Animated.Value(340),
		}
	}
			
	componentDidMount(){
		let thiz = this;
		
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

	//歌手图片旋转动画
	rotating=()=>{
		let thiz = this;
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
				<View style={{width:BaseComponent.W,height:BaseComponent.W*400/375,backgroundColor:'blue'}} onStartShouldSetResponder={()=>{return true;}} onResponderRelease={(event)=>{
						console.log("----------------------------event--------------------------------",event.nativeEvent);
				}}>
					<View style={{width:BaseComponent.W,height:BaseComponent.W*80/375,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
						<Animated.Image style={{marginLeft:BaseComponent.W*15/375,marginTop:-BaseComponent.W*10/375,width:BaseComponent.W*60/375,height:BaseComponent.W*80/375, transform:[{rotate:thiz.state.rotateValue.interpolate({inputRange: [340, 360],outputRange: ['340deg', '360deg']})}]}} source={require('../../image/home/ic_needle.png')} resizeMode="stretch"/>
					</View>
					
					<View style={{width:BaseComponent.W,height:BaseComponent.W*230/375,backgroundColor:'red',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
						<View style={{width:BaseComponent.W*230/375,height:BaseComponent.W*230/375,backgroundColor:'yellow',borderRadius:BaseComponent.W*115/375,borderColor:'black',justifyContent:'center',alignItems:'center'}}>
							<View style={{width:BaseComponent.W*210/375,height:BaseComponent.W*210/375,borderRadius:BaseComponent.W*105/375,backgroundColor:'green'}}>
							</View>
						</View>
					</View>
				</View>	
			</View>
		)
	}

}
