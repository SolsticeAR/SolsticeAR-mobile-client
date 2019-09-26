# SolsticeAR mobile client

SolsticeAR Mobile Viewer


# .env configuration

Before building/running SolsticeAR mobile client, create a .env file that looks like this:

```
VIRO_API_KEY=...your Viro API key goes here...
USE_FAKE_SERVER=1
FAKE_DATA_URL_ROOT=http://vrmockforjill.nfshost.com
REAL_DATA_URL_ROOT=https://solsticear-serv.herokuapp.com
```

To toggle between the fake and real server, change the value in the .env file.
This will not register as a real change when the app reloads, so to trigger that also make a stupid change to the js, like adding a space.


# Android Debug Build instructions

Please note that you must have the Android SDK installed and have the directory that contains `adb` in your `PATH` environment variable.

Start up a react native metro server from the command line in the root of the project:
```
react-native start
```

Then build and install the android app to a USB-connected developer-enabled android device.

For windows, this is:
```
cd android
gradlew app:installArDebug
```

For Mac, this is:
```
(cd android && ./gradlew app:installArDebug)
```

If the app does not launch, look for SolsticeAR-ar in the full app list and launch it.

If the app complains that there is no metro server running, run the following command:
```
adb reverse tcp:8081 tcp:8081
```
