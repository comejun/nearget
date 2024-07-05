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
                    sh './gradlew clean build --warning-mode all'
                }
            }
        }
        stage('Docker BackendBuild') {
            steps {
                dir('back') {
                    sh 'docker build -t nearget-back .'
                }
            }
        }
        stage('BackendDeploy') {
            steps {
                sh 'docker stop nearget-back || true'
                sh 'docker rm nearget-back || true'
                sh 'docker run -d -p 8090:8090 --name nearget-back nearget-back'
            }
        }
         stage('FrontendBuild') {
                    steps {
                        dir('front') {
                            sh 'npm install'
                            sh 'CI=false npm run build'
                        }
                    }
                }
                stage('Docker FrontendBuild') {
                    steps {
                        dir('front') {
                            sh 'docker build -t nearget-front .'
                        }
                    }
                }
                stage('FrontendDeploy') {
                    steps {
                        sh 'docker stop nearget-front || true'
                        sh 'docker rm nearget-front || true'
                        sh 'docker run -d -p 80:80 -p 443:443 --name nearget-front nearget-front'
                    }
                }
    }
}