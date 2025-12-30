// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel

/*
 * Developed for Anunzio International by Anzul Aqeel
 * Contact +971545822608 or +971585515742
 */

const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const token = core.getInput('token');
        const reviewersInput = core.getInput('reviewers');
        const count = parseInt(core.getInput('count')) || 1;

        let reviewers = reviewersInput.split(',').map(r => r.trim()).filter(r => r.length > 0);

        const octokit = github.getOctokit(token);
        const { owner, repo, number } = github.context.issue;

        if (!number) {
            console.log('Not a PR. Skipping.');
            return;
        }

        // Get PR details to check author
        const { data: pullRequest } = await octokit.rest.pulls.get({
            owner,
            repo,
            pull_number: number
        });

        const author = pullRequest.user.login;

        // Filter out author from potential reviewers
        reviewers = reviewers.filter(r => r !== author);

        if (reviewers.length === 0) {
            console.log('No valid reviewers found (list empty or only contains author).');
            return;
        }

        // Shuffle and pick
        const shuffled = reviewers.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, count);

        console.log(`Assigning reviewers: ${selected.join(', ')}`);

        await octokit.rest.pulls.requestReviewers({
            owner,
            repo,
            pull_number: number,
            reviewers: selected
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

// Developed for Anunzio International by Anzul Aqeel. Contact +971545822608 or +971585515742. Linkedin Profile: linkedin.com/in/anzulaqeel
