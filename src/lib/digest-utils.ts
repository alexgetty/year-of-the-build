/**
 * Utility functions for calculating digest week coverage and linking content.
 *
 * Digests have a pubDate which is typically Sunday. A digest covers the week
 * ending on that Sunday (Mon-Sun inclusive).
 */

interface HasPubDate {
	data: { pubDate: Date };
}

interface HasPubDateAndProject {
	data: { pubDate: Date; project: string };
}

/**
 * Given a digest's pubDate (typically Sunday), returns the date range
 * for that digest's coverage period (Mon-Sun of that week).
 */
export function getDigestDateRange(digestPubDate: Date): {
	start: Date;
	end: Date;
} {
	// End is the digest pubDate (Sunday end of day)
	const end = new Date(digestPubDate);
	end.setUTCHours(23, 59, 59, 999);

	// Start is 6 days before (Monday start of day)
	const start = new Date(digestPubDate);
	start.setUTCDate(start.getUTCDate() - 6);
	start.setUTCHours(0, 0, 0, 0);

	return { start, end };
}

/**
 * Checks if a given date falls within a digest's coverage period.
 */
export function isDateInDigestWeek(date: Date, digestPubDate: Date): boolean {
	const { start, end } = getDigestDateRange(digestPubDate);
	return date >= start && date <= end;
}

/**
 * Given a devlog pubDate, finds which digest (if any) covers that date.
 */
export function findDigestForDate<T extends HasPubDate>(
	date: Date,
	digests: T[]
): T | undefined {
	return digests.find((d) => isDateInDigestWeek(date, d.data.pubDate));
}

/**
 * Given a digest, returns all devlogs that fall within its coverage period.
 */
export function getDevlogsForDigest<T extends HasPubDate>(
	digestPubDate: Date,
	devlogs: T[]
): T[] {
	return devlogs.filter((d) => isDateInDigestWeek(d.data.pubDate, digestPubDate));
}

/**
 * Given a project slug and devlogs, finds all digests that covered this project.
 */
export function getDigestsForProject<
	D extends HasPubDateAndProject,
	G extends HasPubDate
>(projectSlug: string, devlogs: D[], digests: G[]): G[] {
	// Get all devlogs for this project
	const projectDevlogs = devlogs.filter((d) => d.data.project === projectSlug);

	// Find unique digests that cover any of these devlogs
	const digestSet = new Set<G>();
	for (const devlog of projectDevlogs) {
		const digest = findDigestForDate(devlog.data.pubDate, digests);
		if (digest) {
			digestSet.add(digest);
		}
	}

	return Array.from(digestSet);
}
