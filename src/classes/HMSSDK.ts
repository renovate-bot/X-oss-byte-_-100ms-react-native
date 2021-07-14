import { NativeEventEmitter, NativeModules } from 'react-native';
import type HMSConfig from './HMSConfig';
import type HMSLocalPeer from './HMSLocalPeer';
import type HMSRemotePeer from './HMSRemotePeer';
import type HMSRoom from './HMSRoom';

const {
  /**
   * @ignore
   */
  HmsManager,
} = NativeModules;

const HmsEventEmitter = new NativeEventEmitter(HmsManager);

let HmsSdk: HMSSDK | undefined;

export default class HMSSDK {
  room?: HMSRoom;
  localPeer?: HMSLocalPeer;
  remotePeers?: [HMSRemotePeer];
  /**
   * - Returns an instance of [HMSSDK]{@link HMSSDK}
   * - This function must be called to get an instance of HMSSDK class and only then user can interact with its methods
   *
   * @static
   * @returns
   * @memberof HMSSDK
   */
  static async build() {
    if (HmsSdk) {
      return HmsSdk;
    }
    HmsManager.build();
    HmsSdk = new HMSSDK();
    return HmsSdk;
  }

  /**
   * takes an instance of [HMSConfig]{@link HMSConfig} and joins the room
   * after joining the room user will start receiving the events and updates of the room
   *
   * @param {HMSConfig} config
   * @memberof HMSSDK
   */
  async join(config: HMSConfig) {
    console.log(config, 'config in here');
    await HmsManager.join(config);
  }

  /**
   * This is a prototype method for interaction with native sdk will be @deprecated in future
   *
   * @param {*} callback
   * @memberof HMSSDK
   */
  async getTrackIds(callback: any) {
    await HmsManager.getTrackIds(callback);
  }

  /**
   * Switches Audio of current user on/off depending upon the value of isMute
   *
   * @param {Boolean} isMute
   * @memberof HMSSDK
   */
  async setLocalPeerMute(isMute: Boolean) {
    await HmsManager.setLocalMute(isMute);
  }

  /**
   * Switches local video feed on/off depending upon the value of isMute
   *
   * @param {Boolean} isMute
   * @memberof HMSSDK
   */
  async setLocalPeerVideoMute(isMute: Boolean) {
    await HmsManager.setLocalVideoMute(isMute);
  }

  /**
   * switches camera between front/back
   *
   * @memberof HMSSDK
   */
  async switchCamera() {
    await HmsManager.switchCamera();
  }

  /**
   * - This is a prototype event listener that takes action and listens for updates related to that particular action
   * - This method will be @deprecated in future and event listener will be passed in join method
   *
   * @param {string} action
   * @param {*} callback
   * @memberof HMSSDK
   */
  async addEventListener(action: string, callback: any) {
    HmsEventEmitter.addListener(action, callback);
  }

  /**
   * Calls leave function of native sdk and session of current user is invalidated
   *
   * @memberof HMSSDK
   */
  async leave() {
    await HmsManager.leave();
  }
}