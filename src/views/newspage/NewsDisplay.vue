<template>
    <div class="card-container">
      <div v-if="isLoading" class="loading-overlay">
        <img src='/loading_page.gif' alt="Loading..." />
      </div>
        <div v-for="(item, index) in newsItems" :key="index" class="card" @click = "handleCardClick(item.url)">
            <a :href="item.url" class="card-link">
                <div class="card-image-container">
                    <img :src="item.urlToImage || '/dead_image.png'" @error = "imageError" alt="news_image" class="card-img">
                </div>
                <div class="card-content">
                    <h2 class="card-title">{{ item.title }}</h2>
                    <p class="card-meta">{{ item.author }}</p>
                </div>
            </a>
        </div>
    </div>
</template>


<script>

export default {

    data() {
        return {
            newsItems: [],
            isLoading: false, // Add a loading state
        };
    },

    props: {
    searchQuery: String
    },

    watch: {
        // Whenever the searchQuery changes, this function will run
        searchQuery(newQuery, oldQuery) {
        if (newQuery !== oldQuery) {

            if (newQuery == "") {
                this.getArticles("Finance");
            } else {
                this.getArticles(newQuery);
                }

            }
        }
    },

    mounted() {
        this.getArticles("Finance");
    },

    methods: {

        handleCardClick(articleUrl) {
          this.isLoading = true; // Set loading state to true

          setTimeout(() => {
            window.location.href = articleUrl; // Navigate to the article URL
            this.isLoading = false; // Reset loading state (optional, since we're navigating away)
          }, 2000);
        },

        async getArticles(query) {

            var url = 'https://newsapi.org/v2/everything?' +
                'q=' + query + '&' +
                'sortBy=publishedAt&' +
                'language=en&' +
                'excludeDomains=yahoo.com&'+
                'apiKey=088092c2cff740e3b9dc4597a812f7d5';

            var req = new Request(url);

            let allarticles = await fetch(req).then(function(response) {
                            return response.json();
                                }).then(function(data) {
                                    return data.articles
                                });

            this.newsItems = allarticles.filter((item) => item.source.name != "[Removed]");
        },

        imageError(event) {
          console.log("Image failed to load!");
          event.target.src = '/dead_image.png';
        }


    }
}


</script>

<style>

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 10px;
  
}

.card {
  /* background-color: #fff;*/
  background-color: #fff;
  flex: 0 1 calc(33.333% - 20px); /* Adjusted for the gap */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px; /* Space between the cards */
  overflow: hidden; /* Ensures the image does not flow outside the card's boundary */
  border-radius: 10px; /* Rounded corners for the card */
  transition: transform 0.3s ease-in-out; /* Smooth transform effect */
  height: auto;
  display: flex;
  flex-direction: column;
  /* Ensure that the card content pushes down the footer */
  justify-content: space-between; 
}

.card:hover {
  transform: translateY(-5px); /* Slightly raise the card on hover */
}

.card-image-container {
  width: 100%;
  height: 250px; /* Fixed height for images */
  overflow: hidden; /* Hide the overflow to maintain aspect ratio */
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the container without losing aspect ratio */
}

.card-content {
  padding: 15px; /* Padding inside the card */

}

.card-title {
  font-size: 18px;
  margin: 0 0 10px 0; /* Space between title and meta */
}

.card-meta {
  font-size: 14px;
  color: #666;
   
}

.card-link {
  display: block; /* Make the link a block-level element */
  width: calc(100% + 20px); /* Ensure it takes up the full width of its parent */
  height: 100%; /* Ensure it takes up the full height, if you want it to be the entire card's size */
  text-decoration: none; /* Optional: Removes the underline from the link */
  margin-left: -20px;
  color: blue;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 1000; /* Ensure it's on top of other content */
}

.loading-overlay img {
  max-width: 320px;
  max-height: 180px;
}



/* Responsive adjustments for different screen sizes, if necessary */
@media (max-width: 1024px) {
  .card {
    flex: 0 0 calc(50% - 20px); /* 2 cards per row on medium-sized screens */
  }
}

@media (max-width: 768px) {
  .card {
    flex: 0 0 calc(100% - 20px); /* 1 card per row on small screens */
  }
}
/* Responsive adjustments as provided, with any additional tweaks required */
</style>
