pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'dev', url: 'https://github.com/junaid6468/mnc-insight-pulse.git'
            }
        }

        stage('Verify Files') {
            steps {
                echo "Listing workspace contents..."
                sh 'ls -al'
            }
        }

        stage('Build Docker Image') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'echo "Building Docker image..."'
                    sh 'docker build -t mnc-insight-pulse .'
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                sh 'echo "Running Docker container on port 3000..."'
                sh 'docker run -d -p 3000:80 mnc-insight-pulse'
            }
        }
    }
}
