workflow "Deploy to Github Pages" {
  on = "push"
  resolves = ["GitHub Action for npm"]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "GitHub Action for npm" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["master branch only"]
  secrets = ["GITHUB_TOKEN"]
  args = "npm install && npm run deploy"
}
