### EGYBEST API

###### This API will help you communicate with and fetch data from Egybest Website without the trouble of manually sending requests and parsing unnecessary data.

<[Installation]>
- Clone  ``` git clone https://github.com/ismailian/egybest-api ```
- Move to directory ``` cd egybest-api ```
- Install packages ``` npm install ```
- Start server ``` npm start ```

<[Usage]>

 - ```GET /api/v1/recent```
      + fetch recent media from the home page.
      + takes in optional query parameter [?type=movie|show].

 - ```GET /api/v1/search```
      + search for a particular media object by a keywork.
      + takes in a required query paramter [?name=ozark] 
      + takes in optional query paramter [&type=movie|show] 

 - ```GET /api/v1/movies/top```
      + fetch top rated movies.

 - ```GET /api/v1/movies/latest```
      + fetch newly released movies.

 - ```GET /api/v1/movies/trending```
      + fetch most watched movies.

 - ```GET /api/v1/movies/recent```
      + fetch home page movies.

 - ```GET /api/v1/movies/find```
      + fetch info about a movie.
      + takes in a query parameter [?name=^]

 - ```GET /api/v1/movies/search```
      + search for a movie.
      + takes in a query parameter [?name=^]

 - ```GET /api/v1/series/top```
      + fetch top rated series.

 - ```GET /api/v1/series/latest```
      + fetch newly released series.

 - ```GET /api/v1/series/trending```
      + fetch most watched series.

 - ```GET /api/v1/series/recent```
      + fetch home page series.

 - ```GET /api/v1/series/find```
      + fetch info about a tv show.
      + takes in a query parameter [?name=^]

 - ```GET /api/v1/series/search```
      + search for a tv show.
      + takes in a query parameter [?name=^]

 - ```GET /api/v1/series/season```
      + fetch all season episodes for a particular tv show.
      + takes in 2 query paramters [?name=^&season=^] 

 - ```GET /api/v1/series/episode```
      + fetch episode info for a particular season and tv show.
      + takes in 2 query paramters [?name=^&season=^&episode=^]


<[Response]>

``` json
{
   "status": true|false,
   "data": {}
}
```

