const button = document.getElementById('send');
const file = document.getElementById('file');

let data = "";
let name = "";
const rows = "companyName, description German, description English, Address, CountryCode, url, email, phone, phoneIsBlacklisted, fax, linkedin, xing, foundedYear, registerId, registerLocation, vatId, legalForm, orientation, keywords, payment, technologies Shops, technologies Web, naceCodes, wzCodes, ebIndustries, employeesNum, finRevenue, finEarnings, finBalanceSheetTotal, finCurrency, finRevenueCurrency, finRevenueSource, finReportingYear \n";

(function(){
    function onChange(event) {
        const reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(event.target.files[0]);

        const files = event.target.files;
        name = files[0].name.replace('.json', '');
        console.log(name);
    }

    function onReaderLoad(event){
        const obj = JSON.parse(event.target.result);
        data = JSON.stringify(obj.companies.results);
        data = JSON.parse(data);
    }
    file.addEventListener('change', onChange);

}());

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

function escapeHtml (string) {
    return '"' + String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    }) + '"';
}

button.addEventListener('click', () => {
    let csvContent =
        rows + data.map(e => {
            let text = '';
            text += escapeHtml(e.companyName) + ',';
            if (e.descriptionLang === "de") {
                text += escapeHtml(e.description) + ',';
                if (e.description_en) {
                    text += escapeHtml(e.description_en) + ',';
                }
                else {
                    text += ',';
                }
            }
            else if (e.descriptionLang === "en") {
                text += ',';
                text += escapeHtml(e.description) + ',';
            }
            else {
                text += ',';
                text += ',';
            }
            text += '"' + e.street + '\n' + e.zip + '\n' + e.location + '\n' + e.region + '"' + ',';
            if (e.countryCode) {
                text += e.countryCode + ',';
            }
            else {
                text += ',';
            }
            if (e.url) {
                text += e.url + ',';
            }
            else {
                text += ',';
            }
            if (e.email) {
                text += e.email + ',';
            }
            else {
                text += ',';
            }
            if (e.phone) {
                text += e.phone + ',';
            }
            else {
                text += ',';
            }
            if (e.phoneIsBlacklisted) {
                text += 'ИСТИНА,';
            }
            else {
                text += 'ЛОЖЬ,';
            }
            if (e.fax) {
                text += e.fax + ',';
            }
            else {
                text += ',';
            }
            e.socialAccounts.linkedin.map(social => {
                text += social.link;
            });
            text += ',';
            e.socialAccounts.xing.map(x => {
                text += x.link + x.name;
            });
            text += ',';
            if (e.foundedYear) {
                text += e.foundedYear + ',';
            }
            else {
                text += ',';
            }
            if (e.registerId) {
                text += e.registerId + ',';
            }
            else {
                text += ',';
            }
            if (e.registerLocation) {
                text += e.registerLocation + ',';
            }
            else {
                text += ',';
            }
            if (e.vatId) {
                text += e.vatId + ',';
            }
            else {
                text += ',';
            }
            if (e.legalForm) {
                text += e.legalForm + ',';
            }
            else {
                text += ',';
            }
            if (e.orientation) {
                text += e.orientation + ',';
            }
            else {
                text += ',';
            }
            text += '"' + e.keywords.join(' ') + e.testKeywords.join(' ') + '"' + ',';
            if (e.technologies.payment || e.technologies.payment.length === 0) {
                text += ',';
            }
            else {
                   e.technologies.payment.map(tech => {
                       text += Object.values(tech).join(' ');
                   })
                text += ',';
            }
            if (e.technologies.shops.length === 0) {
                text += ',';
            }
            else {
                e.technologies.shops.map(shop => {
                    text += Object.values(shop).join(' ');
                })
                text += ',';
            }

            if (e.technologies.web.length === 0) {
                text += ',';
            }
            else {
                text += '"';
                e.technologies.web.map(web => {
                    text += web + '\n';
                })
                text += '"';
                text += ',';
            }
            text += '"';
            if (e.naceCodes.codes) {
                e.naceCodes.codes.map(code => {
                    text += code + '\n';
                })
            }
            else {
                text += ' ';
            }
            if (e.naceCodes.classes) {
                e.naceCodes.classes.map(code => {
                    text += code + '\n';
                })
            }
            else {
                text += ' ';
            }
            if (e.naceCodes.divisions) {
                e.naceCodes.divisions.map(code => {
                    text += code + '\n';
                })
            }
            else {
                text += ' ';
            }
            text += '"';
            text += ',';

            text += '"';
            if (e.wzCodes.codes) {
                e.wzCodes.codes.map(code => {
                    text += code + '\n';
                });
            }
            else {
                text += ',';
            }
            if (e.wzCodes.classes) {
                e.wzCodes.classes.map(code => {
                    text += code + '\n';
                });
            }
            else {
                text += ',';
            }
            if (e.wzCodes.divisions) {
                e.wzCodes.divisions.map(code => {
                    text += code + '\n';
                });
            }
            else {
                text += ',';
            }
            text += '"';
            text += ',';

            text += e.ebIndustries.mainCategories.join(' ');
            text += e.ebIndustries.subCategories.join(' ');
            text += ',';

            text += e.employeesNum + ',';
            if (e.finRevenue) {
                text += e.finRevenue + ',';
            }
            else {
                text += ',';
            }
            if (e.finEarnings) {
                text += e.finEarnings + ',';
            }
            else {
                text += ',';
            }
            if (e.finBalanceSheetTotal) {
                text += e.finBalanceSheetTotal + ',';
            }
            else {
                text += ',';
            }
            if (e.finCurrency) {
                text += e.finCurrency + ',';
            }
            else {
                text += ',';
            }
            if (e.finRevenueCurrency) {
                text += e.finRevenueCurrency + ',';
            }
            else {
                text += ',';
            }
            if (e.finRevenueSource) {
                text += e.finRevenueSource + ',';
            }
            else {
                text += ',';
            }
            if (e.finReportingYear) {
                text += e.finReportingYear + ',';
            }
            else {
                text += ',';
            }
            return text;
        }).join("\n");

    const csvBlob = new Blob([csvContent], {type: "data:text/csv;charset=utf-8"});
    const link = document.createElement("a");
    const url = window.URL.createObjectURL(csvBlob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${name}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

})
button.removeEventListener('click', () => console.log('some'))