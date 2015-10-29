#Twitter-Sentiment-Analysis
######Light-Weight Twitter Sentimet Analysis built on NodeJs with twitter OAuth.
Deployed on heroku : Access at [Sentiment-Analysis](https://analyzesenti.herokuapp.com/)

----
####Pre-Requisite
Register at [apps.twitter.com](apps.twitter.com), get the Consumer and Access Codes and create the following environment variables with the keys.

> access_token_secret

> accessTokenKey

> callbackURL

> callbackURL

> consumerSecret

> MONGO_URL : Point this to your Mongo instance.

####Setup

> Clone the git
 
> cd Twitter-Sentiment-Analysis

> npm install

> npm start

####Information
app_modules/analyze.js consists of two functions
- performAnalysis :  which ranks the tweets
- getTweets : which gets tweets based on the search query







