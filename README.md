# 🚀 DOOS — Distributed Order Orchestration System (FAANG-Grade)

A complete **Event Driven + Microservices + Saga Orchestration** project using:

- Kafka  
- Redis Streams  
- AWS Lambdas  
- Step Functions (Saga Pattern)  
- DynamoDB  
- LocalStack  
- Docker Compose  
- Node.js Services  
- FAANG-style Architecture  

---

# 📦 Architecture Overview

## **Version 1 (Event Driven)**  
```
API Gateway → Kafka → Order Service → Redis Stream → Fraud Service → DynamoDB
```

## **Version 2 (Saga Orchestration – Step Functions)**  
```
Order → Payment → Inventory → Fraud → Success
                   ↘ failure ↙
           Compensation (Refund / Restock)
```

Both systems run locally using Docker + LocalStack.

---

# 🏗️ Tech Stack

| Component | Technology |
|----------|------------|
| API Gateway | Node.js + Express |
| Event Broker | Kafka |
| Cache / Streams | Redis |
| Microservices | Node.js |
| Cloud Simulation | LocalStack |
| Storage | DynamoDB |
| Orchestration (v2) | Step Functions |
| Containerization | Docker Compose |

---

# 📂 Project Structure

```
doos/
 ├── gateway/
 ├── services/
 │    ├── order-service/
 │    ├── payment-service/
 │    ├── inventory-service/
 │    └── fraud-service/
 ├── lambdas/
 │    ├── order-lambda/
 │    ├── payment-lambda/
 │    └── inventory-lambda/
 ├── saga/ (DOOS v2)
 │    └── saga.json
 ├── docker-compose.yml
 └── README.md
```

---

# 🚀 DOOS v1 — Event Driven Flow

### 1️⃣ User sends:

```
POST /order
```

### 2️⃣ Order → Kafka  
### 3️⃣ Order Service → Redis stream  
### 4️⃣ Fraud Service → DynamoDB  
### 5️⃣ View stored events:

```
aws dynamodb scan --table-name FraudEvent --endpoint-url=http://localhost:4566
```

---

# 🔥 DOOS v2 — Saga + Step Functions

### Business Workflow:
- Validate Payment  
- Check Inventory  
- Perform Fraud Checks  
- On failure → refund + restock  

### Deploy Saga:

```
aws --endpoint-url=http://localhost:4566 stepfunctions create-state-machine \
  --name DOOS-Saga-Orchestration \
  --definition file://saga.json \
  --role-arn arn:aws:iam::000000000000:role/stepfunctions-role
```

---

# 🐳 Start System

```
docker compose up -d --build
```

Check containers:

```
docker ps
```

---

# 🧪 Testing Order Flow

```
curl -X POST http://localhost:3000/order \
  -H "Content-Type: application/json" \
  -d '{"orderId":"12345","amount":900}'
```

Fraud logs:

```
docker logs -f fraud-service
```

---

# 🛠️ Commands (LocalStack)

Create DynamoDB table:

```
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
 --table-name FraudEvent \
 --attribute-definitions AttributeName=orderId,AttributeType=S \
 --key-schema AttributeName=orderId,KeyType=HASH \
 --billing-mode PAY_PER_REQUEST
```

---

# 📊 Architecture Diagram (Text Version)

```
         ┌─────────────┐
         │ API Gateway │
         └──────┬──────┘
                │ POST /order
                ▼
        ┌─────────────┐
        │   Kafka     │
        └──────┬──────┘
               ▼
   ┌──────────────────────┐
   │ Order / Payment /    │
   │ Inventory Services   │
   └──────────┬───────────┘
              ▼
       ┌────────────┐
       │ Redis Stream│
       └──────┬─────┘
              ▼
      ┌─────────────────┐
      │  Fraud Service  │
      └──────┬──────────┘
             ▼
     ┌──────────────────┐
     │   DynamoDB       │
     └──────────────────┘
```

---

# 🏁 Conclusion

DOOS is a fully functional **production-grade microservices orchestration system**, perfect for:

- Portfolio  
- Resume projects  
- FAANG interviews  
- YouTube technical content  
- LinkedIn branding  

---

# ⭐ Author
Made by **Ashish** — Cloud + Distributed Systems Engineer 🚀

