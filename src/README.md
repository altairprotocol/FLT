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

Add this `android.enableJetifier=true` to build.gradle

rm -rf android && ionic capacitor add android && ionic capacitor copy && cordova-res android --skip-config --copy && ionic capacitor build android