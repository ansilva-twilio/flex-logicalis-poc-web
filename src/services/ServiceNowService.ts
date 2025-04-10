import axios from 'axios';

const API_BASE_URL = 'https://flex-logicalis-poc-web-server.azurewebsites.net/api/servicenow';

export interface ServiceNowResponse {
  data: any;
}

export class ServiceNowService {

  static async getIncident(incidentNumber: string): Promise<ServiceNowResponse> {
    const response = await axios.get(`${API_BASE_URL}/incident/${incidentNumber}`);
    return response.data;
  }

  static async getRequestItem(requestNumber: string): Promise<ServiceNowResponse> {
    const response = await axios.get(`${API_BASE_URL}/request-item/${requestNumber}`);
    return response.data;
  }

  static async getTasks(requestId: string): Promise<ServiceNowResponse> {
    const response = await axios.get(`${API_BASE_URL}/tasks/${requestId}`);
    return response;
  }

  static async getTableData(table: string, query: string, fields: string): Promise<ServiceNowResponse> {
    const response = await axios.get(`${API_BASE_URL}/table-data`, {
      params: { table, query, fields }
    });
    return response.data;
  }
} 