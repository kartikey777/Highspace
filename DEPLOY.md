# Deploy to GitHub Pages

This app is set up to run on **GitHub Pages** as a project site. All features (admin, cart, localStorage, image uploads) work the same when deployed.

---

## 1. Push the project to GitHub

If you haven’t already, create a repo on GitHub and push your code.

**Option A – New repo (no existing git):**

```bash
cd furniture-showcase
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

**Option B – Repo already exists:**

```bash
cd furniture-showcase
git add .
git commit -m "Add GitHub Pages deployment"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name (e.g. `myuser/furniture-showcase`).

---

## 2. Turn on GitHub Pages

1. Open your repo on GitHub.
2. Go to **Settings** → **Pages**.
3. Under **Build and deployment**:
   - **Source:** select **GitHub Actions**.
4. Save (no need to pick a branch).

---

## 3. Deploy

- Every **push to `main`** runs the workflow and deploys the latest build.
- Or run it manually: **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

After the workflow finishes, the site is at:

**`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`**

Example: `https://jane.github.io/furniture-showcase/`

---

## 4. Will everything work?

Yes. The project is configured so that on GitHub Pages:

- **Routes** (e.g. `/admin`, `/cart`, `/living-room`) work when you open or refresh the URL, thanks to the `404.html` copy of the app.
- **Assets** (JS/CSS) load correctly using the repo name as the base path (`VITE_BASE_PATH` in the workflow).
- **Admin** (click the “Highspace Furniture” logo), **cart**, **localStorage**, and **uploaded images** (stored as data URLs in localStorage) all behave the same as in local dev.

The only limit is **localStorage size** (typically 5–10 MB per origin). Many uploaded images can eventually hit that; for heavy use you’d later add a backend and real file storage.

---

## 5. If your repo name is different

The workflow uses **`github.event.repository.name`** as the base path, so the repo name in GitHub is used automatically. You don’t need to change anything in the repo when the name is different.

If you ever need a **custom base path** (e.g. a different subpath), set the `VITE_BASE_PATH` env in `.github/workflows/deploy.yml` (e.g. `VITE_BASE_PATH: '/my-site/'`) and keep it in sync with how you’re hosting the site.
