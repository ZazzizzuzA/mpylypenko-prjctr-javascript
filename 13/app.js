"use strict";
// api key - d9308aacf8b204d361fd
// api secret - 84969aeef73956f4ec9e8716d1840532802bb81b

const GITHUB_API_URL = 'https://api.github.com';
const SECRET_ID = '16a92ade6531d16473d355a071b5836ebbfc2f55';
const CLIENT_ID = '7f22406f3cb5d5bd5c67';
const searchUserInput = document.querySelector('.searchUser');


class GitHubController {
  constructor(githubService, ui) {
    this.githubService = githubService;
    this.ui = ui;
  }

  async handleSearchInput(inputValue) {
    if (!inputValue.trim()) {
      this.ui.clearProfile();
      this.ui.clearRepos();
      return;
    }

    const userData = await this.githubService.getUser(inputValue);

    console.log(userData);
    if (userData.message) {
      this.ui.showAlert(userData.message, 'alert alert-danger')
      return;
    }

    const userRepos = await this.githubService.getUsersRepositories(userData.repos_url);
    console.log(userRepos);
    this.ui.showProfile(userData);
    this.ui.showRepos(userRepos);

    return;
  }
}

class GitHubService {
  constructor(clientId, secretId) {
    this.clientId = clientId;
    this.secretId = secretId;
  }

  async getUser(userName) {
    try {
      const response = await fetch(`${GITHUB_API_URL}/users/${userName}?client_id=${this.clientId}&client_secret=${this.secretId}`);
      const user = await response.json();
      return user;
    } catch (err) {
      console.error('ERROR:', err);
    }
  }

  async getUsersRepositories(reposUrl) {
    try {
      const response = await fetch(`${reposUrl}?sort=created&per_page=5`);

      const repos = await response.json();
      return repos;
    } catch (err) {
      console.error('ERROR:', err);
    }
  }
}

class UI {
  constructor() {
    this.profile = document.querySelector(".profile");
    this.alertContainer = document.querySelector(".search");
    this.reposContainer = document.querySelector(".repositories > .repos");
  }

  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img class="img-fluid mb-2" src="${user.avatar_url}">
          <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Company: ${user.company}</li>
            <li class="list-group-item">Website/Blog: ${user.blog}</li>
            <li class="list-group-item">Location: ${user.location}</li>
            <li class="list-group-item">Member Since: ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    `;
  }

  showRepos(repos) {
    const html = this.buildReposHTML(repos);
    
    this.reposContainer.innerHTML = html;
    this.reposContainer.parentElement.style.visibility = 'visible';
  }

  buildReposHTML(repos) {
    let HTMLRepos = repos.map(repo => {
      let repoHTML = `
      <div class="card card-body mb-3">
      <div class="row">
        <div style="width: 100%;">
          <h4 style="text-align: center;">${repo.name}</h4>
        </div>
        <div class="col-md-3">
          <a href="${repo.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Repository</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Watchers: ${repo.watchers}</span>
          <span class="badge badge-secondary">Size: ${repo.size}</span>
          <span class="badge badge-success">Forks: ${repo.forks}</span>
          <span class="badge badge-info">Archived: ${repo.archived}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item">Created: ${repo.created_at}</li>
            <li class="list-group-item">Last update: ${repo.updated_at}</li>
            <li class="list-group-item">Visibility: ${repo.visibility}</li>
            <li class="list-group-item">ID: ${repo.id}</li>
            <li class="list-group-item">Programming language: ${repo.language}</li>
          </ul>
        </div>
      </div>
    </div>
      `;
      return repoHTML;
    }).join('');
    return HTMLRepos;
  }

  clearProfile() {
    this.profile.innerHTML = '';
  }

  clearRepos() {
    this.reposContainer.innerHTML = '';
    this.reposContainer.parentElement.style.visibility = 'hidden';
  }

  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = className;
    div.innerHTML = message;

    this.alertContainer.parentElement.insertBefore(div, this.alertContainer);
    this.clearAlert(div);
  }

  clearAlert(alertContainer) {
    setTimeout(() => {
      alertContainer.remove();
    }, 3000)
  }
}


const ui = new UI();
const githubService = new GitHubService(
  CLIENT_ID,
  SECRET_ID
);
const githubController = new GitHubController(githubService, ui);

class InputListener {
  constructor(searchUserInput) {
    this.searchUserInput = searchUserInput;
    this.inputValue = null;
    this.init();
  }

  init() {
    this.searchUserInput.addEventListener("input", async e => {
      const inputValue = e.target.value;
      this.inputValue = inputValue;
      let timeoutHandler = setTimeout(async () => {
        if (this.inputValue === inputValue) {
          await githubController.handleSearchInput(inputValue);
        }
        clearTimeout(timeoutHandler);    
      }, 500);
    })
  }
}

const inputListener = new InputListener(searchUserInput);

