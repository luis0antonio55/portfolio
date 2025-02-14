// src/components/GitHubYearlyContributions.jsx
import React, { useEffect, useState } from 'react';

const GitHubYearlyContributions = () => {
  const [stats, setStats] = useState({ 2023: 0, 2024: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      const username = import.meta.env.PUBLIC_GITHUB_USERNAME;
      const token = import.meta.env.PUBLIC_GITHUB_TOKEN;
      
      const query = `
        query {
          user(login: "${username}") {
            contributionsCollection(from: "2023-01-01T00:00:00Z", to: "2023-12-31T23:59:59Z") {
              contributionCalendar {
                totalContributions
              }
            }
            contributionsCollection2024: contributionsCollection(from: "2024-01-01T00:00:00Z", to: "2024-12-31T23:59:59Z") {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();
        
        setStats({
          2023: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
          2024: data.data.user.contributionsCollection2024.contributionCalendar.totalContributions
        });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex gap-4 justify-center">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">2023</h3>
        <p className="text-green-400">{stats[2023]} contributions</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-2">2024</h3>
        <p className="text-green-400">{stats[2024]} contributions</p>
      </div>
    </div>
  );
};

export default GitHubYearlyContributions;