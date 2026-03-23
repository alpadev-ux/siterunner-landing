import { Component } from 'react'

/**
 * Catches render errors so the page isn’t a blank white screen, and shows the
 * actual exception (check console for component stack).
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error)
    console.error('[ErrorBoundary] componentStack', info?.componentStack)
  }

  render() {
    if (this.state.error) {
      const err = this.state.error
      return (
        <div
          style={{
            minHeight: '100vh',
            padding: 24,
            fontFamily: 'system-ui, sans-serif',
            background: '#fef2f2',
            color: '#450a0a',
          }}
        >
          <h1 style={{ fontSize: 20, marginBottom: 12 }}>Something broke while rendering</h1>
          <p style={{ marginBottom: 16, opacity: 0.85 }}>
            Open the browser devtools console (⌥⌘J / F12) for the full stack trace.
          </p>
          <pre
            style={{
              padding: 16,
              background: '#fff',
              border: '1px solid #fecaca',
              borderRadius: 8,
              overflow: 'auto',
              fontSize: 13,
              lineHeight: 1.5,
            }}
          >
            {err?.name}: {err?.message}
            {err?.stack ? `\n\n${err.stack}` : ''}
          </pre>
          <button
            type="button"
            style={{ marginTop: 16, padding: '10px 16px', cursor: 'pointer' }}
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
