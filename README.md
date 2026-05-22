# DevOps Internship Assignment Submission

## Architecture Diagram

![Architecture Diagram](docs/architecture.png)

---

## Project Overview

This project implements a secure multi-tier AWS infrastructure using Terraform following DevOps, cloud networking, and infrastructure automation best practices.

The deployment architecture consists of:

- Public API Server (EC2)
- Private Inference Worker (EC2)
- AWS VPC networking
- Public and Private Subnets
- Internal VPC communication
- Infrastructure provisioning using Terraform
- Deployment automation using shell scripts
- Service lifecycle management using Systemd

The API server is publicly accessible while worker nodes remain isolated inside private networking.

---

## System Architecture

```
Internet User
      │
      ▼
+----------------------+
| Public API Server    |
| EC2 (Public Subnet)  |
| Node.js + Express    |
| Port 3000            |
+----------------------+
      │
      │ Internal VPC Communication
      ▼
+----------------------+
| Inference Worker     |
| EC2 (Private Subnet) |
| Python Service       |
| Port 5000            |
+----------------------+
```

---

## Network Design

| Component | Configuration |
|------------|---------------|
| VPC CIDR | 10.0.0.0/16 |
| Public Subnet | 10.0.1.0/24 |
| Private Subnet | 10.0.2.0/24 |
| API Server | Public EC2 |
| Worker Server | Private EC2 |
| API Port | 3000 |
| Worker Port | 5000 |

---

## Infrastructure Provisioned

Terraform provisions:

- VPC
- Public Subnet
- Private Subnet
- Internet Gateway
- Route Tables
- Security Groups
- EC2 Instances
- Internal VPC networking

Infrastructure validation:

```bash
terraform fmt
terraform validate
```

Validation Result:

```text
Success! The configuration is valid.
```

Infrastructure can be recreated from scratch entirely through Infrastructure as Code.

---

## Project Structure

```
devops-internship-assignment/
│
├── api/
│   └── server.js
│
├── inference/
│   └── app.py
│
├── terraform/
│   └── main.tf
│
├── scripts/
│   ├── deploy-api.sh
│   └── deploy-inference.sh
│
├── systemd/
│   ├── api.service
│   └── inference.service
│
├── docs/
│   └── architecture.png
│
├── README.md
└── .gitignore
```

---

## API Endpoint

Endpoint:

```http
POST /v1/chat/completions
```

Example Request:

```bash
curl -X POST http://PUBLIC_IP:3000/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{"message":"Hello DevOps"}'
```

Example Response:

```json
{
  "response":"Processed: {\"message\":\"Hello DevOps\"}"
}
```

---

## Deployment Instructions

### Step 1 — Provision Infrastructure

```bash
cd terraform

terraform init

terraform fmt

terraform validate

terraform apply
```

Terraform automatically provisions:

- Networking
- Security groups
- Public API VM
- Private worker VM

---

### Step 2 — Deploy API Server

```bash
cd api

npm install

node server.js
```

---

### Step 3 — Deploy Inference Worker

```bash
cd inference

python3 app.py
```

---

## Service Management

Systemd unit files included:

```bash
sudo cp systemd/api.service /etc/systemd/system/

sudo cp systemd/inference.service /etc/systemd/system/

sudo systemctl daemon-reload

sudo systemctl enable api

sudo systemctl enable inference

sudo systemctl start api

sudo systemctl start inference
```

Check services:

```bash
sudo systemctl status api

sudo systemctl status inference
```

---

## Validation Performed

### Internal API Validation

```bash
curl -X POST http://localhost:3000/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{"message":"Internal Test"}'
```

Result:

Passed ✅

---

### External API Validation

Public endpoint tested externally.

Passed ✅

---

### Network Isolation Validation

Private worker node verified inaccessible from public internet.

Passed ✅

---

### Failure Recovery Validation

Worker shutdown simulated.

API correctly returned failure response.

Worker restart restored functionality.

Passed ✅

---

## Security Design

Security controls implemented:

- Private subnet worker isolation
- Internal VPC-only communication
- Security Group restrictions
- Public exposure limited to API layer
- Infrastructure reproducibility
- Network segmentation
- Bastion/API access pattern

---

## Production Hardening

Before production deployment, I would additionally implement:

- HTTPS / TLS termination
- AWS Secrets Manager
- CloudWatch monitoring
- Centralized logging
- Auto Scaling Groups
- Health checks
- IAM least privilege model
- Load balancing
- Backup policies
- API authentication
- Rate limiting
- Vulnerability scanning

---

## Scaling For Models 100x Larger

For significantly larger model workloads:

- GPU inference infrastructure
- Distributed inference workers
- Kubernetes orchestration
- Model sharding
- Request queue systems
- Horizontal worker autoscaling
- Model batching
- Distributed artifact storage
- Caching layers
- Dedicated inference clusters

---

## Technologies Used

- AWS EC2
- AWS VPC
- Terraform
- Node.js
- Express.js
- Python
- Linux
- Systemd

---

## Assignment Outcome

Implemented a secure multi-tier cloud deployment architecture demonstrating:

- Infrastructure provisioning
- Infrastructure reproducibility
- Network isolation
- Internal service communication
- Deployment automation
- Cloud networking principles
- Infrastructure validation
- Failure recovery testing

---

Author: Mohammed Faiz

GitHub Repository:

https://github.com/Mfaiz01/devops-internship-assignment
