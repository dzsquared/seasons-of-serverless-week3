import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { KebabRecipe } from './recipe';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    try {
        const lambKilos: number = +(req.query.lamb);
        if (!lambKilos) {
            throw "Not a number";
        }

        let inputRecipe: KebabRecipe = new KebabRecipe(lambKilos);

        let recipeResponse = {
            "Ground Lamb": inputRecipe.lambKilos,
            "Small Onions (minced)": inputRecipe.onions,
            "Garlic Cloves (minced": inputRecipe.garlicCloves,
            "Teaspoons Ground Cumin (divided)":  inputRecipe.cuminTeaspons,
            "Teaspoons Ground Sumac (divided)": inputRecipe.sumacTeaspoons,
            "Teaspoons Salt": inputRecipe.saltTeaspoons,
            "Teaspoons Ground Black Pepper": inputRecipe.blackPepperTeaspoons,
            "Teaspoons Red Pepper Flakes": inputRecipe.redPepperTeaspoons,
            "Length (cm)": inputRecipe.lengthCm,
            "Feeds": inputRecipe.feedsPeople
        }

        let resp = {
            status: 200,
            body: recipeResponse
        };
        context.res = resp;

        inputRecipe.RecordRecipe();
        console.log("End of function");
    } catch (err) {
        let resp = {
            status: 400,
            body: { "Message": err }
        };
        context.res = resp;
    }
};

export default httpTrigger;