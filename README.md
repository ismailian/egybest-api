### EGYBEST API

###### This API will help you communicate with and fetch data from Egybest Website without the trouble of manually sending requests and parsing unnecessary data.

``` [Routes] ```

 - GET /api/v1/recent
      + fetch recent media from the home page.
      + does not take any parameters.

 - GET /api/v1/search
      + search for a particular media object by a keywork.
      + takes in a query paramter [?keyword=ozark] 

- GET /api/v1/movie
      + get movie info
      + takes in a query parameter [?name=forrest+gump]

- GET /api/v1/show
      + get info about a tv show
      + takes in a query parameter [?name=breaking+bad]

 - GET /api/v1/seasons
      + fetch all seasons for a particular tv show.
      + takes in a query paramter [?name=ozark] 


 - GET /api/v1/episodes
      + fetch all season episodes for a particular tv show.
      + takes in 2 query paramters [?name=ozark&season=1] 


 - GET /api/v1/episode
      + fetch episode info.
      + takes in 3 query paramters [?name=ozark&season=1&episode=1] 

