import { Star, GitFork, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import styles from './FeaturedProjects.module.css'; // We'll share some styles but override specifics

async function getGithubRepos() {
  try {
    const res = await fetch('https://api.github.com/users/nitin-code6/repos?sort=updated&per_page=10', {
      next: { revalidate: 3600 },
      headers: process.env.GITHUB_TOKEN ? {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      } : {}
    });

    if (!res.ok) {
      console.warn("GitHub API fetch failed. Status:", res.status);
      return [];
    }

    const repos = await res.json();
    
    // Filter out forks, already featured projects, and ones with no description
    const featuredNames = ['CodeArena', 'Deep-Packet-Inspection', 'FerryFlow', 'nitin-portfolio'];
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
    <div style={{ marginTop: '5rem' }}>
      <h3 className={styles.subTitle}>Recent Open Source</h3>
      <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {repos.map((repo: any) => (
          <div key={repo.id} className={styles.projectCard} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.cardLink} aria-label={`View ${repo.name}`} />
            <div className={styles.cardHeader}>
              <h4 style={{ wordBreak: 'break-word', fontSize: '1.2rem' }}>{repo.name}</h4>
              <div className={styles.links}>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub size={18} />
                </a>
                {repo.homepage && (
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
            
            <p className={styles.description} style={{ flexGrow: 1, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {repo.description}
            </p>
            
            <div className={styles.techStack} style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {repo.language && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', display: 'inline-block' }}></span>
                  {repo.language}
                </span>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <Star size={14} /> {repo.stargazers_count}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <GitFork size={14} /> {repo.forks_count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
