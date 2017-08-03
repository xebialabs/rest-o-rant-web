node {
   stage('Checkout') {
      git url: 'https://github.com/xebialabs/rest-o-rant-web.git'
   }
   stage('Build') {
      if (isUnix()) {
          sh "./gradlew clean build"
      } else {
         bat("gradlew.bat clean build")
      }
    }
    stage('Package') {
      xldCreatePackage artifactsPath: 'build', manifestPath: 'deployit-manifest.xml', darPath: '$JOB_NAME-$BUILD_NUMBER.0.dar'
    }

    stage('Publish And Deploy') {
          xldPublishPackage serverCredentials: 'Admin', darPath: '$JOB_NAME-$BUILD_NUMBER.0.dar'
          xldDeploy serverCredentials: 'Admin', environmentId: 'Environments/Dev', packageId: 'Applications/rest-o-rant-web/$BUILD_NUMBER.0'
    }
    
    stage('Start XLR Release') {
      xlrCreateRelease serverCredentials: 'Admin', template: 'Release rest-o-rant-web', version: 'Release for $BUILD_TAG', variables: [[propertyName: 'version', propertyValue: '$BUILD_NUMBER.0']], startRelease: true
    }
}
