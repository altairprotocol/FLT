# codono-mobile

Change Following Lines
src\environment\environment.ts

# exchange-app- for android

ionic capacitor add android
ionic capacitor copy
cordova-res android --skip-config --copy
ionic capacitor build android

# exchange-app for ios

ionic capacitor add ios
ionic capacitor copy
cordova-res ios --skip-config --copy
ionic capacitor build ios
#info.plist

<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) uses Camera permission for QR code scanning</string>



Issue 1:

Version code 2 has already been used. Try another version code.

Goto Android Studio in code -> app\build.gradle
Change versionCode to +1 value.

Issue 2:
Your app currently targets API level 30 and must target at least API level 31 to ensure that it is built on the latest APIs optimised for security and performance. Change your app's target API level to at least 31. Learn more
Open

variables.gradle

change

targetSdkVersion = 30
to
targetSdkVersion = 31

Then open AndroidManifest.xml
after <activity paste
android:exported="true"

so it looks like
<activity android:exported="true"

# codono-new-ios-fix


android fix
Issue 
```
Caused by: org.gradle.internal.metaobject.AbstractDynamicObject$CustomMessageMissingMethodException: Could not find method compile() for arguments [{name=barcodescanner-release-2.1.5, ext=aar}] on object of type org.gradle.api.internal.artifacts.dsl.dependencies.DefaultDependencyHandler.
```
Fix
```
\node_modules\phonegap-plugin-barcodescanner\src\android\barcodescanner.gradle
```
Find 
```
compile(name:'barcodescanner-release-2.1.5', ext:'aar')
```
replace with 
```
implementation(name:'barcodescanner-release-2.1.5', ext:'aar')
```


#Building App 
```
npm run build-apk
# then run 
npx @capacitor/assets generate
```
[Above command may fail for unlink , but thats ok] to generate icons .

then goto android studio and build apk.

#Duplicate class error 
Open gradle.properties and make sure following lines are in there 
```
android.useAndroidX=true
android.enableJetifier=true
```
