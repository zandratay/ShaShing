<template>
    <div class="card-container">
        <div v-for="(item, index) in newsItems" :key="index" class="card">
            <a :href="item.url" class="card-link">
                <div class="card-image-container">
                    <img :src="item.urlToImage" alt="news_image" class="card-img">
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
            newsItems: []
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

        getDate() {

            const today = new Date();

            if (today.getMonth() == 0) {

                const year = today.getFullYear() - 1;

                return year + "-" + 12 + "-" + today.getDate();

            }
            return today.getFullYear() + "-" + (today.getMonth()) + "-" + today.getDate();
        },

        async getArticles(query) {

            const date = this.getDate();

            var url = 'https://newsapi.org/v2/everything?' +
                'q=' + query + '&' +
                'from=' + date + '&' + 
                'sortBy=popularity&' +
                'apiKey=088092c2cff740e3b9dc4597a812f7d5';

            var req = new Request(url);

            let allarticles = await fetch(req).then(function(response) {
                            return response.json();
                                }).then(function(data) {
                                    return data.articles
                                });

            this.newsItems = allarticles.filter((item) => item.source.name != "Yahoo Entertainment");
        }
    }
}


</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px; /* To adjust for the padding on the cards */
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
}

.card:hover {
  transform: translateY(-5px); /* Slightly raise the card on hover */
}

.card-image-container {
  width: 100%;
  height: 200px; /* Fixed height for images */
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

a:link {
    color: blue;
    text-decoration: none;
}

a:visited {
    color: blue;
    text-decoration: none;
}

a:hover {
    color: blue;
    text-decoration: none;
}

a:active {
    color: blue;
    text-decoration: none;
}

/* Responsive adjustments as provided, with any additional tweaks required */
</style>
