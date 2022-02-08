# Deploying with Terraform

Prerequisites:

- Terraform installed

## Steps to deploy environment:

### Cognito

Cognito needs client_id and client_secret for Google and Facebook federated logins! **PRIOR TO RUNNING TERRAFORM**, create the following parameters in AWS Parameter store, and add the appropriate values for your environment:

- /cognito/google/clientId
- /cognito/google/clientSecret (secret string)
- /cognito/facebook/clientId
- /cognito/facebook/clientSecret (secret string)

Note that the Google/Facebook integrations will **show updates every time you run terraform apply\***. I'm not sure why this is, but it doesn't seem to be breaking anything.
