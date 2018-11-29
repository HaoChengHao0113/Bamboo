/**
 * @name Tools.js
 * @auhor 李磊
 * @date 2018.8.8
 * @desc 公用的工具函数库，包括打印、日期、http请求等相关函数
 */
// 引入全局配置文件
import conf from "../config";

// 数据持久化
import {AsyncStorage,Platform,DeviceEventEmitter,Clipboard,Alert,NativeModules,Linking} from 'react-native';
import Storage from 'react-native-storage';

// 提示
// import Toast from "react-native-root-toast";
import Toast from 'react-native-toast-native';
// 文件上传组件
import Uploader from "react-native-fetch-blob";
// 下载组件
import Downloader from 'react-native-background-downloader';
// 文件系统组件
import RNFS from 'react-native-fs';


export default class Tools{

	constructor(){

		// 配置
		this.config = {
			// 打印开关（默认打开）
			isLog:true
		};

		// 定时器列表
		this.timers = [];
		
		// 初始化持久化存储实例
		this.storage = new Storage({
		  	// 最大容量，默认值1000条数据循环存储
		  	size: 1000,
		  	
		  	// 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
		  	// 如果不指定则数据只会保存在内存中，重启后即丢失
		  	storageBackend: AsyncStorage,
		    
		  	// 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
		  	defaultExpires: null,
		    
		  	// 读写时在内存中缓存数据。默认启用。
		  	enableCache: false,
		    
		  	// 如果storage中没有相应数据，或数据已过期，
		  	// 则会调用相应的sync方法，无缝返回最新数据。
		  	// sync方法的具体说明会在后文提到
		  	// 你可以在构造函数这里就写好sync的方法
		  	// 或是在任何时候，直接对storage.sync进行赋值修改
		  	// 或是写到另一个文件里，这里require引入
		  	sync: null
		  	
		});
		
		// 常量
		this.NETERROR = "请求失败";
		this.NEEDAUTH = "需要鉴权";
		// this.SERVERERROR = "服务器异常";
		this.SERVERERROR = "服务暂时不可用";
		this.TIMEOUT = "网络连接超时";
		this.OUTVALUE = 30000;// 网络超时时间

		this.TOAST_TIME = 3000;// 默认toast时间

	}

	/**
	 * @method getInstance
	 * @params
	 * @return Tools的实例对象
	 * @desc 该函数是一个Tools类的工厂函数，方便创建实例，可直接通过Tools.getInstance()方式调用
	 */
	static getInstance(){
		return new Tools();
	}

	/**
	 * @method log
	 * @params mark->打印标记；msg->打印内容
	 * @return
	 * @desc 打印函数，通过传入的标记（mark）来区分打印内容
	 */
	log(mark,msg){

		if(this.config.isLog){
			let mk = "";
			if(mark){mk = mark;}
			if(msg instanceof Array || msg instanceof Object){
				msg = JSON.stringify(msg);
			}
			console.log("@"+mk+"  "+msg);
		}

		// 默认返回当前指针，方便链式操作
		return this;

	}

	/**
	 * @method installApk
	 * @params path->安装包路径
	 * @return
	 * @desc 安装apk，依赖react-native-install-apk组件
	 */
	installApk(path){
		if(path&&NativeModules.InstallApk){
			NativeModules.InstallApk.install(path);
		}
		return this;
	}

	/**
	 * @method toAppStore
	 * @params id->苹果开发者中心获取的app的id
	 * @return
	 * @desc 用于跳转appstore
	 */
	toAppStore(id){
		let thiz = this;
		// let url = "itms-[apps://itunes.apple.com/cn/app/id"+id+"?mt=8&action=write-review]";
		let url = "itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?mt=8&onlyLatestVersion=true&pageNumber=0&sortOrdering=1&type=Purple+Software&id="+id;
		if(url){

			Linking.canOpenURL(url).then(supported => {
				if (!supported) {
				    console.log('Can\'t handle url: ' + url);
				} else {
				    return Linking.openURL(url).catch(function(err){
						thiz.log("--------toAppStore_err--------",err);
						thiz.toast("打开AppStore失败");
					});
				}
			}).catch(function(err){
				thiz.log("--------toAppStore_err--------",err);
				thiz.toast("打开AppStore失败");
				// thiz.toast(JSON.stringify(err));
			});

		}
	}

	/**
	 * @method delArr
	 * @params arr->操作的数组，index->要删除元素的索引
	 * @return 新的数组
	 * @desc 删除数组中指定的元素，并返回新的数组
	 */
	delArr(arr,index){

		let arrNew = [];
		if(arr.length>0){
			for(var i=0;i<arr.length;i++){
				if(i!=index){
					arrNew.push(arr[i]);
				}
			}
		}

		return arrNew;
	}

	/**
	 * @method json
	 * @params JSON字符串
	 * @return JSON对象
	 * @desc 把JSON字符串转为对象
	 */
	json(str){
		return JSON.parse(str);
	}

	/**
	 * @method jsonStr
	 * @params JSON对象
	 * @return JSON字符串
	 * @desc 把JSON对象转为字符串
	 */
	jsonStr(obj){
		return JSON.stringify(obj);
	}

	/**
	 * @method combine
	 * @params JSON对象
	 * @return JSON字符串
	 * @desc 把JSON对象转为字符串
	 */
	combine(a,b){
		return Object.assign(a,b);
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
	 * @method toast
	 * @params msg->提示内容；duration->提示持续时间
	 * @return
	 * @desc 公用弹窗提示，依赖react-native-easy-toast组件
	 * 更多，请参照：hhttps://github.com/magicismight/react-native-root-toast
	 */
	toast(msg,duration){

		// // toast配置
		// let conf = {
		//     // duration: Toast.durations.LONG,
		//     duration: this.TOAST_TIME,
		//     position: -150,
		//     shadow: true,
		//     animation: true,
		//     hideOnPress: false,
		//     delay:0
		// };

		// if(duration){conf.duration=duration}
		// // toast实例
		// Toast.show(msg,conf);

		// let dur = duration>0?duration:this.TOAST_TIME;
		Toast.show(msg,Toast.SHORT,Toast.CENTER);

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method copy
	 * @params content->需要复制到剪贴板的内容
	 * @return
	 * @desc 复制字符串到剪贴板
	 */
	copy(content){
		if(content){
			Clipboard.setString(content);
		}
		return this;
	}

	/**
	 * @method getCliboard
	 * @params 
	 * @return 返回当前剪贴板的内容
	 * @desc 获取当前剪贴板的内容
	 */
	getCliboard(callback){
		
		Clipboard.getString()
		.then(function(ret){
			callback(ret);
		})
		.catch(function(err){
			callback(null);
		});
		return this;
	}

	/**
	 * @method select
	 * @params datas->平台相关数据
	 * @return 返回对应平台的数据
	 * @desc 平台选择，用法等同于Platform.select()
	 */
	select(datas){
		return Platform.select(datas);
	}

	/**
	 * @method getDate
	 * @params stamp->时间戳，以秒或者毫秒为单位；ismili->单位是否为毫秒，默认是秒
	 * @return 以yy-mm-dd hh:mm:ss的格式返回日期
	 * @desc 把时间戳转换为常见的时间格式
	 */
	getDate(stamp,ismili){

		let date = new Date();
		if(stamp){
			if(ismili){
				date = new Date(stamp);
			}else{
				date = new Date(stamp*1000);
			}
		}
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		if(month < 10){
			month = "0"+month;
		}
		let day = date.getDate();
		if(day < 10){
			day = "0"+day;
		}
		let hour = date.getHours();
		if(hour < 10){
			hour = "0"+hour;
		}
		let minute = date.getMinutes();
		if(minute < 10){
			minute = "0"+minute;
		}
		let second = date.getSeconds();
		if(second < 10){
			second = "0"+second;
		}

		let final = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
		return final;

	}

	/**
	 * @method save
	 * @params key->数据键；value->值
	 * @return 
	 * @desc 保存数据到本地，封装于AsyncStroage
	 */
	save(key,value){

		if(this.storage){

			let val = {};
			
			val.value = value;

			this.storage.save({
			    key: key,// 注意:请不要在key中使用_下划线符号!
			    data: val,
			    
			    // 如果不指定过期时间，则会使用defaultExpires参数
			    // 如果设为null，则永不过期
			    expires: null
			 });
		}

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method load
	 * @params key->数据键；callback->回调函数
	 * @return 
	 * @desc 获取指定键名的数据
	 */
	load(key,callback){

		if(this.storage){
			this.storage.load({
			    key: key,
			}).then(ret => {
			    // 如果找到数据，则在then方法中返回
			    callback(ret.value,null);
			}).catch(err => {
			    // 如果没有找到数据且没有sync方法，
			    // 或者有其他异常，则在catch中返回
				callback(null,err);
			});
		}

		// 默认返回当前指针，方便链式操作
		return this;
	}

	/**
	 * @method remove
	 * @params key->数据键
	 * @return 
	 * @desc 删除指定键名的数据
	 */
	remove(key){

		if(this.storage){
			this.storage.remove({
			    key: key
			});
		}

		// 默认返回当前指针，方便链式操作
		return this;

	}

	/**
	 * @method countDown
	 * @params second->倒计时秒数；callback->回调函数
	 * @return 
	 * @desc 倒计时
	 */
	countDown(second,callback){

	    var time = second;
	    var id = null;
	    if(time>0 && !id){
	       	id = setInterval(function(){
	         	time --;
	          	if(callback){callback(time);}
	          	if(time == 0){
	            	clearInterval(id);
	          	}
	        },1000);
	        this.timers.push(id);
	    }

	    return this;
	}

	/**
	 * @method clearTimer
	 * @params
	 * @return 
	 * @desc 清除定时器
	 */
	clearTimer(){
		
	    // 清除定时器
		for(var i=0;i<this.timers.length;i++){
			clearInterval(this.timers[i]);
		}
		
	    return this;
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
			data:{},
			success:function(ret){
				
			},
			error:function(err){
				
			}
	 	}；isAuth->是否是授权接口
	 * @return
	 * @desc 公用请求函数，不存在跨域问题
	 */
	request(url,config,isAuth){

		let thiz = this;

		// 默认配置
		let defConfig = {
			method:"GET",
			headers: {
			    "Accept": "application/json",
			    "Content-Type": "application/json"
			},
			// 用于请求的参数
			data:{}
		};

		// 合并配置
		if(config){
			defConfig = Object.assign(defConfig,config);
		}

		// 增加默认配置
		if(!isAuth){
			defConfig.data.clientInfo = {
		        clientType:"app",
		        clientName:"app",
		        clientVersion:"v1.1.2"
		    };
		}

		// 发送请求，使用RN的原生请求方式XMLHttpRequest,
		let finalUrl = isAuth?url:(conf.baseURL+url);
		thiz.log("--------finalUrl--------",finalUrl);

		function xhr(){
			thiz.log("--------defConfig--------",defConfig);
			if(finalUrl){
				let request = new XMLHttpRequest();
				// 设置超时时间
				request.timeout = thiz.OUTVALUE;
				// 创建请求
				request.open(defConfig.method,finalUrl,true);
				// 设置头信息
				for(var key in defConfig.headers){
					request.setRequestHeader(key,defConfig.headers[key]);
				}
				// 设置请求回调
			    request.onreadystatechange = function(response){
			    	thiz.log("--------response--------",response.currentTarget._response);
			        // 请求正常
			        if (request.readyState == 4) {
			        	// 需要重新获取access_token
				        if(request.status == 401){
				        	thiz.log("--------401---------","401");
				        	if(config.error){
				   				config.error({	
				   					status:request.status,
				   					msg:thiz.NEEDAUTH
				   				});
				   			}
				        	return;
				        }

			        	if(request.status == 200){
			        		thiz.log("--------200---------","200");
			        		if(config.success){
				   				let sucRsp = JSON.parse(response.currentTarget._response);
				   				// thiz.log("--------sucRsp---------",sucRsp);
				   				sucRsp.status = request.status;
				   				
				   				// 如果是授权接口
				   				if(isAuth){
				   					config.success(sucRsp);
				   					return;
				   				}
				   				// 如果是普通接口
				   				if(sucRsp.respCode==="00"){
				   					config.success(sucRsp);
				   				}else{
				   					config.error({
				   						status:request.status,
				   						respCode:sucRsp.respCode,
				   						errCode:sucRsp.errCode,
				   						msg:sucRsp.errDesc
				   					});
				   				}
				   			}
				   			return;
			        	}

			        	// 其他状态
			        	if(request.status == 500){
			        		thiz.toast(thiz.SERVERERROR);
				        	config.error({
				        		status:request.status,
				        		msg:thiz.SERVERERROR,
				        		code:500,
				        	});
			        	}
			        	
			        	
			        }else{
			        	console.log("--------请求执行中--------");
			        }
			    };
			    // 网络超时
			    request.ontimeout = function(){
			    	config.error({
			    		status:request.status,
			    		msg:thiz.TIMEOUT,
			    		code:100,
			    	});
			    	thiz.toast(thiz.TIMEOUT);
			    }
			    // 网络失败
			    request.onerror = function(err){
			    	thiz.log("--------request_err--------",err);
			    	config.error({
			    		status:request.status,
			    		msg:thiz.NETERROR,
			    		code:200,
			    	});
			    	thiz.toast(thiz.NETERROR);
			    }
			    
			 	thiz.log("--------defConfig.data---------",JSON.stringify(defConfig.data));
			    request.send(JSON.stringify(defConfig.data));
			}
		}

		// 执行请求
		if(isAuth){
			xhr();
		}else{
			thiz.load("accessToken",function(ret,err){
				let accessToken = ret;
				if(accessToken){
					// 有账号就加入投信息
					thiz.load("account",function(ret,err){

						if(ret){
							defConfig.headers["JWT-USER-Authorization"]=ret.userToken;
						}

						// 如果是普通接口，需要加入Authorization头信息（注意Bearer后面要有一个空格）
						defConfig.headers.Authorization = "Bearer "+accessToken;
						xhr();
					});
				}
			});
		}

		// 默认返回当前指针，方便链式操作
		return this;

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
		
		// 默认配置
		thiz.log("--------image.path222222222--------",Uploader.wrap(fileUrl.split(":///")[1])); 
		let defConfig = {
			method:"POST",
			headers: {
			    "Accept": "application/json",
			    "Content-Type": "multipart/form-data"
			},
			// 用于post请求的参数
			data:[
				{
					name:"file",
					filename:"file.jpg",
					data:Uploader.wrap(fileUrl.split(":///")[1]),
				},
				{
					name:"attachmentOrigin",
					data:"CLIENT"
				}
			]
		};

		// 合并配置
		if(config){
			defConfig = Object.assign(defConfig,config);
		}

		// 上传
		function blob(){

			Uploader
	        .fetch(defConfig.method,conf.uploadURL,defConfig.headers,defConfig.data)
	        .uploadProgress((written, total) => {

	        })
	        .progress((received, total) => {
	            
	        })
	        .then((response)=> response.json())
	        .then((response)=> {
	            // 上传信息返回
	            thiz.log("--------response_upload--------",response);
	            config.success(response);
	        })
	        .catch((error)=>{
	            // 错误信息
	            thiz.log("--------error--------",error);
	            if(error){
	            	config.error({
		            	msg:"上传失败"
		            });
		            thiz.toast("上传失败");
	            }
	        });
		}

		blob();
		
	}

	/**
	 * @method download
	 * @params config->下载配置；callback->回调函数
	 * @return
	 * @desc 下载方法
	 */
	download(config,callback){

		let thiz = this;

		if(Downloader&&config&&config.fileUrl){

			// 创建下载目录
			let downPath = `${RNFS.ExternalDirectoryPath}/xyjdowns`;
			thiz.log("--------downPath--------",downPath);
			RNFS.mkdir(downPath);

			let fileName = config.fileName?config.fileName:('file'+(new Date()).getTime()/1000);
			let destination = `${downPath}/${fileName}`;
			thiz.log("--------destination--------",destination);
			let task = Downloader.download({
				id: 'file'+(new Date()).getTime()/1000,
				url: config.fileUrl,
				destination: destination
			}).begin((expectedBytes) => {
				console.log(`Going to download ${expectedBytes} bytes!`);
				callback({
					type:0,
					task:task
				});
			}).progress((percent) => {
				console.log(`Downloaded: ${percent * 100}%`);
				callback({
					type:1,
					progress:percent,
				},null);
			}).done(() => {
				console.log('Download is done!');
				callback({
					type:2,
					savePath:destination,
				},null);
			}).error((error) => {
				console.log('Download canceled due to error: ', error);
				callback(null,error);
			});
		}

	}

}