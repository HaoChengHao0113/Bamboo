/**
 * @name BaseComponent.js
 * @auhor 李磊
 * @date 2018.8.8
 * @desc 基本的Component，封装了组件很常用的一些功能，包括打印、提示、请求、消息等
 */
import React, {Component} from "react";
import {Alert,Image,Platform,DeviceEventEmitter,Dimensions,findNodeHandle,UIManager,BackAndroid,BackHandler,Text,View} from "react-native";
import {NativeModules} from "react-native";
const ToastExample =  NativeModules.ToastExample;
// import DeviceInfo from 'react-native-device-info';
// 状态栏管理
const StatusBarManager = NativeModules.StatusBarManager;
import config from "../config";
import Tools from "./Tool";
// iPhoneX  
const X_WIDTH = 375;  
const X_HEIGHT = 812; 

export default class BaseComponent extends Component{
	
	// 系统类型
	static OS = Platform.OS;
	// app当前版本
	// static V = DeviceInfo.getVersion();
	// appStore中的appid
	static APP_ID = "1441942550";
	// 屏幕尺寸
	static W = Dimensions.get("window").width;
	static H = Dimensions.get("window").height;
	
	// 状态栏高度
	static SH = Tools.getInstance().select({
		ios:20,
		android:StatusBarManager.HEIGHT
	});

	// 判断是否可以物理返回关闭当前页面
	static canHardBack = true;
	
	constructor(props){
		super(props);

		// 禁用黄色提示
		console.disableYellowBox = true;
		
		// 工具函数库
		this.T = Tools.getInstance();

		// 消息监听器
		this.listeners = [];

		// 获取页面参数和导航器
		if(this.props.navigation){
			this.params = this.props.navigation.state.params;
		}
		this.goBack = this.goBack.bind(this);
		this.goPage = this.goPage.bind(this);
		this.backTo = this.backTo.bind(this);

		this.onback(function(){
			return !BaseComponent.canHardBack;
		});

	}

	navigate(name,params){
		if(this.props.navigation){
			this.props.navigation.navigate(name,params);
		}
	}

	/**
	 * @method log
	 * @params mark->打印标记；msg->打印内容
	 * @return
	 * @desc 打印函数，通过传入的标记（mark）来区分打印内容
	 */
	log(mark,msg){
		
		if(this.T){
			this.T.log(mark,msg);
		}
		// 默认返回当前指针，方便链式操作
		return this;
	}


	/**
	 * @method jump
	 * @params 
	 * @return
	 * @desc 跳转系统自带的浏览器
	 */
	jump(){
		var thiz = this;
		ToastExample.jumpToBrower();
	}

	/**
	 * @method nomore
	 * @params 没得更多数据了
	 * @return
	 * @desc 我是有底线的
	 */
	nomore(config){
		let m = config&&config.msg?config.msg:"我是有底线的";
		return (
			<View style={{width:BaseComponent.W,backgroundColor:config.bgcolor?config.bgcolor:'transparent',paddingTop:20,paddingBottom:20}}>
				<Text style={{fontSize:14,color:'#BBBBBB',textAlign:'center'}}>{m}</Text>
			</View>
		)
	}

	/**
	 * @method json
	 * @params JSON字符串
	 * @return JSON对象
	 * @desc 把JSON字符串转为对象
	 */
	json(str){
		if(this.T){
			return this.T.json(str);
		}
	}

	/**
	 * @method jsonStr
	 * @params JSON对象
	 * @return JSON字符串
	 * @desc 把JSON对象转为字符串
	 */
	jsonStr(obj){
		if(this.T){
			return this.T.jsonStr(obj);
		}
	}

	/**
	 * @method toast
	 * @params msg->提示内容；duration->提示持续时间
	 * @return
	 * @desc 公用弹窗提示，依赖
	 */
	toast(msg,duration){
		let thiz = this;
		// 过滤鉴权错误和需要登录错误提示
		if(msg=="需要鉴权" || msg=="账户需要登录"){
			return;
		}
		if(this.T){
			if(BaseComponent.OS=="android"){
				this.T.toast(msg,duration);
			}else{
				setTimeout(function(){
					
					thiz.T.toast(msg,duration);
					
				},1000);
			}
			
		}

		// 默认返回当前指针，方便链式操作
		return this;

	}

	/**
	 * @method toastAndroid
	 * @params msg->提示内容；duration->提示持续时间
	 * @return
	 * @desc android公用弹窗提示，依赖
	 */
	toastAndroid(msg,duration){
		let thiz = this;
		if(duration){
			ToastExample.show(msg,duration);
		}else{
			ToastExample.show(msg,ToastExample.SHORT);
		}

	} 

	/**
	 * @method getViewInfo
	 * @params view->视图的引用；callback->回调函数，会传入x,y,width,height,left,top等
	 * @return
	 * @desc 获取视图信息，包括宽高、坐标等
	 */
	getViewInfo(view,callback){
		const handle = findNodeHandle(view);
		setTimeout(function(){
			UIManager.measure(handle,callback);
		},5);
	}

	/**
	 * @method saveAccount
	 * @params account->账号内容
	 * @return
	 * @desc 快捷保存用户登录的账号
	 */
	saveAccount(account){
		if(this.T){
			this.T.save("account",account);
		}
		
		// 默认返回当前指针，方便链式操作
		return this;
		
	}

	/**
	 * @method isIphoneX
	 * @params isIphoneXStyle->是iphonex的style；normalStyle->正常的style
	 * @return
	 * @desc 判断是否是iPhone X
	 */
	isIphoneX(isIphoneXStyle,normalStyle){
		if (Platform.OS === 'ios' && BaseComponent.H >= X_HEIGHT){
			return isIphoneXStyle;
		}else{
			return normalStyle;
		}
	}

	/**
	 * @method getAccount
	 * @params callback->回调函数
	 * @return
	 * @desc 快捷获取用户登录的账号
	 */
	getAccount(callback){
		if(this.T){
			this.T.load("account",callback);
		}

		// 默认返回当前指针，方便链式操作
		return this;

	}

	/**
	 * @method rmAccount
	 * @params
	 * @return
	 * @desc 快捷删除用户登录的账号
	 */
	rmAccount(){
		if(this.T){
			this.T.remove("account");
		}

		// 默认返回当前指针，方便链式操作
		return this;

	}

	/**
	 * @method isLogin
	 * @params callback->执行回调
	 * @return
	 * @desc 判断用户是否已登录
	 */
	isLogin(callback){
		this.getAccount(callback);
		
		return this;
	}

	/**
	 * @method isFirstUse
	 * @params callback->执行回调
	 * @return
	 * @desc 判断用户是否第一次使用APP
	 */
	isFirstUse(callback){
		this.T.load("is_first",callback);
		
		return this;
	}

	/**
	 * @method getCacheUserInfo
	 * @params callback->执行回调
	 * @return
	 * @desc 获取之前缓存在本地的用户信息
	 */
	getCacheUserInfo(callback){
		this.T.load("cache_user_info",callback);

		return this;
	}

	/**
	 * @method emit
	 * @params name->消息名字；msg->消息内容，JSON对象
	 * @return
	 * @desc 发送消息，对应是用listen来监听
	 */
	emit(name,msg){
		DeviceEventEmitter.emit(name,msg);

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method listen
	 * @params name->消息名字，可以传数组；callback->回调函数
	 * @return
	 * @desc 监听消息
	 */
	listen(name,callback){

		if(name instanceof Array){
			for(var i=0;i<name.length;i++){
				var id = DeviceEventEmitter.addListener(name,callback);
				this.listeners.push(id);
			}
			return;
		}

		var id = DeviceEventEmitter.addListener(name,callback);
		this.listeners.push(id);

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method onback
	 * @params callback->回调函数
	 * @return
	 * @desc 监听android物理返回键，BackHandler还有exitApp()、removeEventListener()等方法
	 */
	onback(callback){

		// BackAndroid.addEventListener('back',callback);//弃用BackAndroid

		BackHandler.addEventListener('hardwareBackPress',callback);
	}

	/**
	 * @method rmBack
	 * @params callback->回调函数
	 * @return
	 * @desc 删除当前页面的物理返回监听器
	 */
	rmBack(callback){

		BackHandler.removeEventListener('hardwareBackPress',callback);
	}

	/**
	 * @method exit
	 * @params 
	 * @return
	 * @desc 退出关闭当前app
	 */
	exit(){

		BackHandler.exitApp();
	}

	/**
	 * @method select
	 * @params datas->平台相关数据
	 * @return 返回对应平台的数据
	 * @desc 平台选择，用法等同于Platform.select()
	 */
	select(datas){
		if(this.T){
			return this.T.select(datas);
		}
	}

	/**
	 * @method goBack
	 * @params
	 * @return
	 * @desc 返回之前的页面
	 */
	goBack(){
		if(this.props.navigation){
			this.props.navigation.goBack();
		}

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method backTo
	 * @params key->指定页面
	 * @return
	 * @desc 返回到之前打开的指定页面
	 */
	backTo(key){
		if(this.props.navigation){
			this.props.navigation.goBack(key);
		}
		return this;
	}

	/**
	 * @method goPage
	 * @params
	 * @return
	 * @desc 打开新页面
	 */
	goPage(page,params){
		if(this.navigate){
			this.navigate(page,params);
		}

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method getImageSize
	 * @params url->图片的路径，callback->执行回调函数
	 * @return 图片的尺寸及宽高比
	 * @desc 返回图片的宽高比
	 */
	getImageSize(url,callback){
		let result = {
			rate:0,
			width:0,
			height:0
		};
		if(url){
			Image.getSize(url,function(width,height){
				result.width = width;
				result.height = height;
				result.rate = width/height;

				callback(result);
			});
		}
	}

	/**
	 * @method request
	 * @params url->请求地址；config->请求配置，实例如下：
	 	{
			method:"POST",
			headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
			},
			data:{}
	 	}；isAuth->是否是授权接口
	 * @return
	 * @desc 公用请求函数，不存在跨域问题
	 */
	request(url,config,isAuth){
		let thiz = this;
		// 非授权接口需要判断是否已有授权
		if(!isAuth){
			this.T.load("accessToken",function(ret,err){
				
				if(ret){
					
					// 判断access_token是否过期
					let conf = Object.assign({},config);
					conf.success = function(ret){
						config.success(ret);
					}
					conf.error = function(err){
						config.error(err);
						if(err.status==401){// access_token过期，重新获取
							thiz.auth(function(ret,err){
								if(ret&&ret.access_token){
									// 保存access_token到本地
									thiz.T.save("accessToken",ret.access_token);
									// 延时发请求，给存储accessToken留时间
									setTimeout(function(){
										thiz.T.request(url,config,isAuth);
									},100);
								}
							});
						}
						// 判断是否需要重新登录
						if(err.respCode=="-1"&&err.errCode=="ACCOUNT_NEED_LOGIN"){

							thiz.log("--------需要登录--------","需要登录");
							// 直接跳转到登录页面重新登录（当前登录失效）
							thiz.goPage("Login");

							// // 判断是否已登录过了，本地是否保存了数据
							// thiz.isLogin(function(ret,err){
							// 	if(ret){
							// 		thiz.log("--------需要登录--------","需要登录");
							// 		// 直接跳转到登录页面重新登录（当前登录失效）
							// 		thiz.goPage("Login");
							// 	}
							// });
						}
						if(err.respCode=="-1"&&err.errCode=="CUSTOM_EXCEPTION_MSG"){

							thiz.toast(err.msg);
						}
					}

					thiz.T.request(url,conf,isAuth);
				}else{

					// 重新获取
					thiz.auth(function(ret,err){

						if(ret&&ret.access_token){
							// 保存access_token到本地
							thiz.T.save("accessToken",ret.access_token);
							thiz.T.request(url,config,isAuth);
						}
					});
				}
			});
		}else{
			this.T.request(url,config,isAuth);
		}

		// 默认返回当前指针，方便链式操作
		return this;

	}

	/**
	 * @method auth
	 * @params 
	 * @return
	 * @desc 接口鉴权，获取其他接口access_token
	 */
	auth(callback){
		let thiz = this;
		this.request(config.authURL,{
			method:"POST",
			success:function(ret){
				if(callback){
					callback(ret,null);
				}
			},
			error:function(err){
				if(callback){
					callback(null,err);
				}
			}
		},true);
	}

	/**
	 * @method doLogin
	 * @params data->登录所需要的参数；callback->执行回调
	 * @return
	 * @desc 封装好的登录函数
	 */
	doLogin(data,callback){
		this.request("user/toLogin",{
			method:"POST",
			data:data,
			success:function(ret){
				if(callback){
					callback(ret,null);
				}
			},
			error:function(err){
				if(callback){
					callback(null,err);
				}
			}
		},false);
	}

	/**
	 * @method getAreaCode
	 * @params data->参数；callback->执行回调
	 * @return
	 * @desc 封装好的获取区域码函数
	 */
	getAreaCode(callback){
	    let thiz = this;
	    thiz.request("country/getEnableLoginRegister",{
	      	method:"POST",
	      	success:function(ret){
	        	if(callback){
	        		callback(ret,null);
	        	}
	      	},
	      	error:function(err){
	      		if(callback){
	        		callback(null,err);
	        	}
	      	}
	    });
	  }

	/**
	 * @method getCode
	 * @params type->获取的验证码类型（登录、注册或者其他）；data->请求参数；callback->回调函数
	 * @return
	 * @desc 获取验证码
	 */
	getCode(data,callback){
		let thiz = this;
		thiz.request("sms/sendSingleMsg",{
	        method:"POST",
	        data:data,
	        success:function(ret){
	          callback(ret,null);
	        },
	        error:function(err){
	          thiz.toast(err.msg);
	          callback(null,err);
	        }
	    });
	}

	/**
	 * @method requestInstallPermissions
	 * @params callback->回调函数
	 * @return
	 * @desc 动态请求安装未知应用的权限
	 */
	requestInstallPermissions(callback){
		var thiz = this;
		if(callback){
			ToastExample.requestInstallPermissions();
			callback();
		}else{
			ToastExample.requestInstallPermissions();
		}
		
	} 

	/**
	 * @method upload
	 * @params fileUrl->要上传文件的地址；config->请求配置，实例如下：
	 	{
			method:"POST",
			headers: {
			    "Accept": "application/json",
			    "Content-Type": "multipart/form-data"
			},
			success:function(ret){
				
			},
			error:function(err){
				
			}
	 	}
	 * @return
	 * @desc 公用请求函数，不存在跨域问题
	 */
	upload(fileUrl,config){
		let thiz = this;

		this.T.load("accessToken",function(ret,err){
			
			if(ret){
				
				// 判断access_token是否过期
				let conf = Object.assign({},config);
				conf.success = function(ret){
					config.success(ret);
				}
				conf.error = function(err){
					config.error(err);
					if(err.status==401){// access_token过期，重新获取
						thiz.auth(function(ret,err){
							if(ret&&ret.access_token){
								// 保存access_token到本地
								thiz.T.save("accessToken",ret.access_token);
								// 延时发请求，给存储accessToken留时间
								setTimeout(function(){
									thiz.T.upload(fileUrl,config);
								},100);
							}
						});
					}
					// 判断是否需要重新登录
					
				}
				
				thiz.T.upload(fileUrl,conf);
			}else{
				
				// 重新获取
				thiz.auth(function(ret,err){
					
					if(ret&&ret.access_token){
						// 保存access_token到本地
						thiz.T.save("accessToken",ret.access_token);
						thiz.T.upload(fileUrl,config);
					}
				});
			}
		});

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method checkUpdate
	 * @params callback->回调函数
	 * @return
	 * @desc 检测版本升级
	 */
	checkUpdate(callback){
		let thiz = this;
		thiz.request("appVersion/getLastUpdates",{
	      	method:"POST",
	      	success:function(ret){
	        	if(callback){
	        		callback(ret,null);
	        	}
	      	},
	      	error:function(err){
	      		if(callback){
	        		callback(null,err);
	        	}
	      	}
	    });
		return this;
	}

	componentDidMount(){
		let thiz = this;
		
	}

	componentWillUnmount(){
		let thiz = this;
		// 清除消息监听器
		for(var i=0;i<this.listeners.length;i++){
			this.listeners[i].remove();
		}
		if(this.T){
			this.T.clearTimer();
		}
	}

}