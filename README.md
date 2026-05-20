# DevOps Internship Assignment Submission

## Overview

This project provisions a secure multi-tier AWS infrastructure using Terraform.

Architecture:

Internet
|
Public API Server (EC2)
10.0.1.48
|
Private VPC Communication
|
Private Inference Worker (EC2)
10.0.2.75

The API server is publicly accessible while worker nodes remain isolated inside private networking.

---

## Infrastructure

Provisioned using Terraform:

- VPC
- Public Subnet
- Private Subnet
- Internet Gateway
- Route Tables
- Security Groups
- EC2 Instances

Infrastructure validation:

```bash
terraform fmt
terraform validate
```

Validation result:

```
Success! The configuration is valid.
```

---

## API Endpoint

Request:

```bash
curl -X POST http://PUBLIC_IP:3000/v1/chat/completions \
-H "Content-Type: application/json" \
-d '{"message":"Hello DevOps"}'
```

Response:

```json
{
 "response":"Processed: {\"message\":\"Hello DevOps\"}"
}
```

---

## Security Model

- API server publicly reachable
- Worker server private only
- No direct public access to inference worker
- Internal VPC communication only
- Bastion/API server access pattern

---

## Deployment

Terraform:

```bash
terraform init
terraform apply
```

API:

```bash
node server.js
```

Inference:

```bash
python3 app.py
```

---

## Validation Performed

- Internal communication validated
- External API validation completed
- Worker isolation validated
- Failure and recovery testing completed

---

## Future Improvements

- TLS / HTTPS
- IAM least privilege
- CloudWatch monitoring
- Auto scaling
- Containerization
- Health checks
- NAT Gateway
- Distributed inference scaling

