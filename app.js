import { dates } from './utils/dates.js'
import { config } from './config.js'

const tickersArr = []

// DOM Elements - matching index.html IDs and classes
const generateReportBtn = document.querySelector('.generate-report-btn')
const actionPanel = document.querySelector('.action-panel')
const loadingArea = document.querySelector('.loading-panel')
const apiMessage = document.getElementById('api-message')
const tickersDiv = document.querySelector('.ticker-choice-display')

generateReportBtn.addEventListener('click', fetchStockData)

document.getElementById('ticker-input-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const tickerInput = document.getElementById('ticker-input')
    const label = document.getElementById('ticker-label')
    
    if (tickerInput.value.length > 2) {
        // Reset label
        label.style.color = ''
        label.textContent = 'Enter a stock ticker:'
        
        generateReportBtn.disabled = false
        const newTickerStr = tickerInput.value
        tickersArr.push(newTickerStr.toUpperCase())
        tickerInput.value = ''
        renderTickers()
    } else {
        label.style.color = 'red'
        label.textContent = 'You must add at least one ticker. A ticker is a 3 letter or more code for a stock. E.g TSLA for Tesla.'
    }
})

function renderTickers() {
    tickersDiv.innerHTML = ''
    tickersArr.forEach((ticker) => {
        const newTickerSpan = document.createElement('span')
        newTickerSpan.textContent = ticker
        newTickerSpan.classList.add('ticker')
        tickersDiv.appendChild(newTickerSpan)
    })
}

async function fetchStockData() {
    actionPanel.style.display = 'none'
    loadingArea.style.display = 'flex'
    try {
        const stockData = await Promise.all(tickersArr.map(async (ticker) => {
            const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${dates.startDate}/${dates.endDate}?apiKey=${config.POLYGON_API_KEY}`
            const response = await fetch(url)
            const data = await response.text()
            const status = await response.status
            if (status === 200) {
                apiMessage.innerText = 'Creating report...'
                return data
            } else {
                loadingArea.innerText = 'There was an error fetching stock data.'
            }
        }))
        fetchReport(stockData.join(''))
    } catch(err) {
        loadingArea.innerText = 'There was an error fetching stock data.'
        console.error('error: ', err)
    }
}

async function fetchReport(data) {
    apiMessage.innerText = 'Generating AI report...'
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: `You are a stock market analyst. Analyze the provided stock data and generate a concise prediction report. 
                        Include:
                        - Brief summary of recent price movements
                        - Key trends identified
                        - Short-term prediction (next few days)
                        - Risk assessment
                        Keep the response clear and easy to understand for non-experts.`
                    },
                    {
                        role: 'user',
                        content: `Analyze this stock data and provide a prediction report: ${data}`
                    }
                ]
            })
        })
        
        const result = await response.json()
        
        if (result.error) {
            if (result.error.code === 'insufficient_quota') {
                throw new Error('OpenAI quota exceeded. Please check your billing at platform.openai.com/account/billing')
            }
            throw new Error(result.error.message)
        }
        
        const report = result.choices[0].message.content
        renderReport(report)
    } catch (err) {
        console.error('OpenAI API error:', err)
        loadingArea.querySelector('p').innerText = err.message || 'Error generating report. Please try again.'
    }
}

function renderReport(output) {
    loadingArea.style.display = 'none'
    const outputArea = document.querySelector('.output-panel')
    const reportContent = document.getElementById('reportContent')
    
    // Format the markdown-style output to HTML
    let formattedOutput = output
        // Convert **bold** to <strong>
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        // Convert headers (lines ending with :) to styled headers
        .replace(/^(#{1,3})\s*(.+)$/gm, '<h3>$2</h3>')
        // Convert bullet points
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Wrap consecutive <li> items in <ul>
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        // Convert newlines to breaks for readability
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>')
    
    // Wrap in paragraph if not already structured
    if (!formattedOutput.startsWith('<')) {
        formattedOutput = '<p>' + formattedOutput + '</p>'
    }
    
    reportContent.innerHTML = formattedOutput
    outputArea.style.display = 'flex'
}