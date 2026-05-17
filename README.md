# ⚡ API Gateway Service

### `trackpulse-api-gateway`

This service acts as the central API Gateway for the TrackPulse platform.  
It manages all incoming requests, handles request forwarding, and connects communication between microservices securely.

---

# ⚙️ Features

- ⚡ Central API Gateway
- 🔄 Request Forwarding
- 🔐 Secure Route Handling
- 🌐 Service Communication
- 🚚 Fleet Service Routing
- 📱 Mobile Service Routing
- 🔑 Authentication Service Routing
- 🛡️ Middleware-Based Security
- ☁️ Scalable Microservice Architecture

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- Redis
- JWT Authentication

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
# Authentication
ACCESS_TOKEN_SECRET=

# Service URLs
AUTH_SERVICE=
FLEET_SERVICE=
MOBILE_SERVICE=

# Client URL
CLIENT_URL=

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

# 🚀 Installation

```bash
git clone YOUR_REPOSITORY_URL

cd trackpulse-api-gateway

npm install

npm run dev
```

---

# 📂 Gateway Responsibilities

- Managing All API Requests
- Request Routing & Forwarding
- Service-to-Service Communication
- Authentication Middleware
- Centralized API Access
- Load Handling
- Secure Request Validation
- Gateway-Level Security

---

# 🌐 Connected Services

- `trackpulse.auth.service`
- `trackpulse.fleet.operations.service`
- `trackpulse.mobile.operations.service`

---
