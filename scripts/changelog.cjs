#!/usr/bin/env node

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONFIG_PATH = path.join(ROOT, 'projects.json');
const DRAFTS_DIR = path.join(ROOT, 'drafts');

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    project: null,
    days: null,
    since: null,
    until: null,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--project':
      case '-p':
        options.project = args[++i];
        break;
      case '--days':
      case '-d':
        options.days = parseInt(args[++i], 10);
        break;
      case '--since':
        options.since = args[++i];
        break;
      case '--until':
        options.until = args[++i];
        break;
      case '--help':
      case '-h':
        console.log(`
Usage: node changelog.js [options]

Options:
  -p, --project <name>  Target a specific project by name
  -d, --days <n>        Look back N days (default: from projects.json)
  --since <date>        Start date (YYYY-MM-DD)
  --until <date>        End date (YYYY-MM-DD, default: today)
  -h, --help            Show this help

Examples:
  node changelog.js                     # All projects, default days
  node changelog.js -p YOTB             # Just YOTB project
  node changelog.js -p YOTB -d 14       # YOTB, last 14 days
  node changelog.js --since 2026-01-01  # All projects since Jan 1
  node changelog.js -p YOTB --since 2026-01-01 --until 2026-01-07
`);
        process.exit(0);
    }
  }

  return options;
}

function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('Error: projects.json not found');
    process.exit(1);
  }

  const raw = fs.readFileSync(CONFIG_PATH, 'utf8');
  const config = JSON.parse(raw);

  if (!config.projects || !Array.isArray(config.projects)) {
    console.error('Error: projects.json must have a "projects" array');
    process.exit(1);
  }

  return config;
}

function isGitRepo(dir) {
  const gitDir = path.join(dir, '.git');
  return fs.existsSync(gitDir);
}

function getCommits(repoPath, { daysBack, since, until }) {
  const gitArgs = [
    'log',
    '--date=format:%Y-%m-%d',
    '--pretty=format:%h|%ad|%s|%b|--COMMIT_END--'
  ];

  if (since) {
    gitArgs.push(`--since=${since}`);
  } else if (daysBack) {
    gitArgs.push(`--since=${daysBack} days ago`);
  }

  if (until) {
    gitArgs.push(`--until=${until}`);
  }

  try {
    const logOutput = execFileSync('git', gitArgs, {
      cwd: repoPath,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    if (!logOutput.trim()) {
      return [];
    }

    const commits = [];
    const rawCommits = logOutput.split('--COMMIT_END--').filter(c => c.trim());

    for (const raw of rawCommits) {
      const parts = raw.trim().split('|');
      if (parts.length < 3) continue;

      const hash = parts[0];
      const date = parts[1];
      const subject = parts[2];
      const body = parts.slice(3).join('|').replace(/\|+$/, '').trim();

      commits.push({ hash, date, subject, body });
    }

    // Get files changed for each commit
    for (const commit of commits) {
      try {
        const files = execFileSync('git', [
          'show',
          '--name-only',
          '--pretty=format:',
          commit.hash
        ], { cwd: repoPath, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
        commit.files = files.trim().split('\n').filter(f => f.trim());
      } catch {
        commit.files = [];
      }
    }

    return commits;
  } catch (err) {
    // No commits in range or other git error
    return [];
  }
}

function formatDate(date) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function generateMarkdown(projectsData, { daysBack, since, until }) {
  const now = new Date();
  let start, end;

  if (since) {
    start = new Date(since);
  } else {
    start = new Date(now);
    start.setDate(start.getDate() - (daysBack || 7));
  }

  end = until ? new Date(until) : now;

  // Calculate total commits across all projects
  const totalCommits = projectsData.reduce((sum, p) => sum + p.commits.length, 0);

  let md = `# Commits: ${formatDate(start)} - ${formatDate(end)}\n\n`;
  md += `> **Total commits: ${totalCommits}** (add to devlog frontmatter as \`commitCount: ${totalCommits}\`)\n\n`;

  let hasContent = false;

  for (const { name, commits } of projectsData) {
    if (commits.length === 0) continue;

    hasContent = true;
    md += `## ${name} (${commits.length} commits)\n\n`;

    const allFiles = new Set();

    for (const commit of commits) {
      md += `- \`${commit.hash}\` | ${commit.date} | ${commit.subject}\n`;

      if (commit.body) {
        // Indent body text
        const bodyLines = commit.body.split('\n').filter(l => l.trim());
        for (const line of bodyLines) {
          md += `  ${line}\n`;
        }
      }

      commit.files.forEach(f => allFiles.add(f));
    }

    if (allFiles.size > 0) {
      md += `\nFiles changed: ${Array.from(allFiles).join(', ')}\n`;
    }

    md += '\n';
  }

  if (!hasContent) {
    md += '*No commits found in the specified time range.*\n\n';
  }

  md += `---\n*Generated by YOTB changelog script*\n`;

  return { markdown: md, totalCommits };
}

function main() {
  const options = parseArgs();
  const config = loadConfig();
  const { projects } = config;
  const daysBack = options.days ?? config.daysBack ?? 7;

  // Filter to specific project if requested
  const targetProjects = options.project
    ? projects.filter(p => p.name.toLowerCase() === options.project.toLowerCase())
    : projects;

  if (options.project && targetProjects.length === 0) {
    console.error(`Error: Project "${options.project}" not found in projects.json`);
    console.log('Available projects:', projects.map(p => p.name).join(', '));
    process.exit(1);
  }

  if (targetProjects.length === 0) {
    console.log('No projects configured in projects.json');
    console.log('Add project paths to the "projects" array to get started.');
    process.exit(0);
  }

  // Ensure drafts directory exists
  if (!fs.existsSync(DRAFTS_DIR)) {
    fs.mkdirSync(DRAFTS_DIR, { recursive: true });
  }

  const projectsData = [];
  const queryOptions = {
    daysBack,
    since: options.since,
    until: options.until,
  };

  for (const project of targetProjects) {
    const repoPath = project.path.startsWith('/')
      ? project.path
      : path.resolve(ROOT, project.path);

    if (!fs.existsSync(repoPath)) {
      console.warn(`Skipping ${project.name}: path does not exist (${repoPath})`);
      continue;
    }

    if (!isGitRepo(repoPath)) {
      console.warn(`Skipping ${project.name}: not a git repository (${repoPath})`);
      continue;
    }

    const commits = getCommits(repoPath, queryOptions);
    console.log(`${project.name}: ${commits.length} commits`);

    projectsData.push({
      name: project.name,
      commits
    });
  }

  const { markdown, totalCommits } = generateMarkdown(projectsData, queryOptions);

  // Output filename with today's date and optional project name
  const today = new Date().toISOString().split('T')[0];
  const suffix = options.project ? `-${options.project.toLowerCase()}` : '';
  const outputPath = path.join(DRAFTS_DIR, `commits-${today}${suffix}.md`);

  fs.writeFileSync(outputPath, markdown);
  console.log(`\nWritten to: ${outputPath}`);
  console.log(`\n📊 Total commits: ${totalCommits}`);
  console.log(`   Add to devlog frontmatter: commitCount: ${totalCommits}`);
}

main();
