
export function convertToSelect(data, lang = 'en') {
    const resultArray = [];
    data.forEach((element) => {
        resultArray.push({label: lang === 'fa' ? element.title_fa : element.title, value: element.id});
    });
    return resultArray;
}