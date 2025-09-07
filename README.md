
# Secure Desktop Assistant

This is a real-time AI assistant for desktop productivity, meetings, and presentations. It provides contextual help using screen capture and audio analysis.

## Features

- **Live AI Assistance**: Real-time help powered by Google Gemini 2.0 Flash Live
- **Screen & Audio Capture**: Contextual responses based on what you see and hear
- **Multiple Profiles**: Interview, Sales Call, Business Meeting, Presentation, Negotiation
- **Transparent Overlay**: Always-on-top window, position anywhere
- **Click-through Mode**: Make window transparent to clicks
- **Cross-platform**: macOS, Windows, Linux

## Setup

1. **Get a Gemini API Key**: Visit [Google AI Studio](https://aistudio.google.com/apikey)
2. **Install Dependencies**: `npm install`
3. **Run the App**: `npm start`

## Usage

1. Enter your Gemini API key in the main window
2. Choose your profile and language in settings
3. Click "Start Session" to begin
4. Position the window using keyboard shortcuts
5. The AI will provide real-time assistance

## Keyboard Shortcuts

- **Window Movement**: `Ctrl/Cmd + Arrow Keys`
- **Click-through**: `Ctrl/Cmd + M`
- **Close/Back**: `Ctrl/Cmd + \`
- **Send Message**: `Enter`

## Audio Capture

- **macOS**: System audio via [SystemAudioDump](https://github.com/Mohammed-Yasin-Mulla/Sound)
- **Windows**: Loopback audio capture
- **Linux**: Microphone input

## Requirements

- Electron-compatible OS (macOS, Windows, Linux)
- Gemini API key
- Screen recording permissions
- Microphone/audio permissions
