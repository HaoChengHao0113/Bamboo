/**
 * @name musicLists.js
 * @auhor 程浩
 * @date 2018.12.26
 * @desc 音乐列表界面
 */
import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView,TouchableOpacity} from 'react-native';


import BaseComponent from '../../Tool/BaseComponent';


export default class musicLists extends BaseComponent{

	constructor(props){
		super(props);
		this.state={
			seconds:0,//秒数
		};
	}
		
	componentDidMount(){
		let thiz = this;
		// thiz.getAnimation();
		//监听秒数的消息
		thiz.listen("update_seconds",function(){
			thiz.getAnimation();
		})
	};

	//获取放歌时间的动画
	getAnimation=()=>{
		let thiz = this;
		let seconds= new Date().getDate();
		thiz.setState({seconds:seconds},function(){
			thiz.emit("update_seconds");
		}); 
	}

	//渲染界面
	render(){
		let thiz = this;
		
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				{/*顶部导航栏*/}
				<View style={{width:BaseComponent.W,height:BaseComponent.W*70/375,backgroundColor:'red',paddingTop:thiz.isIphoneX(30,BaseComponent.SH),flexDirection:'row',alignItems:'center'}}>
					<TouchableOpacity onPress={()=>{
						thiz.goBack();
					}}>
						<View style={{width:BaseComponent.W*25/375,height:'100%',justifyContent:'center',marginLeft:BaseComponent.W*10/375}}>
							<Image style={{width:'100%',height:BaseComponent.W*22/375}} source={require('../../image/home/back.png')}/>
						</View>
					</TouchableOpacity>

					<View style={{width:BaseComponent.W*60/375,height:'100%',justifyContent:'center',alignItems:'center',marginLeft:BaseComponent.W*125/375}}>
						<Text style={{fontSize:BaseComponent.W*17/375,color:'white'}}>歌单</Text>
					</View>

					<View style={{width:BaseComponent.W*40/375,height:'100%',justifyContent:'center',alignItems:'center',marginLeft:BaseComponent.W*70/375}}>
						<Image style={{width:'70%',height:BaseComponent.W*20/375}} source={require('../../image/home/ellipsis.png')}/>
					</View>

					<View style={{width:BaseComponent.W*35/375,height:'50%',flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*10/375:BaseComponent.W*20/375,backgroundColor:'white'}}></View>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*20/375:BaseComponent.W*10/375,backgroundColor:'white',marginLeft:4}}></View>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*12/375:BaseComponent.W*16/375,backgroundColor:'white',marginLeft:4}}></View>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*16/375:BaseComponent.W*12/375,backgroundColor:'white',marginLeft:4}}></View>
					</View>
				</View>
			</View>
		)
	}
}
