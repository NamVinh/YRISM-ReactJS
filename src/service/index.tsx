// src/service/employeeService.js
import { Employee } from "../types/models/Employee";
import employeeData from "./API_GET_Employees.json"; // Path to your JSON file

export const fetchEmployees = async (
  pageNumber = 1,
  pageSize = 1,
  search = ""
): Promise<{
  message: string;
  statusCode: number;
  data: {
    totalItems: number;
    totalPages: number;
    pageItems: Employee[];
  };
}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate search functionality
      const filteredData = employeeData.Response.data.pageItems.filter((employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase())
      );

      // Simulate pagination
      const startIndex = (pageNumber - 1) * pageSize;
      const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

      // Create response object similar to a real API response
      const response = {
        message: "success",
        statusCode: 200,
        data: {
          totalItems: filteredData.length,
          totalPages: Math.ceil(filteredData.length / pageSize),
          pageItems: paginatedData as unknown as Employee[],
        },
      };

      resolve(response);
    }, 200); // Simulate API delay
  });
};
