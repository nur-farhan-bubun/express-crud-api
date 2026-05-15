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
            agent { label 'deploy-agent' } // Runs strictly on the deploy_agent
            steps {
                echo 'Deploying application on Deploy Agent...'
                // Pulls fresh code onto the deployment machine
                checkout scm 
                sh 'npm install --only=production'
                
                // PM2 commands to cleanly restart your application without downtime
                // '|| true' ensures the pipeline doesn't crash if the process isn't running yet
                sh 'pm2 delete express-api || true' 
                sh 'pm2 start app.js --name express-api'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution finished!'
        }
    }
}
