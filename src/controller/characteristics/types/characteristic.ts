/**
 * File: \src\controller\characteristics\types\characteristic.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:14:58
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 16:22:08
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

interface Characteristic {
    serviceUUID: number;
    characteristicUUID: number;
    successHandler: (characteristic: BluetoothRemoteGATTCharacteristic) => Promise<void>;
    errorHandler: () => void;
    queryInterval: number
}

export default Characteristic
