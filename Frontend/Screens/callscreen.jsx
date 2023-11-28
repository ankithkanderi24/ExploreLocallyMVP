import React from "react";
import { View, Button } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

function CallPage({ navigation }) {
  const randomUserID = String(Math.floor(Math.random() * 100000));
  return (
    <View style={{flex: 1}}>
      <ZegoUIKitPrebuiltCall
        appID={321004940}
        appSign='458d8d6b68f9df333bd476fd8892e82021ee24fbc6c41c007aa731bf238e55ee'
        userID={randomUserID}
        userName={'user_'+randomUserID}
        callID='testCallID'
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => { navigation.navigate('Login') },
          onHangUp: () => {navigation.navigate('Login')},
        }}
      />
    </View>
  );
}

export default CallPage;
