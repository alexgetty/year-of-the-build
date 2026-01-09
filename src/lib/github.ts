/**
 * GitHub contribution data fetching utility
 * Fetches contribution calendar data at build time via GitHub GraphQL API
 */

export interface ContributionDay {
  date: string;
  contributionCount: number;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubContributionData {
  calendar: ContributionCalendar;
  fetchedAt: string;
}

const GITHUB_GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

const CONTRIBUTION_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

/**
 * Fetches GitHub contribution data for a user
 * Requires GITHUB_TOKEN environment variable
 */
export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributionData | null> {
  const token = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn(
      '[ActivityGrid] GITHUB_TOKEN not found. Contribution grid will be empty.'
    );
    return null;
  }

  try {
    const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: CONTRIBUTION_QUERY,
        variables: { username },
      }),
    });

    if (!response.ok) {
      console.error(
        `[ActivityGrid] GitHub API error: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();

    if (data.errors) {
      console.error('[ActivityGrid] GraphQL errors:', data.errors);
      return null;
    }

    const calendar = data.data?.user?.contributionsCollection?.contributionCalendar;

    if (!calendar) {
      console.error('[ActivityGrid] No contribution data found for user:', username);
      return null;
    }

    return {
      calendar,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('[ActivityGrid] Failed to fetch contributions:', error);
    return null;
  }
}

/**
 * Returns the intensity level (0-4) for a contribution count
 * Used for color mapping in the grid
 */
export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

/**
 * Formats a date string for display in tooltip
 */
export function formatContributionDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00Z');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
