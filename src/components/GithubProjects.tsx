import { Star, GitFork, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import styles from './FeaturedProjects.module.css'; // Reuse styles for consistency

async function getGithubRepos() {
  try {
    const res = await fetch('https://api.github.com/users/nitin-code6/repos?sort=updated&per_page=6', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: process.env.GITHUB_TOKEN ? {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      } : {}
    });

    if (!res.ok) {
      return [];
    }

    const repos = await res.json();
    
    // Filter out forks and featured projects (already displayed)
    const featuredNames = ['CodeArena', 'Deep-Packet-Inspection', 'FerryFlow'];
    return repos
      .filter((repo: any) => !repo.fork && !featuredNames.includes(repo.name) && repo.description)
      .slice(0, 6);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export default async function GithubProjects() {
  const repos = await getGithubRepos();

  if (!repos || repos.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '4rem' }}>
      <h3 className={styles.subTitle}>Other Projects (GitHub Auto-Synced)</h3>
      <div className={styles.grid}>
        {repos.map((repo: any) => (
          <div key={repo.id} className={`glass-panel ${styles.projectCard}`}>
            <div className={styles.cardHeader}>
              <h4 style={{ wordBreak: 'break-word' }}>{repo.name}</h4>
              <div className={styles.links}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={20} />
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>
            
            <p className={styles.description}>
              {repo.description}
            </p>
            
            <div className={styles.techStack} style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
              {repo.language && (
                <span className={styles.techTag} style={{ background: 'var(--glass-bg)', color: 'var(--foreground)' }}>
                  {repo.language}
                </span>
              )}
              <span className={styles.techTag} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', color: 'var(--text-muted)' }}>
                <Star size={14} /> {repo.stargazers_count}
              </span>
              <span className={styles.techTag} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'transparent', color: 'var(--text-muted)' }}>
                <GitFork size={14} /> {repo.forks_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
