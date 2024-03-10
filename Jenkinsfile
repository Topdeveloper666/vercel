pipeline {
    agent any 
    tools { nodejs "node" }
    environment {
        CI = 'true'
    }

    stages {
        stage('Install') {
            steps {
                script {
                env.committerEmail = sh (
                    script: 'git --no-pager show -s --format=\'%ae\'',
                    returnStdout: true
                ).trim()
                }
                sh 'rm -rf node_modules/.yarn-integrity'
                sh 'npm install'
                sh 'npm run build'
  
                 
            }
        }
        stage('Deploy') {
            steps {
                sh '/var/lib/jenkins/.nvm/versions/node/v21.4.0/bin/pm2 delete all || true'

                sh 'rm -rf /var/www/glamcode/*'
                sh 'cp -r /var/lib/jenkins/workspace/GlamCode-Prod/* /var/www/glamcode/'
                sh 'NODE_ENV=production /var/lib/jenkins/.nvm/versions/node/v21.4.0/bin/pm2 start server.js --name glamcode -p 9012 --update-env  & '
                sh '/var/lib/jenkins/.nvm/versions/node/v21.4.0/bin/pm2 save '
            }
            
        }

      
    }
    post {
            success {
                echo "${env.BUILD_URL} has result success"
                }
            failure {
                echo "${env.BUILD_URL} has result fail"
                }
    }
   
   
}
