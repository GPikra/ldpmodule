import {
    HDKdataAttribute,
    IHistogramConfig,
    IHistogramValue,
    INumericalAttributeConfig,
} from './types/hdkdata';

/** Class for converting HDK data to histograms for applying ldp */
class HDKDataMapper {
    private readonly _attributes: HDKdataAttribute[] = Object.keys(
        HDKdataAttribute,
    ) as HDKdataAttribute[];

    private _configs: IHistogramConfig = {};
    private _values: IHistogramValue = this._initializeEmptyObject(
        Object.keys(HDKdataAttribute) as HDKdataAttribute[],
    );

    /**
     * @param attributes - HDK Attributes to be included in the handler
     * @param configs - Configuration object for each attribute histogram mapping
     */
    constructor(attributes?: HDKdataAttribute[], configs?: IHistogramConfig) {
        if (attributes && configs) {
            if (this._deepEquals(Object.keys(configs), attributes)) {
                throw new TypeError(
                    'Provided configurations and attributes are not compatible',
                );
            }
        }
        if (attributes) {
            this._attributes = attributes;
            this._values = this._initializeEmptyObject(attributes);
        }
        if (configs) {
            this._configs = configs;
        } else {
            this._initializeConfigs();
        }
    }

    /**
     * Initializes configurations to default values
     */
    private _initializeConfigs() {
        this._attributes.forEach((a: HDKdataAttribute) => {
            this._configs[a] = DefaultConfigs[a];
        });
    }

    /** Compare two arrays for equality
     * @param arr1 - First
     * @param arr2 - Second
     * @returs - if arr1 === arr2
     */
    private _deepEquals<T>(arr1: Array<T>, arr2: Array<T>): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        } else {
            return JSON.stringify(arr1) === JSON.stringify(arr2);
        }
    }

    /** Initializes an object with HDKdataAttribute keys */
    private _initializeEmptyObject(keys: HDKdataAttribute[]): IHistogramValue {
        const obj: IHistogramValue = {};
        keys.forEach((k: HDKdataAttribute) => (obj[k] = null));
        return obj;
    }
}
