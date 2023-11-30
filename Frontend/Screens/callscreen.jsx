import React from "react";
import { View } from 'react-native';
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn';

function CallPage({ route, navigation }) {
  const { username = 'DefaultUsername', isAdvisor } = route.params;

  const randomUserID = String(Math.floor(Math.random() * 100000));

  return (
    <View style={{flex: 1}}>
      <ZegoUIKitPrebuiltCall
        appID={321004940}
        appSign='458d8d6b68f9df333bd476fd8892e82021ee24fbc6c41c007aa731bf238e55ee'
        userID={randomUserID}
        userName={username}
        callID='testCallID'
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onHangUp: () => {
            if (!isAdvisor) {
              navigation.navigate('RateAdvisor', { username });
            } else {
              navigation.navigate('Login')
            }
          },
        }}
      />
    </View>
  );
}

export default CallPage;
