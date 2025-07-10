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

// GraphQL query for popular anime
const POPULAR_ANIME_QUERY = `
query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (type: ANIME, sort: POPULARITY_DESC) {
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

// GraphQL query for top-rated anime
const TOP_RATED_ANIME_QUERY = `
query ($page: Int, $perPage: Int) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (type: ANIME, sort: SCORE_DESC) {
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
export const searchAnime = async (query, page = 1, perPage = 20) => {
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
        }
      }
    );
    
    // Transform the data to match expected format
    const data = response.data.data.Page;
    return {
      results: data.media.map(anime => ({
        id: anime.id,
        title: anime.title.english || anime.title.romaji,
        name: anime.title.english || anime.title.romaji,
        poster_path: anime.coverImage.large,
        image: anime.coverImage.large,
        vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
        rating: anime.averageScore ? anime.averageScore / 10 : 0,
        release_date: anime.startDate?.year || 'TBA',
        year: anime.startDate?.year,
        overview: anime.description,
        synopsis: anime.description,
        genres: anime.genres,
        episodes: anime.episodes,
        status: anime.status
      })),
      page: data.pageInfo.currentPage,
      totalPages: data.pageInfo.lastPage,
      totalResults: data.pageInfo.total
    };
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
        }
      }
    );
    
    const anime = response.data.data.Media;
    
    // Transform to consistent format
    return {
      id: anime.id,
      title: anime.title.english || anime.title.romaji,
      name: anime.title.english || anime.title.romaji,
      poster_path: anime.coverImage.large,
      image: anime.coverImage.large,
      vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
      rating: anime.averageScore ? anime.averageScore / 10 : 0,
      release_date: anime.startDate?.year || 'TBA',
      year: anime.startDate?.year,
      overview: anime.description,
      synopsis: anime.description,
      genres: anime.genres,
      episodes: anime.episodes,
      status: anime.status,
      studios: anime.studios?.nodes,
      characters: anime.characters?.nodes
    };
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

// Get popular anime
export const getPopularAnime = async (page = 1, perPage = 20) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: POPULAR_ANIME_QUERY,
        variables: {
          page,
          perPage
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    
    // Transform the data to match expected format
    const data = response.data.data.Page;
    return {
      results: data.media.map(anime => ({
        id: anime.id,
        title: anime.title.english || anime.title.romaji,
        name: anime.title.english || anime.title.romaji,
        poster_path: anime.coverImage.large,
        image: anime.coverImage.large,
        vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
        rating: anime.averageScore ? anime.averageScore / 10 : 0,
        release_date: anime.startDate?.year || 'TBA',
        year: anime.startDate?.year,
        overview: anime.description,
        synopsis: anime.description,
        genres: anime.genres,
        episodes: anime.episodes,
        status: anime.status
      })),
      page: data.pageInfo.currentPage,
      totalPages: data.pageInfo.lastPage,
      totalResults: data.pageInfo.total
    };
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    throw error;
  }
};

// Get top-rated anime
export const getTopRatedAnime = async (page = 1, perPage = 20) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        query: TOP_RATED_ANIME_QUERY,
        variables: {
          page,
          perPage
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    
    // Transform the data to match expected format
    const data = response.data.data.Page;
    return {
      results: data.media.map(anime => ({
        id: anime.id,
        title: anime.title.english || anime.title.romaji,
        name: anime.title.english || anime.title.romaji,
        poster_path: anime.coverImage.large,
        image: anime.coverImage.large,
        vote_average: anime.averageScore ? anime.averageScore / 10 : 0,
        rating: anime.averageScore ? anime.averageScore / 10 : 0,
        release_date: anime.startDate?.year || 'TBA',
        year: anime.startDate?.year,
        overview: anime.description,
        synopsis: anime.description,
        genres: anime.genres,
        episodes: anime.episodes,
        status: anime.status
      })),
      page: data.pageInfo.currentPage,
      totalPages: data.pageInfo.lastPage,
      totalResults: data.pageInfo.total
    };
  } catch (error) {
    console.error('Error fetching top-rated anime:', error);
    throw error;
  }
};

// ...existing code...
