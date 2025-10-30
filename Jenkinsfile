pipeline {
  agent any

  environment {
    IMAGE_NAME     = "mnc-insight-pulse"
    NETWORK        = "jenkins-net"
    CONTAINER_NAME = "mip_dev"
    PORT           = "3000"            // host port; change to 8081 if you prefer
    CONTAINER_PORT = "80"
    TAG            = "dev-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        echo "📥 Checking out branch: ${env.BRANCH_NAME ?: 'main'}"
        checkout scm
        // If you need to force a particular branch use:
        // git branch: 'dev', url: 'https://github.com/AnuragM04/mnc-insight-pulse.git'
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
          echo "🐳 Building Docker image ${IMAGE_NAME}:${TAG} ..."
          sh "docker build -t ${IMAGE_NAME}:${TAG} -f Dockerfile ."
        }
      }
    }

    stage('Stop & Cleanup Previous') {
      steps {
        script {
          echo "🧹 Stopping and removing any old container named ${CONTAINER_NAME}..."
          sh "docker rm -f ${CONTAINER_NAME} || true"
          // optionally keep the network; create if missing
          sh "docker network create ${NETWORK} || true"
        }
      }
    }

    stage('Run Container') {
      steps {
        script {
          echo "🚀 Running container ${CONTAINER_NAME} (host:${PORT} -> container:${CONTAINER_PORT})..."
          // Run detached and attach to user-network so containers can talk to each other if needed
          sh """
            docker run -d --name ${CONTAINER_NAME} \
              --network ${NETWORK} \
              -p ${PORT}:${CONTAINER_PORT} \
              ${IMAGE_NAME}:${TAG}
          """
          // small warmup
          sleep 3
        }
      }
    }

    stage('Smoke Test') {
      steps {
        script {
          echo "🔁 Smoke testing http://localhost:${PORT} with retries..."
          sh '''
            set -e
            tries=0
            max=12
            until [ $tries -ge $max ]
            do
              status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:'"${PORT}"' || echo "000")
              echo "Attempt $((tries+1))/$max - HTTP $status"
              if [ "$status" = "200" ]; then
                echo "✅ Smoke test passed"
                exit 0
              fi
              tries=$((tries+1))
              sleep 2
            done
            echo "❌ Smoke test failed after $max attempts" >&2
            # print container logs to help debugging
            docker logs ${CONTAINER_NAME} --tail 200 || true
            exit 1
          '''
        }
      }
    }

    stage('Post-Build Cleanup') {
      steps {
        echo "🧽 Pruning unused images (optional)..."
        sh "docker image prune -f || true"
      }
    }
  }

  post {
    success {
      echo "🎉 Build & deploy succeeded: ${IMAGE_NAME}:${TAG} running as ${CONTAINER_NAME} on host:${PORT}"
    }
    failure {
      echo "💥 Build failed — leaving containers for debug (see
