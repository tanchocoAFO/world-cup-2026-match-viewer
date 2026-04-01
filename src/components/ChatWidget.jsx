import { useState, useRef, useEffect } from 'react'

const SUGGESTED_QUESTIONS = [
  'When does France play?',
  'Show me all Group A matches',
  'What time is USA vs Paraguay?',
  'Which matches are in Miami?',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus()
  }, [isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || isLoading) return

    setInput('')
    const userMsg = { role: 'user', content: userText }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'model', content: data.response }])
    } catch {
      setMessages(prev => [...prev, { role: 'model', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {/* Expanded chat panel */}
      {isOpen && (
        <div className="w-80 bg-white border border-slate-200 shadow-2xl rounded-none overflow-hidden flex flex-col"
             style={{ height: '420px' }}>
          
          {/* Header */}
          <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b-2 border-amber-500 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">⚽</span>
              <div>
                <div className="text-white text-sm font-medium tracking-wide">World Cup Assistant</div>
                <div className="text-slate-400 text-xs font-light">Ask about matches, teams & venues</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500 text-center font-light pt-1">Try asking:</p>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left text-xs px-3 py-2 bg-white border border-slate-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50 transition-all duration-150 font-light"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <span className="text-base mr-1.5 flex-shrink-0 mt-0.5">⚽</span>
                )}
                <div className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed font-light whitespace-pre-wrap
                  ${msg.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white border border-slate-200 text-slate-800'
                  }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <span className="text-base mr-1.5">⚽</span>
                <div className="bg-white border border-slate-200 px-3 py-2 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0 border-t border-slate-200 bg-white p-2 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about matches..."
              className="flex-1 text-xs px-3 py-2 border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none font-light text-slate-800 placeholder-slate-400"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="px-3 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white transition-colors duration-150 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Trigger pill */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className={`group flex items-center gap-2 px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border
          ${isOpen
            ? 'bg-slate-900 text-white border-amber-500'
            : 'bg-white/90 backdrop-blur-sm border-slate-200 text-slate-700 hover:border-amber-400'
          }`}
        style={{ borderRadius: '9999px' }}
      >
        <svg className={`w-4 h-4 transition-colors ${isOpen ? 'text-amber-400' : 'text-amber-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="text-sm font-light tracking-wide">Ask AI</span>
      </button>
    </div>
  )
}
