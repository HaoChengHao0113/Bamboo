/** @format */
import React from "react";
import {AppRegistry,Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Mine from './components/mine/mine';
import Home from './components/home/home';
import Dynamic from './components/dynamic/dynamic';
import Account from './components/account/account';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';
console.disableYellowBox = true;
const Tab=createBottomTabNavigator(
    {
        Home:{
          	screen:Home,
          	navigationOptions:{
          		tabBarLabel:"发现",
          		tabBarIcon:function(e){
          			return (
          				<Image style={{width:26,height:26}} source={e.focused?require('./image/home/hsIcon.png'):require('./image/home/hIcon.png')}/>
          			);
          		}
          	}
        },
        Mine:{
          screen:Mine,
          navigationOptions:{
            tabBarLabel:'我的',
              tabBarIcon:function(e){
                return (
                  <Image style={{width:26,height:26}} source={e.focused?require('./image/mine/msIcon.png'):require('./image/mine/mIcon.png')}/>
                );
              }
          }
        },
        Dynamic:{
          screen:Dynamic,
          navigationOptions:{
            tabBarLabel:'朋友',
              tabBarIcon:function(e){
                return (
                  <Image style={{width:26,height:26}} source={e.focused?require('./image/dynamic/dsIcon.png'):require('./image/dynamic/dIcon.png')}/>
                );
              }
          }
        },
        Account:{
          screen:Account,
          navigationOptions:{
            tabBarLabel:'账号',
              tabBarIcon:function(e){
                return (
                  <Image style={{width:26,height:26}} source={e.focused?require('./image/account/asIcon.png'):require('./image/account/aIcon.png')}/>
                );
              }
          }
        },
    },
    {
      tabBarOptions: {
          showIcon: true,
          showLabel: true,
          upperCaseLabel: false,
          pressOpacity: 0.8,
          style: {
              backgroundColor: '#fff',//导航栏背景色
              paddingBottom: 0,
              borderTopWidth: 0.5,
              borderTopColor: 'rgb(237,235,235)',//边界线颜色
              height:50
          },
          labelStyle: {
              fontSize: 12,
              margin: 1,
              color:"#666"
          },
          indicatorStyle: {height:0},
      },
      swipeEnabled: false,
      animationEnabled: false,
      lazy: true,
      backBehavior: 'none',
  }
);
AppRegistry.registerComponent(appName, () => Tab);
