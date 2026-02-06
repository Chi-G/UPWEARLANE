# Git Workflow Guide

This document outlines the branching and deployment strategy for the UpWearLane project. Following these steps ensures code stability and prevents unfinished features from reaching production.

## Branching Structure

- **`main`**: The production branch. Always contains stable, tested code. Push or Merge to this branch triggers the **Production Deployment**.
- **`staging`**: The integration branch. Used to combine features and test everything together before going to production.
- **`feature/*`**: Individual development branches (e.g., `feature/login-fix`, `feature/new-product-page`).

---

## Daily Development Workflow

### 1. Starting a New Feature
Always create a new branch from `staging` to start working on a feature.
```bash
git checkout staging
git pull origin staging
git checkout -b feature/your-feature-name
```

### 2. Saving Your Work
Commit your changes frequently with descriptive messages.
```bash
git add .
git commit -m "feat: add descriptive message"
git push origin feature/your-feature-name
```

### 3. Testing Your Changes (Pull Request to Staging)
When the feature is ready, merge it into the `staging` branch via a Pull Request on GitHub.
- **Target Branch**: `staging`
- **Source Branch**: `feature/your-feature-name`
- **Action**: GitHub will automatically run tests and build assets. If everything passes, merge the PR.

### 4. Deploying to Production (Pull Request to Main)
Once you've verified that everything works correctly in the `staging` environment/branch, merge `staging` into `main`.
- **Target Branch**: `main`
- **Source Branch**: `staging`
- **Action**: After merging, GitHub will run tests and then **automatically deploy** the latest code to your Hostinger server.

---

## Summary Checklist
1. Create `feature/*` from `staging`.
2. Push `feature/*` to GitHub.
3. PR `feature/*` -> `staging` (Testing).
4. PR `staging` -> `main` (Production Deployment).
