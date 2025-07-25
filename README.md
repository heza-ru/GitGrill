# 🦆 GitGrill - SearDuck Code Roasts

Where SearDuck Roasts Your GitHub Code! GitGrill analyzes GitHub profiles and generates humorous "roasts" based on coding habits, commit patterns, commit messages, and emoji usage.

## 🚀 Features

- **🔥 Spicy Roasts**: Get entertaining commentary on your GitHub activity
- **📊 Profile Analysis**: Analyze commit frequency, emoji usage, and language diversity  
- **🦆 SearDuck Theme**: All roasts delivered with SearDuck's debugging wisdom
- **📱 Social Sharing**: Share your roasts on Twitter, LinkedIn, and Facebook
- **⚡ Fast & Responsive**: Built with React and optimized for performance

## 🛠️ Tech Stack

- **Frontend**: React 18, CSS3 with custom animations
- **Backend**: Netlify Functions (serverless)
- **API**: GitHub REST API v3
- **Deployment**: Netlify (optimized for static hosting)
- **Styling**: Custom CSS with SearDuck theme

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 14+ and npm
- Netlify CLI (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gitgrill.git
   cd gitgrill
   ```

2. **Install dependencies**
   ```bash
   # Install main dependencies
   npm install
   
   # Install function dependencies
   cd netlify/functions
   npm install
   cd ../..
   ```

3. **Run locally**
   ```bash
   # Start development server with Netlify Functions
   npm run serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:8888`

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Deploy to preview
netlify deploy

# Deploy to production
npm run deploy
```

### One-Click Netlify Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/gitgrill)

## 🎯 How It Works

1. **Enter Username**: Input any public GitHub username
2. **Analysis**: Fetches user profile, repositories, and recent commits
3. **Roasting**: Applies SearDuck themed heuristics to generate humorous commentary
4. **Display**: Shows roast with supporting metrics and visualizations
5. **Share**: Share your roast on social media platforms

## 🦆 Roast Categories

GitGrill analyzes several aspects of your GitHub profile:

- **Commit Patterns**: Frequency, timing, and consistency
- **Message Quality**: Generic vs. descriptive commit messages  
- **Emoji Usage**: Frequency and creativity in commits
- **Repository Quality**: Naming conventions and organization
- **Language Diversity**: Programming language variety and trends

## 🎨 Customization

### Adding New Roast Templates
Edit `netlify/functions/github-roast.js` and add new templates to the `ROAST_TEMPLATES` object:

```javascript
ROAST_TEMPLATES.newCategory = {
  condition: [
    "New roast template with {variable} replacement"
  ]
};
```

### Styling
All styles are in `src/components/*.css`. The theme uses:
- Yellow/amber color palette (`#fbbf24`, `#f59e0b`)
- SearDuck emojis and animations
- Glassmorphism effects with `backdrop-filter`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for providing developer data
- SearDuck debugging methodology for inspiration
- The developer community for being good sports about roasts!

---

**Built with 🦆 and ❤️ by the GitGrill team**

*Remember: SearDuck is always watching your commits!* 🦆👀
