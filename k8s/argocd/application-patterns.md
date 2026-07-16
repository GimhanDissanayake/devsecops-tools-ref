# ArgoCD Application Patterns

In ArgoCD, Application Patterns solve a major problem: how to manage hundreds of microservices without creating a messy, manual configuration for every single one.

Below is the complete progression from the absolute basics to advanced multi-cluster automation.

---

## 1. The Baseline: Standard Application

Before looking at patterns, you must understand a standard ArgoCD Application. It connects one Git repository folder to one Kubernetes namespace.

**Concept:** Think of this as a 1-to-1 relationship. One manifest manages one specific application.

### Example Manifest (frontend-app.yaml)

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: frontend
  namespace: argocd # Where ArgoCD is installed
spec:
  project: default
  source:
    repoURL: 'https://github.com'
    targetRevision: HEAD
    path: apps/frontend # Path inside the Git repo
  destination:
    server: 'https://default.svc' # Current cluster
    namespace: web-apps # Target namespace
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

**The Problem:** If you have 50 microservices, you have to manually run `kubectl apply -f` on 50 different Application manifests. This is not scalable.

---

## 2. Intermediate: The "App of Apps" Pattern

The App of Apps pattern uses a single master ArgoCD Application to watch a folder that contains your other ArgoCD Application manifests.

**Concept:** Instead of deploying 50 apps manually, you deploy one master app. This master app watches Git, sees the other 50 app definitions, and tells ArgoCD to deploy them.

```
[ Master Application ]
        │
        ├──► Watches Git folder "bootstrap/"
        │
        ├───► Generates [ Frontend Application ] ──► Deploys Frontend Pods
        ├───► Generates [ Backend Application ]  ──► Deploys Backend Pods
        └───► Generates [ Database Application ] ──► Deploys Database Pods
```

### Example Manifest (master-app.yaml)

You apply this manifest once to your cluster.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: master-bootstrap
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com'
    targetRevision: HEAD
    path: cluster-bootstrap # This folder contains frontend-app.yaml, backend-app.yaml, etc.
  destination:
    server: 'https://default.svc'
    namespace: argocd # Deploys the child apps into ArgoCD
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

**The Problem:** While powerful, you still have to manually write a new Application manifest file every time a developer creates a new microservice.

---

## 3. Advanced: The ApplicationSet Pattern

The ApplicationSet is a built-in controller that uses Generators to programmatically automate the creation of ArgoCD Applications.

**Concept:** Instead of writing 50 manifests, you write one template. You then tell ArgoCD to look at a list of folders, a list of clusters, or a Git file, and automatically copy-paste that template for each one.

### Example: The Git Directory Generator

Imagine your Git repository layout looks like this, where every folder is a different microservice:

```
charts/
  ├── auth-service/
  ├── payment-service/
  └── shipping-service/
```

You can use an ApplicationSet to say: "For every subfolder inside `/charts`, automatically create an ArgoCD application."

### Example Manifest (app-set.yaml)

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: microservices-appset
  namespace: argocd
spec:
  generators:
    - git:
        repoURL: 'https://github.com'
        revision: HEAD
        directories:
          - path: charts/* # Wildcard matches auth-service, payment-service, etc.
  template:
    metadata:
      name: '{{path.basename}}' # Dynamic variable: evaluates to 'auth-service', etc.
    spec:
      project: default
      source:
        repoURL: 'https://github.com'
        targetRevision: HEAD
        path: '{{path}}' # Dynamic variable: evaluates to 'charts/auth-service', etc.
      destination:
        server: 'https://default.svc'
        namespace: '{{path.basename}}' # Deploys each app to its own namespace
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

**Why this is powerful:** If a developer creates a new folder called `charts/inventory-service/` and pushes it to Git, ArgoCD will instantly detect it, generate a new Application, and deploy it. Zero human intervention required.

---

## 4. Expert: The Matrix ApplicationSet (Multi-Cluster)

The Matrix Generator combines two different generators together. For example, you can combine a list of Clusters with a list of Git Directories to deploy every app to every cluster.

**Concept:** If you have 3 microservices and 2 Kubernetes clusters (Staging and Production), a Matrix Generator will automatically multiply them (3 × 2 = 6) and create all 6 unique applications instantly.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: multi-cluster-matrix
  namespace: argocd
spec:
  generators:
    - matrix:
        generators:
          # Generator 1: Get a list of target clusters
          - clusters:
              selector:
                matchLabels:
                  environment: production
          # Generator 2: Get a list of applications from Git
          - git:
              repoURL: 'https://github.com'
              revision: HEAD
              directories:
                - path: charts/*
  template:
    metadata:
      # Named like: production-us-east-auth-service
      name: '{{name}}-{{path.basename}}'
    spec:
      project: default
      source:
        repoURL: 'https://github.com'
        targetRevision: HEAD
        path: '{{path}}'
      destination:
        server: '{{server}}' # Dynamically injects the cluster API URL
        namespace: '{{path.basename}}'
```
