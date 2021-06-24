import { requireNativeComponent, ViewStyle } from 'react-native';

type HmssdkProps = {
  color: string;
  style: ViewStyle;
  roomId: string;
  authToken: string;
  userId: string;
  layout: { width: number; height: number };
};

export const HmssdkViewManager =
  requireNativeComponent<HmssdkProps>('HmssdkView');

export default HmssdkViewManager;
