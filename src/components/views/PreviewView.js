import React from 'react';

export default function PreviewView({ onContinue }) {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Добро пожаловать в Interview Helper by Denis!</h2>
            <p>
                Это приложение поможет вам готовиться к собеседованиям, анализировать вопросы и получать полезные советы.
                <br />
                Используйте безопасные инструменты, историю диалогов и персональные настройки для максимальной эффективности.
            </p>
            <button onClick={onContinue} style={{ marginTop: '2rem', padding: '0.75rem 2rem', fontSize: '1rem' }}>
                Начать
            </button>
        </div>
    );
}
