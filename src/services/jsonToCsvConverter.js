import {Parser} from '@json2csv/plainjs';

const transformToCsv = (data) => {
    try {
        const parser = new Parser({});
        return parser.parse(data)
    } catch (err) {
        console.error(err);
    }
}

export { transformToCsv };
