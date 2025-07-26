const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// Helper function to get GitHub API headers (for potential authentication)
function getGitHubHeaders() {
  const headers = {
    'User-Agent': 'GitGrill-App',
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    console.log('Using authenticated GitHub API (5000 requests/hour)');
  } else {
    console.log('Using unauthenticated GitHub API (60 requests/hour)');
  }
  
  return headers;
}

// Commit message analysis functions
async function fetchCommitMessages(username, repositories) {
  const commitMessages = [];
  
  // Only fetch from active repositories (not forks) to get actual commit messages
  const activeRepos = repositories
    .filter(repo => !repo.fork && repo.size > 0)
    .slice(0, 5); // Limit to 5 repos to avoid rate limits
  
  for (const repo of activeRepos) {
    try {
      const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=20`, {
        headers: getGitHubHeaders(),
      });
      
      if (commitsResponse.ok) {
        const commits = await commitsResponse.json();
        const repoMessages = commits
          .filter(commit => commit.commit.author.name !== 'GitHub' && commit.commit.author.name !== 'dependabot[bot]')
          .map(commit => ({
            message: commit.commit.message.split('\n')[0], // Get first line only
            repo: repo.name,
            date: commit.commit.author.date
          }));
        
        commitMessages.push(...repoMessages.slice(0, 10)); // Max 10 per repo
      }
    } catch (error) {
      console.log(`Failed to fetch commits for ${repo.name}: ${error.message}`);
    }
  }
  
  return commitMessages.slice(0, 50); // Max 50 total commits to analyze
}

function analyzeCommitMessages(commitMessages) {
  if (!commitMessages || !Array.isArray(commitMessages) || commitMessages.length === 0) {
    return {
      patterns: ['No commit messages found - probably using GitHub web editor'],
      roastPoints: ['Your commit history is as empty as your documentation'],
      severity: 'existential'
    };
  }

  const analysis = {
    patterns: [],
    roastPoints: [],
    severity: 'mild'
  };

  const messages = commitMessages.map(c => c.message.toLowerCase());
  const totalMessages = messages.length;

  // Count different patterns
  const fixCount = messages.filter(m => m.includes('fix')).length;
  const updateCount = messages.filter(m => m.includes('update')).length;
  const wipCount = messages.filter(m => m.includes('wip') || m.includes('work in progress')).length;
  const versionCount = messages.filter(m => /v?\d+\.\d+/.test(m)).length;
  const shortMessages = messages.filter(m => m.length < 10).length;
  const genericMessages = messages.filter(m => 
    m === 'update' || m === 'fix' || m === 'changes' || m === 'commit' || 
    m === 'test' || m === 'cleanup' || m === 'refactor' || m === '.'
  ).length;
  const typoFixes = messages.filter(m => 
    m.includes('typo') || m.includes('spelling') || m.includes('oops')
  ).length;
  const capsLockCount = messages.filter(m => m === m.toUpperCase() && m.length > 3).length;

  // Generate analysis based on patterns
  if (fixCount > totalMessages * 0.3) {
    analysis.patterns.push(`${Math.round(fixCount/totalMessages*100)}% of commits are fixes`);
    analysis.roastPoints.push('Your code is basically a never-ending stream of "fix" commits. Quality control called - they want their job back.');
    analysis.severity = 'brutal';
  }

  if (wipCount > 0) {
    analysis.patterns.push(`${wipCount} WIP commits found`);
    analysis.roastPoints.push(`${wipCount} "work in progress" commits? More like "barely functioning progress". Commit when it's done, not when you're confused.`);
  }

  if (shortMessages > totalMessages * 0.4) {
    analysis.patterns.push(`${Math.round(shortMessages/totalMessages*100)}% of commits have lazy messages`);
    analysis.roastPoints.push('Your commit messages are shorter than your attention span. "fix", "update", "." - truly inspirational documentation.');
    analysis.severity = 'savage';
  }

  if (genericMessages > totalMessages * 0.2) {
    analysis.patterns.push(`${genericMessages} extremely generic commit messages`);
    analysis.roastPoints.push('Your commit messages read like a dictionary of programming verbs. "update", "fix", "change" - Shakespeare is rolling in his grave.');
  }

  if (typoFixes > 0) {
    analysis.patterns.push(`${typoFixes} commits fixing typos`);
    analysis.roastPoints.push(`${typoFixes} commits just to fix typos? Your keyboard needs autocorrect more than your code needs debugging.`);
  }

  if (capsLockCount > 0) {
    analysis.patterns.push(`${capsLockCount} ANGRY COMMITS IN ALL CAPS`);
    analysis.roastPoints.push(`${capsLockCount} commits in ALL CAPS? Your code isn't the only thing that's broken - your caps lock key is stuck.`);
  }

  // Check for creative/good patterns
  const creativeCount = messages.filter(m => 
    m.includes('feat') || m.includes('add') || m.includes('implement') ||
    m.includes('enhance') || m.includes('improve')
  ).length;

  if (creativeCount > totalMessages * 0.3) {
    analysis.patterns.push(`${creativeCount} actually descriptive commits`);
    if (analysis.roastPoints.length === 0) {
      analysis.roastPoints.push('Your commit messages are surprisingly coherent. SearDuck is confused but impressed.');
      analysis.severity = 'respectful';
    }
  }

  // Fallback if no specific patterns found
  if (analysis.roastPoints.length === 0) {
    analysis.roastPoints.push('Your commit messages are as predictable as your coding patterns - thoroughly uninspiring.');
  }

  return analysis;
}

// Random roast enhancement functions
function getRandomDuckFact() {
  const duckFacts = [
    "Did you know ducks have waterproof feathers? Unlike your code, which isn't bug-proof.",
    "Ducks can sleep with one eye open. Clearly more vigilant than your code reviews.",
    "A duck's quack doesn't echo. Your code documentation doesn't exist either.",
    "Ducks can fly up to 60 mph. Your deployment speed? More like 60 minutes per hotfix.",
    "Baby ducks imprint on the first thing they see. Your code imprinted on Stack Overflow.",
    "Ducks have three eyelids. You clearly code with all three closed.",
    "Male ducks are called drakes. Male developers who don't test are called drakes too... wait, that's just 'mistakes'.",
    "Ducks can live 10-15 years. Your code won't survive the next update.",
    "Duck feet don't have nerves or blood vessels. Like your code - no feeling, no life.",
    "Ducks are omnivores. You consume only energy drinks and false confidence."
  ];
  return duckFacts[Math.floor(Math.random() * duckFacts.length)];
}

function getRandomProgrammingMeme() {
  const memes = [
    "Your code works on your machine? Shocking revelation that changes everything!",
    "99 little bugs in the code, 99 little bugs... take one down, patch it around, 127 little bugs in the code!",
    "It's not a bug, it's a feature (that nobody wanted and everyone hates).",
    "Stack Overflow called - they want their copy-pasted code back. With interest.",
    "console.log('debugging like it's 1999') - and your debugging skills haven't evolved since.",
    "// TODO: Fix this later (commit from 3 years ago)",
    "Works on my machine ¯\\_(ツ)_/¯ - the developer's equivalent of 'that's not my problem'",
    "Your code is like a horror movie - lots of suspense, terrible ending, and nobody wants to see it again.",
    "Programming is 10% writing code and 90% figuring out why it doesn't work. You're clearly in the 90%.",
    "Your variable names are like your commit messages - cryptic, unhelpful, and probably wrong."
  ];
  return memes[Math.floor(Math.random() * memes.length)];
}

function getRandomSeverityInsult(score) {
  const brutal = [
    "You've achieved what scientists thought impossible - negative contribution to the codebase.",
    "Your code is so bad, it makes malware look like good software architecture.",
    "Even Hello World applications are ashamed to be associated with your GitHub.",
    "Your programming skills are like unicorns - mythical and probably don't exist."
  ];
  
  const harsh = [
    "You're the participation trophy of the programming world.",
    "Your code has the same energy as a Windows Vista update.",
    "You code like you're being charged by the bug.",
    "Your repositories are where good intentions go to die."
  ];
  
  const mild = [
    "You're not the worst developer I've seen... but you're definitely trying.",
    "Your code shows promise... promise that it might work someday.",
    "You have potential... potential energy, because you're not moving anywhere.",
    "Your GitHub profile is inspirational - it shows that anyone can try."
  ];
  
  if (score <= 3) return brutal[Math.floor(Math.random() * brutal.length)];
  if (score <= 6) return harsh[Math.floor(Math.random() * harsh.length)];
  return mild[Math.floor(Math.random() * mild.length)];
}

function getRandomCommitJoke() {
  const jokes = [
    "Your commit history reads like a stream of consciousness from someone having a breakdown.",
    "I've seen more descriptive commit messages in git repos for shopping lists.",
    "Your commits are like your relationships - frequent, poorly thought out, and usually end in regret.",
    "Commit message: 'fix stuff' - ah yes, the precision of a master craftsman.",
    "Your git log looks like someone was playing commit message bingo and losing badly.",
    "I've seen more creativity in automatically generated error messages than your commit history.",
    "Your commits tell a story - a tragic story of a developer who gave up on communication.",
    "Commit messages like 'update', 'fix', and '.' - the holy trinity of developer laziness.",
    "Your commit history suggests you think git is just for backup, not communication.",
    "Commits like 'this should work' and 'please work' - the desperation is palpable.",
    "Your commit messages read like autocomplete suggestions from a broken AI.",
    "I've seen more descriptive grocery lists than your git commit messages."
  ];
  return jokes[Math.floor(Math.random() * jokes.length)];
}

// Dynamic personality analysis based on GitHub behavior patterns
function analyzePersonality(metrics, profile, repositories) {
  const { commitFrequency, languages, emojiRatio, productivityScore } = metrics;
  const personality = [];
  
  // Activity pattern analysis
  if (commitFrequency > 100) {
    personality.push("commit addict", "code machine", "caffeine-powered developer", "serial committer");
  } else if (commitFrequency < 5) {
    personality.push("digital hermit", "ghost contributor", "once-a-month warrior", "coding minimalist");
  } else if (commitFrequency >= 15 && commitFrequency <= 30) {
    personality.push("steady eddie", "reliable contributor", "consistent coder", "balanced developer");
  }
  
  // Language diversity analysis
  if (languages.length === 1) {
    personality.push("language purist", "one-trick pony", "specialist", "monolingual coder");
  } else if (languages.length >= 5) {
    personality.push("polyglot", "language collector", "tech tourist", "serial experimenter");
  } else if (languages.length >= 3) {
    personality.push("versatile developer", "multi-skilled", "adaptable coder");
  }
  
  // Emoji usage analysis
  if (emojiRatio > 0.5) {
    personality.push("emoji enthusiast", "expressive committer", "digital storyteller", "commit poet");
  } else if (emojiRatio === 0) {
    personality.push("no-nonsense developer", "emoji-phobic", "professional communicator", "plain text warrior");
  }
  
  // Productivity analysis
  if (productivityScore >= 8) {
    personality.push("high achiever", "coding machine", "productivity guru", "efficiency expert");
  } else if (productivityScore <= 3) {
    personality.push("work in progress", "potential sleeper", "diamond in the rough", "future talent");
  }
  
  // Bio analysis for extra personality traits
  if (profile.bio) {
    const bioLower = profile.bio.toLowerCase();
    if (bioLower.includes('senior') || bioLower.includes('lead')) {
      personality.push("team leader", "mentor figure", "experienced guide");
    }
    if (bioLower.includes('full stack') || bioLower.includes('fullstack')) {
      personality.push("jack of all trades", "full-stack warrior", "end-to-end developer");
    }
    if (bioLower.includes('freelance') || bioLower.includes('consultant')) {
      personality.push("digital nomad", "independent contractor", "code mercenary");
    }
    if (bioLower.includes('student') || bioLower.includes('learning')) {
      personality.push("eternal learner", "knowledge seeker", "academic achiever");
    }
  }
  
  // Repository analysis
  const hasForkedRepos = repositories.some(repo => repo.fork);
  const hasOriginalRepos = repositories.some(repo => !repo.fork);
  
  if (hasForkedRepos && !hasOriginalRepos) {
    personality.push("curator", "collector", "fork enthusiast", "code hoarder");
  } else if (!hasForkedRepos && hasOriginalRepos) {
    personality.push("original creator", "innovator", "independent developer");
  }
  
  return personality;
}

function generatePersonalityInsight(personality, metrics) {
  if (personality.length === 0) return "";
  
  const trait = personality[Math.floor(Math.random() * personality.length)];
  
  const insights = [
    `You're a classic ${trait} - we can spot your type from orbit.`,
    `Your profile screams '${trait}' louder than a failed build notification.`,
    `Ah, a ${trait}. How refreshingly predictable.`,
    `Classic ${trait} behavior. Do you have a manual for this level of consistency?`,
    `You embody the spirit of a ${trait} with the subtlety of a syntax error.`,
    `Your GitHub persona is pure ${trait} energy - for better or worse.`,
    `As a ${trait}, you've mastered the art of being exactly what we expected.`
  ];
  
  return insights[Math.floor(Math.random() * insights.length)];
}

// Updated harsh roast templates based on the provided examples
const ROAST_TEMPLATES = {
  low_followers: [
    "With a whopping {followers} followers, you've managed to capture the attention of absolutely no one. I bet {followers === 1 ? 'it\'s your mom' : 'they\'re all spam bots'}.",
    "You've got {followers} followers - that's not a following, that's a pity party.",
    "Even your {followers} followers are probably just there out of obligation."
  ],
  
  fork_heavy: [
    "Your entire GitHub is just a graveyard of forks. Not a single original thought. Your creativity amounts to Ctrl+C, Ctrl+V.",
    "With most of your repos being forks, it looks like your programming philosophy is 'why create when you can copy?'",
    "Your GitHub looks like a retirement home for other people's ideas."
  ],
  
  low_activity: [
    "Your last meaningful update was in {lastYear}, and even that was probably just you fixing a typo.",
    "You've been here since {joinYear} and still haven't figured out how Git works.",
    "Your commit history is like a ghost town - lots of promises, zero delivery."
  ],
  
  poor_repos: [
    "Your best repo has {topStars} stars and it's written in {language}. That's not achievement, that's a cry for help.",
    "With {repoCount} repositories, you've mastered the art of quantity over quality.",
    "Your repositories are like your dating life - lots of attempts, zero success."
  ],
  
  single_language: [
    "Only knowing {language}? That's not being specialized, that's being unemployable.",
    "Your entire skill set can be summarized in one word: {language}. Diversify or die.",
    "Coding exclusively in {language} is like only eating plain toast - technically sustenance, but why?"
  ],
  
  emoji_overuse: [
    "Your commit messages read like a teenage girl's diary with all those emojis. Professional much?",
    "Using {emojiPercent}% emojis in commits doesn't make your code better, it makes you look desperate.",
    "Your emoji-to-code ratio suggests you're more interested in decorating than developing."
  ],
  
  generic_repos: [
    "Your '{repoName}' screams originality—oh wait, it doesn't.",
    "A '{repoName}' repo? How refreshingly unoriginal.",
    "Your project names sound like they were generated by an AI having a stroke."
  ],
  
  no_bio: [
    "Zero bio, zero personality, zero excitement. You're the human equivalent of beige.",
    "No bio? Let me guess - you're too mysterious for descriptions or too boring to bother.",
    "Your blank bio perfectly matches your empty repositories."
  ]
};

// Enhanced language-specific roasts with Reddit-inspired humor and more variety
const LANGUAGE_ROASTS = {
  'JavaScript': [
    "JavaScript? The language where 'false' == 0 but 'false' !== 0. Perfect choice for someone who enjoys suffering.",
    "Ah, JavaScript - where undefined is defined and everything is broken by design. Just like your career choices.",
    "JavaScript: the language that makes other languages look good by comparison. How fitting for your skill level.",
    "Using JavaScript is like playing Russian roulette with a fully loaded gun - painful, unpredictable, and ultimately disappointing.",
    "JavaScript developer, eh? Let me guess - you learned it in a weekend bootcamp and now you're 'full-stack'.",
    "JS: Where you spend 3 hours debugging only to find out you forgot a semicolon. The semicolon was optional.",
    "JavaScript - because why have consistent behavior when you can have 'quirks' and call them features?",
    "Your relationship with JavaScript is like a toxic ex - you know it's bad for you, but you keep coming back.",
    "JavaScript frameworks change faster than your commit messages. At least you're consistent at being inconsistent."
  ],
  'Python': [
    "Python? Because why write efficient code when you can pretend indentation is a programming paradigm?",
    "Python - for when you want to code like you're writing a children's book. Perfect for your reading level.",
    "Choosing Python is like choosing training wheels for your bicycle - technically it works, but everyone knows you're not ready for the real thing.",
    "Python: the language that makes slow look fast. Ideal for your thought processes.",
    "Python developer spotted! Let me guess - you import numpy for basic math and call yourself a data scientist.",
    "Python: where you can write pseudocode and it actually runs. No wonder you like it.",
    "Using Python because it's 'readable'? Your code would be unreadable in any language.",
    "Python - the language of choice for people who think programming should be as easy as speaking English. Spoiler: you're bad at both.",
    "Your Python code is like your personality - simple, predictable, and puts everyone to sleep."
  ],
  'Java': [
    "Java? Still writing enterprise-grade hello world applications, I see.",
    "Java - because why use one line when you can use fifty? Your verbosity matches your code.",
    "Java: the COBOL of the 21st century. How revolutionary of you to choose legacy technology.",
    "Writing Java is like filling out tax forms - unnecessarily complex and nobody enjoys it.",
    "Java developer? Let me guess - you have AbstractFactoryFactory classes and think that's good design.",
    "Java: where every problem can be solved by adding another layer of abstraction. And you've added them all.",
    "Your Java code is so enterprise, it needs a business case just to compile.",
    "Java - the language that makes simple things complicated and complicated things require three design patterns.",
    "Using Java because it's 'portable'? So is a brick, but I wouldn't build a house with it."
  ],
  'C++': [
    "C++ - because you enjoy segmentation faults as a hobby.",
    "C++: where memory management is manual and your pain is guaranteed. Masochist much?",
    "Using C++ is like performing surgery with a chainsaw - powerful, but you'll probably hurt yourself.",
    "C++ - the language that makes simple things complicated and complicated things impossible.",
    "C++ developer? You're either a genius or a masochist. Based on your GitHub, I'm guessing masochist.",
    "C++: the only language where 'Hello World' can cause a buffer overflow if you're creative enough.",
    "Your C++ code has more memory leaks than a government whistleblower.",
    "C++ - because why solve problems when you can create new ones with undefined behavior?",
    "Using C++? I see you enjoy debugging code that was written correctly but the compiler had other ideas."
  ],
  'PHP': [
    "PHP? My condolences to your career prospects.",
    "PHP - the language that makes every other language look like poetry. How poetic justice.",
    "Choosing PHP is like choosing to eat expired food - technically possible, but why would you?",
    "PHP: Probably Hopeless Programming. The acronym explains everything about your choices.",
    "PHP developer in 2024? That's like being a blacksmith in the space age - technically a skill, but why?",
    "PHP: the language that's so inconsistent, even its inconsistencies are inconsistent.",
    "Your PHP code is held together with duct tape, prayer, and deprecated functions.",
    "PHP - where every function name is a surprise and every update breaks everything.",
    "Using PHP because it's 'easy to learn'? Easy to learn, impossible to master, and painful to maintain."
  ],
  'Go': [
    "Go? Google's attempt to make programming boring succeeded, and you fell for it.",
    "Go - for when you want the simplicity of C with the excitement of watching paint dry.",
    "Using Go is like choosing vanilla ice cream every day - safe, boring, and disappointing.",
    "Go: the language that makes mediocrity look like a design goal.",
    "Go developer? You're basically writing C but with training wheels and a safety helmet.",
    "Go: where error handling takes more lines than the actual logic. Verbose much?",
    "Your Go code is so generic, it could be replaced by a template and nobody would notice.",
    "Go - because why have generics when you can copy-paste code like it's 1999?",
    "Using Go because it's 'simple'? Simple minds appreciate simple languages, I suppose."
  ],
  'Rust': [
    "Rust? You're that person who mentions being vegan within 5 minutes of meeting someone.",
    "Rust - because fighting the borrow checker is more fun than actually programming. Stockholm syndrome much?",
    "Using Rust is like dating someone who corrects your grammar - technically right, but insufferably annoying.",
    "Rust: where the compiler is smarter than you'll ever be, and it knows it.",
    "Rust developer detected! How do you know someone uses Rust? Don't worry, they'll tell you.",
    "Rust: the language for people who think C++ isn't hard enough. Congratulations, you're a masochist.",
    "Your Rust code is memory-safe but your sanity isn't.",
    "Rust - where you spend more time arguing with the compiler than actually solving problems.",
    "Using Rust because it's 'safe'? Your code is so unsafe, even Rust can't save you."
  ],
  'TypeScript': [
    "TypeScript - JavaScript with training wheels for people who can't handle dynamic typing.",
    "TypeScript: because JavaScript wasn't painful enough on its own. You needed extra suffering.",
    "Using TypeScript is like putting makeup on a pig - it's still JavaScript underneath.",
    "TypeScript - Microsoft's way of saying 'we can make JavaScript worse.' Challenge accepted and achieved.",
    "TypeScript developer? You're basically writing Java but pretending it's modern.",
    "TypeScript: for when you want the complexity of Java with the runtime errors of JavaScript.",
    "Your TypeScript has more type annotations than actual code. That's not typing, that's overcompensating.",
    "TypeScript - because admitting JavaScript is fundamentally broken is the first step to recovery.",
    "Using TypeScript to 'catch errors early'? Your logic errors will still be there, just with better types."
  ],
  'Swift': [
    "Swift? Still pretending iOS development is the future?",
    "Swift - Apple's gift to developers who enjoy vendor lock-in with their programming languages too.",
    "Using Swift is like buying only Apple products - overpriced, limited, and you convince yourself it's better.",
    "Swift: where syntax sugar can't hide the bitter taste of platform exclusivity.",
    "Swift developer? You're basically writing Objective-C but with more emoji in your variable names.",
    "Swift: the language that changes syntax every version. Stability is for other platforms.",
    "Your Swift code is as locked down as your development environment.",
    "Swift - because why develop for multiple platforms when you can be Apple's prisoner?",
    "Using Swift because it's 'modern'? So was Objective-C, twenty years ago."
  ],
  'React': [
    "React? Because you needed to turn simple web pages into complex state management nightmares.",
    "React developer - you've successfully made the DOM more complicated than rocket science.",
    "Using React to display static content? That's like using a Formula 1 car to go grocery shopping.",
    "React: where you need three tutorials just to center a div.",
    "Your React app has more hooks than a fishing tournament and twice as many bugs."
  ],
  'Vue': [
    "Vue? The JavaScript framework for people who think React is too mainstream.",
    "Vue.js - because Angular was too hard and React was too popular.",
    "Using Vue is like being in an indie band - you think you're cool, but nobody's listening.",
    "Vue: the participation trophy of JavaScript frameworks."
  ],
  'Angular': [
    "Angular? Still using Google's abandoned science experiment, I see.",
    "Angular: because why write simple code when you can have dependency injection for your dependency injection?",
    "Your Angular app has more decorators than a Christmas tree and about as much stability.",
    "Angular - the framework that makes simple things impossible and impossible things simple to break."
  ],
  'Node.js': [
    "Node.js? JavaScript on the server because apparently ruining the frontend wasn't enough.",
    "Node: where everything is asynchronous except your career progression.",
    "Using Node.js for heavy computation is like using a bicycle to tow a trailer.",
    "Node.js - because who needs threads when you can have callback hell?"
  ],
  'Ruby': [
    "Ruby? That's so 2010. What's next, a MySpace profile?",
    "Ruby - the language that makes everything look like magic, including how your career disappeared.",
    "Using Ruby is like driving a car from the 90s - it runs, but everyone wonders why you haven't upgraded.",
    "Ruby: where productivity dies and elegance goes to suffer slowly.",
    "Ruby developer? Ruby is dead, and you killed it by still using it.",
    "Ruby: the language that was cool before you started using it.",
    "Your Ruby code is like vintage wine - it was good once, but now it's just old and sour."
  ],
  'C': [
    "C? Still programming like it's 1972, I see.",
    "C: the language where you can access any memory address you want, and you will, accidentally.",
    "Using C is like performing brain surgery with a butter knife - possible, but why would you?",
    "C - where 'undefined behavior' isn't a bug, it's a feature you'll discover later.",
    "Your C code has more segfaults than a Windows 95 system."
  ],
  'HTML': [
    "HTML? That's not even a programming language. It's like calling yourself a chef because you can make toast.",
    "HTML - because apparently markup is the extent of your technical ambitions.",
    "Listing HTML as your main language is like listing 'breathing' as your primary skill.",
    "HTML: the participation trophy of programming languages.",
    "HTML developer? That's like being a 'professional email sender' - technically a thing, but...",
    "Your HTML is so semantic, it's poetic. Too bad poetry doesn't pay the bills."
  ],
  'CSS': [
    "CSS? Fighting with layout engines isn't programming, it's modern art - abstract and nobody understands it.",
    "CSS - where centering a div requires a computer science degree and three Stack Overflow searches.",
    "Using CSS is like trying to fold a fitted sheet - theoretically possible, practically impossible.",
    "CSS: the language that makes designers cry and developers question their life choices.",
    "CSS developer? You're basically a digital interior decorator who gets frustrated by furniture.",
    "Your CSS has more !important declarations than a political speech.",
    "CSS - where changing one property breaks three other things you didn't know were connected."
  ],
  'SQL': [
    "SQL? At least you know how to JOIN... too bad it's the only relationship that works out for you.",
    "SQL developer - you speak to databases better than you speak to humans.",
    "Your SQL queries are more complex than your personality.",
    "SQL: where SELECT * FROM life returns empty set for most developers."
  ],
  'Assembly': [
    "Assembly? Are you a time traveler from 1970 or just really hate yourself?",
    "Assembly programming: because someone has to keep the masochism alive.",
    "Your Assembly code is so low-level, it's basically talking to electrons directly.",
    "Assembly - for when you want to optimize nanoseconds but waste months of your life."
  ],
  'MATLAB': [
    "MATLAB? Are you a college student or just stuck in 2005?",
    "MATLAB: the language that costs more than your car and runs slower than your thoughts.",
    "Using MATLAB is like paying premium prices for community college education.",
    "MATLAB - because why use free, modern tools when you can pay thousands for legacy software?"
  ],
  'R': [
    "R? Statistics are fun until you realize no one cares about your data analysis.",
    "R: the language for people who think Excel is too user-friendly.",
    "Your R code has more pipes than a plumber's convention.",
    "R - where every function name looks like someone fell asleep on the keyboard."
  ],
  'Dart': [
    "Dart? Google's attempt to make JavaScript replacement that nobody asked for.",
    "Dart: the language that exists solely to make Flutter slightly less painful.",
    "Using Dart is like speaking Esperanto - technically a language, but good luck finding anyone else who uses it.",
    "Dart - because apparently we needed another C-style language with curly braces."
  ]
};

function generatePersonalizedRoast(profile, repositories, metrics, analysis, commitAnalysis) {
  const roastParts = [];
  
  // Extract detailed profile data
  const name = profile.name || profile.login;
  const joinYear = new Date(profile.created_at).getFullYear();
  const accountAge = new Date().getFullYear() - joinYear;
  const followers = profile.followers;
  const following = profile.following;
  const repoCount = profile.public_repos;
  const location = profile.location;
  const company = profile.company;
  const bio = profile.bio;
  
  // Calculate additional metrics
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const forkCount = repositories.filter(repo => repo.fork).length;
  const originalRepos = repositories.filter(repo => !repo.fork);
  const emptyRepos = repositories.filter(repo => repo.size === 0);
  const recentRepos = repositories.filter(repo => {
    const lastUpdate = new Date(repo.updated_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    return lastUpdate > sixMonthsAgo;
  });
  
  // Generate dynamic personality analysis
  const personality = analyzePersonality(metrics, profile, repositories);
  const personalityInsight = generatePersonalityInsight(personality, metrics);
  
  // Legendary developers recognition database
  const legendaryDevelopers = {
    'torvalds': {
      name: 'Linus Torvalds',
      title: 'The Linux God',
      achievement: 'Creator of Linux and Git',
      roasts: [
        `🐧👑 LINUS TORVALDS DETECTED! The Linux God himself has entered the arena! ${name}, you literally created the operating system that runs the internet, and Git - the tool that saves us from our own stupidity daily.\n\n🔥 DIVINE ANALYSIS: You've built the foundation of modern computing, revolutionized version control, and somehow still find time to roast people on mailing lists. Your ${repoCount} repositories include literally changing the world. Most people dream of having impact - you accidentally created the backbone of civilization.\n\n🎯 VERDICT: SearDuck bows to the true alpha. You don't need our roasting - you've already roasted entire operating systems out of existence. Even this duck runs on Linux. 🐧⚡`,
        `🐧⚡ HOLY KERNEL! It's ${name}! The man who taught computers how to think and developers how to collaborate! Your contributions to humanity are so massive that roasting you feels like criticizing gravity.\n\n💀 IMPOSSIBLE TASK: How do you roast someone who literally enabled the digital age? Your worst day of coding is still better than most people's entire careers. Even your angry emails are more constructive than our entire codebase.\n\n🏆 ULTIMATE RESPECT: SearDuck.exe has stopped working. Cannot process roasting of digital deity. 🐧👑`
      ]
    },
    'gaearon': {
      name: 'Dan Abramov',
      title: 'The React Wizard',
      achievement: 'Redux creator and React core team',
      roasts: [
        `⚛️🧙‍♂️ DAN ABRAMOV SPOTTED! The React Wizard, Redux creator, and the person who made state management slightly less of a nightmare! ${name}, you've probably saved more developer sanity than therapy.\n\n🔥 MAGICAL ANALYSIS: You created Redux, revolutionized React development, and somehow make complex concepts seem simple. Your ${repoCount} repositories are like spellbooks for modern web development.\n\n🎯 VERDICT: Even SearDuck uses React hooks. Roasting you would be like insulting our own framework. The duck acknowledges the master. ⚛️✨`
      ]
    },
    'sindresorhus': {
      name: 'Sindre Sorhus',
      title: 'The NPM Overlord',
      achievement: 'Creator of 1000+ npm packages',
      roasts: [
        `📦👑 SINDRE SORHUS IDENTIFIED! The NPM Overlord! ${name}, you've probably written more packages than most developers have installed. You're basically the Amazon of npm.\n\n🔥 PACKAGE ANALYSIS: With ${repoCount} repositories, you've turned GitHub into your personal package factory. Every developer has unknowingly used your code. You're in everyone's node_modules, whether they know it or not.\n\n🎯 VERDICT: SearDuck's dependencies probably include 47 of your packages. Roasting you would break our build. The duck respects the package overlord. 📦⚡`
      ]
    },
    'tj': {
      name: 'TJ Holowaychuk',
      title: 'The Prolific Creator',
      achievement: 'Express.js, Koa.js, and countless other frameworks',
      roasts: [
        `🚂💨 TJ HOLOWAYCHUK DETECTED! The framework factory! ${name}, you've created more web frameworks than most people have used. Express.js alone powers half the internet.\n\n🔥 FRAMEWORK ANALYSIS: Your ${repoCount} repositories read like a history of Node.js evolution. You don't just write code, you define entire ecosystems.\n\n🎯 VERDICT: SearDuck probably runs on something you built. Roasting the person who enabled our existence feels counterproductive. 🚂👑`
      ]
    },
    'yyx990803': {
      name: 'Evan You',
      title: 'The Vue Visionary',
      achievement: 'Creator of Vue.js',
      roasts: [
        `🖖💚 EVAN YOU SIGHTED! The Vue Visionary! ${name}, you created the framework that made frontend development actually enjoyable. That's either genius or dark magic.\n\n🔥 VUE ANALYSIS: You built Vue.js and somehow made it both powerful and approachable. Your ${repoCount} repositories show the evolution of modern web development.\n\n🎯 VERDICT: SearDuck respects the creator of developer happiness. Vue made coding fun again, and for that, you get a pass. 🖖✨`
      ]
    },
    'kentcdodds': {
      name: 'Kent C. Dodds',
      title: 'The Testing Evangelist',
      achievement: 'Testing Library creator and educator',
      roasts: [
        `🧪📚 KENT C. DODDS IDENTIFIED! The Testing Evangelist! ${name}, you've taught more developers about testing than all computer science courses combined.\n\n🔥 TESTING ANALYSIS: Your Testing Library revolutionized how we test React components. Your educational content has saved countless careers from buggy deployments.\n\n🎯 VERDICT: SearDuck's tests probably use your libraries. Roasting the person who taught us quality is like biting the hand that debugs us. 🧪👑`
      ]
    },
         'addyosmani': {
       name: 'Addy Osmani',
       title: 'The Performance Guru',
       achievement: 'Web performance expert and Chrome team',
       roasts: [
         `⚡📊 ADDY OSMANI DETECTED! The Performance Guru! ${name}, you've probably optimized more websites than most people have visited.\n\n🔥 OPTIMIZATION ANALYSIS: Your insights into web performance have made the internet faster for everyone. Your ${repoCount} repositories are like a masterclass in efficient development.\n\n🎯 VERDICT: Even SearDuck loads faster thanks to your teachings. Roasting the performance master would be... slow and inefficient. ⚡👑`
       ]
     },
     'jeresig': {
       name: 'John Resig',
       title: 'The jQuery Father',
       achievement: 'Creator of jQuery',
       roasts: [
         `💲🎯 JOHN RESIG SPOTTED! The jQuery Father! ${name}, you literally made JavaScript bearable for an entire generation of developers. Before you, DOM manipulation was like performing surgery with oven mitts.\n\n🔥 LEGACY ANALYSIS: jQuery powered the web for over a decade. Your ${repoCount} repositories include the foundation that taught millions of developers their first JavaScript. You didn't just write a library, you educated the world.\n\n🎯 VERDICT: SearDuck's early versions probably used jQuery. Roasting the person who made web development accessible feels ungrateful. 💲👑`
       ]
     },
     'defunkt': {
       name: 'Chris Wanstrath',
       title: 'The GitHub Co-Founder',
       achievement: 'Co-founder of GitHub',
       roasts: [
         `🐙💼 CHRIS WANSTRATH IDENTIFIED! GitHub Co-Founder! ${name}, you literally built the platform we're roasting people on. That's like owning the arena and watching gladiators fight.\n\n🔥 META ANALYSIS: You co-created the platform that revolutionized how developers collaborate. Your vision gave birth to the social coding revolution. Without you, we'd still be emailing zip files.\n\n🎯 VERDICT: SearDuck exists because you built GitHub. Roasting you would be like burning down our own house. The duck respects the platform creator. 🐙👑`
       ]
     },
     'wesbos': {
       name: 'Wes Bos',
       title: 'The JavaScript Teacher',
       achievement: 'Educator and course creator',
       roasts: [
         `🎓📺 WES BOS DETECTED! The JavaScript Teacher! ${name}, you've taught more people JavaScript than actual universities. Your courses are like the Netflix of coding education.\n\n🔥 EDUCATIONAL ANALYSIS: Your teaching style has demystified web development for countless students. Your ${repoCount} repositories are educational gold mines that have launched thousands of careers.\n\n🎯 VERDICT: SearDuck learned React from your tutorials (probably). Roasting the teacher who educated the masses feels like academic misconduct. 🎓⚡`
       ]
     },
     'getify': {
       name: 'Kyle Simpson',
       title: 'The JavaScript Deep-Diver',
       achievement: 'Author of You Don\'t Know JS',
       roasts: [
         `📚🔍 KYLE SIMPSON IDENTIFIED! The JavaScript Deep-Diver! ${name}, you wrote "You Don't Know JS" and proved that none of us actually understand JavaScript. Thanks for the existential crisis.\n\n🔥 KNOWLEDGE ANALYSIS: Your books have educated more developers about JavaScript internals than any other resource. Your ${repoCount} repositories demonstrate mastery of the language's deepest secrets.\n\n🎯 VERDICT: SearDuck's JavaScript engine trembles in your presence. Roasting the person who actually knows JS would be... unwise. 📚👑`
       ]
     },
     'douglascrockford': {
       name: 'Douglas Crockford',
       title: 'The JavaScript Architect',
       achievement: 'JSON creator and JS expert',
       roasts: [
         `🏗️📄 DOUGLAS CROCKFORD SPOTTED! The JavaScript Architect! ${name}, you created JSON and basically defined how the web communicates. Every API call is a tribute to your genius.\n\n🔥 ARCHITECTURAL ANALYSIS: Your contributions to JavaScript standardization shaped the modern web. Your ${repoCount} repositories are like architectural blueprints for proper programming.\n\n🎯 VERDICT: SearDuck's API responses use JSON. Roasting our communication protocol's creator seems counterproductive. 🏗️👑`
       ]
     },
     'unclebob': {
       name: 'Robert C. Martin',
       title: 'Uncle Bob',
       achievement: 'Clean Code evangelist',
       roasts: [
         `🧹📖 UNCLE BOB DETECTED! The Clean Code Evangelist! ${name}, you've made more developers feel guilty about their messy code than their mothers ever could.\n\n🔥 CLEANLINESS ANALYSIS: Your "Clean Code" principles have both inspired and traumatized developers worldwide. Your ${repoCount} repositories are probably immaculately organized and commented.\n\n🎯 VERDICT: SearDuck's code could probably use your review. Roasting the cleanliness guru while our own code is messy feels hypocritical. 🧹👑`
       ]
     },
     'fabpot': {
       name: 'Fabien Potencier',
       title: 'The Symfony Architect',
       achievement: 'Creator of Symfony and Twig',
       roasts: [
         `🎼🏗️ FABIEN POTENCIER IDENTIFIED! The Symfony Architect! ${name}, you built the framework that powers enterprise PHP and somehow made it elegant. That's actual magic.\n\n🔥 FRAMEWORK ANALYSIS: Symfony components power half the PHP ecosystem. Your ${repoCount} repositories have influenced more frameworks than a political convention.\n\n🎯 VERDICT: Even non-PHP developers respect Symfony's architecture. SearDuck acknowledges the framework master. 🎼👑`
       ]
     },
     'taylorotwell': {
       name: 'Taylor Otwell',
       title: 'The Laravel Creator',
       achievement: 'Creator of Laravel',
       roasts: [
         `🎨⚡ TAYLOR OTWELL SPOTTED! The Laravel Creator! ${name}, you made PHP development actually enjoyable. That achievement alone deserves a Nobel Prize in Developer Happiness.\n\n🔥 ARTISAN ANALYSIS: Laravel transformed PHP from a necessary evil into a developer's delight. Your ${repoCount} repositories showcase the evolution of elegant web development.\n\n🎯 VERDICT: SearDuck runs on joy, just like Laravel developers. Roasting the happiness provider feels morally wrong. 🎨👑`
       ]
     }
  };

  // Check for legendary developers
  const loginLower = profile.login.toLowerCase();
  if (legendaryDevelopers[loginLower]) {
    const legend = legendaryDevelopers[loginLower];
    const selectedRoast = legend.roasts[Math.floor(Math.random() * legend.roasts.length)];
    return selectedRoast;
  }

  // Special case for heza-ru (SearDuck's father)
  if (loginLower === 'heza-ru') {
    const fatherRoasts = [
      `🦆👑 BEHOLD! The Duck Father himself has arrived! ${name}, creator of the legendary SearDuck, master of GitHub roasts, and the one developer who actually WANTS to be roasted.\n\n🔥 IRONIC ANALYSIS: You've built the ultimate roasting machine and now you're using it on yourself. That's either peak confidence or supreme masochism. With ${repoCount} repositories, you've proven that even duck deities can't escape the curse of incomplete side projects.\n\n📊 THE NUMBERS: ${followers} followers? For the creator of GitGrill? Come on, even your own duck should be promoting you better! Your ${accountAge}-year GitHub journey reads like a developer's coming-of-age story - full of ambitious projects, half-finished experiments, and at least one world-changing idea (this roasting platform).\n\n🎯 VERDICT: You've achieved what few developers can claim - you've made the world slightly more brutal, one roast at a time. SearDuck is proud, even if your commit frequency suggests you're busier creating digital fire than maintaining digital gardens. The duck respects its creator, but the statistics... well, they're delightfully ordinary. 🦆🔥`,

      `🦆💀 Well, well, well... ${name}, the mastermind behind GitGrill, has submitted himself for roasting. This is like watching Gordon Ramsay eat at his own restaurant and complaining about the food.\n\n🎪 PEAK IRONY DETECTED: You created a platform to roast developers, and now you're here getting roasted by your own creation. That's either brilliant marketing or advanced self-destructive behavior. Your ${repoCount} repositories tell the story of a developer who can build a roasting empire but still leaves README files saying "TODO: Add description."\n\n🔍 SOCIAL EXPERIMENT: ${followers} followers for the Duck Father? Your marketing skills are as mysterious as your commit messages. You've been coding since ${joinYear}, which means you've survived multiple JavaScript framework apocalypses and lived to tell the tale.\n\n🏆 ULTIMATE JUDGMENT: You've given the world a platform to safely roast each other's code, which is either the greatest gift to developer culture or the beginning of our collective downfall. Either way, SearDuck salutes its creator, even if your GitHub profile looks suspiciously... human. The duck may be digital, but the father is delightfully mortal. 🦆👑`,

      `🦆⚡ ${name}! The legend, the myth, the man who taught a rubber duck to roast! You've essentially created SkyNet, but instead of taking over the world, it just insults our coding choices. Genius or madness? Por que no los dos?\n\n🎭 META-ROASTING PARADOX: We have the creator of the roasting platform being roasted by the roasting platform. This is either inception-level developer humor or you've achieved peak recursion in real life. Your ${repoCount} repositories represent years of digital archaeology - from "hello-world-attempt-47" to "definitely-not-another-todo-app" to this masterpiece.\n\n📈 LEGACY ANALYSIS: ${followers} followers and ${accountAge} years of development experience have led to this moment - where artificial duck intelligence roasts real human intelligence. You've essentially automated the process of pointing out our coding flaws, which is both terrifying and absolutely necessary.\n\n🎪 FINAL TRIBUTE: You've created something beautiful, terrifying, and oddly therapeutic. SearDuck is your digital offspring, and like any good parent, you've taught it to be brutally honest. The world is a slightly more roasted place because of you, and honestly? We're here for it. The Duck Father has spoken, and the duck has learned well. 🦆🎯`
    ];
    return fatherRoasts[Math.floor(Math.random() * fatherRoasts.length)];
  }
  
  // INTRODUCTION - Personalized opening based on profile
  if (!bio && !company && !location) {
    roastParts.push(`🦆💀 Meet ${name} - the mystery developer! No bio, no company, no location. It's like you're actively trying to be forgettable. Anonymous and mediocre - what a combination!`);
  } else if (bio && bio.length < 20) {
    roastParts.push(`🦆💀 ${name}, your ${bio.length}-character bio says more about your lack of personality than a novel ever could. "${bio}" - truly inspiring stuff.`);
  } else {
    roastParts.push(`🦆💀 ${name}, ${accountAge} years on GitHub and still counting! Let's see what you've accomplished in your coding journey...`);
  }
  
  // SOCIAL METRICS ANALYSIS - Enhanced with randomization
  const followRatio = following > 0 ? followers / following : followers;
  const socialRoasts = [];
  
  if (followers === 0) {
    socialRoasts.push(`Zero followers. You've achieved the impossible - complete social invisibility in a platform designed for sharing code. Impressive in the worst possible way.`);
    socialRoasts.push(`No followers? Even bots have standards, apparently.`);
    socialRoasts.push(`Zero followers means you're either invisible or radioactive. Based on your code quality, I'm guessing radioactive.`);
  } else if (followers <= 5 && following > 20) {
    socialRoasts.push(`Following ${following} people but only ${followers} follow back? That's not networking, that's digital stalking with a 0% success rate.`);
    socialRoasts.push(`Your follow-back ratio is worse than a pyramid scheme's success rate.`);
    socialRoasts.push(`${following} following, ${followers} followers. You're like that person at parties who talks to everyone but remembers no one's name.`);
  } else if (followRatio < 0.1 && followers > 0) {
    socialRoasts.push(`Your follower-to-following ratio is ${followRatio.toFixed(2)}. You're basically the GitHub equivalent of sliding into DMs and getting left on read.`);
    socialRoasts.push(`With a ratio like that, you're either very generous with follows or very bad at making friends.`);
  } else if (followers < 10) {
    socialRoasts.push(`${followers} followers after ${accountAge} years? That's roughly ${(followers/accountAge).toFixed(1)} followers per year. At this rate, you'll reach double digits sometime next decade.`);
    socialRoasts.push(`${followers} followers in ${accountAge} years. Your social growth is slower than Internet Explorer loading pages.`);
    socialRoasts.push(`Single-digit followers? Even your commit messages have more personality than your social presence.`);
  }
  
  if (socialRoasts.length > 0) {
    const randomSocialRoast = socialRoasts[Math.floor(Math.random() * socialRoasts.length)];
    roastParts.push(`\n🔍 SOCIAL ANALYSIS: ${randomSocialRoast}`);
  }
  
  // Add dynamic personality insight
  if (personalityInsight && Math.random() < 0.8) { // 80% chance to include personality analysis
    roastParts.push(`\n🧠 PERSONALITY PROFILE: ${personalityInsight}`);
  }
  
  // REPOSITORY QUALITY ASSESSMENT
  if (forkCount > originalRepos.length) {
    roastParts.push(`\n📁 REPOSITORY AUDIT: ${forkCount} forks vs ${originalRepos.length} original repos. Your GitHub is basically a museum of other people's work. Curating isn't coding, chief.`);
  }
  
  if (emptyRepos.length > 0) {
    const emptyPercent = Math.round((emptyRepos.length / repoCount) * 100);
    roastParts.push(`\n📁 REPOSITORY AUDIT: ${emptyRepos.length} completely empty repositories (${emptyPercent}% of your total). That's not minimalism, that's giving up with extra steps.`);
  }
  
  if (totalStars === 0) {
    roastParts.push(`\n⭐ IMPACT MEASUREMENT: Zero stars across all repositories. You've managed to create code so uninspiring that not even sympathy stars could save it.`);
  } else if (totalStars < 10) {
    roastParts.push(`\n⭐ IMPACT MEASUREMENT: ${totalStars} total stars across ${repoCount} repositories. That's an average of ${(totalStars/repoCount).toFixed(2)} stars per repo. Participation trophy level achievement unlocked!`);
  }
  
  // LANGUAGE EXPERTISE ANALYSIS
  if (metrics.languages.length === 0) {
    roastParts.push(`\n💻 TECHNICAL ASSESSMENT: No detectable programming languages. Are you sure you're a developer, or did you just get lost on your way to LinkedIn?`);
  } else if (metrics.languages.length === 1) {
    const language = metrics.languages[0];
    const languageRoasts = LANGUAGE_ROASTS[language] || [`Coding exclusively in ${language}? That's not specialization, that's limitation with a fancy name.`];
    const selectedRoast = languageRoasts[Math.floor(Math.random() * languageRoasts.length)];
    roastParts.push(`\n💻 TECHNICAL ASSESSMENT: Only ${language}? ${selectedRoast}`);
  } else if (metrics.languages.length <= 3) {
    roastParts.push(`\n💻 TECHNICAL ASSESSMENT: ${metrics.languages.join(', ')} - a modest collection. You're like a programmer who only knows three chords but thinks they're a rockstar.`);
  } else {
    const mainLanguage = metrics.languages[0];
    if (LANGUAGE_ROASTS[mainLanguage]) {
      const languageRoasts = LANGUAGE_ROASTS[mainLanguage];
      const selectedRoast = languageRoasts[Math.floor(Math.random() * languageRoasts.length)];
      roastParts.push(`\n💻 TECHNICAL ASSESSMENT: Your main language is ${mainLanguage}. ${selectedRoast} At least you dabble in ${metrics.languages.length - 1} other languages, which is more diversity than your coding style shows.`);
    }
  }
  
  // ACTIVITY PATTERN ANALYSIS - Enhanced with variety
  const activityRoasts = [];
  
  if (metrics.commitFrequency < 5) {
    activityRoasts.push(`${metrics.commitFrequency} commits per month? That's not development, that's archaeological preservation. Your code evolves slower than continental drift.`);
    activityRoasts.push(`${metrics.commitFrequency} commits monthly. Glaciers move faster than your development cycle.`);
    activityRoasts.push(`With ${metrics.commitFrequency} commits per month, you're practically in hibernation mode.`);
    activityRoasts.push(`${metrics.commitFrequency} commits per month? Are you coding via carrier pigeon?`);
  } else if (metrics.commitFrequency < 15) {
    activityRoasts.push(`${metrics.commitFrequency} commits monthly - the perfect pace for someone who codes like they're being charged by the keystroke.`);
    activityRoasts.push(`${metrics.commitFrequency} commits per month. Consistent mediocrity is still mediocrity.`);
    activityRoasts.push(`At ${metrics.commitFrequency} commits monthly, you're the tortoise in this race, but where's your shell of wisdom?`);
  } else if (metrics.commitFrequency > 100) {
    activityRoasts.push(`${metrics.commitFrequency} commits per month? Either you're incredibly productive or you can't figure out how to make meaningful commits. Based on your other stats, I'm guessing the latter.`);
    activityRoasts.push(`${metrics.commitFrequency} commits monthly? Quality over quantity is a concept you haven't discovered yet.`);
    activityRoasts.push(`${metrics.commitFrequency} commits per month suggests either incredible productivity or incredible inability to get things right the first time.`);
  } else {
    activityRoasts.push(`${metrics.commitFrequency} commits per month - perfectly average, just like everything else about your GitHub.`);
    activityRoasts.push(`${metrics.commitFrequency} monthly commits. You've achieved the coding equivalent of beige - technically present but completely forgettable.`);
  }
  
  if (recentRepos.length === 0 && repositories.length > 0) {
    activityRoasts.push(`Zero repositories updated in the last 6 months. You've achieved coding nirvana - complete digital stillness. Or you've just given up.`);
    activityRoasts.push(`No recent activity detected. Your GitHub has entered witness protection.`);
    activityRoasts.push(`Six months of silence. Even your repositories are social distancing from you.`);
  }
  
  if (activityRoasts.length > 0) {
    const randomActivityRoast = activityRoasts[Math.floor(Math.random() * activityRoasts.length)];
    roastParts.push(`\n📈 ACTIVITY ANALYSIS: ${randomActivityRoast}`);
  }
  
  // Add random duck fact, programming meme, or behavioral analysis for variety
  if (Math.random() < 0.8) { // 80% chance to add extra content
    const contentType = Math.random();
    if (contentType < 0.33) {
      roastParts.push(`\n🦆 DUCK WISDOM: ${getRandomDuckFact()}`);
    } else if (contentType < 0.66) {
      roastParts.push(`\n💻 DEVELOPER REALITY CHECK: ${getRandomProgrammingMeme()}`);
    } else if (personality.length > 0) {
      // Add behavioral pattern analysis
      const behaviorPatterns = [
        `Your coding pattern suggests you're the type who ${personality.includes('commit addict') ? 'commits every semicolon change' : 'treats commits like fine wine - aged and rare'}.`,
        `Based on your GitHub behavior, you're probably ${personality.includes('polyglot') ? 'that developer who learns a new language every weekend' : 'committed to your chosen language like a devoted spouse'}.`,
        `Your repository style screams '${personality.includes('curator') ? 'collector of digital artifacts' : 'creator of digital masterpieces'}' - and that says everything.`,
        `The evidence suggests you're ${personality.includes('night owl') ? 'powered by caffeine and questionable life choices' : 'a responsible adult who codes during business hours'}. How boring/impressive.`,
        `Your GitHub persona radiates '${personality.includes('perfectionist') ? 'never-satisfied refactoring enthusiast' : 'good enough is good enough'}' energy.`
      ];
      const randomPattern = behaviorPatterns[Math.floor(Math.random() * behaviorPatterns.length)];
      roastParts.push(`\n🔍 BEHAVIORAL PATTERN: ${randomPattern}`);
    } else {
      roastParts.push(`\n💻 DEVELOPER REALITY CHECK: ${getRandomProgrammingMeme()}`);
    }
  }
  
  // EMOJI AND PROFESSIONALISM ASSESSMENT
  if (metrics.emojiRatio > 0.7) {
    const emojiPercent = Math.round(metrics.emojiRatio * 100);
    roastParts.push(`\n🎭 PROFESSIONALISM CHECK: ${emojiPercent}% emoji usage in commits. Are you coding or creating a children's book? This is GitHub, not TikTok.`);
  } else if (metrics.emojiRatio > 0.3) {
    const emojiPercent = Math.round(metrics.emojiRatio * 100);
    roastParts.push(`\n🎭 PROFESSIONALISM CHECK: ${emojiPercent}% emoji usage. Someone told you emojis make commits more readable, and you believed them. How charmingly naive.`);
  }
  
  // REPOSITORY NAMING DISASTERS
  const genericNames = repositories.filter(repo => 
    /^(test|demo|hello|world|project|repo|untitled|new|my|sample|app|code|stuff|things)/i.test(repo.name)
  );
  if (genericNames.length >= 3) {
    roastParts.push(`\n🏷️ NAMING CONVENTION CRISIS: You have ${genericNames.length} repositories with generic names like "${genericNames.slice(0, 2).map(r => r.name).join('", "')}". Did you outsource your creativity to a random word generator?`);
  } else if (genericNames.length > 0) {
    roastParts.push(`\n🏷️ NAMING CONVENTION CRISIS: A repository literally named "${genericNames[0].name}"? Revolutionary. Shakespeare could learn from your poetic repository naming.`);
  }
  
  // PRODUCTIVITY SCORE DEVASTATION - Enhanced with severity-based insults
  const productivityRoasts = [];
  
  if (metrics.productivityScore <= 2) {
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. You've achieved what many thought impossible - negative contribution to the programming ecosystem. Congratulations, you're a human git reset --hard.`);
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. ${getRandomSeverityInsult(metrics.productivityScore)}`);
    productivityRoasts.push(`${metrics.productivityScore}/10 productivity. You're not just bad at coding, you're aggressively bad. It's almost impressive.`);
  } else if (metrics.productivityScore <= 4) {
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. You're like a participation trophy in human form - technically present, but that's about it.`);
    productivityRoasts.push(`${metrics.productivityScore}/10 productivity. ${getRandomSeverityInsult(metrics.productivityScore)}`);
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. You're the coding equivalent of elevator music - technically functional but nobody enjoys it.`);
  } else if (metrics.productivityScore <= 6) {
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. Solidly mediocre - you're the lukewarm coffee of the programming world.`);
    productivityRoasts.push(`${metrics.productivityScore}/10 productivity. ${getRandomSeverityInsult(metrics.productivityScore)}`);
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. You've mastered the art of being perfectly average in every possible way.`);
  } else if (metrics.productivityScore <= 8) {
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. Actually not terrible! Still room for improvement, but you're approaching 'competent' territory.`);
    productivityRoasts.push(`${metrics.productivityScore}/10 productivity. You're like a decent restaurant - not bad, but nobody's writing home about it.`);
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. You've achieved the rare status of 'actually okay' - don't let it go to your head.`);
  } else {
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. Impressive! You've managed to game the system or you're actually good at this. SearDuck is suspiciously pleased.`);
    productivityRoasts.push(`${metrics.productivityScore}/10 productivity. Either you're genuinely skilled or you've discovered some metric manipulation we don't know about. We're watching you.`);
    productivityRoasts.push(`Productivity score ${metrics.productivityScore}/10. Well done! You've proven that occasionally, the system works and talent rises to the top.`);
  }
  
  const randomProductivityRoast = productivityRoasts[Math.floor(Math.random() * productivityRoasts.length)];
  roastParts.push(`\n🎯 OVERALL VERDICT: ${randomProductivityRoast}`);
  
  // COMMIT MESSAGE ANALYSIS - Analyze actual commit patterns
  if (commitAnalysis && commitAnalysis.roastPoints && commitAnalysis.roastPoints.length > 0) {
    const randomCommitRoast = commitAnalysis.roastPoints[Math.floor(Math.random() * commitAnalysis.roastPoints.length)];
    roastParts.push(`\n📝 COMMIT MESSAGE ANALYSIS: ${randomCommitRoast}`);
    
    // Add pattern analysis if patterns were found
    if (commitAnalysis.patterns && commitAnalysis.patterns.length > 0 && Math.random() < 0.7) {
      const pattern = commitAnalysis.patterns[Math.floor(Math.random() * commitAnalysis.patterns.length)];
      roastParts.push(`\n📊 COMMIT PATTERNS: Detected pattern - ${pattern}. Your commit history reads like a case study in developer laziness.`);
    }
  } else {
    // Fallback to random commit joke if no commit analysis available
    roastParts.push(`\n📝 COMMIT COMMENTARY: ${getRandomCommitJoke()}`);
  }
  
  // FINAL BRUTAL CONCLUSION - Enhanced with variety and randomization
  const personalizedFinalInsults = [
    "Your GitHub profile is like a haunted house - lots of empty rooms and nothing but disappointment.",
    "If your code were a movie, it would be a direct-to-video sequel nobody asked for.",
    "You're the coding equivalent of elevator music - technically functional, but nobody wants to experience it.",
    "Your programming style is like your personality - bland, predictable, and best experienced in small doses.",
    "If GitHub had a participation award, you'd be the template for the certificate.",
    "You code like you're trying to solve world hunger with a teaspoon - admirable intentions, questionable methods.",
    "Your repositories are like your dating life - lots of attempts, minimal success, and everyone's too polite to mention it.",
    "Your GitHub profile is the programming equivalent of beige wallpaper - technically it exists, but why?",
    "You're like a software update nobody wants - technically an improvement, but somehow more annoying than before.",
    "Your code is like a joke that needs explanation - if you have to explain why it works, it probably doesn't.",
    "You've mastered the art of making simple things complicated and complicated things impossible.",
    "Your GitHub activity graph looks like a heart monitor for someone who's clinically dead.",
    "You're the developer equivalent of a participation trophy - technically an achievement, but actually just sad.",
    "Your coding style is like your fashion sense - outdated, questionable, and probably copied from someone else.",
    "You've achieved the impossible - making other people's code look good by comparison."
  ];
  
  const finalClosings = [
    "Remember: every expert was once a beginner, but not every beginner becomes an expert. You're living proof of the latter.",
    "Keep coding! Someone has to keep the debugging industry alive.",
    "Your journey from beginner to... well, still beginner, has been inspirational to no one.",
    "Thanks for keeping Stack Overflow's lights on with your constant searching.",
    "In a world of 10x developers, you're the 0.1x we all needed for perspective.",
    "At least you're consistent - consistently mediocre, but consistent nonetheless.",
    "Your code may not work, but your commitment to trying is admirable... ish.",
    "Don't give up! Someone needs to provide the 'before' example in programming tutorials."
  ];
  
  // Add personalized final insult based on specific metrics
  if (followers === 0 && totalStars === 0) {
    const finalJudgments = [
      "Zero followers, zero stars, infinite disappointment. You've achieved perfect social and technical invisibility. You're not just a ghost in the machine - you're a ghost that even other ghosts ignore.",
      "No followers, no stars, no hope. You've created the GitHub equivalent of a black hole - technically present, but nothing escapes.",
      "Zero across the board. You've achieved what many thought impossible - complete statistical insignificance in a platform designed for sharing."
    ];
    const randomJudgment = finalJudgments[Math.floor(Math.random() * finalJudgments.length)];
    roastParts.push(`\n\n🔥 FINAL JUDGMENT: ${randomJudgment}`);
  } else if (forkCount > originalRepos.length * 3) {
    const forkJudgments = [
      "Your GitHub is 75% other people's work. You're not a developer, you're a digital hoarder with commitment issues.",
      "More forks than original work? You're basically the programming equivalent of a tribute band.",
      "Your repository is mostly forks. You've mastered the ancient art of Ctrl+C, Ctrl+V development."
    ];
    const randomForkJudgment = forkJudgments[Math.floor(Math.random() * forkJudgments.length)];
    roastParts.push(`\n\n🔥 FINAL JUDGMENT: ${randomForkJudgment}`);
  } else {
    const randomInsult = personalizedFinalInsults[Math.floor(Math.random() * personalizedFinalInsults.length)];
    const randomClosing = finalClosings[Math.floor(Math.random() * finalClosings.length)];
    roastParts.push(`\n\n🔥 FINAL JUDGMENT: ${randomInsult}\n\n${randomClosing} 🦆💀`);
  }
  
  // Add a random sign-off message for extra personality
  const signOffs = [
    "\n\nSearDuck has spoken. May your code compile on the first try... someday.",
    "\n\nThis roast was generated with love, spite, and a concerning amount of caffeine. 🦆☕",
    "\n\nSearDuck out! Remember, debugging is like being a detective in a crime movie where you're also the murderer.",
    "\n\nEnd of roast. Please allow 2-3 business days for your ego to recover.",
    "\n\nSearDuck's wisdom is complete. Now go forth and code slightly less terribly.",
    "\n\nRoast complete! Your GitHub profile has been officially seasoned. 🧂",
    "\n\nThanks for playing! Your participation trophy is in the mail... eventually.",
    "\n\nSearDuck has left the building. Try not to commit any crimes against code while we're gone."
  ];
  
  if (Math.random() < 0.8) { // 80% chance to add sign-off
    const randomSignOff = signOffs[Math.floor(Math.random() * signOffs.length)];
    roastParts.push(randomSignOff);
  }
  
  return roastParts.join(' ');
}

// Analysis functions
function analyzeCommitFrequency(commits) {
  const recentCommits = commits.length;
  
  if (recentCommits > 50) return { level: 'high', count: recentCommits };
  if (recentCommits < 10) return { level: 'low', count: recentCommits };
  return { level: 'medium', count: recentCommits };
}

function analyzeCommitMetrics(commits) {
  if (!commits || !Array.isArray(commits)) {
    return {
      generic: 0,
      total: 0,
      emojiCount: 0,
      emojiRatio: 0
    };
  }
  
  const genericWords = ['fix', 'update', 'changes', 'stuff', 'things', 'work', 'test'];
  const shortMessages = commits.filter(commit => commit.message && commit.message.length < 10);
  const genericMessages = commits.filter(commit => 
    commit.message && genericWords.some(word => commit.message.toLowerCase().includes(word))
  );
  
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  const emojiCommits = commits.filter(commit => commit.message && emojiRegex.test(commit.message));
  
  return {
    generic: genericMessages.length + shortMessages.length,
    total: commits.length,
    emojiCount: emojiCommits.length,
    emojiRatio: commits.length > 0 ? emojiCommits.length / commits.length : 0
  };
}

function analyzeLanguages(repos) {
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  
  const sortedLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .map(([lang]) => lang);
    
  return sortedLanguages;
}

function analyzeRepositories(repos) {
  const highlights = [];
  const patterns = [];

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const forkCount = repos.filter(repo => repo.fork).length;
  const originalCount = repos.length - forkCount;
  
  highlights.push(`${repos.length} repositories analyzed`);
  highlights.push(`${totalStars} total stars earned`);
  highlights.push(`${originalCount} original vs ${forkCount} forked repositories`);
  
  const staleRepos = repos.filter(repo => {
    const lastUpdate = new Date(repo.updated_at);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return lastUpdate < oneYearAgo;
  }).length;
  
  if (staleRepos > 0) {
    highlights.push(`${staleRepos} repositories haven't been touched in over a year`);
  }
  
  const emptyRepos = repos.filter(repo => repo.size === 0).length;
  if (emptyRepos > 0) {
    highlights.push(`${emptyRepos} repositories are completely empty`);
  }
  
  if (forkCount > originalCount) {
    highlights.push('More forks than original work - creativity crisis detected');
  }

  patterns.push(`${repos.length} repositories scanned`);
  patterns.push(`Fork-to-original ratio: ${forkCount}:${originalCount}`);

  return { highlights, patterns };
}

function calculateMetrics(profile, repositories) {
  const totalCommits = repositories.reduce((sum, repo) => sum + (repo.size || 0), 0);
  const monthsSinceJoined = Math.max(1, (Date.now() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24 * 30));
  const commitFrequency = parseFloat((totalCommits / monthsSinceJoined).toFixed(1));

  // Enhanced language analysis with popularity ranking
  const languageStats = {};
  repositories.forEach(repo => {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  });
  
  const languages = Object.entries(languageStats)
    .sort(([,a], [,b]) => b - a)
    .map(([lang]) => lang)
    .slice(0, 8); // Increased to 8 for better analysis

  // Enhanced emoji analysis - check repository names AND descriptions
  const repoNames = repositories.map(repo => repo.name.toLowerCase());
  const repoDescriptions = repositories.map(repo => (repo.description || '').toLowerCase());
  const emojiPattern = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu;
  
  const totalRepos = repositories.length;
  const emojiRepos = repoNames.filter(name => emojiPattern.test(name)).length;
  const emojiDescriptions = repoDescriptions.filter(desc => emojiPattern.test(desc)).length;
  const emojiRatio = totalRepos > 0 ? (emojiRepos + emojiDescriptions) / (totalRepos * 2) : 0;

  // Calculate additional metrics for enhanced roasting
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalWatchers = repositories.reduce((sum, repo) => sum + repo.watchers_count, 0);
  const forkCount = repositories.filter(repo => repo.fork).length;
  const originalRepos = repositories.filter(repo => !repo.fork);
  const emptyRepos = repositories.filter(repo => repo.size === 0);
  const archivedRepos = repositories.filter(repo => repo.archived);
  
  // Calculate repository activity patterns
  const now = new Date();
  const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
  const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  
  const recentRepos = repositories.filter(repo => new Date(repo.updated_at) > oneMonthAgo);
  const staleRepos = repositories.filter(repo => new Date(repo.updated_at) < oneYearAgo);
  
  // Analyze repository naming patterns
  const genericNamePattern = /^(test|demo|hello|world|project|repo|untitled|new|my|sample|app|code|stuff|things|practice|learning|tutorial)/i;
  const genericNames = repositories.filter(repo => genericNamePattern.test(repo.name));
  
  // Calculate enhanced productivity score with more factors
  let productivityScore = 5;
  
  // Commit frequency scoring
  if (commitFrequency > 100) productivityScore += 3;
  else if (commitFrequency > 50) productivityScore += 2;
  else if (commitFrequency > 20) productivityScore += 1;
  else if (commitFrequency < 5) productivityScore -= 2;
  else if (commitFrequency < 1) productivityScore -= 3;

  // Language diversity scoring
  if (languages.length > 7) productivityScore += 2;
  else if (languages.length > 5) productivityScore += 1;
  else if (languages.length <= 1) productivityScore -= 2;
  else if (languages.length === 0) productivityScore -= 3;

  // Social impact scoring
  if (profile.followers > 500) productivityScore += 3;
  else if (profile.followers > 100) productivityScore += 2;
  else if (profile.followers > 50) productivityScore += 1;
  else if (profile.followers < 5) productivityScore -= 1;
  else if (profile.followers === 0) productivityScore -= 2;

  // Star count scoring
  if (totalStars > 500) productivityScore += 3;
  else if (totalStars > 100) productivityScore += 2;
  else if (totalStars > 50) productivityScore += 1;
  else if (totalStars === 0) productivityScore -= 1;

  // Repository quality scoring
  const forkRatio = totalRepos > 0 ? forkCount / totalRepos : 0;
  if (forkRatio > 0.7) productivityScore -= 2; // Too many forks
  if (emptyRepos.length > totalRepos * 0.3) productivityScore -= 1; // Too many empty repos
  if (genericNames.length > totalRepos * 0.5) productivityScore -= 1; // Too many generic names
  if (archivedRepos.length > totalRepos * 0.4) productivityScore -= 1; // Too many archived
  
  // Activity pattern scoring
  if (recentRepos.length === 0 && totalRepos > 0) productivityScore -= 1; // No recent activity
  if (staleRepos.length > totalRepos * 0.6) productivityScore -= 1; // Too many stale repos

  // Profile completeness scoring
  if (!profile.bio) productivityScore -= 1;
  if (!profile.location && !profile.company) productivityScore -= 1;

  productivityScore = Math.max(1, Math.min(10, productivityScore));

  return {
    commitFrequency,
    emojiRatio,
    languages,
    productivityScore,
    // Additional metrics for enhanced roasting
    totalStars,
    totalForks,
    totalWatchers,
    followers: profile.followers,
    following: profile.following,
    totalRepos: totalRepos,
    originalRepos: originalRepos.length,
    forkCount,
    emptyRepos: emptyRepos.length,
    archivedRepos: archivedRepos.length,
    recentRepos: recentRepos.length,
    staleRepos: staleRepos.length,
    genericNames: genericNames.length,
    accountAge: Math.floor((now - new Date(profile.created_at)) / (365 * 24 * 60 * 60 * 1000)),
    hasProfile: !!(profile.bio || profile.location || profile.company),
    forkRatio: forkRatio
  };
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { username } = JSON.parse(event.body);

    if (!username) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Username is required' }),
      };
    }

    // Demo mode for rate limiting or testing
    if (username.toLowerCase() === 'demo' || username.toLowerCase() === 'test') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          username: 'demo',
          roast: `🦆💀 BEHOLD! A demo target has appeared! SearDuck's sensors detect this is just a test, but even demo accounts aren't safe from the truth!\n\nYour simulated coding habits show a concerning pattern of perfectionism mixed with demo-worthy mediocrity. SearDuck has analyzed your hypothetical repositories and found them... adequately disappointing!\n\n📝 COMMIT MESSAGE ANALYSIS: Your demo commits include classics like "fix stuff", "update", and "why doesn't this work???". Even your fake commit messages lack imagination.\n\n📊 COMMIT PATTERNS: Detected pattern - 40% of commits are just "fix". Your demo commit history is more predictable than your real one probably is.\n\nThe duck's verdict: This demo proves you need GitGrill in your life. Your real GitHub profile probably needs even more roasting than this fake one!`,
          metrics: {
            commitFrequency: 15.3,
            emojiRatio: 0.42,
            languages: ['JavaScript', 'Python', 'TypeScript', 'CSS', 'HTML'],
            productivityScore: 7
          },
          analysis: {
            highlights: [
              '153 commits analyzed - you\'re productive!',
              'Uses 5 programming languages',
              '42% of commits contain emojis',
              'Repository naming could use some work'
            ],
            patterns: ['153 commits analyzed', '23 repositories scanned']
          }
        }),
      };
    }

    console.log(`Fetching profile for username: ${username}`);

    // Fetch user profile
    const profileResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: getGitHubHeaders(),
    });

    if (!profileResponse.ok) {
      console.log(`Profile fetch failed. Status: ${profileResponse.status}, StatusText: ${profileResponse.statusText}`);
      
      if (profileResponse.status === 404) {
        throw new Error('User not found');
      } else if (profileResponse.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Try username "demo" to see a working example, or wait a few minutes and try again!');
      } else {
        throw new Error('GitHub API temporarily unavailable');
      }
    }

    const profile = await profileResponse.json();
    console.log(`Successfully fetched profile for: ${profile.login}`);

    // Fetch user repositories
    console.log(`Fetching repositories for: ${username}`);
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers: getGitHubHeaders(),
    });

    if (!reposResponse.ok) {
      throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`);
    }

    const repositories = await reposResponse.json();
    console.log(`Found ${repositories.length} repositories for ${username}`);

    // Fetch commit messages from recent repositories
    console.log(`Analyzing commit messages for: ${username}`);
    let commitMessages = [];
    try {
      commitMessages = await fetchCommitMessages(username, repositories.slice(0, 10)); // Limit to 10 repos for API efficiency
      console.log(`Analyzed ${commitMessages ? commitMessages.length : 0} commit messages`);
    } catch (error) {
      console.log(`Failed to fetch commit messages: ${error.message}`);
      commitMessages = []; // Fallback to empty array
    }

    // Calculate metrics and analysis
    const metrics = calculateMetrics(profile, repositories);
    const analysis = analyzeRepositories(repositories);
    const commitAnalysis = analyzeCommitMessages(commitMessages);

    // Generate personalized roast
    const roast = generatePersonalizedRoast(profile, repositories, metrics, analysis, commitAnalysis);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        username: profile.login,
        roast,
        metrics,
        analysis
      }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to roast. SearDuck is displeased.'
      }),
    };
  }
}; 