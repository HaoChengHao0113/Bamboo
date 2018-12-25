package com.bamboo;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.os.Build;
import android.util.Log;
import com.facebook.react.bridge.Callback;
import android.content.Intent;
import android.net.Uri;

public class ToastModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
  // private InstallUtil mInstallUtil; 

  public ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "ToastExample";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }
  
  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  @ReactMethod
  public void requestInstallPermissions(String path,Callback successCallback,Callback errorCallback) {
    Log.d("----------------------path-------------------------",path);
     try{
        if (Build.VERSION.SDK_INT >= 26) {
          boolean b = getReactApplicationContext().getPackageManager().canRequestPackageInstalls(); 
          
          if (b){
            String a="directly_install";
            successCallback.invoke(a);
            Log.d("---------------------直接去安装------------------------------","directly_install");
          }else{ 
            String a="To_open_permissions_install";
            successCallback.invoke(a);
            Log.d("-----------------去打开安装权限开关--------------------------","To_open_permissions_install");
          }
        }else{
          String a="android8.0以下_install";
          successCallback.invoke(a);
          Log.d("---------------------直接去安装啊------------------------------","android8.0以下_install");
        }
     }catch(Exception e){
        errorCallback.invoke(e.getMessage());
     }
  }

  @ReactMethod
  public void jumpToBrower(){
      Intent intent= new Intent();        
      intent.setAction("android.intent.action.VIEW");    
      Uri content_url = Uri.parse("https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=tupian&step_word=&hs=0&pn=6&spn=0&di=112619130801&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=2858038929%2C3751379127&os=640427899%2C366482359&simid=0%2C0&adpicid=0&lpn=0&ln=1642&fr=&fmq=1545722760514_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fpic25.nipic.com%2F20121110%2F10839717_103723525199_2.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bgtrtv_z%26e3Bv54AzdH3Ffi5oAzdH3F8AzdH3F99AzdH3F0al0nn9hb8du8bdm_z%26e3Bip4s&gsm=0&rpstart=0&rpnum=0&islist=&querylist=");   
      intent.setData(content_url);  
      intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); 
      getReactApplicationContext().startActivity(intent);
  }
  

}