import { HDKdataAttribute, IHistogramConfig } from '../types/hdkdata';
import {
    _activeEnergyBurnedDefaultConfig,
    _appleExerciseTimeDefaultConfig,
    _basalEnergyBurnedDefaultConfig,
    _bloodGlucoseADefaultConfig,
    _bloodGlucoseBDefaultConfig,
    _bloodPressureDiastolicDefaultConfig,
    _bloodPressureSystolicDefaultConfig,
    _bodyFatPercentageDefaultConfig,
    _bodyMassDefaultConfig,
    _bodyMassIndexDefaultConfig,
    _bodyTemperatureDefaultConfig,
    _distanceWalkingRunningDefaultConfig,
    _forcedExpiratoryVolumeDefaultConfig,
    _forcedVitalCapacityDefaultConfig,
    _heartRateDefaultConfig,
    _heartRateVariabilitySDNDefaultConfig,
    _heightDefaultConfig,
    _leanBodyMassDefaultConfig,
    _numberOfTimesFallenDefaultConfig,
    _oxygenSaturationDefaultConfig,
    _peakExpiratoryFlowRateDefaultConfig,
    _peripheralPerfusionIndexDefaultConfig,
    _respiratoryRateDefaultConfig,
    _restingHeartRateDefaultConfig,
    _stepCountDefaultConfig,
    _vo2MaxDefaultConfig,
    _walkingHeartRateAverageDefaultConfig,
} from './defaults';

const _defaultConfigs = {
    [HDKdataAttribute.activeEnergyBurned]: _activeEnergyBurnedDefaultConfig,
    [HDKdataAttribute.appleExerciseTime]: _appleExerciseTimeDefaultConfig,
    [HDKdataAttribute.basalEnergyBurned]: _basalEnergyBurnedDefaultConfig,
    [HDKdataAttribute.bloodGlucoseA]: _bloodGlucoseADefaultConfig,
    [HDKdataAttribute.bloodGlucoseB]: _bloodGlucoseBDefaultConfig,
    [HDKdataAttribute.bloodPressureDiastolic]:
        _bloodPressureDiastolicDefaultConfig,
    [HDKdataAttribute.bloodPressureSystolic]:
        _bloodPressureSystolicDefaultConfig,
    [HDKdataAttribute.bodyFatPercentage]: _bodyFatPercentageDefaultConfig,
    [HDKdataAttribute.bodyMass]: _bodyMassDefaultConfig,
    [HDKdataAttribute.bodyMassIndex]: _bodyMassIndexDefaultConfig,
    [HDKdataAttribute.bodyTemperature]: _bodyTemperatureDefaultConfig,
    [HDKdataAttribute.distanceWalkingRunning]:
        _distanceWalkingRunningDefaultConfig,
    [HDKdataAttribute.forcedExpiratoryVolume]:
        _forcedExpiratoryVolumeDefaultConfig,
    [HDKdataAttribute.forcedVitalCapacity]: _forcedVitalCapacityDefaultConfig,
    [HDKdataAttribute.heartRate]: _heartRateDefaultConfig,
    [HDKdataAttribute.heartRateVariabilitySDN]:
        _heartRateVariabilitySDNDefaultConfig,
    [HDKdataAttribute.height]: _heightDefaultConfig,
    [HDKdataAttribute.leanBodyMass]: _leanBodyMassDefaultConfig,
    [HDKdataAttribute.numberOfTimesFallen]: _numberOfTimesFallenDefaultConfig,
    [HDKdataAttribute.oxygenSaturation]: _oxygenSaturationDefaultConfig,
    [HDKdataAttribute.peakExpiratoryFlowRate]:
        _peakExpiratoryFlowRateDefaultConfig,
    [HDKdataAttribute.peripheralPerfusionIndex]:
        _peripheralPerfusionIndexDefaultConfig,
    [HDKdataAttribute.respiratoryRate]: _respiratoryRateDefaultConfig,
    [HDKdataAttribute.restingHeartRate]: _restingHeartRateDefaultConfig,
    [HDKdataAttribute.stepCount]: _stepCountDefaultConfig,
    [HDKdataAttribute.vo2Max]: _vo2MaxDefaultConfig,
    [HDKdataAttribute.walkingHeartRateAverage]:
        _walkingHeartRateAverageDefaultConfig,
};

export const DefaultConfigs: IHistogramConfig[] = Object.keys(
    _defaultConfigs,
).map((a) => ({
    attribute: a as HDKdataAttribute,
    config: _defaultConfigs[a as HDKdataAttribute],
}));
