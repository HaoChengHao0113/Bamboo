/**
 * @name Guide.js
 * @auhor 程浩
 * @date 2018.12.6
 * @desc app的引导图界面
 */
import React,{Component} from 'react';
import {View,Text,Image,StatusBar,StyleSheet,Dimensions,Platform,TextInput,SectionList,FlatList,ScrollView} from 'react-native';
import BaseComponent from '../../Tool/BaseComponent';
export default class Guide extends BaseComponent{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<View style={{width:'100%',height:'100%',backgroundColor:'red'}}></View>
		)
	}
}