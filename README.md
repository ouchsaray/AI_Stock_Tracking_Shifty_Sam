# Shifty Sam's Stock Tracker

A JavaScript-based AI application for predicting stock prices.

## Overview

This project uses artificial intelligence and machine learning techniques to analyze historical stock data and predict future price movements.

> Note: his project has been created using Vibe Coding with Claude - Opus 4.5

## Features

- 📈 Stock price prediction using ML models
- 📊 Historical data analysis
- 🤖 AI-powered forecasting

## Tech Stack

- **Language:** JavaScript
- **AI:** OpenAI API

## High Level System Design

```
┌─────────────────┐                      ┌─────────────────┐
│                 │                      │                 │
│   TSLA, META    │                      │   THE REPORT    │
│                 │                      │                 │
└────────┬────────┘                      └────────▲────────┘
         │                                        │
         │                                        │
         ▼                                        │
┌─────────────────┐                      ┌────────┴────────┐
│                 │                      │                 │
│  STOCK PRICE    │ ──────────────────▶  │    OpenAI       │
│   DATA API      │                      │                 │
│                 │                      │                 │
└─────────────────┘                      └─────────────────┘
```

**Flow:**
1. User provides stock symbols (e.g., TSLA, META)
2. Stock Price Data API fetches historical/current data
3. Data is sent to OpenAI for analysis
4. OpenAI generates the prediction report

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ai_trader

# Install dependencies
npm install
```

### Usage

```bash
# Run the application
npm start
```

## Project Structure

```
ai_trader/
├── README.md
└── ... (more to come)
```

## Roadmap

- [ ] Set up project structure
- [ ] Integrate stock data API
- [ ] Implement data preprocessing
- [ ] Build ML prediction model
- [ ] Create visualization dashboard
- [ ] Add backtesting capabilities

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

---

> ⚠️ **Disclaimer:** This application is for educational and research purposes only. Stock predictions are not financial advice. Always do your own research before making investment decisions.
