pipeline {
    agent any
    stages {
        stage('BackendBuild') {
            steps {
                sh './gradlew build'
            }
        }
        stage('Docker BackendBuild') {
            steps {
                sh 'docker build -t {nearget} .'
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker stop {nearget} || true'
                sh 'docker rm {nearget} || true'
                sh 'docker run -d -p 8080:8080 --name {nearget} {nearget}'
            }
        }
         stage('FrontendBuild') {
                    steps {
                        sh 'npm install'
                        sh 'CI=false npm run build'
                    }
                }
                stage('Docker FrontendBuild') {
                    steps {
                        sh 'docker build -t {nearget} .'
                    }
                }
                stage('Deploy') {
                    steps {
                        sh 'docker stop {nearget} || true'
                        sh 'docker rm {nearget} || true'
                        sh 'docker run -d -p 80:80 -p 443:443 --name {nearget} {nearget}'
                    }
                }
    }
}