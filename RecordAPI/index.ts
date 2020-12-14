import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { KebabRecord } from './record';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let currentRecord: KebabRecord = new KebabRecord();
    await currentRecord.getRecord();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: currentRecord
    };

};

export default httpTrigger;