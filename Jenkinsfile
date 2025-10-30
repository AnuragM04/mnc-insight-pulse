pipeline {
    agent any

    environment {
        IMAGE_NAME = "mnc-insight-pulse"
        NETWORK = "jenkins-net"
        CONTAINER_NAME = "mip_dev"
        PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checking out branch: ${env.BRANCH_NAME}"
                checkout scm
                git branch: 'dev', url: 'https://github.com/AnuragM04/mnc-insight-pulse.git'
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
                script {
                    echo "🐳 Building Docker image for ${IMAGE_NAME}..."
                    sh "docker build -t ${IMAGE_NAME}:dev-${BUILD_NUMBER} -f Dockerfile ."
                }
            }
        }

        stage('Run Dev Container & Smoke Test') {
            steps {
                script {
                    echo "🧹 Cleaning up any old containers..."
                    sh "docker rm -f ${CONTAINER_NAME} || true"
                    sh "docker network create ${NETWORK} || true"

                    echo "🚀 Starting new container..."
                    sh """
                        docker run -d --name ${CONTAINER_NAME} \
                        --network ${NETWORK} \
                        -p ${PORT}:80 ${IMAGE_NAME}:dev-${BUILD_NUMBER}
                    """

                    echo "⏳ Waiting for app to boot before running smoke test..."
                    def maxRetries = 15
                    def success = false
                    for (int i = 1; i <= maxRetries; i++) {
                        // 🧠 Ping by container name (NOT localhost)
                        def code = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://${CONTAINER_NAME}:80 || true", returnStdout: true).trim()
                        echo "Attempt ${i}/${maxRetries} — HTTP ${code}"
                        if (code == '200') {
                            echo '✅ Smoke test passed — app is running successfully!'
                            success = true
                            break
                        }
                        sleep(3)
                    }
                    if (!success) {
                        error('❌ Smoke test failed — app did not start successfully.')
                    }
                }
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

        stage('Post-Build Cleanup') {
            steps {
                echo "🧽 Cleaning up unused Docker images..."
                sh "docker image prune -f || true"
            }
        }
    }

    post {
        success {
            echo "🎉 Build completed successfully for ${IMAGE_NAME}:dev-${BUILD_NUMBER}"
        }
        failure {
            echo "💥 Build failed! Check logs for errors."
        }
    }
}
