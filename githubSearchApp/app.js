"use strict";
// api key - d9308aacf8b204d361fd
// api secret - 84969aeef73956f4ec9e8716d1840532802bb81b

const GITHUB_API_URL = 'https://api.github.com';
const SECRET_ID = '84969aeef73956f4ec9e8716d1840532802bb81b';
const CLIENT_ID = 'd9308aacf8b204d361fd';
const searchUser = document.querySelector('.searchUser');

class GitHubController {
  constructor(githubService, ui) {
    this.githubService = githubService;
    this.ui = ui;
  }

  async handleSearchInput(inputValue) {
    if (!inputValue.trim()) {
      this.ui.clearProfile();
      return;
    }

    const userData = await this.githubService.getUser(inputValue);
    if (userData.message) {
      this.ui.showAlert(userData.message, 'alert alert-danger');
      this.ui.clearProfile();
      return;
    }
    console.log(userData);
    return this.ui.showProfile(userData);
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
    } catch(err) {
      console.error('ERROR:', err);
    }
  }
}

class UI {
  constructor() {
    this.profile = document.querySelector(".profile");
    this.alertContainer = document.querySelector(".search");

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
  <h3 class="page-heading mb-3">Latest Repos</h3>
  <div class="repos"></div>
    `;
  }

  clearProfile() {
    this.profile.innerHTML = '';
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

searchUser.addEventListener("input", e => {
  const inputValue = e.target.value;
  let timeoutHandler = setTimeout(async () => {
    await githubController.handleSearchInput(inputValue);
    clearTimeout(timeoutHandler);    
  }, 500);
})