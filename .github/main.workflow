workflow "Security Scan" {
  on = "push"
  resolves = "Scan Dependencies"
}

action "Install Dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "ci"
}

action "Scan Dependencies" {
  uses = "actions/vulnerability-scan@v1.0.0"
  needs = "Install Dependencies"
  env = {
    ECOSYSTEM = "npm"
    SEVERITY = "low"
  }
  secrets = ["GITHUB_TOKEN"]
}

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
  args = "ci && npm run deploy"
}
