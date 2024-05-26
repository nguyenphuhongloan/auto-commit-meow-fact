import { Octokit } from "@octokit/rest";
import { CONFIG } from "../config/environment";

export class UpdateReadme {
    private octokit: Octokit;

    private owner = CONFIG.GH_USERNAME!;
    private repo = CONFIG.GH_USERNAME!;
    private path = 'README.md';
    private startMarker = "<!--START_SECTION:meow-fact-->";
    private endMarker = "<!--END_SECTION:meow-fact-->";
    constructor() {
        this.octokit = new Octokit({
            auth: CONFIG.GH_API_TOKEN,
        });
    }

    async action(meowFact: string) {
        try {
            const readmeData = await this.octokit.repos.getReadme({
                owner: this.owner,
                repo: this.repo,
            });

            if (!readmeData.data) {
                throw new Error('README.md content not found');
            }

            const content = Buffer.from(readmeData.data.content, 'base64').toString('utf-8');
            const regexMarker = new RegExp(`${this.startMarker}[\\s\\S]*?${this.endMarker}`);
            const updatedContent = content.replace(regexMarker, `${this.startMarker} ${meowFact} ${this.endMarker}`);
            const newContentEncoded = Buffer.from(updatedContent, 'utf-8').toString('base64');
            await this.octokit.repos.createOrUpdateFileContents({
                owner: this.owner,
                repo: this.repo,
                path: this.path,
                message: 'Update README.md',
                content: newContentEncoded,
                sha: readmeData.data.sha,
            });
            console.log("Updated README.md successfully")
        } catch (error) {
            console.error("Failed to write readme", error);
        }
    }
}