# Tesserix Petstore Makefile
# Build and deployment targets for Next.js application

PROJECT_ID = tesserix-platform
SERVICE_NAME = petstore
IMAGE_TAG = $(shell git rev-parse --short HEAD)
IMAGE_NAME = gcr.io/$(PROJECT_ID)/$(SERVICE_NAME):$(IMAGE_TAG)
IMAGE_LATEST = gcr.io/$(PROJECT_ID)/$(SERVICE_NAME):latest

.PHONY: help
help: ## Display this help message
	@echo "Available targets:"
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: build
build: ## Build Docker image
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) -t $(IMAGE_LATEST) .

.PHONY: build-local
build-local: ## Build and run locally with docker-compose
	@echo "Building and running locally..."
	docker-compose up --build

.PHONY: build-prod
build-prod: ## Build production image with docker-compose
	@echo "Building production image..."
	docker-compose --profile prod up --build petstore-prod

.PHONY: push
push: build ## Push Docker image to registry
	@echo "Pushing Docker image to registry..."
	docker push $(IMAGE_NAME)
	docker push $(IMAGE_LATEST)

.PHONY: deploy-staging
deploy-staging: push ## Deploy to staging environment
	@echo "Deploying to staging..."
	@echo "ArgoCD will handle the deployment via GitOps"
	@echo "Update tesserix-k8s/argocd/staging/apps/petstore/petstore.yaml"

.PHONY: deploy-prod
deploy-prod: push ## Deploy to production environment
	@echo "Deploying to production..."
	@echo "ArgoCD will handle the deployment via GitOps"
	@echo "Update tesserix-k8s/argocd/prod/apps/petstore/petstore.yaml"

.PHONY: test
test: ## Run tests
	npm test

.PHONY: lint
lint: ## Run linter
	npm run lint

.PHONY: dev
dev: ## Start development server
	npm run dev

.PHONY: clean
clean: ## Clean Docker images
	docker rmi $(IMAGE_NAME) $(IMAGE_LATEST) || true
	docker-compose down --volumes --remove-orphans

.PHONY: logs
logs: ## View application logs
	docker-compose logs -f petstore