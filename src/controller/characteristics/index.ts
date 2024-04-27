/**
 * File: \src\controller\characteristics\index.ts
 * Project: rc-frontend
 * Created Date: 2024-04-27 15:31:43
 * Author: Guoyi
 * -----
 * Last Modified: 2024-04-27 16:37:01
 * Modified By: Guoyi
 * -----
 * Copyright (c) 2024 Guoyi Inc.
 *
 * ------------------------------------
 */

import Characteristic from "./types/characteristic";

import motionData from "./modules/motionData";
import batteryVoltage from "./modules/batteryVoltage";

const characteristics: Array<Characteristic> = [motionData, batteryVoltage];

export default characteristics;
