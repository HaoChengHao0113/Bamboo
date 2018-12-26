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
			info:{
				item:{
					img:""
				}
			},
		};
	}
			
	componentDidMount(){
		let thiz = this;

		// thiz.timer = setInterval(function(){
		// 	thiz.getAnimation();
		// 	thiz.log("---------------------------------seconds------------------------------",thiz.state.seconds);
		// },1000);
 		if(thiz.params.info){
 			let info = thiz.params.info;
 			thiz.setState({info:info});
 		}
		
		
	};
	componentWillUnmount(){
		var thiz = this;
		this.timer && clearInterval(this.timer);
	}

	//获取放歌时间的动画
	getAnimation=()=>{
		let thiz = this;
		let seconds= new Date().getSeconds();
		
		thiz.log("---------------------------------first_seconds------------------------------",seconds);
		thiz.setState({seconds:seconds});
	}

	//渲染界面
	render(){
		let thiz = this;
		
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				{/*顶部导航栏*/}
				<View style={{width:BaseComponent.W,height:BaseComponent.W*70/375,backgroundColor:'#bf8691',paddingTop:thiz.isIphoneX(30,BaseComponent.SH),flexDirection:'row',alignItems:'center'}}>
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

				<View style={{width:BaseComponent.W,backgroundColor:'#bf8691',}}>
					<View style={{width:BaseComponent.W,height:BaseComponent.W*120/375,marginTop:BaseComponent.W*10/375,flexDirection:'row'}}>
						<View style={{width:BaseComponent.W*120/375,height:BaseComponent.W*120/375,marginLeft:BaseComponent.W*12/375,borderWidth:1,borderRadius:5,borderColor:'yellow',justifyContent:'center',alignItems:'center'}}>
							<Image style={{width:BaseComponent.W*118/375,height:BaseComponent.W*118/375,borderRadius:5}} source={thiz.state.info.item.img}/>
						</View>

						<View style={{width:BaseComponent.W*220/375,height:BaseComponent.W*120/375,marginLeft:BaseComponent.W*10/375}}>
							<Text style={{fontSize:BaseComponent.W*15/375,color:'white',fontWeight:'bold',lineHeight:20}} selectable={true} ellipsizeMode="tail" numberOfLines={6}>谈恋爱的最好季节,你找到喜欢的人了吗</Text>
						</View>
					</View>	
				</View>
			</View>
		)
	}

}