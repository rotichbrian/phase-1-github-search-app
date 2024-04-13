document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchInput = document.getElementById('search').value;
      const userSearchUrl = `https://api.github.com/search/users?q=${searchInput}`;
  
      try {
        const response = await fetch(userSearchUrl);
        const data = await response.json();
  
        // Clear previous search results
        userList.innerHTML = '';
        reposList.innerHTML = '';
  
        data.items.forEach((user) => {
          const userItem = document.createElement('li');
          userItem.innerHTML = `
            <img src="${user.avatar_url}" alt="Avatar" />
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          `;
          userList.appendChild(userItem);
  
          userItem.addEventListener('click', async () => {
            const userReposUrl = `https://api.github.com/users/${user.login}/repos`;
            const reposResponse = await fetch(userReposUrl);
            const reposData = await reposResponse.json();
  
            reposList.innerHTML = '';
            reposData.forEach((repo) => {
              const repoItem = document.createElement('li');
              repoItem.textContent = repo.name;
              reposList.appendChild(repoItem);
            });
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  });
  