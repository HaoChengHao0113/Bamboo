/**
 * @name musicLists.js
 * @auhor 程浩
 * @date 2018.12.26
 * @desc 音乐列表界面
 */
import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView,TouchableOpacity,Animated} from 'react-native';


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
			height:new Animated.Value(BaseComponent.W*10/375),
			height1:new Animated.Value(BaseComponent.W*20/375),
			height2:new Animated.Value(BaseComponent.W*12/375),
			height3:new Animated.Value(BaseComponent.W*16/375),

			MusicData:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],//音乐列表数据源
		}
	}
			
	componentDidMount(){
		let thiz = this;
		
 		if(thiz.params.info){
 			let info = thiz.params.info;
 			thiz.setState({info:info});
 		}
		
		
	};
	componentWillUnmount(){
		var thiz = this;
		this.timer && clearTimeout(this.timer);
		this.timer1 && clearTimeout(this.timer1);
	}

	//实现音乐竖线的动画由低到高
	achieveAnimation=()=>{
		var thiz = this;
		Animated.timing(thiz.state.height,{
			toValue:BaseComponent.W*20/375,
			duration:1000
		}).start();

		Animated.timing(thiz.state.height1,{
			toValue:BaseComponent.W*20/375,
			duration:1000
		}).start();

		Animated.timing(thiz.state.height2,{
			toValue:BaseComponent.W*16/375,
			duration:1000
		}).start();

		Animated.timing(thiz.state.height3,{
			toValue:BaseComponent.W*12/375,
			duration:1000
		}).start();

		thiz.timer = setTimeout(function(){
			thiz.achieveAnimation1();
		},1000);
	}

	//实现音乐竖线的动画由高到低
	achieveAnimation1=()=>{
		var thiz = this;
		Animated.timing(thiz.state.height,{
			toValue:BaseComponent.W*10/375,
			duration:1000
		}).start();

		Animated.timing(thiz.state.height1,{
			toValue:BaseComponent.W*10/375,
			duration:1000
		}).start();

		Animated.timing(thiz.state.height2,{
			toValue:BaseComponent.W*12/375,
			duration:1000
		}).start();

		Animated.timing(thiz.state.height3,{
			toValue:BaseComponent.W*16/375,
			duration:1000
		}).start();

		thiz.timer1 = setTimeout(function(){
			thiz.achieveAnimation();
		},1000);

	}

	_keyExtractor=(item,index)=>index.toString();

	//音乐列表头部
	ListHeaderComponent=()=>{
		var thiz = this;

		return (
			<TouchableOpacity onPress={()=>{
				thiz.navigate('musicPlayer');
			}}>
				<View style={{width:BaseComponent.W,height:BaseComponent.W*60/375,backgroundColor:'#bf8691'}}>
					<View style={{width:BaseComponent.W,height:BaseComponent.W*60/375,backgroundColor:'white',borderTopLeftRadius:10, borderTopRightRadius:10,flexDirection:"row",alignItems:'center'}}>
						<View style={{width:BaseComponent.W*30/375,height:BaseComponent.W*30/375,borderRadius:BaseComponent.W*15/375,marginLeft:BaseComponent.W*10/375}}>
							<Image style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}} source={require('../../image/home/play.png')}/>
						</View>

						<Text style={{fontSize:BaseComponent.W*17/375,color:'#3a3a3a',marginLeft:BaseComponent.W*13/375}}>播放全部</Text>
						
						<Text style={{fontSize:BaseComponent.W*14/375,color:'#bdbebe'}}>(共50首)</Text>
						
						<View style={{width:BaseComponent.W*120/375,height:BaseComponent.W*60/375,backgroundColor:'red',position:'absolute',right:0,borderTopRightRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
							<Image style={{width:BaseComponent.W*20/375,height:BaseComponent.W*20/375}} source={require('../../image/home/add.png')}/>
							<Text style={{fontSize:BaseComponent.W*15/375,color:'white'}}>收藏</Text>
							<Text style={{fontSize:BaseComponent.W*15/375,color:'white'}}>(5002)</Text>
						</View>	
					</View>
				</View>
			</TouchableOpacity>
		) 
	}

	//音乐列表界面
	renderItem=(item)=>{
		var thiz = this;
		thiz.log("--------------------------item-----------------------------",item);
		return (
			<View style={{width:BaseComponent.W,height:BaseComponent.W*50/375,backgroundColor:'white',}}>
				<View style={{width:BaseComponent.W*322/375,marginLeft:BaseComponent.W*53/375,height:0.5,backgroundColor:"#F0F0F0"}}></View>
				<View style={{width:BaseComponent.W,height:BaseComponent.W*49.5/375,flexDirection:'row',alignItems:'center'}}>
					<Text style={{fontSize:BaseComponent.W*18/375,color:'#969798',marginLeft:BaseComponent.W*15/375}}>1</Text>
					<View style={{width:BaseComponent.W*240/375,height:'100%',justifyContent:'center',marginLeft:BaseComponent.W*15/375}}>
						<Text style={{fontSize:BaseComponent.W*17/375,color:'#3a3a3a'}}>暗恋</Text>
						<View style={{width:BaseComponent.W*240/375,flexDirection:'row',marginTop:3}}>
							<View style={{width:BaseComponent.W*20/375,height:BaseComponent.W*15/375,borderRadius:3,borderWidth:0.5,borderColor:'red',justifyContent:'center',alignItems:'center'}}>
								<Text style={{fontSize:BaseComponent.W*10/375,color:"red"}}>SQ</Text>
							</View>
							<Text style={{fontSize:BaseComponent.W*12/375,color:'#3a3a3a',paddingLeft:5}}>陶喆-69乐章</Text>
						</View>
					</View>

					<View style={{width:BaseComponent.W*80/375,height:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
						<Image style={{width:BaseComponent.W*25/375,height:BaseComponent.W*20/375}} source={require('../../image/home/player.png')}/>
						<Image style={{width:BaseComponent.W*30/375,height:BaseComponent.W*20/375}} source={require('../../image/home/more.png')}/>
					</View>
					
				</View>
			</View>
		)
	}

	//渲染界面
	render(){
		let thiz = this;
		thiz.achieveAnimation();
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
						<Animated.View style={{width:2,height:thiz.state.height,backgroundColor:'white',borderTopLeftRadius:1,borderTopRightRadius:1}}></Animated.View>
						<Animated.View style={{width:2,height:thiz.state.height1,backgroundColor:'white',marginLeft:4,borderTopLeftRadius:1,borderTopRightRadius:1}}></Animated.View>
						<Animated.View style={{width:2,height:thiz.state.height2,backgroundColor:'white',marginLeft:4,borderTopLeftRadius:1,borderTopRightRadius:1}}></Animated.View>
						<Animated.View style={{width:2,height:thiz.state.height3,backgroundColor:'white',marginLeft:4,borderTopLeftRadius:1,borderTopRightRadius:1}}></Animated.View>
					</View>
				</View>

				<ScrollView>
					{/*封面专辑下载等*/}
					<View style={{width:BaseComponent.W,backgroundColor:'#bf8691',paddingBottom:BaseComponent.W*10/375}}>
						<View style={{width:BaseComponent.W,height:BaseComponent.W*120/375,marginTop:BaseComponent.W*10/375,flexDirection:'row'}}>
							<View style={{width:BaseComponent.W*120/375,height:BaseComponent.W*120/375,marginLeft:BaseComponent.W*12/375,borderWidth:1,borderRadius:5,borderColor:'yellow',justifyContent:'center',alignItems:'center'}}>
								<Image style={{width:BaseComponent.W*118/375,height:BaseComponent.W*118/375,borderRadius:5}} source={thiz.state.info.item.img}/>
							</View>

							<View style={{width:BaseComponent.W*220/375,height:BaseComponent.W*120/375,marginLeft:BaseComponent.W*10/375}}>
								<Text style={{fontSize:BaseComponent.W*15/375,color:'white',fontWeight:'bold',lineHeight:20}} selectable={true} ellipsizeMode="tail" numberOfLines={6}>谈恋爱的最好季节,你找到喜欢的人了吗</Text>
							</View>
						</View>

						<View style={{width:BaseComponent.W,height:BaseComponent.W*60/375,backgroundColor:'#bf8691',marginTop:BaseComponent.W*20/375,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
							<View style={{width:BaseComponent.W*60/375,height:BaseComponent.W*60/375,justifyContent:'center',alignItems:'center'}}>
								<View style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}}>
									<Image style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}} source={require('../../image/home/discuss.png')}/>
								</View>
								<Text style={{fontSize:BaseComponent.W*13/375,color:'white',marginTop:3}}>138</Text>
							</View>

							<View style={{width:BaseComponent.W*60/375,height:BaseComponent.W*60/375,justifyContent:'center',alignItems:'center'}}>
								<View style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}}>
									<Image style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}} source={require('../../image/home/forwarding.png')}/>
								</View>
								<Text style={{fontSize:BaseComponent.W*13/375,color:'white',marginTop:3}}>42</Text>
							</View>

							<View style={{width:BaseComponent.W*60/375,height:BaseComponent.W*60/375,justifyContent:'center',alignItems:'center'}}>
								<View style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}}>
									<Image style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}} source={require('../../image/home/download.png')}/>
								</View>
								<Text style={{fontSize:BaseComponent.W*13/375,color:'white',marginTop:3}}>下载</Text>
							</View>

							<View style={{width:BaseComponent.W*60/375,height:BaseComponent.W*60/375,justifyContent:'center',alignItems:'center'}}>
								<View style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}}>
									<Image style={{width:BaseComponent.W*25/375,height:BaseComponent.W*25/375}} source={require('../../image/home/multiselect.png')}/>
								</View>
								<Text style={{fontSize:BaseComponent.W*13/375,color:'white',marginTop:3}}>多选</Text>
							</View>
							
						</View>	
					</View>

					{/*歌曲列表*/}
					<FlatList
						data={thiz.state.MusicData}
						keyExtractor={thiz._keyExtractor}
						renderItem={thiz.renderItem}
						ListHeaderComponent={thiz.ListHeaderComponent}
					/>
				</ScrollView>
			</View>
		)
	}

}
