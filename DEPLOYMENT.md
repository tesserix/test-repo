# Petstore Deployment Guide

This document describes the infrastructure setup for the Tesserix Petstore application.

## Architecture

The petstore is a Next.js application that provides:
- Customer-facing storefront
- Admin dashboard
- Product and category management
- Shopping cart and checkout functionality
- RESTful API endpoints

## Local Development

### Prerequisites
- Node.js 20+
- Docker and Docker Compose
- Make

### Quick Start

```bash
# Install dependencies
npm install

# Run development server
make dev

# Or run with Docker
make build-local
```

### Docker Development

```bash
# Development mode with hot reloading
docker-compose up

# Production mode
docker-compose --profile prod up
```

## Production Deployment

### Tesserix Platform GitOps

This application follows the Tesserix GitOps deployment pattern using ArgoCD.

#### Required Setup in tesserix-k8s Repository

1. **Helm Chart Structure:**
```
tesserix-k8s/charts/apps/petstore/
├── Chart.yaml
├── values.yaml
├── values-prod.yaml
└── templates/
    ├── deployment.yaml
    ├── service.yaml
    ├── configmap.yaml
    ├── externalsecret.yaml
    ├── serviceaccount.yaml
    └── virtualservice.yaml
```

2. **ArgoCD Application Manifest:**
```
tesserix-k8s/argocd/prod/apps/petstore/petstore.yaml
```

#### Key Infrastructure Components

- **Multi-stage Docker build** with distroless runtime
- **Kubernetes deployment** with 3 replicas, rolling updates
- **Resource limits:** 512Mi memory, 500m CPU
- **Health checks:** Liveness and readiness probes
- **Security:** Non-root user, read-only filesystem
- **Workload Identity** for GCP service account binding
- **External Secrets** for sensitive configuration
- **Istio VirtualService** for HTTP routing

#### Environment Configuration

| Environment Variable | Source | Description |
|---------------------|--------|-------------|
| `NODE_ENV` | ConfigMap | Runtime environment |
| `NEXT_PUBLIC_API_URL` | ConfigMap | Public API URL |
| `DATABASE_URL` | Secret | Database connection string |
| `JWT_SECRET` | Secret | JWT signing secret |
| `STRIPE_SECRET_KEY` | Secret | Payment processing key |

### Build and Deploy Process

```bash
# Build and push container image
make build
make push

# Deploy to staging
make deploy-staging

# Deploy to production  
make deploy-prod
```

**Note:** Actual deployment is handled by ArgoCD GitOps. The make targets above push the container image and provide instructions for updating the GitOps repository.

### Required Infrastructure

#### GCP Service Account
```bash
# Create service account for Workload Identity
gcloud iam service-accounts create petstore \
    --display-name="Petstore Service Account"

# Bind to Kubernetes service account
gcloud iam service-accounts add-iam-policy-binding \
    petstore@tesserix-platform.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:tesserix-platform.svc.id.goog[petstore/petstore]"
```

#### Secrets in GCP Secret Manager
```bash
# Create secrets (example)
gcloud secrets create petstore-database-url --data-file=db-url.txt
gcloud secrets create petstore-jwt-secret --data-file=jwt-secret.txt
gcloud secrets create petstore-stripe-secret --data-file=stripe-secret.txt
```

#### DNS and SSL
- DNS: `petstore.tesserix.dev` → Istio Gateway
- SSL: Automatic via cert-manager with Let's Encrypt

## Container Registry

Images are pushed to Google Container Registry:
- `gcr.io/tesserix-platform/petstore:latest`
- `gcr.io/tesserix-platform/petstore:<git-sha>`

## Monitoring and Observability

The application includes:
- Health check endpoints at `/api/health` and `/api/ready`
- Structured logging to stdout
- Prometheus metrics (if configured)
- OpenTelemetry tracing (if configured)

## Reference Kubernetes Manifests

The `k8s/` directory contains reference manifests for local testing. **Do not apply these directly to production clusters.** Use the Helm charts in the tesserix-k8s repository instead.

## Troubleshooting

### Common Issues

1. **Container fails to start:**
   - Check resource limits in deployment.yaml
   - Verify Next.js standalone build is working
   - Check security context and file permissions

2. **Health checks failing:**
   - Ensure `/api/health` and `/api/ready` endpoints exist
   - Check probe configuration timing
   - Verify port mapping (3000)

3. **Configuration issues:**
   - Check ConfigMap values
   - Verify External Secrets are syncing
   - Check Workload Identity binding

### Logs and Debugging

```bash
# View application logs
kubectl logs -l app.kubernetes.io/name=petstore -n petstore -f

# Check deployment status
kubectl get deployment petstore -n petstore

# Check pod status
kubectl get pods -l app.kubernetes.io/name=petstore -n petstore

# Debug pod
kubectl describe pod <pod-name> -n petstore
```

## Security Considerations

- Containers run as non-root user (65534)
- Read-only root filesystem with writable /tmp
- No privilege escalation allowed
- All capabilities dropped
- External secrets for sensitive data
- Network policies (if configured)
- Workload Identity for GCP authentication