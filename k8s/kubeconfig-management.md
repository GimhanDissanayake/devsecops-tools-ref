# Instead of storing everything in a single kubeconfig file, maintain one kubeconfig per cluster.

```
# Linux/macOS

~/.kube/
├── config
└── configs/
    ├── aws-dev.yaml
    ├── aws-stage.yaml
    ├── aws-prod.yaml
    ├── gke-prod.yaml
    └── aks-dev.yaml

# Windows

C:\Users\<username>\.kube\
│
├── config
└── configs\
    ├── aws-dev.yaml
    ├── aws-stage.yaml
    ├── aws-prod.yaml
    ├── gke-prod.yaml
    └── aks-dev.yaml
```

## When adding an EKS cluster, save it to a dedicated file.

Example:
```
aws eks update-kubeconfig \
  --name devsecops-aws-dev \
  --region us-east-1 \
  --kubeconfig ~/.kube/configs/aws-dev.yaml
```

* Use Meaningful Context Names
* Avoid names such as: default, cluster1, admin
* Prefer: aws-dev, aws-stage, aws-prod

## Rename contexts when necessary:
```
kubectl config rename-context \
old-context-name \
aws-dev
```

# Automatically Load All Config Files

```
# Linux/macOS
# Add this to .bashrc or .zshrc:

export KUBECONFIG=$(find ~/.kube/configs -name "*.yaml" | paste -sd:)

# Reload:

source ~/.bashrc

or

source ~/.zshrc

# Windows PowerShell
# Create a PowerShell profile function:

$env:KUBECONFIG = (
    Get-ChildItem "$HOME\.kube\configs\*.yaml" |
    Select-Object -ExpandProperty FullName
) -join ";"
```

## Switch Contexts

```
kubectl config use-context aws-dev
```

## Check current context:

```
kubectl config current-context
```

## Install kubectx and kubens
## These tools simplify cluster and namespace switching.

```
kubectx
kubectx aws-prod
```

## Namespace switching:
```
kubens payments
```

