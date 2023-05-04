<script>
      // Here we define our query as a multi-line string
      // Storing it in a separate .graphql/.gql file is also possible
      var query = `
        query ($id: Int) { # Define which variables will be used in the query (id)
          Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
            id
            title {
					romaji
					english
					native
                    
				}
                coverImage {
    extraLarge
      large
    }
                format
                status
                episodes
                duration
                genres
                synonyms
                source
                season
                averageScore
                description
                bannerImage
                studios {
      edges {
        isMain
        node {
          id
          name
        }
      }
    }
                endDate {
      year
      month
      day
    }
                 startDate {
      year
      month
      day
    }
                 
              
			}
		}
      `;

      

      // Define the config we'll need for our Api request
      var url = 'https://graphql.anilist.co',
          options = {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
              },
              body: JSON.stringify({
                  query: query,
                  variables: variables
              })
          };

      // Make the HTTP Api request
      fetch(url, options).then(handleResponse)
                         .then(handleData)
                         .catch(handleError);

      function handleResponse(response) {
          return response.json().then(function (json) {
              return response.ok ? json : Promise.reject(json);
          });
      }

      function handleData(data) {
  var romajiTitle = data.data.Media.title.romaji;
  var englishTitle = data.data.Media.title.english;
  var nativeTitle = data.data.Media.title.native;
  var description = data.data.Media.description;
  var format = data.data.Media.format;
  var episodes = data.data.Media.episodes;
  var status = data.data.Media.status;
  var startDate = data.data.Media.startDate.year + "-" + data.data.Media.startDate.month + "-" + data.data.Media.startDate.day;
  var endDate = data.data.Media.endDate.year + "-" + data.data.Media.startDate.month + "-" + data.data.Media.endDate.day;
  var season = data.data.Media.season;
  var studios = data.data.Media.studios.edges[0].node.name;
  var source = data.data.Media.source;
  var genres = data.data.Media.genres.join(", ");
  var duration = data.data.Media.duration + " minutes";
  var rating = data.data.Media.averageScore;
var coverImage = data.data.Media.coverImage.extraLarge;
var bannerImage = data.data.Media.bannerImage;
var rating = data.data.Media.averageScore;

  document.getElementById("romaji-title").innerHTML = romajiTitle;
  document.getElementById("english-title").innerHTML = "English Title: " + englishTitle;
  document.getElementById("native-title").innerHTML = "Native Title: " + nativeTitle;
  document.getElementById("description").innerHTML = description;
  document.getElementById("format").innerHTML = "Format: " + format;
  document.getElementById("episodes").innerHTML = "Episodes: " + episodes;
  document.getElementById("status").innerHTML = "Status: " + status;
  document.getElementById("start-date").innerHTML = "Start Date: " + startDate;
  document.getElementById("end-date").innerHTML = "End Date: " + endDate;
  document.getElementById("season").innerHTML = "Season: " + season;
  document.getElementById("studios").innerHTML = "Studios: " + studios;
  document.getElementById("source").innerHTML = "Source: " + source;
  document.getElementById("genres").innerHTML = "Genres: " + genres;
  document.getElementById("duration").innerHTML = "Duration: " + duration;
  document.getElementById("rating").innerHTML = rating;
document.getElementById("cover-image").src = coverImage;
document.getElementById("banner-image").src = bannerImage;

}


      
    </script>
