import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0B0F19', color: '#ffffff', padding: '3rem', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#10b981' }}>Monvorge studio</h1>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '500px' }}>
            Виникла помилка під час рендерингу інтерфейсу. Спробуйте оновити сторінку.
          </p>
          <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#f87171', maxWidth: '600px', wordBreak: 'break-word', textAlign: 'left' }}>
            {this.state.error?.message || 'Невідома помилка'}
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1.5rem', backgroundColor: '#10b981', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Оновити сторінку
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
