/** @format */

import {AppRegistry,Image} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Mine from './components/mine/mine';
import Home from './components/home/home';
import Dynamic from './components/dynamic/dynamic';
import Account from './components/account/account';
import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';

const Tab=createBottomTabNavigator({
        Home:{
          	screen:Home,
          	navigationOptions:{
          		tabBarLabel:"发现",
          		tabBarIcon:function(e){
          			return (
          				<Image style={{width:26,height:26}} source={e.focused?Imgs.cart[1]:Imgs.cart[0]}/>
          			);
          		}
          	}
        }
        Mine:{
          screen:Mine,
          navigationOptions:{
            tabBarLabel:'我的',
              tabBarIcon:function(e){
                return (
                  <Image style={{width:26,height:26}} source={e.focused?Imgs.cart[1]:Imgs.cart[0]}/>
                );
              }
          }
        }
});
AppRegistry.registerComponent(appName, () => App);
