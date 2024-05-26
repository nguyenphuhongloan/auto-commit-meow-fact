import axios from "axios";

export class MeowFactClient {
    private static url = "https://meowfacts.herokuapp.com/";

    public async getCatFact(): Promise<string | undefined> {
        try {
            return (await axios.get(MeowFactClient.url)).data['data'][0];
        } catch (error) {
            console.error("Failed to get meow fact", error);
        }
    }
}
