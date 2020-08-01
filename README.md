# Chandan Hacker News
## Tech Stack

1. Angular v9
2. Nodejs (SSR Express engine) - Express engine provided by angular for Server side rendering
3. Docker - Containerisation
4. Jenkins - CI/CD Setup
5. Testing - Karma, Jasmine integrated with Angular CLI

## Approach

1. Used Angular CLI for base code setup
2. Used Angular material for UI components
3. Created the below components in the order mentioned
    1. Created the table
    2. Created the news page
    3. Added the route for news page
    4. Created the adapter service for http client
    5. Created the feed service for news API interaction
    6. Created the models for News API response and Story
    7. Implemented the table and mapped the API response
 4. Created Chart component and integrated Chartjs
 5. Added upvote and hide functionality
 6. Added SSR using Angular CLI and optimised SEO and performance issues
 7. Fixed broken test cases and added test case for Search API
 8. Added dockerisation
 9. Used Jenkins and created Jenkinsfile for CI/CD Setup
