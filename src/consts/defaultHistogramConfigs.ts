import { HDKdataAttribute, IHistogramConfig } from '../types/hdkdata';
import {
    _activeEnergyBurnedDefaultConfig,
    _appleExerciseTimeDefaultConfig,
} from './defaults';

export const DefaultConfigs: IHistogramConfig = {
    [HDKdataAttribute.activeEnergyBurned]: _activeEnergyBurnedDefaultConfig,
    [HDKdataAttribute.appleExerciseTime]: _appleExerciseTimeDefaultConfig,
};
