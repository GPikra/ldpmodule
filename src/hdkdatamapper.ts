import { DefaultConfigs } from './consts/defaultHistogramConfigs';
import {
    HDKdataAttribute,
    IAutoBins,
    IHardCodedBins,
    IHistogramConfig,
    IHistogramValue,
    Interval,
    INumericalAttributeConfig,
} from './types/hdkdata';
import { IHistogramIndex, IHistorgramDimensions } from './types/histogram';

/** @summary Class for converting HDK data to histograms for applying ldp */
class HDKDataMapper {
    private readonly _attributes: HDKdataAttribute[] = Object.keys(
        HDKdataAttribute,
    ) as HDKdataAttribute[];

    private _index: IHistogramIndex = [];
    private _histogramShape: IHistorgramDimensions = [];
    private readonly _configs: IHistogramConfig[] = [];
    private _values: IHistogramValue[] = []

    /**
     * @param attributes - HDK Attributes to be included in the handler
     * @param configs - Configuration object for each attribute histogram mapping. If configuration 
     * is IHardCodedBins ensure that passed bins are non overlapping, full range and ordered.
     */
    constructor(attributes?: HDKdataAttribute[], configs?: IHistogramConfig[]) {
        if (attributes && configs) {
            if (this._deepEquals(configs.map(c => c.attribute), attributes)) {
                throw new TypeError(
                    'Provided configurations and attributes are not compatible',
                );
            }
        }
        if (attributes) {
            this._attributes = attributes;
            this._values = attributes.map((a) => ({ attribute: a, value: null }));
        }
        this._initializeConfigs();
        if (configs) {
            const attributeWithConfigs: HDKdataAttribute[] = this._configs.map(cfg => cfg.attribute);
            for (let cfg of configs) {
                const index = attributeWithConfigs.findIndex((a) => a === cfg.attribute);
                if (this._areBinsHardCoded(cfg.config)) {
                    const hardCodedBins: Interval[] = (cfg.config.bins as IHardCodedBins).bins
                    hardCodedBins.forEach((intrval: Interval, idx: number) => {
                        if (idx < hardCodedBins.length - 1 && hardCodedBins[idx].max !== hardCodedBins[idx + 1].min) {
                            throw new RangeError(`Invalid interval array passed for attribute ${cfg.attribute}`)
                        }
                        if (intrval.max < intrval.min || intrval.max > cfg.config.legalMax || intrval.min < cfg.config.legalMin) {
                            throw new RangeError(`Invalid interval array passed for attribute ${cfg.attribute}`)
                        }
                    })
                }
                if (index < 0) {
                    this._configs.push(cfg);
                } else {
                    this._configs = [...this._configs.slice(0, index), cfg, ...this._configs.slice(index + 1)]
                }
            }
        }
        this._computeHistogramShape();
    }

    /**
     * @summary Loads values into the histogram
     * @param values - values to load and convert to histogram
     */
    public loadValues(values: IHistogramValue[]): void {
        this._values = [];
        for (let vObj of values) {
            if (this._attributes.includes(vObj.attribute)) {
                this._values.push(vObj)
                if (!vObj.value) {
                    console.warn(`Attribute ${vObj.attribute} was passed with null value`)
                }
            } else {
                console.warn(`Attribute ${vObj.attribute} was not included in this instance. Skipping...`)
            }
        }
        this._createHistogram();
    }

    /** Accesses histogram shape */
    public getHistogramShape(): IHistorgramDimensions {
        return this._histogramShape;
    }

    /** Get index */
    public getIndex(): IHistogramIndex {
        if (this._values.length === 0) {
            console.warn("Seems that value were not loaded.")
        }
        return this._index;
    }

    /**
     * @summary Creates the histogram i.e. gets the index of the non-zero value.
     * result is accesible by getIndex
     */
    private _createHistogram(): void {
        this._index = [];
        for (let a of this._attributes) {
            const cfg = this._configs.find(c => c.attribute === a);
            const value = this._values.find(v => v.attribute === a);
            if (!value || value.value === undefined || value.value === null) {
                throw new Error(`Histogram could not be computed because value is not defined: Failed at attribute ${a}`)
            }
            if (!cfg || !cfg.config) {
                throw new Error(`Histogram could not be computed because config is not defined: Failed at attribute ${a}`)
            }
            this._index.push(this._mapValueToBucket(value.value, cfg.config))
        }
        this._index.push(1);
        this._assertValidIndexForDimensions();
    }

    /**
     * @summary Maps value to its corresponding bucket based on congif
     * @param v - value to be mapped
     * @param cfg - attribute configuration
     * @returns Bin number
     */
    private _mapValueToBucket(v: number, cfg: INumericalAttributeConfig): number {
        this._assertLegalValue(v, cfg)
        let output: number = -1;
        if (this._areBinsHardCoded(cfg)) {
            (cfg.bins as IHardCodedBins).bins.forEach((intrval, idx) => {
                if (this._isValueInInterval(v, intrval)) {
                    output = idx
                }
            })
        } else {
            const max = (cfg.bins as IAutoBins).interval.max
            const min = (cfg.bins as IAutoBins).interval.min
            const buckets = (cfg.bins as IAutoBins).buckets
            const bucketWidth = (max - min) / buckets
            let value = v
            if (value < min) value = min;
            if (value > max) value = max;
            output = Math.floor((value - min) / bucketWidth)
            // console.debug(
            //     `For attribute ${cfg.attribute}\n`,
            //     `Range is ${(cfg.bins as IAutoBins).interval.min} - ${(cfg.bins as IAutoBins).interval.max}\n`,
            //     `Bucket width is ${bucketWidth}\n`,
            //     `Mapping value ${v}\n`
            // )
        }
        if (output < 0) {
            throw new Error(`Failed to map value to bucket: Could not map ${v} to attribute ${cfg.attribute}`)
        }
        return output;
    }

    /**
     * @summary Return if v in intrval
     * @param v - value to check
     * @param intrval - interval to check if value is in
     */
    private _isValueInInterval(v: number, intrval: Interval): boolean {
        return intrval.max >= v && intrval.min <= v
    }

    /**
     * @summary Asserts the given value is within the legal range
     * @param v - value to check
     * @param cfg - attribute configuration
     */
    private _assertLegalValue(v: number, cfg: INumericalAttributeConfig): void {
        const max = cfg.legalMax;
        const min = cfg.legalMin;
        if (v > max || v < min) {
            throw new RangeError(`Value ${v} is outside the legal range of attribute ${cfg.attribute}`)
        }
    }

    /** 
    * @sumamry This function checks whether the given 'index' is valid for a histogram with shape 'histogramShape'
    and whether 'histogramShape' is valid
    * @param index - index to check for validity
    * @param histogramShape - The shape of the multidimensional histogram.
    */
    private _assertValidIndexForDimensions(
    ): void {
        if (this._index.length !== this._histogramShape.length + 1)
            throw new RangeError('Index is invalid for histogramShape');
        this._histogramShape.forEach((dim: number, idx: number) => {
            if (dim <= 0)
                throw new RangeError(
                    'histogramShape cannot have non-positive numbers',
                );
            if (dim > Math.floor(dim))
                throw new RangeError(
                    'histogramShape can only contain integers',
                );
            if (dim <= this._index[idx] || this._index[idx] < 0)
                throw new RangeError('Index is invalid for histogramShape');
        });
    }

    /**
     * @summary Initializes configurations to default values
     */
    private _initializeConfigs() {
        this._attributes.forEach((a: HDKdataAttribute) => {
            const aConfig = DefaultConfigs.find(cfg => cfg.attribute === a);
            if (aConfig && this._attributes.includes(aConfig.attribute)) {
                this._configs.push({ attribute: a, config: aConfig.config })
            } else {
                if (!aConfig) {
                    console.warn(`No default configuration was found for ${a}. Skipping...`)
                } else {
                    if (this._attributes.includes(aConfig.attribute)) {
                        console.warn(`Attribute ${a} was not included in this instance. Skipping...`)
                    }
                }
            }
        });
    }

    /**
     * @summary Computes the shape of the inferred histogram
     */
    private _computeHistogramShape(): void {
        this._histogramShape = [];
        for (let a of this._attributes) {
            const cfg = this._configs.find(c => c.attribute === a);
            if (!cfg) {
                throw new Error(`Could not compute histogram shape because config is not defined: Failed at attribute ${a}`)
            }
            if (this._areBinsHardCoded(cfg.config)) {
                this._histogramShape.push(
                    (cfg.config.bins as IHardCodedBins).bins.length
                )
            } else {
                this._histogramShape.push(
                    (cfg.config.bins as IAutoBins).buckets
                )
            }
        }
    }

    /**
     * @summary Check if bins are hardcoded
     * @param cfg - configuration to test
     * @returns if cfg has hardcoded bins
     */
    private _areBinsHardCoded(cfg: INumericalAttributeConfig): boolean {
        return !!(cfg.bins as IHardCodedBins).bins
    }

    /** 
     * @summary Compare two arrays for equality
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
}

export { HDKDataMapper };
