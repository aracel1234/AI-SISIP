# Push to GitHub

Target repository: `https://github.com/aracel1234/AI-SISIP`

Before the first public push:

1. Rotate all real credentials that ever appeared in workflow exports or `.env` files.
2. Run `python3 scripts/validate_repo.py` and review the output.
3. Confirm `git status` contains no `.env`, database data, sessions, media, or logs.
4. Review `DISCLAIMER.md`, `SECURITY.md`, and `docs/known-differences.md`.

If the GitHub repository is empty:

```bash
git init
git branch -M main
git remote add origin https://github.com/aracel1234/AI-SISIP.git
git add .
git status
git commit -m "Publish sanitized AI SISIP reference implementation"
git push -u origin main
```

If the remote already contains commits, clone it first and merge/copy this repository into the clone rather than force-pushing over existing history.

No `LICENSE` file is intentionally included at this stage.
