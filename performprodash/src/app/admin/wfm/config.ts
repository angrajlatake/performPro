const config = {
  clientId: '04fd6cf2-f711-4012-9fc0-c761db9afcda',
  // redirectUri: 'https://genesyscloudblueprints.github.io/agent-monitoring-app-blueprint/'
  redirectUri: 'http://localhost:3000/admin/wfm',
  genesysCloud: {
      // Genesys Cloud region
      // eg. 'mypurecloud.au', 'euw2.pure.cloud', etc...
      region: 'cac1.pure.cloud'
  },
}

export default config;