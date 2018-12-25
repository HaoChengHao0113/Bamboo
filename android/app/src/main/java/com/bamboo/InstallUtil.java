package com.bamboo;

import android.app.Activity;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.support.annotation.RequiresApi;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AlertDialog;

public class InstallUtil {
    private Activity mAct;
    private String mPath;//下载下来后文件的路径
    public static int UNKNOWN_CODE = 2018;

    public InstallUtil(Activity mAct, String mPath) {
        this.mAct = mAct;
        this.mPath = mPath;
    }

    public void install(){
        // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) startInstallO();
        // else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) startInstallN();
        // else startInstall();
    }

    /**
     * android1.x-6.x
     */
    // private void startInstall() {
    //     Intent install = new Intent(Intent.ACTION_VIEW);
    //     install.setDataAndType(Uri.parse("file://" + mPath), "application/vnd.android.package-archive");
    //     install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    //     mAct.startActivity(install);
    // }

    /**
     * android7.x
     */
    // private void startInstallN() {
    //     //参数1 上下文, 参数2 在AndroidManifest中的android:authorities值, 参数3  共享的文件
    //     Uri apkUri = FileProvider.getUriForFile(mAct, Constants.AUTHORITY, new File(mPath));
    //     Intent install = new Intent(Intent.ACTION_VIEW);
    //     //由于没有在Activity环境下启动Activity,设置下面的标签
    //     install.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    //     //添加这一句表示对目标应用临时授权该Uri所代表的文件
    //     install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    //     install.setDataAndType(apkUri, "application/vnd.android.package-archive");
    //     mAct.startActivity(install);
    // }

    /**
     * android8.x
     */
    // @RequiresApi(api = Build.VERSION_CODES.O)
    // private void startInstallO() {
    //     boolean isGranted = mAct.getPackageManager().canRequestPackageInstalls();
    //     if (isGranted) startInstallN();//安装应用的逻辑(写自己的就可以)
    //     else new AlertDialog.Builder(mAct)
    //                 .setCancelable(false)
    //                 .setTitle("安装应用需要打开未知来源权限，请去设置中开启权限")
    //                 .setPositiveButton("确定", new DialogInterface.OnClickListener() {
    //                     public void onClick(DialogInterface d, int w) {
    //                         Intent intent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES);
    //                         mAct.startActivityForResult(intent, UNKNOWN_CODE);
    //                     }
    //                 })
    //                 .show();
    // }
}

