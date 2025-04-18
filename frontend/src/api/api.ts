import { Entertainer } from '../types/entertainer';

const API_BASE_URL = 'https://is413final-backend-hthqfkgrejhsejdz.eastus-01.azurewebsites.net/api';

export interface NewEntertainerForm {
  entStageName: string;
  entSsn: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
}

export interface EntertainerDetails {
  entertainerId: number;
  entStageName: string;
  entSsn: string;
  entStreetAddress: string;
  entCity: string;
  entState: string;
  entZipCode: string;
  entPhoneNumber: string;
  entWebPage: string;
  entEmailAddress: string;
  dateEntered: string;
}

export const getEntertainers = async (): Promise<Entertainer[]> => {
  try {
    console.log('Fetching entertainers from:', `${API_BASE_URL}/entertainers`);
    const response = await fetch(`${API_BASE_URL}/entertainers`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to fetch entertainers: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received entertainers:', data);
    return data;
  } catch (error) {
    console.error('Error in getEntertainers:', error);
    throw error;
  }
};

export const getEntertainer = async (id: number): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_BASE_URL}/entertainers/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch entertainer details: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getEntertainer:', error);
    throw error;
  }
};

export const addEntertainer = async (entertainer: NewEntertainerForm): Promise<Entertainer> => {
  try {
    console.log('Adding entertainer:', entertainer);
    const response = await fetch(`${API_BASE_URL}/entertainers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entertainer),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`Failed to add entertainer: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Added entertainer:', data);
    return data;
  } catch (error) {
    console.error('Error in addEntertainer:', error);
    throw error;
  }
};

export const updateEntertainer = async (id: number, entertainer: Entertainer): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/entertainers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entertainer),
    });
    if (!response.ok) {
      throw new Error(`Failed to update entertainer: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in updateEntertainer:', error);
    throw error;
  }
};

export const deleteEntertainer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/entertainers/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete entertainer: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error in deleteEntertainer:', error);
    throw error;
  }
}; 