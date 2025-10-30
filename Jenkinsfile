pipeline {
  agent any

  environment {
    IMAGE_NAME     = "mnc-insight-pulse"
    NETWORK        = "jenkins-net"
    CONTAINER_NAME = "mip_dev"
    PORT           = "3000"            // change to 8081 if you prefer
    CONTAINER_PORT = "80"
    TAG            = "dev-${env.BUILD_NUMBER}"
  }

  stages {
    stage('Checkout') {
      steps {
        echo "Checking out repository"
        checkout scm
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
          echo "Building Docker image ${IMAGE_NAME}:${TAG}"
          sh "docker build -t ${IMAGE_NAME}:${TAG} -f Dockerfile ."
        }
      }
    }

    stage('Stop & Cleanup Previous') {
      steps {
        script {
          echo "Stopping and removing any old container named ${CONTAINER_NAME}..."
          sh "docker rm -f ${CONTAINER_NAME} || true"
          echo "Ensuring docker network ${NETWORK} exists (no-op if already present)..."
          sh "docker network create ${NETWORK} || true"
        }
      }
    }

    stage('Run Container') {
      steps {
        script {
          echo "Running container ${CONTAINER_NAME} mapping host port ${PORT} -> container port ${CONTAINER_PORT}..."
          sh """
            docker run -d --name ${CONTAINER_NAME} \
              --network ${NETWORK} \
              -p ${PORT}:${CONTAINER_PORT} \
              ${IMAGE_NAME}:${TAG}
          """
          sleep time: 3, unit: 'SECONDS'
        }
      }
    }

    stage('Smoke Test') {
      steps {
        script {
          echo "Smoke testing http://localhost:${PORT} with retries..."
          // Use Groovy string interpolation so ${PORT} is substituted before the shell runs.
          sh """
            set -e
            tries=0
            max=12
            while [ \$tries -lt \$max ]; do
              status=\$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:${PORT} || echo "000")
              echo "Attempt \$((tries+1))/\$max - HTTP \$status"
              if [ "\$status" = "200" ]; then
                echo "Smoke test passed"
                exit 0
              fi
              tries=\$((tries+1))
              sleep 2
            done
            echo "Smoke test failed after \$max attempts" >&2
            docker logs ${CONTAINER_NAME} --tail 200 || true
            exit 1
          """
        }
      }
    }

    stage('Post-Build Cleanup') {
      steps {
        echo "Pruning unused images (optional)"
        sh "docker image prune -f || true"
      }
    }
  }

  post {
    success {
      echo "Build and deploy succeeded: ${IMAGE_NAME}:${TAG}"
    }
    failure {
      echo "Build failed — see console output for details. Container logs printed above if available."
      sh "docker ps -a || true"
      sh "docker logs ${CONTAINER_NAME} --tail 200 || true"
    }
    always {
      echo "Pipeline finished."
    }
  }
}
