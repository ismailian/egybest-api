### EGYBEST API

###### This API will help you communicate with and fetch data from Egybest Website without the trouble of manually sending requests and parsing unnecessary data.

``` [Routes] ```

 - /api/v1/recent
       * fetch recent media from the home page.
       * does not take any parameters.


 - /api/v1/search
       * search for a particular media object by a keywork.
       * take in a query paramter [?keyword=ozark] 


 - /api/v1/seasons
       * fetch all seasons for a particular tv show.
       * take in a query paramter [?name=ozark] 


 - /api/v1/episodes
       * fetch all season episodes for a particular tv show.
       * take in 2 query paramters [?name=ozark&season=1] 


 - /api/v1/episode
       * fetch episode info.
       * take in 3 query paramters [?name=ozark&season=1&episode=1] 

``` [Routes] ```