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

export class KebabRecipe {
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

    // 2 kilos ground lamb
    // 1 small onion (minced)
    // 4 cloves garlic (minced)
    // 1 1/2 teaspoons ground cumin (divided)
    // 1 1/2 teaspoons ground sumac (divided)
    // 1/2 teaspoon salt
    // 1/4 teaspoon ground black pepper
    // 1/4 teaspoon red pepper flakes

    constructor(lambKilos: number) {
        this.lambKilos = lambKilos;
        this.onions = lambKilos / 2;
        this.garlicCloves = lambKilos * 2;
        this.cuminTeaspons = lambKilos * (3 / 4);
        this.sumacTeaspoons = lambKilos * (3 / 4);
        this.saltTeaspoons = lambKilos / 4;
        this.blackPepperTeaspoons = lambKilos / 8;
        this.redPepperTeaspoons = lambKilos / 8;
        this.lengthCm = Math.round(lambKilos * (2.2/4) * 12);
        this.feedsPeople = Math.round(lambKilos * (2.2/4));
    }

    public async RecordRecipe() {
        await this.saveRecipe();
    }

    // private SQL handler functions
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
    private async saveRecipe() {
        try {
            let pool = await this.connectToSQL(0);
            let resultSet = await pool.request()
                .input('LambKilos', mssql.Decimal(14,2), this.lambKilos)
                .input('Onions', mssql.Decimal(14,2), this.onions)
                .input('GarlicCloves', mssql.Decimal(14,2), this.garlicCloves)
                .input('CuminTeaspoons', mssql.Decimal(14,2), this.cuminTeaspons)
                .input('SumacTeaspoons', mssql.Decimal(14,2), this.sumacTeaspoons)
                .input('SaltTeaspoons', mssql.Decimal(14,2), this.saltTeaspoons)
                .input('BlackPepperTeaspoons', mssql.Decimal(14,2), this.blackPepperTeaspoons)
                .input('RedPepperTeaspoons', mssql.Decimal(14,2), this.redPepperTeaspoons)
                .input('LengthCm', mssql.Int, this.lengthCm)
                .input('FeedsPeople', mssql.Int, this.feedsPeople)
                .execute('saveRecipe');
            console.log("Recipe saved");
        } catch (err) {
            console.error('Failed to save recipe to SQL database.');
            console.error(err);
        }
    }
}
