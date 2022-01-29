### EGYBEST API

###### This API will help you communicate with and fetch data from Egybest Website without the trouble of manually sending requests and parsing unnecessary data.

<[Installation]>
``` git clone https://github.com/ismailian/egybest-api ```
``` cd egybest-api ```
``` npm install ```
``` npm start ```

<[Usage]>

 - ```GET /api/v1/recent```
      + fetch recent media from the home page.
      + takes in optional query parameter [?type=movie|show].

 - ```GET /api/v1/search```
      + search for a particular media object by a keywork.
      + takes in a required query paramter [?keyword=ozark] 
      + takes in optional query paramter [&type=movie|show] 

 - ```GET /api/v1/movie```
      + fetch info about a movie.
      + takes in a required query paramter [?name=forrest+gump] 

 - ```GET /api/v1/show```
      + fetch info about a tv show.
      + takes in a required query paramter [?name=ozark] 

 - ```GET /api/v1/seasons```
      + fetch all seasons for a particular tv show.
      + takes in a query paramter [?name=ozark] 

 - ```GET /api/v1/episodes```
      + fetch all season episodes for a particular tv show.
      + takes in 2 query paramters [?name=ozark&season=1] 

 - ```GET /api/v1/episode```
      + fetch episode info.
      + takes in 3 query paramters [?name=ozark&season=1&episode=1] 


<[Response]>

``` json
{
   "status": true|false,
   "data": {}
}
```
