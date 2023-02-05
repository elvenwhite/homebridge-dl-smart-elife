import { Service, PlatformAccessory, CharacteristicValue, PlatformConfig, Logger } from 'homebridge';

import { SmartElifePlatform } from './platform';
import fetch from 'node-fetch';


export async function querystatus(url:string, config:PlatformConfig, log:Logger, uid:string) {
  try {
    // 👇️ const response: Response
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13C75 DAELIM/IOS',
        'Authorization': 'Bearer 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',
        '_csrf': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYWVsaW1fYWNyb19zeXN0ZW1fYXV0aG9yaXphdGlvbiIsImlzcyI6ImRhZWxpbV9hY3JvX3N5c3RlbSIsIl90b2tlbiI6InNoVVNRTmg3R0h3UDNBRGlJMzkya0EzSHh5S2Q2bmtxZ3VBaDltOThLcGpSd28xMHUrOElKSVJDbEh0SkZiMXkiLCJfdXVpZCI6IjgxMGU5ODJhLWY3MmItNDNhNS1hYWUxLWVhMjU1OTFkODkwZCJ9.HUcwb5bHTEJkTQ0lspUkitec9CSiJ9esacA6RVXO2i8',
        'daelim_elife': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYWVsaW1fYWNyb19zeXN0ZW1fYXV0aG9yaXphdGlvbiIsImFjY2Vzc190b2tlbl9nZXRfbWlsbGlzIjoiZy96Unk5N2xRZ1RoOExQcXUwbEhtUT09IiwiYXV0b19sb2dpbiI6IlBMYTlPYys4SHFWK0dISitIajBTT2c9PSIsIm1lbWJfaWQiOiJUdG9iWDc5cU9TMys3TEhXRzMvSDlKN3JQaDB4VHBxTXNaeXF1RlpEMWZJPSIsImdhX2NvZGUiOiI4TzRrU3JRdmZpQzdlRkd2TFkrRW13PT0iLCJkYW5qaV90b2tlbiI6ImdnZlhyWFM4ZkVzYjM5TThEUC82ZWFxQnc5Y3RtcW9pWmhHcFd3b1BjaGxCNEVCbjlFMU9Sd05YeWlnWGdZRlAiLCJobyI6ImdiZFNiMUtLYzVyNVNHL3IzWmRoQ2c9PSIsImdhX3VzZV95biI6IjZ1ODdkbXZ0RlA3VFA3QkFPSFBRTVE9PSIsImlzcyI6ImRhZWxpbV9hY3JvX3N5c3RlbSIsImRqX25tIjoiNkZsbm8yMUF3RlNpSGY5SThTYVl2bW1EM1FVeWwzbHBuV1BWak4wWFNlaz0iLCJkb25nIjoiRGNZNGdZZTBmcWczQXFvNkNhWUxaUT09IiwiYWNjZXNzX3Rva2VuX2V4cGlyZXNfaW4iOiJkWXhlMTg5TERsV2EwL0MwdUZZYlJBPT0iLCJhY2Nlc3NfdG9rZW4iOiJQOXh5MzRidVFwNU5JM1lXNlR0RDFVSGMzczcyQ0ZlK1NmRzFPeHZmd0hWOVlUN0ZpbnRnSlNwdkZyTUJqQXJCIiwiZGpfY2siOiIwbWdHZC8xdERVNXBQR3M3Nmt1eEZ5UDY0dlFIcWNJSzB5WjZxb1FORk1BPSIsImR2X3V1aWQiOiJma2xXOEMyTG1CeEVvdEZDeVIrY2txYWo2REtXQng4L1F2MnZEQjVSaDZ4YW5ZSXJlaXR6Y3pVc21wdFJQRjV5IiwibWVtYl9wdyI6IlhPR3dBcStJTm1VRnNjNzhWdWlESjg3K2JaWmxSTmFkcWJCUFpJZWpkNldvRUZjMmtmQU1TbXNWRC9acm1FVy8iLCJobV9jZCI6IjdFVzVFOWxyRlA5UzdqTWlneSt3Z05QYWNTaDhNTm9XcCs3cXhkL1hFOW50aEV1ak5paVJ2ays5aEUzOGwvUm5wSGRLdXVZNStHNm43YS9odzZCSERBPT0iLCJtZW1iX3VpZCI6IkpaT2dGUmt0bmpmNDFMMEpWQUI4WDNNYTlPZ1NNZ3FZbnROc3UrajQvSUk9IiwiYWxpYXMiOiIreEhkSFduSmYwSjFWdC9FbkpzS2NBPT0iLCJleHAiOjE2NzgwNTEzNzR9.ai9IncJXSh4SsEV9FtGVJZuU3TFOmS90UFaquw3aszw',
        'Referer': 'https://node.apt.co.kr:7443/controls/roomDeviceType.do',
        'Connection': 'keep-alive',
        'Origin': 'https://node.apt.co.kr:7443',
        'Host': 'node.apt.co.kr:7443',
      },
      body: JSON.stringify({'type':'light', 'uid' : uid }),
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: GetUsersResponse
    const result = (await response.json()) as any;

    log.debug('result is: ', JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      log.error('error message: ', error.message);
      return error.message;
    } else {
      log.error('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}




export async function query(url:string, config:PlatformConfig, log:Logger, uid:string, onoff:string, brightness?: number) {
  try {
    // 👇️ const response: Response
    const token = config.token;
    const csrf = config.csrf;


    let body_def = JSON.stringify({'type':'light', 'uid' : uid, 'control':onoff});
    if (brightness){
      body_def = JSON.stringify({'type':'light', 'uid' : uid, 'operation':{
        'value': 'multi01_050_'+brightness,
      }});
    }
    log.debug('sending', body_def);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 9_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13C75 DAELIM/IOS',
        '_csrf': csrf,
        'daelim_elife': token,
        'Referer': 'https://node.apt.co.kr:7443/controls/roomDeviceType.do',
        'Connection': 'keep-alive',
        'Origin': 'https://node.apt.co.kr:7443',
        'Host': 'node.apt.co.kr:7443',
      },
      body: body_def,
    });

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    // 👇️ const result: GetUsersResponse
    const result = (await response.json()) as any;

    log.debug('result is: ', JSON.stringify(result, null, 4));

    return result;
  } catch (error) {
    if (error instanceof Error) {
      log.error('error message: ', error.message);
      return error.message;
    } else {
      log.error('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

/**
 * Platform Accessory
 * An instance of this class is created for each accessory your platform registers
 * Each accessory may expose multiple services of different service types.
 */
export class SmartElifeAccessory {
  private service: Service;

  /**
   * These are just used to create a working example
   * You should implement your own code to track the state of your accessory
   */
  private lightState = {
    On: false,
    Brightness: 100,
  };

  constructor(
    private readonly platform: SmartElifePlatform,
    private readonly accessory: PlatformAccessory,


  ) {


    // set accessory information
    this.accessory.getService(this.platform.Service.AccessoryInformation)!
      .setCharacteristic(this.platform.Characteristic.Manufacturer, 'DL EnC')
      .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
      .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

    // get the LightBulb service if it exists, otherwise create a new LightBulb service
    // you can create multiple services for each accessory
    this.service = this.accessory.getService(this.platform.Service.Lightbulb) || this.accessory.addService(this.platform.Service.Lightbulb);

    // set the service name, this is what is displayed as the default name on the Home app
    // in this example we are using the name we stored in the `accessory.context` in the `discoverDevices` method.
    this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.device_name);

    // each service must implement at-minimum the "required characteristics" for the given service type
    // see https://developers.homebridge.io/#/service/Lightbulb

    // register handlers for the On/Off Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.On)
      .onSet(this.setOn.bind(this))                // SET - bind to the `setOn` method below
      .onGet(this.getOn.bind(this));               // GET - bind to the `getOn` method below

    // register handlers for the Brightness Characteristic
    this.service.getCharacteristic(this.platform.Characteristic.Brightness)
      .onSet(this.setBrightness.bind(this));       // SET - bind to the 'setBrightness` method below

    /**
     * Creating multiple services of the same type.
     *
     * To avoid "Cannot add a Service with the same UUID another Service without also defining a unique 'subtype' property." error,
     * when creating multiple services of the same type, you need to use the following syntax to specify a name and subtype id:
     * this.accessory.getService('NAME') || this.accessory.addService(this.platform.Service.Lightbulb, 'NAME', 'USER_DEFINED_SUBTYPE_ID');
     *
     * The USER_DEFINED_SUBTYPE must be unique to the platform accessory (if you platform exposes multiple accessories, each accessory
     * can use the same sub type id.)
     */

    // Example: add two "motion sensor" services to the accessory
    // const motionSensorOneService = this.accessory.getService('Motion Sensor One Name') ||
    //   this.accessory.addService(this.platform.Service.MotionSensor, 'Motion Sensor One Name', 'YourUniqueIdentifier-1');

    // const motionSensorTwoService = this.accessory.getService('Motion Sensor Two Name') ||
    //   this.accessory.addService(this.platform.Service.MotionSensor, 'Motion Sensor Two Name', 'YourUniqueIdentifier-2');

    /**
     * Updating characteristics values asynchronously.
     *
     * Example showing how to update the state of a Characteristic asynchronously instead
     * of using the `on('get')` handlers.
     * Here we change update the motion sensor trigger states on and off every 10 seconds
     * the `updateCharacteristic` method.
     *
     */
    // let motionDetected = false;
    // setInterval(() => {
    //   // EXAMPLE - inverse the trigger
    //   motionDetected = !motionDetected;

    //   // push the new value to HomeKit
    //   motionSensorOneService.updateCharacteristic(this.platform.Characteristic.MotionDetected, motionDetected);
    //   motionSensorTwoService.updateCharacteristic(this.platform.Characteristic.MotionDetected, !motionDetected);

    //   // this.platform.log.debug('Triggering motionSensorOneService:', motionDetected);
    //   // this.platform.log.debug('Triggering motionSensorTwoService:', !motionDetected);
    // }, 10000);
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, turning on a Light bulb.
   */
  async setOn(value: CharacteristicValue) {
    // implement your own code to turn your device on/off
    this.lightState.On = value as boolean;
    const on = value ? 'on' : 'off';
    // eslint-disable-next-line max-len
    query('https://node.apt.co.kr:7443//device/control.ajax', this.platform.config, this.platform.log, this.accessory.context.device.uid, on);
    this.platform.log.debug('Set Characteristic On ->', on);
  }

  /**
   * Handle the "GET" requests from HomeKit
   * These are sent when HomeKit wants to know the current state of the accessory, for example, checking if a Light bulb is on.
   *
   * GET requests should return as fast as possbile. A long delay here will result in
   * HomeKit being unresponsive and a bad user experience in general.
   *
   * If your device takes time to respond you should update the status of your device
   * asynchronously instead using the `updateCharacteristic` method instead.

   * @example
   * this.service.updateCharacteristic(this.platform.Characteristic.On, true)
   */
  async getOn(): Promise<CharacteristicValue> {
    // implement your own code to check if the device is on
    const isOn = this.lightState.On;

    // eslint-disable-next-line max-len
    const result = await querystatus('https://node.apt.co.kr:7443/controls/device/status.ajax', this.platform.config, this.platform.log, this.accessory.context.device.uid);

    this.platform.log.debug('Get Characteristic On ->', result.data.status);
    if(result.data.status ==='on') {
      return true;
    } else {
      return false;
    }



    // if you need to return an error to show the device as "Not Responding" in the Home app:
    throw new this.platform.api.hap.HapStatusError(this.platform.api.hap.HAPStatus.SERVICE_COMMUNICATION_FAILURE);


    return isOn;
  }

  /**
   * Handle "SET" requests from HomeKit
   * These are sent when the user changes the state of an accessory, for example, changing the Brightness
   */
  async setBrightness(value: CharacteristicValue) {
    // implement your own code to set the brightness
    this.lightState.Brightness = value as number;
    query('https://node.apt.co.kr:7443/device/control.ajax', this.platform.config, this.platform.log, this.accessory.context.device.uid, 'on', value as number);
    this.platform.log.debug('Set Characteristic Brightness -> ', value);
  }

}
