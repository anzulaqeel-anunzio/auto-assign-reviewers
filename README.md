# Auto Assign Reviewers

Tired of manually assigning reviewers? This GitHub Action automatically assigns reviewers to Pull Requests based on a round-robin system or a random choice from a predefined list.

## Features

-   **Round Robin / Random**: Distribute code reviews fairly.
-   **Team Support**: Assign entire teams if needed.
-   **Ignore Authors**: Ensures the PR author is not assigned as a reviewer.

## Usage

Create a workflow file (e.g., `.github/workflows/assign-reviewers.yml`):

```yaml
name: Assign Reviewers
on: [pull_request]

jobs:
  assign:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Auto Assign Reviewers
        uses: ./
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          reviewers: 'alice,bob,charlie'
          count: '1'
          strategy: 'random' # or 'round-robin' if using state (not implemented in simple version)
```

## Inputs

| Input | Description | Default |
| :--- | :--- | :--- |
| `token` | GITHUB_TOKEN | `${{ github.token }}` |
| `reviewers` | Comma-separate list of usernames | `` |
| `count` | Number of reviewers to assign | `1` |

## Contact

Developed for Anunzio International by Anzul Aqeel.
Contact +971545822608 or +971585515742.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---
### 🔗 Part of the "Ultimate Utility Toolkit"
This tool is part of the **[Anunzio International Utility Toolkit](https://github.com/anzulaqeel-anunzio/ultimate-utility-toolkit)**.
Check out the full collection of **180+ developer tools, scripts, and templates** in the master repository.

Developed for Anunzio International by Anzul Aqeel.
