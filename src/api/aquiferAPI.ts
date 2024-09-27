import axios, { AxiosInstance } from 'axios';
import { AQUIFER_API_KEY } from '@env';

// Define types for API responses
interface ResourceType {
  type: string;
  collections: {
    code: string;
    title: string;
    licenseInformation: string | null;
  }[];
}

interface SearchResult {
  id: number;
  name: string;
  localizedName: string;
  mediaType: string;
  languageCode: string;
  grouping: {
    type: string;
    name: string;
    collectionTitle: string;
    collectionCode: string;
  };
}

interface SearchResponse {
  totalItemCount: number;
  returnedItemCount: number;
  offset: number;
  items: SearchResult[];
}

class AquiferAPI {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.aquifer.bible',
      headers: {
        'api-key': AQUIFER_API_KEY,
        'Content-Type': 'application/json',
      },
    });
  }

  async getResourceTypes(): Promise<ResourceType[]> {
    try {
      const response = await this.api.get('/resources/types');
      return response.data;
    } catch (error) {
      console.error('Error fetching resource types:', error);
      throw error;
    }
  }

  async searchResources(params: {
    query?: string;
    languageCode: string;
    resourceType?: string;
    limit?: number;
    offset?: number;
  }): Promise<SearchResponse> {
    try {
      const response = await this.api.get('/resources/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching resources:', error);
      throw error;
    }
  }

  async getResource(contentId: number): Promise<any> {
    try {
      const response = await this.api.get(`/resources/${contentId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  }

  // Add more methods for other API endpoints as needed
}

export const aquiferApi = new AquiferAPI();