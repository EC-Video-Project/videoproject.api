# Important details around Terraform

Prerequisites:

- Terraform installed

## Steps to deploy environment:

### Cognito

Cognito needs client_id and client_secret for Google and Facebook federated logins! **PRIOR TO RUNNING TERRAFORM**, create the following parameters in AWS Parameter store, and add the appropriate values for your environment:

- /cognito/google/clientId
- /cognito/google/clientSecret (secret string)
- /cognito/facebook/clientId
- /cognito/facebook/clientSecret (secret string)
