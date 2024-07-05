pipeline {
    agent any
    tools {
            gradle "gradle8.8"
        }

    stages {
        stage('BackendBuild') {
            steps {
                dir('back') {
                    sh 'chmod +x gradlew'
                    sh './gradlew build'
                }
            }
        }
        stage('Docker BackendBuild') {
            steps {
                dir('back') {
                    sh 'docker build -t {nearget} .'
                }
            }
        }
        stage('BackendDeploy') {
            steps {
                sh 'docker stop {nearget} || true'
                sh 'docker rm {nearget} || true'
                sh 'docker run -d -p 8090:8090 --name {nearget} {nearget}'
            }
        }
         stage('FrontendBuild') {
                    steps {
                        dir('front') {
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
                stage('Docker FrontendBuild') {
                    steps {
                        dir('front') {
                            sh 'docker build -t {nearget} .'
                        }
                    }
                }
                stage('FrontendDeploy') {
                    steps {
                        sh 'docker stop {nearget} || true'
                        sh 'docker rm {nearget} || true'
                        sh 'docker run -d -p 80:80 -p 443:443 --name {nearget} {nearget}'
                    }
                }
    }
}