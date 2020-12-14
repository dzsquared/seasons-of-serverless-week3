import * as mssql from 'mssql';

const sqlConfig = {
    user: `${process.env.AZURESQL_USER}`,
    password: `${process.env.AZURESQL_PASSWORD}`,
    server: `${process.env.AZURESQL}`,
    database: `${process.env.AZURESQL_DB}`,
    options: {
        enableArithAbort: true
    }
}
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export class KebabRecord {
    public lambKilos: number;
    public onions: number;
    public garlicCloves: number;
    public cuminTeaspons: number;
    public sumacTeaspoons: number;
    public saltTeaspoons: number;
    public blackPepperTeaspoons: number;
    public redPepperTeaspoons: number;
    public lengthCm: number;
    public feedsPeople: number;
    
    public async getRecord() {
        try {
            let pool = await this.connectToSQL(0);
            let resultSet = await pool.request().execute('getRecord');
            let outputRecord = resultSet.recordset[0];

            this.lambKilos = outputRecord.LambKilos;
            this.onions = outputRecord.Onions;
            this.garlicCloves = outputRecord.GarlicCloves;
            this.cuminTeaspons = outputRecord.CuminTeaspoons;
            this.sumacTeaspoons = outputRecord.SumacTeaspoons;
            this.saltTeaspoons = outputRecord.SaltTeaspoons;
            this.blackPepperTeaspoons = outputRecord.BlackPepperTeaspoons;
            this.redPepperTeaspoons = outputRecord.RedPepperTeaspoons;
            this.lengthCm = outputRecord.LengthCm;
            this.feedsPeople = outputRecord.FeedsPeople;
        } catch (err) {
            console.error('Failed to retrieve record from SQL database.');
            console.error(err);
        }
    }


    // private SQL handler function
    private async connectToSQL(retryCount) {
        if (retryCount < 10) {
            try {
                let pool = await mssql.connect(sqlConfig);
                return pool;
            } catch (err) {
                console.log('retrying sql connection');
                console.log(retryCount);
                retryCount = retryCount + 1;
                console.error(err);
                await sleep(10000);
                return await this.connectToSQL(retryCount);
            }
        }
    }

}
