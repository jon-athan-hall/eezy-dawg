const dogAPI = {
  /**
   * Fetches all of the breeds and sub-breeds available 
   * to send to the rest of the API endpoints.
   */
  async getAllBreeds() {
    const response = await fetch(
      'https://dog.ceo/api/breeds/list/all', {
        method: 'GET'
      }
    );

    const data = await response.json();

    return data;
  },

  async getRandomImages(breed: string, subBreed: string, imageCount: number) {
    let fullBreed = breed;

    if ((subBreed !== null) && (subBreed !== undefined)) {
      fullBreed = fullBreed + '/' + subBreed;
    }

    const response = await fetch(
      `https://dog.ceo/api/breed/${fullBreed}/images/random/${imageCount}`, {
        method: 'GET'
      }
    );
    
    const data = await response.json();

    return data;
  }
};

export default dogAPI;
