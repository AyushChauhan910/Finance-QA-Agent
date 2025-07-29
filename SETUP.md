# FinanceAI - Financial Q&A Agent Setup Guide

## 🚀 Quick Start

This is the frontend for the Financial Q&A Agent MVP - a sophisticated web application that provides real-time financial document analysis with 3D visualizations and smooth animations.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for version control)

## 🛠 Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd financial-qa-agent
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:8080`

## 🎨 Features Included

### ✨ Frontend Features
- **3D Animated Background** - Interactive financial data visualization using React Three Fiber
- **Dark Financial Theme** - Professional dark mode optimized for financial applications
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Document Upload Interface** - Drag & drop functionality for SEC filings
- **Real-time Chat Interface** - Interactive Q&A with AI responses
- **Responsive Design** - Optimized for desktop and mobile devices

### 🎯 Key Components
- **Scene3D** - Interactive 3D background with floating financial cubes
- **DocumentUpload** - File upload with progress tracking and processing status
- **QueryInterface** - Chat-like interface for financial queries
- **HeroSection** - Landing page with animated metrics and call-to-action

## 🔧 Backend Integration

### API Endpoints to Implement

The frontend expects the following backend endpoints:

```typescript
// Document Processing
POST /api/documents/upload
GET /api/documents/{id}/status
GET /api/documents/{id}/processed

// Query Processing
POST /api/query
GET /api/query/{id}/result

// Health Check
GET /api/health
```

### Example API Responses

**Document Upload Response:**
```json
{
  "document_id": "doc_123",
  "status": "processing",
  "estimated_time": "2-3 minutes"
}
```

**Query Response:**
```json
{
  "query_id": "query_456",
  "answer": "Based on the Q3 2024 10-Q filing...",
  "confidence": 95.2,
  "sources": ["page_15", "page_23"],
  "processing_time": "450ms"
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Environment Variables (Optional)

Create a `.env` file for environment-specific configurations:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_ENVIRONMENT=development
```

## 📦 Technology Stack

### Core Technologies
- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework

### 3D Graphics
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for R3F

### Animations
- **Framer Motion** - Animation library
- **CSS Animations** - Custom keyframes and transitions

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Pre-built component library
- **Lucide React** - Icon library

## 🎨 Design System

### Color Palette
```css
/* Primary Financial Blue */
--primary: 210 100% 55%
--primary-glow: 210 100% 65%

/* Dark Background */
--background: 220 15% 6%
--card: 220 15% 8%

/* Accent Green */
--accent: 140 60% 50%
```

### Custom Gradients
- `gradient-financial` - Primary to accent gradient
- `gradient-card` - Subtle card background
- `gradient-glass` - Glass morphism effect

## 🔄 Integration with Backend

### 1. FastAPI Backend Setup

Your Python backend should include:

```python
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/documents/upload")
async def upload_document(file: UploadFile):
    # Your document processing logic
    pass

@app.post("/api/query")
async def process_query(query: str):
    # Your RAG pipeline logic
    pass
```

### 2. Update API Base URL

Modify the frontend API calls to point to your backend:

```typescript
// In your API service file
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

## 🔍 Performance Optimizations

### Implemented Optimizations
- **Code splitting** with React.lazy()
- **Optimized 3D rendering** with limited frame rates
- **Efficient animations** using CSS transforms
- **Responsive images** and optimized assets

### Monitoring
- Sub-500ms query response time target
- Real-time performance metrics display
- User interaction analytics

## 🐛 Troubleshooting

### Common Issues

**Three.js/React Three Fiber Issues:**
```bash
npm install three@latest @react-three/fiber@^8.18.0 @react-three/drei@^9.122.0
```

**Build Errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port Already in Use:**
```bash
# Kill process on port 8080
npx kill-port 8080
npm run dev
```

## 📚 Additional Resources

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Ready to revolutionize financial document analysis!** 🚀