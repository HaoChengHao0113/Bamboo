import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput} from 'react-native';
let W=Dimensions.get('window').width;
let H=Dimensions.get('window').height;
export default class Home extends Component{

	render(){
		return (
			<View style={{flex:1,backgroundColor:'#fff'}}>
				<StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
			{/*顶部导航栏*/}
			<View style={styles.narbar}>
				{/*搜索框*/}
				<View style={styles.searchBox}>
					<TextInput placeholder="请输入要查找的歌曲" underlineColorAndroid='transparent' maxLength={30}
					         style={{textAlign:'center',padding:0}}></TextInput>
				</View>
				{/*搜索框*/}
				<Image style={{width:H*0.044,height:H*0.044,marginTop:H*0.013,marginLeft:W*0.05}} source={require('../../image/home/erji.png')}></Image>
			</View>
			</View>
		)
	}
}

const styles=StyleSheet.create({
	narbar:{
		width:'100%',
		height:H*0.07,
		flexDirection:'row',
		marginTop:Platform.select({ios:16,android:24})
	},
	searchBox:{
		width:W*0.7,
		height:H*0.044,
		backgroundColor:'#c4c0c0',
		marginLeft:W*0.15,
		marginTop:H*0.013,
		borderRadius:H*0.021
	}
})