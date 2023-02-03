import {
  API,
  DynamicPlatformPlugin,
  Logger,
  PlatformAccessory,
  PlatformConfig,
  Service,
  Characteristic,
} from 'homebridge';

import { PLATFORM_NAME, PLUGIN_NAME } from './settings';
import { SmartElifeAccessory } from './platformAccessory';

class SmartElifeDevice {
  // {
  //   "uid": "CMF022522",
  //   "location_name_alias": "침실1",
  //   "location_name": "침실1",
  //   "device_name": "침실1-2",
  //   "options": "light_999_999",
  //   "version": "1",
  //   "operation": {
  //     "location_name": "침실1",
  //     "options": "light_999_999",
  //     "type": "light",
  //     "value": "light_999_999",
  //     "status": "on"
  //   }
  // }
  public uid : string;
  public type : string;
  public status : string;
  public location : string;
  public device_name : string;
  public options : string;

  constructor(public parsed:any){
    this.uid = parsed.uid;
    this.type = parsed.operation.type;
    this.status = parsed.operation.status;
    this.location = parsed.location_name;
    this.device_name = parsed.device_name;
    this.options = parsed.options;
  }
}



/**
 * HomebridgePlatform
 * This class is the main constructor for your plugin, this is where you should
 * parse the user config and discover/register accessories with Homebridge.
 */


export class SmartElifePlatform implements DynamicPlatformPlugin {
  public readonly Service: typeof Service = this.api.hap.Service;
  public readonly Characteristic: typeof Characteristic =
    this.api.hap.Characteristic;

  // this is used to track restored cached accessories
  public readonly accessories: PlatformAccessory[] = [];

  constructor(
    public readonly log: Logger,
    public readonly config: PlatformConfig,
    public readonly api: API,
  ) {
    this.log.debug('Finished initializing platform:', this.config.name);

    // When this event is fired it means Homebridge has restored all cached accessories from disk.
    // Dynamic Platform plugins should only register new accessories after this event was fired,
    // in order to ensure they weren't added to homebridge already. This event can also be used
    // to start discovery of new accessories.
    this.api.on('didFinishLaunching', () => {
      log.debug('Executed didFinishLaunching callback');
      // run the method to discover / register your devices as accessories
      this.discoverDevices();
    });
  }

  /**
   * This function is invoked when homebridge restores cached accessories from disk at startup.
   * It should be used to setup event handlers for characteristics and update respective values.
   */
  configureAccessory(accessory: PlatformAccessory) {
    this.log.info('Loading accessory from cache:', accessory.displayName);

    // add the restored accessory to the accessories cache so we can track if it has already been registered
    this.accessories.push(accessory);
  }

  /**
   * This is an example method showing how to register discovered accessories.
   * Accessories must only be registered once, previously created accessories
   * must not be registered again to prevent "duplicate UUID" errors.
   */
  discoverDevices() {
    // EXAMPLE ONLY
    // A real plugin you would discover accessories from the local network, cloud services
    // or a user-defined array in the platform config.
    const allDevices = [
      {
        devices: [
          {
            uid: 'CMF062411',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '거실',
            options: '',
            version: '1',
            operation: {
              repeat_code: '0',
              reserve_remain: '',
              control: 'off',
              type: 'heat',
              set_temp: '22',
              mode: 'heat',
              location_name: '거실',
              repeat: 'off',
              current_temp: '22',
              reserve: 'off',
              repeat_remain: '',
              options: '',
              reserve_hour: '0',
            },
          },
          {
            uid: 'CMF062412',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1',
            options: '',
            version: '1',
            operation: {
              repeat_code: '0',
              reserve_remain: '',
              control: 'off',
              type: 'heat',
              set_temp: '24',
              mode: 'heat',
              location_name: '침실1',
              repeat: 'off',
              current_temp: '23',
              reserve: 'off',
              repeat_remain: '',
              options: '',
              reserve_hour: '0',
            },
          },
          {
            uid: 'CMF062413',
            location_name_alias: '침실2',
            location_name: '침실2',
            device_name: '침실2',
            options: '',
            version: '1',
            operation: {
              repeat_code: '1',
              reserve_remain: '',
              control: 'on',
              type: 'heat',
              set_temp: '23',
              mode: 'heat',
              location_name: '침실2',
              repeat: 'off',
              current_temp: '21',
              reserve: 'off',
              repeat_remain: '',
              options: '',
              reserve_hour: '0',
            },
          },
          {
            uid: 'CMF062414',
            location_name_alias: '침실3',
            location_name: '침실3',
            device_name: '침실3',
            options: '',
            version: '1',
            operation: {
              repeat_code: '0',
              reserve_remain: '',
              control: 'off',
              type: 'heat',
              set_temp: '17',
              mode: 'out',
              location_name: '침실3',
              repeat: 'off',
              current_temp: '23',
              reserve: 'off',
              repeat_remain: '',
              options: '',
              reserve_hour: '0',
            },
          },
        ],
        type: 'heat',
      },
      {
        devices: [
          {
            uid: 'CMF104211',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '일괄스위치',
            options: '',
            version: '1',
            operation: {
              location_name: '거실',
              options: '',
              type: 'alloffswitch',
              status: 'off',
            },
          },
        ],
        type: 'alloffswitch',
      },
      {
        devices: [
          {
            uid: 'CMF080111',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '환기',
            options: '',
            version: '1',
            operation: {
              filter_error: [],
              location_name: '거실',
              options: '',
              running_time: '13626',
              wind_speed: 'high',
              off_rsv_time: '0',
              type: 'vent',
              status: 'on',
            },
          },
        ],
        type: 'vent',
      },
      {
        devices: [
          {
            uid: 'CMF513201',
            location_name_alias: '현관',
            location_name: '현관',
            device_name: '도어락',
            options: '',
            version: '1',
            operation: {
              location_name: '현관',
              care_period: '12/09:00',
              options: '',
              battery: '55',
              care_use: 'N',
              type: 'smartdoor',
              status: 'CLOSE',
            },
          },
        ],
        type: 'smartdoor',
      },
      {
        devices: [
          {
            uid: 'CMF093111',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '거실1-1',
            options: '',
            version: '1',
            operation: {
              location_name: '거실',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093112',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '거실1-2',
            options: '',
            version: '1',
            operation: {
              location_name: '거실',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093113',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '거실1-3',
            options: '',
            version: '1',
            operation: {
              location_name: '거실',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093121',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1-1',
            options: '',
            version: '1',
            operation: {
              location_name: '침실1',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093122',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1-2',
            options: '',
            version: '1',
            operation: {
              location_name: '침실1',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093123',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1-3',
            options: '',
            version: '1',
            operation: {
              location_name: '침실1',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093131',
            location_name_alias: '침실2',
            location_name: '침실2',
            device_name: '침실2-1',
            options: '',
            version: '1',
            operation: {
              location_name: '침실2',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093132',
            location_name_alias: '침실2',
            location_name: '침실2',
            device_name: '침실2-2',
            options: '',
            version: '1',
            operation: {
              location_name: '침실2',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093141',
            location_name_alias: '침실3',
            location_name: '침실3',
            device_name: '침실3-1',
            options: '',
            version: '1',
            operation: {
              location_name: '침실3',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093142',
            location_name_alias: '침실3',
            location_name: '침실3',
            device_name: '침실3-2',
            options: '',
            version: '1',
            operation: {
              location_name: '침실3',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
          {
            uid: 'CMF093151',
            location_name_alias: '주방',
            location_name: '주방',
            device_name: '주방',
            options: '',
            version: '1',
            operation: {
              location_name: '주방',
              options: '',
              type: 'wallsocket',
              status: 'on',
            },
          },
        ],
        type: 'wallsocket',
      },
      {
        devices: [
          {
            uid: 'CMF021111',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '거실',
            options: 'multi01_100_100',
            version: '1',
            operation: {
              location_name: '거실',
              options: 'multi01_100_100',
              type: 'light',
              value: 'multi01_001_001',
              status: 'off',
            },
          },
          {
            uid: 'CMF022521',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1-1',
            options: 'light_999_999',
            version: '1',
            operation: {
              location_name: '침실1',
              options: 'light_999_999',
              type: 'light',
              value: 'light_999_999',
              status: 'on',
            },
          },
          {
            uid: 'CMF022522',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1-2',
            options: 'light_999_999',
            version: '1',
            operation: {
              location_name: '침실1',
              options: 'light_999_999',
              type: 'light',
              value: 'light_999_999',
              status: 'on',
            },
          },
          {
            uid: 'CMF022531',
            location_name_alias: '침실2',
            location_name: '침실2',
            device_name: '침실2',
            options: 'light_999_999',
            version: '1',
            operation: {
              location_name: '침실2',
              options: 'light_999_999',
              type: 'light',
              value: 'light_999_999',
              status: 'off',
            },
          },
          {
            uid: 'CMF022541',
            location_name_alias: '침실3',
            location_name: '침실3',
            device_name: '침실3',
            options: 'light_999_999',
            version: '1',
            operation: {
              location_name: '침실3',
              options: 'light_999_999',
              type: 'light',
              value: 'light_999_999',
              status: 'off',
            },
          },
        ],
        type: 'light',
      },
      {
        devices: [
          {
            uid: 'CMF012711',
            location_name_alias: '주방',
            location_name: '주방',
            device_name: '가스',
            options: 'gas_01',
            version: '1',
            operation: {
              location_name: '주방',
              options: 'gas_01',
              type: 'gas',
              status: 'close',
            },
          },
        ],
        type: 'gas',
      },
      {
        devices: [
          {
            uid: 'CMF072801',
            location_name_alias: '거실',
            location_name: '거실',
            device_name: '거실',
            options: '',
            version: '1',
            operation: {
              mode: 'cool',
              location_name: '거실',
              current_temp: '22',
              options: '',
              wind_speed: 'high',
              type: 'aircon',
              set_temp: '18',
              status: 'off',
            },
          },
          {
            uid: 'CMF072802',
            location_name_alias: '침실1',
            location_name: '침실1',
            device_name: '침실1',
            options: '',
            version: '1',
            operation: {
              mode: 'cool',
              location_name: '침실1',
              current_temp: '21',
              options: '',
              wind_speed: 'high',
              type: 'aircon',
              set_temp: '18',
              status: 'off',
            },
          },
          {
            uid: 'CMF072803',
            location_name_alias: '침실2',
            location_name: '침실2',
            device_name: '침실2',
            options: '',
            version: '1',
            operation: {
              mode: 'cool',
              location_name: '침실2',
              current_temp: '24',
              options: '',
              wind_speed: 'high',
              type: 'aircon',
              set_temp: '18',
              status: 'off',
            },
          },
          {
            uid: 'CMF072804',
            location_name_alias: '침실3',
            location_name: '침실3',
            device_name: '침실3',
            options: '',
            version: '1',
            operation: {
              mode: 'cool',
              location_name: '침실3',
              current_temp: '18',
              options: '',
              wind_speed: 'high',
              type: 'aircon',
              set_temp: '18',
              status: 'off',
            },
          },
        ],
        type: 'aircon',
      },
    ];

    const LightDevices: SmartElifeDevice[] = [];

    allDevices.forEach(devicegroup => {
      devicegroup.devices.forEach(device => {
        if (device.operation.type === 'light') {
          LightDevices.push(device as SmartElifeDevice);
        }
      });
    });


    // loop over the discovered devices and register each one if it has not already been registered
    for (const device of LightDevices) {
      // generate a unique id for the accessory this should be generated from
      // something globally unique, but constant, for example, the device serial
      // number or MAC address
      this.log.debug(device.device_name, device.uid);
      const uuid = this.api.hap.uuid.generate(device.uid);

      // see if an accessory with the same uuid has already been registered and restored from
      // the cached devices we stored in the `configureAccessory` method above
      const existingAccessory = this.accessories.find(
        (accessory) => accessory.UUID === uuid,
      );

      if (existingAccessory) {
        // the accessory already exists
        this.log.info(
          'Restoring existing accessory from cache:',
          existingAccessory.displayName,
        );

        // if you need to update the accessory.context then you should run `api.updatePlatformAccessories`. eg.:
        // existingAccessory.context.device = device;
        // this.api.updatePlatformAccessories([existingAccessory]);

        // create the accessory handler for the restored accessory
        // this is imported from `platformAccessory.ts`
        new SmartElifeAccessory(this, existingAccessory);

        // it is possible to remove platform accessories at any time using `api.unregisterPlatformAccessories`, eg.:
        // remove platform accessories when no longer present
        // this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
        // this.log.info('Removing existing accessory from cache:', existingAccessory.displayName);
      } else {
        // the accessory does not yet exist, so we need to create it
        this.log.info('Adding new accessory:', device.device_name);

        // create a new accessory
        const accessory = new this.api.platformAccessory(
          device.device_name,
          uuid,
        );

        // store a copy of the device object in the `accessory.context`
        // the `context` property can be used to store any data about the accessory you may need
        accessory.context.device = device;

        // create the accessory handler for the newly create accessory
        // this is imported from `platformAccessory.ts`
        new SmartElifeAccessory(this, accessory);

        // link the accessory to your platform
        this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [
          accessory,
        ]);
      }
    }
  }
}
