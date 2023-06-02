import { Parser } from '@json2csv/plainjs';

const transformToCsv = (data) => {
    try {
        const opts = {};
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        console.log(csv);
        return csv
    } catch (err) {
        console.error(err);
    }
}

export { transformToCsv };
