# GitHub Pages action pin ledger

Resolved against the official GitHub action release commit pages on 2026-09-17. The release workflow uses exact commit SHAs; a later update needs a new review and ledger entry.

| Action | Release | Exact commit | Official release |
| --- | --- | --- | --- |
| actions/checkout | v6.1.0 | `d23441a48e516b6c34aea4fa41551a30e30af803` | https://github.com/actions/checkout/releases/tag/v6.1.0 |
| actions/setup-node | v4.4.0 | `49933ea5288caeca8642d1e84afbd3f7d6820020` | https://github.com/actions/setup-node/releases/tag/v4.4.0 |
| actions/configure-pages | v5.0.0 | `983d7736d9b0ae728b81ab479565c72886d7745b` | https://github.com/actions/configure-pages/releases/tag/v5.0.0 |
| actions/upload-pages-artifact | v4.0.0 | `7b1f4a764d45c48632c6b24a0339c27f5614fb0b` | https://github.com/actions/upload-pages-artifact/releases/tag/v4.0.0 |
| actions/deploy-pages | v4.0.5 | `d6db90164ac5ed86f2b6aed7e0febac5b3c0c03e` | https://github.com/actions/deploy-pages/releases/tag/v4.0.5 |

These are action source commits, not the website commit. The workflow derives its exact website commit and tree from the protected checked-out revision at run time.
