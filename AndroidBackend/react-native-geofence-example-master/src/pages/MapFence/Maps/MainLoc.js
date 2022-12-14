import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Platform} from 'react-native';

import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Boundary, {Events} from 'react-native-boundary';
import Permissions, {PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Polygon} from 'react-native-maps';
import { unklabGeofence } from '../Coordate_Geofence/Coordinate';
import { locations } from '../unklab';


import {name as appName} from '../../../../app.json';
import {AppRegistry} from 'react-native';


import { eiffelGeofence} from '../Coordate_Geofence/Coordinate';


const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const MapCircle = ({latitude, longitude, radius}) => {
  return (
    <MapView.Circle
      center={{
        latitude,
        longitude,
      }}
      radius={radius}
      strokeWidth={2}
      strokeColor="#3399ff"
      fillColor="rgba(0,0,0,0.5)"
      zIndex={100}
    />
  );
};




const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const MainLoc = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    handlePermissions();
  }, []);

  const handlePermissions = () => {
    if (isAndroid) handleAndroidPermissions();
    if (isIOS) handleIOSPermissions();
  };

  const handleAndroidPermissions = () => {
    Permissions.request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
      fineLocationStatus => {
        switch (fineLocationStatus) {
          case RESULTS.GRANTED:
          case RESULTS.LIMITED:
            Permissions.request(
              PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
            ).then(backgroundLocationStatus => {
              switch (backgroundLocationStatus) {
                case RESULTS.GRANTED:
                case RESULTS.LIMITED:
                  handleLocationAllowed();
                  break;
                default:
                  console.log(
                    'ACCESS_BACKGROUND_LOCATION ->',
                    backgroundLocationStatus,
                  );
                  break;
              }
            });
            break;
          default:
            console.log('ACCESS_FINE_LOCATION ->', fineLocationStatus);
            break;
        }
      },
    );
  };
  const handleIOSPermissions = () => {
    Permissions.request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(
      locationAlwaysStatus => {
        switch (locationAlwaysStatus) {
          case RESULTS.GRANTED:
          case RESULTS.LIMITED:
            handleLocationAllowed();
            break;
          default:
            console.log('LOCATION_ALWAYS ->', locationAlwaysStatus);
            break;
        }
      },
    );
    PushNotificationIOS.requestPermissions().then(response => {
      const isAlertAllowed = response.alert;

      console.log('Is iOS Alert Allowed:', isAlertAllowed);
    });
  };

  const handleLocationAllowed = () => {
    // add freeway geofences
    // freewayGeofences.forEach(geofence => {
    //   Boundary.add(geofence);
    // });
    // add eiffel geofence
    Boundary.add(unklabGeofence)
      .then(() => console.log('[ACTIVE] - Geofence added!'))
      .catch(e => console.error('[ACTIVE] - Error:', e));
  };



  const onNotificationTestPress = () => {
    PushNotification.localNotification({
      channelId: 'boundary-demo',
      title: 'Test Notification',
      message: 'It is a test notification.',
      importance: 'max',
      priority: 'max',
      ignoreInForeground: false,
      allowWhileIdle: true,
    });
  };






  // const renderFreeWayGeofences = () => {
  //   return freewayGeofences.map(geofence => {
  //     return (
  //       <MapCircle
  //         key={geofence.id}
  //         latitude={geofence.lat}
  //         longitude={geofence.lng}
  //         radius={geofence.radius}
  //       />
  //     );
  //   });
  // };

  // const renderEiffelGeofences = () => {
  //   return (
  //     <MapCircle
  //       key={eiffelGeofence.id}
  //       latitude={eiffelGeofence.lat}
  //       longitude={eiffelGeofence.lng}
  //       radius={eiffelGeofence.radius}
  //     />
  //   );
  // };

  const unklabGeofence = () => {
    return (
      locations.map(marker => (
        <Polygon 
        key={unklabGeofence.id}
        coordinates={[
          { latitude: 1.420303, longitude: 124.981436 },
          { latitude: 1.418156, longitude: 124.979475 },
          { latitude: 1.417325, longitude: 124.980931 },
          { latitude: 1.415586, longitude: 124.981877 },
          { latitude: 1.414991, longitude: 124.982122 },
          { latitude: 1.414178, longitude: 124.981596 },
          
          { latitude: 1.413446, longitude: 124.981789 },
          { latitude: 1.414094, longitude: 124.983729 },
          { latitude: 1.414446, longitude: 124.985109 },
          { latitude: 1.414856, longitude: 124.985176 },
          { latitude: 1.415767, longitude: 124.985797 },
          { latitude: 1.416772, longitude: 124.985568 },

          { latitude: 1.417029, longitude: 124.985707 },
          { latitude: 1.417292, longitude: 124.985748 },
          { latitude: 1.417554, longitude: 124.985274 },
          { latitude: 1.417554, longitude: 124.985274 },
          { latitude: 1.418477, longitude: 124.985259 },
          { latitude: 1.418477, longitude: 124.985259 },

          { latitude: 1.418649, longitude: 124.985072 },
          { latitude: 1.419003, longitude: 124.985222 },
          { latitude: 1.419160, longitude: 124.985231 },
          { latitude: 1.420034, longitude: 124.984751 },
          { latitude: 1.419997, longitude: 124.984514 },
          { latitude: 1.420121, longitude: 124.983547 },

          { latitude: 1.420232, longitude: 124.982638 },
          { latitude: 1.420843, longitude: 124.982669 },
          { latitude: 1.421441, longitude: 124.981806 },
          { latitude: 1.420519, longitude: 124.981551 },
          { latitude: 1.420212, longitude: 124.984514 },
          { latitude: 1.420121, longitude: 124.981311 },
      ]}

      fillColor="rgba(129,0,0,1)"
      strokeWidth={10}
      strokeColor="#3399ff"
      zIndex={100}/>
        
      ))
    );
  
  };



  return (
    <View style={styles.container}>
      <MapView
        followsUserLocation
        showsUserLocation
        showsMyLocationButton
        showsCompass
        ref={mapRef}
        style={styles.map}
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        {/* {renderFreeWayGeofences()} */}
     {unklabGeofence()}
        {/* {renderEiffelGeofences()} */}
      </MapView>
      <Button onPress={onNotificationTestPress} title="Notification Test" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    fontSize: 15,
    alignSelf: 'flex-end',
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

PushNotification.createChannel(
  {
    channelId: 'boundary-demo',
    channelName: 'Boundary Channel',
    channelDescription: 'A channel to categorise your notifications',
    playSound: false,
    soundName: 'default',
    importance: Importance.HIGH,
    vibrate: true,
  },
  created => {
    if (created) console.log('Notification channel created: Boundary Channel');
    else console.log('Notification channel already exist: Boundary Channel');
  },
);

const addGeofences = () => {
  // add freeway geofences
  // freewayGeofences.forEach(geofence => {
  //   Boundary.add(geofence);
  // });

  // add eiffel geofence
  // Boundary.add(eiffelGeofence)
  //   .then(() => console.log('[BACKGROUND] - Geofence added!'))
  //   .catch(e => console.error('[BACKGROUND] - Error:', e));

    Boundary.add(unklabGeofence)
    .then(() => console.log('[BACKGROUND] - Geofence added!'))
    .catch(e => console.error('[BACKGROUND] - Error:', e));
};

Boundary.on(Events.ENTER, id => {
  console.log('Background Enter');
  PushNotification.localNotification({
    channelId: 'boundary-demo',
    title: 'ENTER SIGNAL',
    message: `You've entered region: ${id} in background`,
    importance: 'max',
    priority: 'max',
    ignoreInForeground: false,
    allowWhileIdle: true,
  });
});

Boundary.on(Events.EXIT, id => {
  console.log('Background Exit');
  PushNotification.localNotification({
    channelId: 'boundary-demo',
    title: 'EXIT SIGNAL',
    message: `You've left region: ${id} in background`,
    importance: 'max',
    priority: 'max',
    ignoreInForeground: false,
    allowWhileIdle: true,
  });
});

const onAfterRebootHeadlessTaskForAndroid = () => async () => {
  Permissions.checkMultiple([
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
  ]).then(statuses => {
    const isAccessFineLocationAllowed =
      statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.LIMITED ||
      RESULTS.GRANTED;
    const isAccessBackgroundLocationAllowed =
      statuses[PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION] ===
        RESULTS.LIMITED || RESULTS.GRANTED;

    if (isAccessFineLocationAllowed && isAccessBackgroundLocationAllowed)
      addGeofences();
  });
};

// Geo-fences are always erased after phone restart, we need to re register them on boot startup. This part automatically execute after Android phone reboot.
Boundary.onReRegisterRequired(onAfterRebootHeadlessTaskForAndroid);

AppRegistry.registerComponent(appName, () => MainLoc);

export default MainLoc;