import { LocalDifferentialPrivacy as ldp } from './localdp';
import { IHistogramIndex, IHistorgramDimensions } from './types/histogram';

const analysis: { [key: string]: number } = {};
const trueIndex: IHistogramIndex = [2, 1, 1];
const trueIndexFind: string = JSON.stringify(
    trueIndex.slice(0, trueIndex.length - 1),
);
const shape: IHistorgramDimensions = [3, 2];
const p: number = 0.6;
let counter: number = 0;
while (counter < 10000) {
    const index = ldp.repeatedSampling(trueIndex, shape, p);
    if (1) {
        for (let o of index) {
            const key = JSON.stringify(o);
            analysis[key] = analysis[key] ? analysis[key] + 1 : 1;
        }
    } else {
        const key = JSON.stringify(index);
        analysis[key] = analysis[key] ? analysis[key] + 1 : 1;
    }
    counter++;
}
console.log(analysis);
console.log('True index: ', analysis[trueIndexFind]);

// const test = ldp.convertFlatIndexToHistogramIndex(139, [3, 3, 2, 2, 2, 2]);
// console.log(test);
