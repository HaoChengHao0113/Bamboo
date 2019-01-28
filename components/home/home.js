/**
 * @name home.js
 * @auhor 程浩
 * @date 2018.9.25
 * @desc app的home界面
 */
import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView,TouchableWithoutFeedback} from 'react-native';

//滑动选项卡
// import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'; 
import BaseComponent from '../../Tool/BaseComponent';
import Swiper from 'react-native-swiper';
let W=Dimensions.get('window').width;
let H=Dimensions.get('window').height;
let BannerData=[require('../../image/home/Banner1.jpg'),require('../../image/home/Banner2.jpg'),require('../../image/home/Banner3.jpg')
			   ,require('../../image/home/Banner4.jpg'),require('../../image/home/Banner5.jpg')]
let Songlist=[{key:'推荐歌单',data:[{name:'aaa',img:require('../../image/home/pic4.jpg')},
			 {name:'aaa1',img:require('../../image/home/pic5.jpg')},
			 {name:'aaa2',img:require('../../image/home/pic6.jpg')},
			 {name:'aaa3',img:require('../../image/home/pic7.jpg')},
			 {name:'aaa4',img:require('../../image/home/pic8.jpg')}]},
			 {key:'最新音乐',data:[{name:'bbb',img:require('../../image/home/pic1.jpg')},
			 {name:'bbb1',img:require('../../image/home/pic2.jpeg')},
			 {name:'bbb2',img:require('../../image/home/pic3.jpeg')},
			 {name:'bbb3',img:require('../../image/home/pic8.jpg')},
			 {name:'bbb4',img:require('../../image/home/pic6.jpg')}]},
			 {key:'主播电台',data:[{name:'ccc',img:require('../../image/home/pic8.jpg')},
			 {name:'ccc1',img:require('../../image/home/pic6.jpg')},
			 {name:'ccc2',img:require('../../image/home/pic7.jpg')},
			 {name:'ccc3',img:require('../../image/home/pic4.jpg')},
			 {name:'ccc4',img:require('../../image/home/pic5.jpg')},
			 {name:'ccc5',img:require('../../image/home/pic3.jpeg')},
			 {name:'ccc6',img:require('../../image/home/pic1.jpg')}]}];
export default class Home extends BaseComponent{

	constructor(props){
		super(props);
		this.state={
			seconds:0,
		};
		console.log("------------------------------constructor---------------------------");
	}
	componentWillMount(){
		console.log("-------------------------ComponmentWillMount------------------------");

	}
	componentDidMount(){
		console.log("-----------------------ComponmentDidMount----------------------------");
		fetch("http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=877578",{
			method:'GET',
			headers:{
				"User-Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
			}
		})
		 .then((response) => { 
		 //请求成功后返回的对象response 
		 //例如：json、text等 
			return response.json();
		 }) 
		 .then((responseData) => { 
		 //处理请求得到的数据 
		 this.log("----------------------responseData------------------------",responseData);
		 }) 
		 .catch((error) => { 
		 //网络请求失败执行该回调函数，得到错误信息 
		 console.log("--------------------error--------------------",error);
		 }) 
		// let url = "http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.play&songid=877578";
		// var request = new XMLHttpRequest();

		// request.onreadystatechange = e => {
		//  	this.log("----------------------e------------------------",e);
		// };

		// request.open("GET",url);
		// request.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36")
		// request.send();
	}
	//轮播图
	getBanner(data){
		return data.map((item,index)=>{
			return (
				<View>
					<Image style={{width:"100%",height:W/7*2}} source={item} resizeMode="stretch"/>
				</View>
			)
		});
	}
	//渲染界面
	render(){
		let thiz = this;
		console.log("----------------------render-------------");
		return (
		<View style={{flex:1,backgroundColor:'#fff'}}>
			<View style={{width:W,backgroundColor:'#d84236'}}>
				<StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
				{/*顶部导航栏*/}
				<View style={styles.narbar}>
					{/*搜索框*/}
					<TouchableWithoutFeedback onPress={()=>{
						
					}}>
						<View style={styles.searchBox}>
							<Text>请输入查找歌曲</Text>
						</View>
					</TouchableWithoutFeedback>	
					{/*搜索框*/}

					<View style={{width:BaseComponent.W*35/375,height:'50%',flexDirection:'row',justifyContent:'center',alignItems:'flex-end',marginTop:H*0.013,marginLeft:BaseComponent.W*10/375}}>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*10/375:BaseComponent.W*20/375,backgroundColor:'white'}}></View>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*20/375:BaseComponent.W*10/375,backgroundColor:'white',marginLeft:4}}></View>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*12/375:BaseComponent.W*16/375,backgroundColor:'white',marginLeft:4}}></View>
						<View style={{width:2,height:thiz.state.seconds%2==0?BaseComponent.W*16/375:BaseComponent.W*12/375,backgroundColor:'white',marginLeft:4}}></View>
					</View>
				</View>
				{/*Tab滑动选项*/}
				<View style={styles.tab}>
					<View style={{justifyContent:'space-between',marginLeft:W/4,alignItems:'center'}}>
						<Text style={{fontSize:W*15/375,color:'#fff'}}>个性推荐</Text>
						<View style={{width:'50%',height:W*3/375,backgroundColor:'#fff',borderRadius:W*1.5/375,marginTop:W*10/375}}></View>
					</View>
					<View style={{justifyContent:'space-between',marginLeft:W/5,alignItems:'center'}}>
						<Text style={{fontSize:W*15/375,color:'#fff'}}>主播电台</Text>
						<View style={{width:'50%',height:W*3/375,backgroundColor:'#fff',borderRadius:W*1.5/375,marginTop:W*10/375}}></View>
					</View>
				</View>

			</View>

			{/*轮播图*/}
			<ScrollView>
				<View style={{width:W,backgroundColor:'#d84236',paddingBottom:10}}>
					<View style={styles.swiper}>
						<Swiper style={{width:'100%',height:'100%'}}
						        autoplay={true}
		                        horizontal={true}>
							{this.getBanner(BannerData)}
						</Swiper>
					</View>
				</View>	

				{/*每日推荐歌曲*/}
				<ScrollView showsVerticalScrollIndicator = {false}>
					<View style={styles.dailyMusic}>
						<View style={{width:W*70/375,height:'100%',alignItems:'center'}}>
							<View style={{width:W*56/375,height:W*56/375,borderRadius:W*28/375,backgroundColor:'#d84236',justifyContent:'center',alignItems:'center'}}>
								<Image style={{width:W*35/375,height:W*35/375}} source={require('../../image/home/FM.png')}></Image>
							</View>
							<Text style={{fontSize:W*15/375,color:'black',marginTop:W*5/375}}>私人FM</Text>
						</View>
						<View style={{width:W*70/375,height:'100%',alignItems:'center'}}>
							<View style={{width:W*56/375,height:W*56/375,borderRadius:W*28/375,backgroundColor:'#d84236',justifyContent:'center',alignItems:'center'}}>
								<Image style={{width:W*25/375,height:W*25/375}} source={require('../../image/home/rili.png')}></Image>
							</View>
							<Text style={{fontSize:W*15/375,color:'black',marginTop:W*5/375}}>每日推荐</Text>
						</View>
						<View style={{width:W*70/375,height:'100%',alignItems:'center'}}>
							<View style={{width:W*56/375,height:W*56/375,borderRadius:W*28/375,backgroundColor:'#d84236',justifyContent:'center',alignItems:'center'}}>
								<Image style={{width:W*25/375,height:W*25/375}} source={require('../../image/home/gedan.png')}></Image>
							</View>
							<Text style={{fontSize:W*15/375,color:'black',marginTop:W*5/375}}>歌单</Text>
						</View>
						<View style={{width:W*70/375,height:'100%',alignItems:'center'}}>
							<View style={{width:W*56/375,height:W*56/375,borderRadius:W*28/375,backgroundColor:'#d84236',justifyContent:'center',alignItems:'center'}}>
								<Image style={{width:W*25/375,height:W*25/375}} source={require('../../image/home/paihangbang.png')}></Image>
							</View>
							<Text style={{fontSize:W*15/375,color:'black',marginTop:W*5/375}}>排行榜</Text>
						</View>
					</View>

					<View style={{width:"100%",height:0.5,backgroundColor:'#e6e6e6',marginTop:W*10/375}}></View>
				
					{/*循环列表*/}
					<SectionList
						sections={Songlist}
						renderSectionHeader={this.sectionHeader}
		          		renderItem={this.renderItem}
		                keyExtractor={this.keyExtractor}
		                showsVerticalScrollIndicator = {false}
					/>

				</ScrollView>
			</ScrollView>

		</View>
		)
	}

	keyExtractor=(item,index)=>item+index;//生成的唯一的key
	_keyExtractor=(item,index)=>index.toString();
	
	sectionHeader=(info)=>{
		//列表标题
		return (
			<View style={{width:'100%',height:W*30/375,marginTop:W*15/375,justifyContent:'center'}}>
				<Text style={{fontSize:W*15/375,color:'black',marginLeft:W*10/375}}>{info.section.key}</Text>
			</View>
		)
	}
	renderItem=(info)=>{
		//列表内容
		let thiz = this;
		return (
			info.index==info.section.data.length-1?(<View>
			<View>
				<FlatList
					data={info.section.data}
					keyExtractor={this._keyExtractor}
					numColumns={3}
					renderItem={(info)=>{
					
						return (
							<TouchableWithoutFeedback onPress={()=>{
								thiz.log("--------------------------info--------------------------",info);
								thiz.navigate("musicLists",{info:info});
							}}>	
								<View style={{width:(W-W*40/375)/3,height:W*100/375,marginLeft:W*10/375,marginTop:W*10/375}}>
									<Image style={{width:'100%',height:W*80/375}} source={info.item.img} resizeMode="cover"></Image>
									<View style={{width:'100%',height:W*20/375}}>
										<Text>{info.item.name}</Text>
									</View>
								</View>
							</TouchableWithoutFeedback>
						)
					}}/>
			</View>
			</View>):(<View></View>)
		)
	}
}

const styles=StyleSheet.create({
	narbar:{
		width:'100%',
		height:H*0.07,
		flexDirection:'row',
		marginTop:Platform.select({ios:16,android:24}),
	},
	searchBox:{
		width:W*0.7,
		height:H*0.044,
		backgroundColor:'#c4c0c0',
		marginLeft:W*0.15,
		marginTop:H*0.013,
		borderRadius:H*0.021,
		justifyContent:'center',
		alignItems:'center'
	},
	tab:{
		width:'100%',
		height:W*30/375,
		flexDirection:'row',
		alignItems:'center',
		paddingBottom:5
	},
	swiper:{
		width:"96%",
		marginLeft:'2%',
		height:W/7*2,
		// position:'absolute',
		// top:0,
		marginTop:10,
		borderRadius:W*4/375,
	},
	dailyMusic:{
		width:'100%',
		height:W*80/375,
		marginTop:W*20/375,
		flexDirection:"row",
		justifyContent:'space-around'
	}
})