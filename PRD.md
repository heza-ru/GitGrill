# GitGrill - Product Requirements Document

## Project Overview

**GitGrill** is a humorous web application that analyzes GitHub profiles and generates entertaining "roasts" based on users' coding habits, commit patterns, commit messages, and emoji usage. The app provides light-hearted commentary on a developer's GitHub activity to create shareable, fun content.

## Project Purpose

- **Primary Goal**: Create an entertaining tool that generates humorous commentary on GitHub profiles
- **Secondary Goals**: 
  - Encourage developers to reflect on their coding habits
  - Provide shareable content for developer communities
  - Showcase GitHub API integration and data analysis

## Target Audience

- **Primary**: Developers with public GitHub profiles
- **Secondary**: Tech recruiters, developer communities, social media users in tech
- **Persona**: Developers aged 18-40 who enjoy tech humor and social sharing

## User Stories

### Core User Stories
1. **As a developer**, I want to enter a GitHub username and get a humorous roast of that profile
2. **As a user**, I want to see visual metrics and statistics that support the roast
3. **As a user**, I want to share my roast results on social media
4. **As a developer**, I want to understand what aspects of my profile were analyzed

### Extended User Stories
1. **As a user**, I want to compare multiple GitHub profiles
2. **As a developer**, I want to see improvement suggestions hidden within the humor
3. **As a user**, I want to save and revisit previous roasts

## Core Features

### MVP Features
1. **Profile Input**: Simple form to enter GitHub username
2. **Profile Analysis**: Fetch and analyze GitHub profile data
3. **Roast Generation**: Generate humorous commentary based on analysis
4. **Results Display**: Present roast with supporting metrics and visualizations
5. **Error Handling**: Handle invalid usernames, private profiles, API limits

### Future Features
1. **Social Sharing**: Direct sharing to Twitter, LinkedIn, etc.
2. **Roast History**: Save and revisit previous roasts
3. **Comparison Mode**: Side-by-side roasts of multiple users
4. **Custom Roast Styles**: Different humor styles (gentle, savage, corporate)
5. **Team Roasts**: Analyze entire organization or team

## Technical Requirements

### Tech Stack Options

#### Backend Options
- **FastAPI (Python)**: Fast, modern, automatic API docs, great for data analysis
- **Express.js (Node.js)**: Lightweight, JavaScript ecosystem consistency
- **Recommendation**: FastAPI for better data processing capabilities

#### Frontend Options
- **React**: Large ecosystem, component reusability
- **Vue.js**: Simpler learning curve, good performance
- **Recommendation**: React for component ecosystem and job market relevance

#### Database
- **Development**: SQLite
- **Production**: PostgreSQL
- **Caching**: Redis for GitHub API response caching

#### Deployment
- **Backend**: Railway, Render, or DigitalOcean
- **Frontend**: Vercel, Netlify
- **Containerization**: Docker for consistent environments

### Architecture
- **Frontend**: SPA (Single Page Application)
- **Backend**: RESTful API
- **Communication**: HTTP/HTTPS with JSON
- **Caching**: Response caching for GitHub API calls

## Data Sources

### GitHub API v4 (GraphQL)
- **Profile Information**: Bio, location, company, follower count
- **Repository Data**: Public repos, languages, stars, forks
- **Commit History**: Recent commits, commit messages, frequency
- **Activity Patterns**: Contribution timeline, commit times

### GitHub API v3 (REST) - Supplementary
- **Detailed Commit Data**: For specific commit message analysis
- **Repository Stats**: Detailed language statistics

### Rate Limiting Considerations
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5000 requests/hour
- **Strategy**: Implement caching, user authentication for heavy usage

## Roast Logic Heuristics

### Commit Patterns Analysis
1. **Commit Frequency**
   - Too frequent: "Lives in the terminal"
   - Too sparse: "Commits as often as leap years"
   - Weekend commits: "No social life detected"

2. **Commit Timing**
   - Late night commits: "3 AM commits suggest questionable life choices"
   - Holiday commits: "Working on Christmas? Dedication or desperation?"

3. **Commit Message Quality**
   - Generic messages: "fix" counter
   - Excessive emojis: "Emoji-to-code ratio analysis"
   - All caps: "ANGER LEVEL: MAXIMUM"
   - Length analysis: Novel vs. novel-length commit messages

### Repository Analysis
1. **Repository Naming**
   - Generic names: "hello-world", "test", "my-project"
   - Ambitious names vs. actual content
   - Naming consistency patterns

2. **Language Diversity**
   - Language switching frequency
   - Trendy language adoption speed
   - Abandoned language graveyards

3. **Project Completion**
   - README-only repositories
   - Last commit recency
   - Fork-to-original-work ratio

### Profile Analysis
1. **Bio and Profile**
   - Generic developer bios
   - Buzzword density
   - Location vs. commit timezone analysis

2. **Social Metrics**
   - Follower-to-following ratio
   - Stars received vs. stars given

### Emoji Usage Analysis
1. **Commit Message Emojis**
   - Frequency and variety
   - Conventional emoji usage vs. creative usage
   - Emoji-to-text ratio

2. **Profile Emojis**
   - Bio emoji density
   - Repository description emoji usage

## Roast Categories

### Roast Severity Levels
1. **Gentle**: Playful teasing, encouraging
2. **Medium**: Witty observations, light sarcasm
3. **Spicy**: Sharp humor, honest critiques (default)

### Roast Categories
1. **Productivity Patterns**: Commit frequency, timing
2. **Code Quality Indicators**: Commit messages, repository organization
3. **Social Coding**: Collaboration patterns, community engagement
4. **Trendy Developer**: Technology adoption, naming conventions
5. **Work-Life Balance**: Commit timing patterns, weekend activity

## Technical Specifications

### API Endpoints
- `POST /api/roast` - Generate roast for username
- `GET /api/roast/:id` - Retrieve saved roast
- `GET /api/health` - Health check

### Data Models
```json
{
  "roast": {
    "id": "uuid",
    "username": "string",
    "generated_at": "timestamp",
    "roast_text": "string",
    "metrics": {
      "commit_frequency": "number",
      "emoji_ratio": "number",
      "languages": ["array"],
      "productivity_score": "number"
    },
    "analysis": {
      "patterns": ["array"],
      "highlights": ["array"]
    }
  }
}
```

### Performance Requirements
- **Response Time**: < 3 seconds for roast generation
- **Availability**: 99% uptime
- **Concurrent Users**: Support 100+ simultaneous requests

## Security and Privacy

### Privacy Considerations
- Only analyze public GitHub data
- No data storage of personal information
- Optional user consent for storing roast results
- Clear data usage policies

### Security Measures
- Rate limiting on API endpoints
- Input validation and sanitization
- GitHub token security for API access
- CORS configuration

## Success Metrics

### Engagement Metrics
- **Primary**: Roasts generated per day
- **Secondary**: Return user rate, social shares
- **Quality**: User satisfaction feedback

### Technical Metrics
- **Performance**: API response times, error rates
- **Reliability**: Uptime, successful GitHub API calls

## Development Phases

### Phase 1: MVP (Weeks 1-2)
- Basic GitHub profile fetching
- Simple roast generation
- Basic frontend interface

### Phase 2: Enhancement (Weeks 3-4)
- Advanced analysis algorithms
- Improved UI/UX
- Caching implementation

### Phase 3: Polish (Week 5)
- Testing, debugging
- Performance optimization
- Documentation

## Risk Assessment

### Technical Risks
- **GitHub API Rate Limits**: Mitigation through caching and authentication
- **Profile Privacy**: Handle private profiles gracefully
- **Data Accuracy**: Implement data validation and error handling

### Product Risks
- **Humor Reception**: Test with diverse user groups
- **Legal Concerns**: Ensure compliance with GitHub ToS
- **Scalability**: Plan for viral growth scenarios

## Questions for Stakeholder

1. **Tech Stack Preference**: FastAPI vs Express.js for backend? React vs Vue for frontend?
2. **Roast Tone**: Default to playful humor or allow severity selection?
3. **Data Persistence**: Should we store roast results for sharing/history?
4. **Authentication**: Require GitHub OAuth for enhanced API limits?
5. **Monetization**: Freemium model or completely free?

---

**Next Steps**: Stakeholder review and approval before proceeding to technical implementation. 