import {
    HDKdataAttribute,
    INumericalAttributeConfig,
    Units,
} from '../types/hdkdata';

export const numberMaximum = 99999999;

export const _activeEnergyBurnedDefaultConfig: INumericalAttributeConfig = {
    legalMax: 100000,
    legalMin: 0,
    bins: {
        interval: { min: 1600, max: 4000 },
        buckets: 15,
    },
    unit: Units.kCal,
    attribute: HDKdataAttribute.activeEnergyBurned,
};

export const _appleExerciseTimeDefaultConfig: INumericalAttributeConfig = {
    legalMax: numberMaximum,
    legalMin: 0,
    bins: {
        interval: { min: 0, max: 60 * 60 * 24 },
        buckets: 24,
    },
    unit: Units.mins,
    attribute: HDKdataAttribute.appleExerciseTime,
};

export const _basalEnergyBurnedDefaultConfig: INumericalAttributeConfig = {
    legalMax: numberMaximum,
    legalMin: 0,
    bins: {
        interval: { min: 1600, max: 1800 },
        buckets: 15,
    },
    unit: Units.kCal,
    attribute: HDKdataAttribute.basalEnergyBurned,
};

export const _bloodGlucoseADefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 140, max: 200 },
        buckets: 15,
    },
    unit: Units.mgPerDl,
    attribute: HDKdataAttribute.bloodGlucoseA,
};

export const _bloodGlucoseBDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 7.8, max: 11.1 },
        buckets: 15,
    },
    unit: Units.mmolPerL,
    attribute: HDKdataAttribute.bloodGlucoseB,
};

export const _bloodPressureDiastolicDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 60, max: 80 },
        buckets: 15,
    },
    unit: Units.mmHG,
    attribute: HDKdataAttribute.bloodPressureDiastolic,
};

export const _bloodPressureSystolicDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 110, max: 130 },
        buckets: 15,
    },
    unit: Units.mmHG,
    attribute: HDKdataAttribute.bloodPressureSystolic,
};

export const _bodyFatPercentageDefaultConfig: INumericalAttributeConfig = {
    legalMax: 99,
    legalMin: 0,
    bins: {
        interval: { min: 6, max: 26 },
        buckets: 15,
    },
    unit: Units.percentage,
    attribute: HDKdataAttribute.bodyFatPercentage,
};

export const _bodyMassDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 2000, max: 140000 },
        buckets: 15,
    },
    unit: Units.gr,
    attribute: HDKdataAttribute.bodyMass,
};

export const _bodyMassIndexDefaultConfig: INumericalAttributeConfig = {
    legalMax: 99,
    legalMin: 0,
    bins: {
        interval: { min: 18, max: 24 },
        buckets: 15,
    },
    unit: Units.unit,
    attribute: HDKdataAttribute.bodyMassIndex,
};

export const _bodyTemperatureDefaultConfig: INumericalAttributeConfig = {
    legalMax: 50,
    legalMin: 0,
    bins: {
        interval: { min: 35, max: 37 },
        buckets: 15,
    },
    unit: Units.celsius,
    attribute: HDKdataAttribute.bodyTemperature,
};

export const _distanceWalkingRunningDefaultConfig: INumericalAttributeConfig = {
    legalMax: numberMaximum,
    legalMin: 0,
    bins: {
        interval: { min: 0, max: 24 },
        buckets: 15,
    },
    unit: Units.milesPerTime,
    attribute: HDKdataAttribute.distanceWalkingRunning,
};

export const _forcedExpiratoryVolumeDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 80, max: 120 },
        buckets: 15,
    },
    unit: Units.percentage,
    attribute: HDKdataAttribute.forcedExpiratoryVolume,
};

export const _forcedVitalCapacityDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 80, max: 120 },
        buckets: 15,
    },
    unit: Units.percentage,
    attribute: HDKdataAttribute.forcedVitalCapacity,
};

export const _heartRateDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 30, max: 140 },
        buckets: 15,
    },
    unit: Units.beatPerMinute,
    attribute: HDKdataAttribute.heartRate,
};

export const _heartRateVariabilitySDNDefaultConfig: INumericalAttributeConfig =
    {
        legalMax: 99,
        legalMin: 0,
        bins: {
            interval: { min: 0, max: 99 },
            buckets: 15,
        },
        unit: Units.ms,
        attribute: HDKdataAttribute.heartRateVariabilitySDN,
    };

export const _heightDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 23, max: 220 },
        buckets: 15,
    },
    unit: Units.cm,
    attribute: HDKdataAttribute.height,
};

export const _leanBodyMassDefaultConfig: INumericalAttributeConfig = {
    legalMax: 99,
    legalMin: 0,
    bins: {
        interval: { min: 60, max: 90 },
        buckets: 15,
    },
    unit: Units.percentage,
    attribute: HDKdataAttribute.leanBodyMass,
};

export const _numberOfTimesFallenDefaultConfig: INumericalAttributeConfig = {
    legalMax: 9999,
    legalMin: 0,
    bins: {
        interval: { min: 0, max: 100 },
        buckets: 15,
    },
    unit: Units.unit,
    attribute: HDKdataAttribute.numberOfTimesFallen,
};

export const _oxygenSaturationDefaultConfig: INumericalAttributeConfig = {
    legalMax: 100,
    legalMin: 0,
    bins: {
        interval: { min: 96, max: 100 },
        buckets: 15,
    },
    unit: Units.percentage,
    attribute: HDKdataAttribute.oxygenSaturation,
};

export const _peakExpiratoryFlowRateDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 320, max: 550 },
        buckets: 15,
    },
    unit: Units.lPerMin,
    attribute: HDKdataAttribute.peakExpiratoryFlowRate,
};

export const _peripheralPerfusionIndexDefaultConfig: INumericalAttributeConfig =
    {
        legalMax: 99,
        legalMin: 0,
        bins: {
            interval: { min: 0.02, max: 20 },
            buckets: 15,
        },
        unit: Units.percentage,
        attribute: HDKdataAttribute.peripheralPerfusionIndex,
    };

export const _respiratoryRateDefaultConfig: INumericalAttributeConfig = {
    legalMax: 99,
    legalMin: 0,
    bins: {
        interval: { min: 10, max: 18 },
        buckets: 15,
    },
    unit: Units.respPerMinute,
    attribute: HDKdataAttribute.respiratoryRate,
};

export const _restingHeartRateDefaultConfig: INumericalAttributeConfig = {
    legalMax: 999,
    legalMin: 0,
    bins: {
        interval: { min: 30, max: 140 },
        buckets: 15,
    },
    unit: Units.respPerMinute,
    attribute: HDKdataAttribute.restingHeartRate,
};

export const _stepCountDefaultConfig: INumericalAttributeConfig = {
    legalMax: numberMaximum,
    legalMin: 0,
    bins: {
        interval: { min: 1000, max: 15000 },
        buckets: 15,
    },
    unit: Units.unit,
    attribute: HDKdataAttribute.stepCount,
};

export const _vo2MaxDefaultConfig: INumericalAttributeConfig = {
    legalMax: 99,
    legalMin: 0,
    bins: {
        interval: { min: 20, max: 50 },
        buckets: 15,
    },
    unit: Units.mlPerKg,
    attribute: HDKdataAttribute.vo2Max,
};

export const _walkingHeartRateAverageDefaultConfig: INumericalAttributeConfig =
    {
        legalMax: 999,
        legalMin: 0,
        bins: {
            interval: { min: 50, max: 140 },
            buckets: 15,
        },
        unit: Units.beatPerMinute,
        attribute: HDKdataAttribute.walkingHeartRateAverage,
    };
