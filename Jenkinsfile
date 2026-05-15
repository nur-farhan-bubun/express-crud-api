pipeline {
    agent none // Prevents Jenkins from running stages on the Master arbitrarily

    stages {
        stage('Checkout Code') {
            // This pulls the code down onto the agents as they are called
            agent { label 'build-agent' }
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            agent { label 'build-agent' } // Runs strictly on the New-Jenkins-Slave
            steps {
                echo 'Installing dependencies on Build Slave...'
                sh 'npm install'
                // sh 'npm test' // Uncomment this if you have test scripts configured
            }
        }

stage('Deploy to Production') {
    agent { label 'deploy-agent' }
    steps {
        echo 'Deploying application on Deploy Agent...'
        checkout scm 
        
        // Force the use of the absolute path to Node/NPM for the installation
        sh '/usr/local/bin/npm install --only=production'
        
        // Force the use of the absolute path to the real PM2
        sh '/usr/local/bin/pm2 delete express-api || true' 
        sh '/usr/local/bin/pm2 start app.js --name express-api'
    }
}
    }
    
    post {
        always {
            echo 'Pipeline execution finished!'
        }
    }
}
