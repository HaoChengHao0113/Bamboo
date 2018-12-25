package com.bamboo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.toast.RCTToastPackage;
import com.RNFetchBlob.RNFetchBlobPackage;


import com.bamboo.CustomToastPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import android.util.Log;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            
            new RNFetchBlobPackage(),
            new RCTToastPackage(),
            new CustomToastPackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Log.d("----------------------onCreate---------------------------","success");
    SoLoader.init(this, /* native exopackage */ false);
  }
}
