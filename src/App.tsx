import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Slider from "react-slick";
import { Response } from "./service/API_GET_Employees.json";

function App() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Simulate fetching data
    fetchEmployees(page);
  }, [page]);

  const fetchEmployees = async (pageNumber) => {
    // Mock data or fake API call here
    const response = Response;
    const sortedData = response.data.pageItems.sort((a, b) => {
      const yearsA = calculateYearsOfExperience(a.positions);
      const yearsB = calculateYearsOfExperience(b.positions);
      return yearsB - yearsA;
    });
    setEmployees((prev) => [...prev, ...sortedData]);
  };

  const calculateYearsOfExperience = (positions) => {
    return positions.reduce((total, position) => {
      return (
        total +
        position.toolLanguages.reduce((years, lang) => {
          return years + (lang.to - lang.from);
        }, 0)
      );
    }, 0);
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <InfiniteScroll dataLength={employees.length} next={() => setPage(page + 1)} hasMore={true}>
      {employees.map((employee) => (
        <div key={employee.id} className='employee-card'>
          <h3>{employee.name}</h3>
          <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
          <Slider>
            {employee.positions[0].toolLanguages[0].images.map((image) => (
              <img key={image.id} src={image.cdnUrl} alt='Portfolio' />
            ))}
          </Slider>
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default App;
