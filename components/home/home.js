import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput} from 'react-native';
// import ScrollableTabView, {DefaultTabBar,ScrollableTabBar} from 'react-native-scrollable-tab-view'; 
import Swiper from 'react-native-swiper';
let W=Dimensions.get('window').width;
let H=Dimensions.get('window').height;
let BannerData=[require('../../image/home/Banner1.jpg')]

export default class Home extends Component{
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
	render(){
		return (
		<View style={{flex:1,backgroundColor:'#fff'}}>
			<View style={{width:W,height:W/2,backgroundColor:'#d84236'}}>
				<StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
			{/*顶部导航栏*/}
			<View style={styles.narbar}>
				{/*搜索框*/}
				<View style={styles.searchBox}>
					<Text>请输入查找歌曲</Text>
				</View>
				{/*搜索框*/}
				<Image style={{width:H*0.044,height:H*0.044,marginTop:H*0.013,marginLeft:W*0.05}} source={require('../../image/home/erji.png')}></Image>
			</View>
			{/*Tab滑动选项*/}
			<View style={styles.tab}>
				<View style={{justifyContent:'space-between',marginLeft:W/4,alignItems:'center'}}>
					<Text style={{fontSize:W*15/375,color:'#fff'}}>个性推荐</Text>
					<View style={{width:'50%',height:W*3/375,backgroundColor:'#fff',borderRadius:W*1.5/375}}></View>
				</View>
				<View style={{justifyContent:'space-between',marginLeft:W/5,alignItems:'center'}}>
					<Text style={{fontSize:W*15/375,color:'#fff'}}>主播电台</Text>
					<View style={{width:'50%',height:W*3/375,backgroundColor:'#fff',borderRadius:W*1.5/375}}></View>
				</View>
			</View>
			</View>
			{/*轮播图*/}
			<View style={styles.swiper}>
				<Swiper style={{width:'100%',height:'100%'}}
				        autoplay={true}
                        horizontal={true}>
					{this.getBanner(BannerData)}
				</Swiper>
			</View>

			{/*每日推荐歌曲*/}
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
		</View>
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
	},
	swiper:{
		width:"96%",
		marginLeft:'2%',
		height:W/7*2,
		position:'absolute',
		top:0,
		marginTop:H*0.17,
		borderRadius:W*4/375,
	},
	dailyMusic:{
		width:'100%',
		height:W*80/375,
		marginTop:W*40/375,
		flexDirection:"row",
		justifyContent:'space-around'
	}
})