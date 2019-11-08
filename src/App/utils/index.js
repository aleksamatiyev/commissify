import isNumberLodash from "lodash/isNumber";
import toNumber from "lodash/toNumber";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const isNumber = value => isNumberLodash(toNumber(value));

const getResultBonus = (title, ramping, points) => {
		const rampingVal = parseFloat(ramping)
    let result = 0;
    if (title.indexOf('Inbound') > -1) {
        if(rampingVal === 0.5 || rampingVal === 0.75) {
            result = Math.min(rampingVal * 17, points) * 50
				}
				else if (rampingVal === 0.00) {
					result = Math.max(points, 10) * 50
				}
				else {
					if (title.indexOf('Senior') > -1) {
						result = (points / 17) * 1083
					} else {
						result= (points / 17) * 883
					}
				}
    } else {
				// Outbound SDR
				if(rampingVal === 0.5 || rampingVal === 0.75) {
					result = Math.min(rampingVal * 15, points) * 50
				}
				else if (rampingVal === 0.00) {
					result = Math.max(points, 8) * 50
				} else {
					if (title.indexOf('Senior') > -1) {
						result = (points / 15) * 1083
					} else {
						result = (points / 15) * 883
					}
				}
    }
    return parseInt(result, 10)
}

export { history, isNumber, getResultBonus };




// Filters: title (Inbound SDR, Outbound SDR)
// & (whether it’s a senior role or not)
// & (whether it’s in ramping period<1.0)
// If Inbound SDR
//   If ramping in (0.5 , 0.75):
//        Bonus = min(ramping* 17, demo points) * 50
//  elif ramping == 0.00:
//         Bonus=max(demo point, 10) *50
//   Else:
//        If Senior Inbound SDR:
//            Bonus = (demo points/17) * 1083
//        Else:
//            Bonus= (demo points/17) * 883
// ————————
// Else Outbound SDR
//  If ramping in (0.5 , 0.75):
//        Bonus = min(ramping* 15, demo points) * 50
// elif ramping == 0.00:
//         Bonus=max(demo point, 8)* 50
// Else:
//        If Senior Outbound SDR:
//            Bonus = (demo points/15)* 1083
//        Else:
//            Bonus= (demo points/15) * 883
