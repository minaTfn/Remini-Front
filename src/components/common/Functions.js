


export function convertToSelect(data,lang = 'fa') {
    const resultArray = [];
    data.forEach((element) => {
        resultArray.push({ label: lang === 'fa' ? element.title_fa : element.title, value: element.id });
    });
    return resultArray;
}
export function convertToSelect1(data,lang = 'fa') {
    const resultArray = [];
    data.forEach((element) => {
        resultArray.push({ label: lang === 'fa' ? element.title_fa : element.title, value: element.id });
    });
    return resultArray;
}