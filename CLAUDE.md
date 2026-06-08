# Claude Reference Guide — test-repo

## Project

- **Repository:** `tesserix/test-repo`
- **GitHub Org:** `tesserix`

## Critical Rules

### 1. Git Identity

Always configure before any commit:
```bash
git config user.name "sam123ben"
git config user.email "samyak.rout@gmail.com"
```

### 2. No AI References

NEVER include Claude, Copilot, Anthropic, AI tool, or Co-Authored-By mentions in:
- Commit messages, PR titles or descriptions
- Code comments or changelog entries

### 3. CI Build Procedure

The `tesserix` GitHub org has limited Actions minutes for private repos.
Every CI build requires a public-to-build-to-private cycle:
```bash
gh repo edit tesserix/test-repo --visibility public --accept-visibility-change-consequences
git push origin main
# Wait for CI to complete
gh run list --repo tesserix/test-repo --limit 3
# Once all green:
gh repo edit tesserix/test-repo --visibility private --accept-visibility-change-consequences
```

### 4. No Manual kubectl apply

All K8s changes go through ArgoCD via the `tesserix-k8s` repo.

### 5. SQL Schemas

All database schemas live in `tesserix-k8s/charts/apps/db-schema-bootstrap/schemas/`.
Application repos contain only ORM models — never raw .sql files.

## Development

```bash
# Install dependencies
# (add project-specific install commands here)

# Run locally
# (add project-specific run commands here)

# Lint
# (add project-specific lint commands here)

# Test
# (add project-specific test commands here)
```

## GCP & Infrastructure

- **GCP Project:** `tesseracthub-480811`
- **GCP Region:** `asia-south1`
- **GKE Cluster:** `tesseract-prod-in-gke`
