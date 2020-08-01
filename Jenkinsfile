pipeline {
    agent any
    stages {
        stage ('Build and Pushing Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'heroku_creds', passwordVariable: 'password', usernameVariable: 'username')]) {
                    sh "docker login -u $username -p $password https://registry.heroku.com"
                    sh "docker build -t chandan-hacker-news ."
                    sh "docker tag chandan-hacker-news:latest registry.heroku.com/chandan-hacker-news/web"
                    sh "docker push registry.heroku.com/chandan-hacker-news/web"
                }
            }
        }
        stage ('Deploying') {
            steps {
                withCredentials([string(credentialsId: 'heroku_api_key', variable: 'HEROKU_API_KEY')]) {
                    sh "HEROKU_API_KEY=$HEROKU_API_KEY"
                    sh "heroku container:release web --app chandan-hacker-news"
                }
            }
        }
        stage ('Cleaning workspace') {
            steps {
                script {
                    cleanWs()
                }
            }
        }
    }
}
