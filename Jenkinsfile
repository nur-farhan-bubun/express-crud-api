pipeline {
    agent any // This allows it to run on the Master or Slave for now

    stages {
        stage('Hello GitHub') {
            steps {
                echo 'Successfully connected to GitHub!'
                sh 'ls -ltr'
            }
        }
    }
}
