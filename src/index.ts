import { MeowFactClient } from "./lib/MeowFactClient";
import { UpdateReadme } from "./lib/UpdateReadme";

const meowFact = new MeowFactClient().getCatFact().then(meowFact => {
    if (!meowFact)
        return;
    const updateReadMe = new UpdateReadme().action(meowFact);
});

