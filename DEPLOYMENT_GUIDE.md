# GitHub and Vercel Deployment

## 1. Extract and open the project

Extract the ZIP file and open the `freightcore-logistics` folder in VS Code.

## 2. Test locally

```bash
pnpm install
pnpm dev
```

If pnpm is unavailable, install it with `npm install -g pnpm`.

## 3. Create a GitHub repository

Create an empty public GitHub repository named `freightcore-logistics`. Do not add a README, license or .gitignore on GitHub because these files already exist locally.

Inside the project terminal:

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/freightcore-logistics.git
git push -u origin main
```

The supplied project includes its Git history, so GitHub will show the staged development commits.

## 4. Deploy with Vercel

1. Sign in to Vercel using GitHub.
2. Select **Add New → Project**.
3. Import the `freightcore-logistics` repository.
4. Keep the detected framework and build settings.
5. Select **Deploy**.

After deployment, open the production URL and check the navigation, WebGL hero and service animation on desktop and mobile.

## 5. Final submission

Reply to the assignment email with:

- Vercel live URL
- Public GitHub repository URL
- The content from `SUBMISSION_WRITEUP.md`
- Optional Lighthouse scores or a screenshot of the report
