import { DefaultConfigs } from './consts/defaultHistogramConfigs';
import { HDKDataMapper } from './hdkdatamapper';
import { LocalDifferentialPrivacy as ldp } from './localdp';
import { HDKdataAttribute, IAutoBins } from './types/hdkdata';
import { IHistogramIndex, IHistorgramDimensions } from './types/histogram';

const hdk = new HDKDataMapper();
let c = 0;
while (c < 100) {
    // console.log(hdk.getHistogramShape())
    hdk.loadValues(
        (Object.keys(
            HDKdataAttribute,
        ) as HDKdataAttribute[]).map(
            (a) => {
                const cfg = DefaultConfigs.find(atr => atr.attribute === a);
                if (!cfg) {
                    throw new Error(`Could not get configuration for attribute ${a}.`)
                }
                return {
                    attribute: a,
                    value: ldp.getRandomIntegerInRange((cfg.config.bins as IAutoBins).interval.min, (cfg.config.bins as IAutoBins).interval.max,)
                }
            }
        )
    )

    console.log(hdk.getIndex())
    console.log(ldp.preferentialSampling(hdk.getIndex(), hdk.getHistogramShape(), 0.7))
    c++
}
// const analysis: { [key: string]: number } = {};
// const trueIndex: IHistogramIndex = [2, 1, 1];
// const trueIndexFind: string = JSON.stringify(
//     trueIndex.slice(0, trueIndex.length - 1),
// );
// const shape: IHistorgramDimensions = [3, 2];
// const p: number = 0.6;
// let counter: number = 0;
// while (counter < 10000) {
//     const index = ldp.repeatedSampling(trueIndex, shape, p);
//     if (1) {
//         for (let o of index) {
//             const key = JSON.stringify(o);
//             analysis[key] = analysis[key] ? analysis[key] + 1 : 1;
//         }
//     } else {
//         const key = JSON.stringify(index);
//         analysis[key] = analysis[key] ? analysis[key] + 1 : 1;
//     }
//     counter++;
// }
// console.log(analysis);
// console.log('True index: ', analysis[trueIndexFind]);

// const test = ldp.convertFlatIndexToHistogramIndex(139, [3, 3, 2, 2, 2, 2]);
// console.log(test);
