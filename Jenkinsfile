pipeline {
    agent any 

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                // This runs inside your Master/Slave node
                sh 'npm install' 
            }
        }
        stage('Code Analysis') {
            steps {
                echo 'Checking files...'
                sh 'ls -la'
            }
        }
    }
}
