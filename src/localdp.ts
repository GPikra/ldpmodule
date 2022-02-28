import { IHistogramIndex, IHistorgramDimensions } from './types/histogram';

/**
 * @summary Class for applying ldp
 */
class LocalDifferentialPrivacy {
    /** 
     * @summary This function implements the preferential sampling algorithm for differential privacy.
     * It returns 'index' with probability 'ps' and another index uniformly at random with
     * probability 1 - ps.
     * @param index - The only non-zero value in the multidimensional histogram.
     * @param histogramShape - The shape of the multidimensional histogram.
     * @param ps - The probability of returning the true index. Controls the privacy leakage.
     * @returns - Index to return
     */
    public static preferentialSampling(
        index: IHistogramIndex,
        histogramShape: IHistorgramDimensions,
        ps: number,
    ): IHistogramIndex {
        this._assertValidProbability(ps);
        this._assertValidIndexForDimensions(index, histogramShape);
        const willReportTrue: boolean = Math.random() <= ps;
        const trueIndexWithoutValue: IHistogramIndex = index.slice(
            0,
            index.length - 1,
        );
        if (willReportTrue) {
            return trueIndexWithoutValue;
        } else {
            return this._getUniformRandomIndex(histogramShape, [
                trueIndexWithoutValue,
            ]);
        }
    }

    /** 
     * @summary This function implements the repeated sampling algorithm for differential privacy.
     * It flips 'index' with probability 'ps' and every other position with probability 1 - ps.
     * Returns non-zero indices after flipping. 'index' is the only non-zero value in the
     * multidimensional histogram
     * @Caution This will not work for large histograms!!!
     * @param index - The only non-zero value in the multidimensional histogram.
     * @param histogramShape - The shape of the multidimensional histogram.
     * @param ps - The probability of not flipping the true index. Controls the privacy leakage.
     * @returns - List of indices to return
     */
    public static repeatedSampling(
        index: IHistogramIndex,
        histogramShape: IHistorgramDimensions,
        ps: number,
    ): IHistogramIndex[] {
        this._assertValidProbability(ps);
        this._assertValidIndexForDimensions(index, histogramShape);
        const histogramSize: number = histogramShape.reduce(
            (aggr: number, _new: number) => aggr * _new,
            1,
        );
        const trueIndexWithoutValue: IHistogramIndex = index.slice(
            0,
            index.length - 1,
        );
        const output: IHistogramIndex[] = [];
        [...Array(histogramSize).keys()].forEach((i: number) => {
            const candidate = this._convertFlatIndexToHistogramIndex(
                i,
                histogramShape,
            );
            if (this._deepEquals(candidate, trueIndexWithoutValue)) {
                if (Math.random() <= ps) output.push(candidate);
            } else {
                if (Math.random() > ps) {
                    output.push(candidate);
                }
            }
        });
        return output;
    }

    /**
     * @summary This function implements the repeated sampling algorithm for differential privacy.
     * It flips 'index' with probability 'ps' and every other position with probability 1 - ps.
     * Returns non-zero indices after flipping. 'index' is the only non-zero value in the
     * multidimensional histogram
     * @param flatIndex - An integer for a flattened version of the histogram.
     * @param histogramShape - The shape of the multidimensional histogram.
     */
    private static _convertFlatIndexToHistogramIndex(
        flatIndex: number,
        histogramShape: IHistorgramDimensions,
    ): IHistogramIndex {
        let histogramSize: number = histogramShape.reduce(
            (aggr: number, _new: number) => aggr * _new,
            1,
        );
        const output: IHistogramIndex = [];
        if (flatIndex >= histogramSize) {
            throw new RangeError('Flat index is out of range');
        }
        let i: number = 0;
        let currentFlatIndex: number = flatIndex;
        while (i < histogramShape.length) {
            histogramSize /= histogramShape[i];
            output.push(Math.floor(currentFlatIndex / histogramSize));
            currentFlatIndex = currentFlatIndex % histogramSize;
            i++;
        }
        return output;
    }

    /** 
     * @summary This function gets an index given the dimensions of the histogram uniformly at random
     * @param histogramShape - The shape of the multidimensional histogram.
     * @param exclude - Array of indices to exclude from sampling
     */
    private static _getUniformRandomIndex(
        histogramShape: IHistorgramDimensions,
        exclude: IHistogramIndex[] = [],
    ): IHistogramIndex {
        const output: IHistogramIndex = [];
        if (
            exclude.length >=
            histogramShape.reduce(
                (aggr: number, _new: number) => aggr * _new,
                1,
            )
        ) {
            throw new RangeError('Too many indices are excluded');
        }
        histogramShape.forEach((dim: number, _idx: number) => {
            output.push(this.getRandomIntegerInRange(0, dim));
        });
        if (this._deepIncludes(exclude, output)) {
            return this._getUniformRandomIndex(histogramShape, exclude);
        }
        return output;
    }
    /**
     * @summary This function finds whether item is included in array
     * @param arr - Array to search item in
     * @param item - Item to search in array
     * @returns - if item is included in array
     */
    private static _deepIncludes<T extends IHistogramIndex>(
        arr: Array<T>,
        item: T,
    ): boolean {
        for (let i of arr) {
            if (this._deepEquals(i, item)) {
                return true;
            }
        }
        return false;
    }

    /** 
     * @summary Compare two arrays for equality
     * @param arr1 - First
     * @param arr2 - Second
     * @returs - if arr1 === arr2
     */
    private static _deepEquals<T>(arr1: Array<T>, arr2: Array<T>): boolean {
        if (arr1.length !== arr2.length) {
            return false;
        } else {
            return JSON.stringify(arr1) === JSON.stringify(arr2);
        }
    }

    /** 
     * @summary Return a random integer in the given range
     * @param min - Minimum value of return
     * @param max - Maximum value of return
     */
    public static getRandomIntegerInRange(min: number, max: number): number {
        if (max <= min) {
            throw new RangeError("'max' parameter must be greater than 'min'.");
        }
        if (max === undefined || min === undefined || max === null || min === null) {
            throw new RangeError("'max' and 'min' cannot be null or undefined")
        }
        return Math.floor(Math.random() * (max - min) + min);
    }

    /** 
     * @summary This function checks whether the given number is a valid probability
     * @param p - Value to check
     */
    private static _assertValidProbability(p: number): void {
        if (p > 1 || p < 0) {
            throw new RangeError('The provided number is not a probability.');
        }
    }

    /** 
    * @summary This function checks whether the given 'index' is valid for a histogram with shape 'histogramShape'
    and whether 'histogramShape' is valid
    * @param index - index to check for validity
    * @param histogramShape - The shape of the multidimensional histogram.
    */
    private static _assertValidIndexForDimensions(
        index: IHistogramIndex,
        histogramShape: IHistorgramDimensions,
    ): void {
        if (index.length !== histogramShape.length + 1)
            throw new RangeError('Index is invalid for histogramShape');
        histogramShape.forEach((dim: number, idx: number) => {
            if (dim <= 0)
                throw new RangeError(
                    'histogramShape cannot have non-positive numbers',
                );
            if (dim > Math.floor(dim))
                throw new RangeError(
                    'histogramShape can only contain integers',
                );
            if (dim <= index[idx] || index[idx] < 0)
                throw new RangeError('Index is invalid for histogramShape');
        });
    }
}

export { LocalDifferentialPrivacy };
