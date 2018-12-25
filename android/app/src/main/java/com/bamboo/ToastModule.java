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

public class ToastModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

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
  public void requestInstallPermissions(Callback successCallback,Callback errorCallback) {
     try{
        if (Build.VERSION.SDK_INT >= 26) {
          // boolean b = getPackageManager().canRequestPackageInstalls(); 
          boolean b= true;
          if (b){
            String a="success";
            successCallback.invoke(a);
            Log.d("---------------------直接去安装------------------------------","success");
          }else{ 
            Log.d("-----------------去打开安装权限开关--------------------------","faild");
          }
        }else{
          Log.d("---------------------直接去安装啊------------------------------","success");
        }
     }catch(Exception e){
        errorCallback.invoke(e.getMessage());
     }
  }
}