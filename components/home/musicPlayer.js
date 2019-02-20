/**
 * @name musicPlayer.js
 * @auhor 程浩
 * @date 2018.12.28
 * @desc 音乐播放界面
 */
import React,{Component} from 'react';
import {Slider,View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView,TouchableOpacity,Animated,TouchableWithoutFeedback} from 'react-native';


import BaseComponent from '../../Tool/BaseComponent';
import Video from 'react-native-video';


export default class musicPlayer extends BaseComponent{

	constructor(props){
		super(props);
		this.state={
			rotateValue: new Animated.Value(340),
			picRotateValue:new Animated.Value(0),
			paused:false,//控制歌曲播放暂停
			totalTime:"00:00:00",//播放总时长
			currentTime:"00:00:00",//当前时间
			totalSecond:0,//视频总共多少秒
            currentSecond:0,//当前秒数
            playAnimated:true,//判断旋转动画是否开始,true表示开始
		}
	}
			
	componentDidMount(){
		let thiz = this;
		var info = thiz.params.info;
		thiz.log("---------------info------------------",info);
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
		// this.state.picRotateValue.setValue(0);
		// Animated.timing(thiz.state.picRotateValue,{
		// 		toValue:1,
		// 		duration:20000
		// 	}).start(()=>{
		// 		thiz.rotating();
		// 	});

		let animated=Animated.timing(thiz.state.picRotateValue,{
				toValue:1,
				duration:20000
			});
		//开始动画
		if(thiz.state.playAnimated){
			this.state.picRotateValue.setValue(0);
			animated.start(()=>{
				thiz.rotating();
			})
		}else{
			//停止动画
			animated.stop();
		}
	}

	//播放过程
	onProgress=(time)=>{
		let thiz = this;
		var hour=parseInt(parseInt(time.currentTime)/3600);
            var minute=parseInt((parseInt(time.currentTime)-hour*3600)/60);
            var second=parseInt(time.currentTime)-hour*3600-minute*60;
            if(hour<10){
                  hour="0"+hour;
            }
            if(minute<10){
                  minute="0"+minute;
            }
            if(second<10){
                  second="0"+second
            }
        var currentTime=hour+":"+minute+":"+second;
        this.setState({currentTime:currentTime,currentSecond:parseInt(time.currentTime)});
	}

	//加载音乐
	onLoad=(allTime)=>{
		let thiz = this;
		thiz.rotating();
		thiz.log("------------------------------allTime--------------------------------",allTime);
		var time=parseInt(allTime.duration);
            var hour=parseInt(time/3600);
            var minute=parseInt((time-hour*3600)/60);
            var second=time-hour*3600-minute*60;
            if(hour<10){
                  hour="0"+hour;
            }
            if(minute<10){
                  minute="0"+minute;
            }
            if(second<10){
                  second="0"+second
            }
            var totalTime=hour+":"+minute+":"+second;

            this.setState({totalTime:totalTime,totalSecond:time});
	}

	//渲染界面
	render(){
		let thiz = this;
		return (
			<View style={{flex:1,backgroundColor:'#9e9e9e'}}>
				{/*顶部导航栏*/}
				<View style={{width:BaseComponent.W,height:BaseComponent.W*70/375,paddingTop:thiz.isIphoneX(30,BaseComponent.SH),flexDirection:'row',alignItems:'center',borderBottomWidth:0.5,borderBottomColor:'white'}}>
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
				<View style={{width:BaseComponent.W,height:BaseComponent.W*400/375}} onStartShouldSetResponder={()=>{return true;}} onResponderRelease={(event)=>{
						console.log("----------------------------event--------------------------------",event.nativeEvent);
				}}>
					<View style={{width:BaseComponent.W,height:BaseComponent.W*80/375,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
						<Animated.Image style={{marginLeft:BaseComponent.W*15/375,marginTop:-BaseComponent.W*10/375,width:BaseComponent.W*60/375,height:BaseComponent.W*80/375, transform:[{rotate:thiz.state.rotateValue.interpolate({inputRange: [340, 360],outputRange: ['340deg', '360deg']})}]}} source={require('../../image/home/ic_needle.png')} resizeMode="stretch"/>
					</View>
					
					<View style={{width:BaseComponent.W,height:BaseComponent.W*230/375,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
						<View style={{width:BaseComponent.W*230/375,height:BaseComponent.W*230/375,backgroundColor:'yellow',borderRadius:BaseComponent.W*115/375,borderColor:'black',justifyContent:'center',alignItems:'center'}}>
							<View style={{width:BaseComponent.W*210/375,height:BaseComponent.W*210/375,borderRadius:BaseComponent.W*105/375,backgroundColor:'green',justifyContent:'center',alignItems:'center'}}>
								<Animated.Image style={{width:BaseComponent.W*180/375,height:BaseComponent.W*180/375,borderRadius:BaseComponent.W*90/375,transform:[{rotate:thiz.state.picRotateValue.interpolate({inputRange: [0, 1],outputRange: ['0deg', '360deg']})}]}} source={require('../../image/home/pic1.jpg')}/>
							</View>
						</View>
					</View>
					
					<View style={{width:'100%',height:BaseComponent.W*90/375,flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
						<Image style={{width:BaseComponent.W*30/375,height:BaseComponent.W*30/375}} source={require('../../image/home/favorite.png')}></Image>
						<Image style={{width:BaseComponent.W*30/375,height:BaseComponent.W*30/375}} source={require('../../image/home/download.png')}></Image>
						<Image style={{width:BaseComponent.W*30/375,height:BaseComponent.W*30/375}} source={require('../../image/home/gedan.png')}></Image>
						<Image style={{width:BaseComponent.W*30/375,height:BaseComponent.W*30/375}} source={require('../../image/home/discuss.png')}></Image>
						<Image style={{width:BaseComponent.W*40/375,height:BaseComponent.W*30/375}} source={require('../../image/home/shumore.png')}></Image>
					</View>
				</View>	
				
				{/*播放进度条*/}
				<View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
					<Text style={{marginLeft:BaseComponent.W*10/375}}>{thiz.state.currentTime}</Text>
					<Slider style={{width:'65%'}}
                          minimumValue={0}
                          maximumValue={thiz.state.totalSecond}
                          maximumTrackTintColor="white"
                          value={thiz.state.currentSecond}
                          onSlidingComplete={(index)=>{
                                thiz.refs.player.seek(index);
                          }}
                    />  
                    <Text>{thiz.state.totalTime}</Text>  
				</View>

				{/*音乐播放*/}
				<Video source={{uri: "http://zhangmenshiting.qianqian.com/data2/music/3519cdb70c14a95076e8c006c7226963/599516462/599516462.mp3?xcode=03550f8926118a9c554bf4edd997f8d2"}}
                    ref='player' 
                    paused={thiz.state.paused}
                    onProgress={this.onProgress}
                    onLoad={this.onLoad}/>

				{/*上一曲，下一曲，播放，暂停*/}
				<View style={{width:'100%',flexDirection:'row',alignItems:'center',marginTop:BaseComponent.W*40/375}}>
					<Image style={{width:BaseComponent.W*28/375,height:BaseComponent.W*28/375,marginLeft:BaseComponent.W*20/375}} source={require('../../image/home/random.png')}></Image>
					<Image style={{width:BaseComponent.W*33/375,height:BaseComponent.W*33/375,marginLeft:BaseComponent.W*52/375}} source={require('../../image/home/pre.png')}></Image>
					
					<TouchableWithoutFeedback onPress={()=>{
						thiz.setState({
							playAnimated:!thiz.state.playAnimated,
							paused:!thiz.state.paused
						});
					}}>
						<Image style={{width:BaseComponent.W*33/375,height:BaseComponent.W*33/375,marginLeft:BaseComponent.W*40/375}} source={thiz.state.playAnimated?require('../../image/home/stop.png'):require('../../image/home/play.png')}></Image>
					</TouchableWithoutFeedback>

					<Image style={{width:BaseComponent.W*33/375,height:BaseComponent.W*33/375,marginLeft:BaseComponent.W*40/375}} source={require('../../image/home/next.png')}></Image>
					<Image style={{width:BaseComponent.W*28/375,height:BaseComponent.W*28/375,marginLeft:BaseComponent.W*40/375}} source={require('../../image/home/gedan.png')}></Image>
				</View>
			</View>
		)
	}

}
