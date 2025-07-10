import axios from 'axios';

// Replace with actual AniList API endpoint and key
const API_URL = 'https://graphql.anilist.co';
const API_KEY = 'YOUR_ANILIST_API_KEY';

// GraphQL query for anime search
const ANIME_SEARCH_QUERY = `
query ($search: String, $page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (search: $search, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
        medium
      }
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      description
      type
      format
      status
      episodes
      duration
      genres
      averageScore
      popularity
      studios {
        nodes {
          name
        }
      }
    }
  }
}
`;

// Search for anime
export const searchAnime = async (query, page = 1, perPage = 10) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: ANIME_SEARCH_QUERY,
        variables: {
          search: query,
          page,
          perPage
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
        }
      }
    );
    
    return response.data.data.Page;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

// Get anime details by ID
export const getAnimeById = async (animeId) => {
  try {
    const query = `
      query ($id: Int) {
        Media (id: $id, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            medium
          }
          bannerImage
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          description
          season
          seasonYear
          type
          format
          status
          episodes
          duration
          genres
          tags {
            id
            name
            description
            category
          }
          averageScore
          popularity
          studios {
            nodes {
              id
              name
            }
          }
          characters {
            nodes {
              id
              name {
                full
              }
              image {
                medium
              }
            }
          }
        }
      }
    `;
    
    const response = await axios.post(
      API_URL,
      {
        query,
        variables: {
          id: animeId
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'Authorization': `Bearer ${API_KEY}` // Uncomment if needed
        }
      }
    );
    
    return response.data.data.Media;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};
