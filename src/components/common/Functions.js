import _ from "lodash";


export function convertToSelect(data,lang = 'en') {
    const resultArray = [];
    data.forEach((element) => {
        resultArray.push({ label: lang === 'fa' ? element.title_fa : element.title, value: element.id });
    });
    return resultArray;
}
export function convertObjectToUrlParams(objectArray) {
    const array = [];
    const res = _.reduce(objectArray, function(result, value, key) {
        array.push(`${key}=${value}`);
        return array;
    }, {});

    const params = _.join(res,'&');
    return `?${params}`;
}