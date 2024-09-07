import { Button, Card, Carousel, Col, Image, Input, Row, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css"; // Import your CSS for responsiveness
import { fetchEmployees } from "./service";
import { useDebounceCallback } from "usehooks-ts";
import { Employee, Id, Position } from "./types/models/Employee";

export const PAGE_SIZE = 8;

const App = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [page, setPage] = useState(1);

  const loadEmployees = useCallback(
    async (search?: string) => {
      const response = await fetchEmployees(page, PAGE_SIZE, search);

      setEmployees((prev) => (search ? response.data.pageItems : [...new Set([...prev, ...response.data.pageItems])]));
    },
    [page]
  );

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees, page]);

  const calculateYearsOfExperience = (positions: Position[]) => {
    return positions.reduce((total, position) => {
      return (
        total +
        position.toolLanguages.reduce((years, lang) => {
          return years + (lang.to - lang.from);
        }, 0)
      );
    }, 0);
  };

  const deleteEmployee = (id: Id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const onSearch = (value: string) => loadEmployees(value);

  return (
    <div className='employee-list'>
      <Typography.Text ellipsis={{ tooltip: true }} className='label m-2'>
        List employess
      </Typography.Text>
      <div className='flex items-center gap-2'>
        <Typography.Text ellipsis={{ tooltip: true }}>Search name:</Typography.Text>
        <Input.Search
          className='input-search'
          placeholder='input search text'
          onSearch={useDebounceCallback(onSearch, 500)}
          enterButton
        />
      </div>

      <InfiniteScroll
        dataLength={employees?.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={!employees?.length && <h4>Loading...</h4>}
      >
        <Row>
          {employees?.map((employee) => (
            <Col span={8} xs={24} sm={12} md={8} key={employee?.id}>
              <Card size='small' className='employee-card'>
                <Carousel>
                  {employee?.positions?.[0]?.toolLanguages?.[0]?.images?.map((image) => (
                    <Image.PreviewGroup key={image?.id} items={image?.cdnUrls}>
                      <Image width={"100%"} height={"100%"} src={image?.cdnUrl} className='image' />
                    </Image.PreviewGroup>
                  ))}
                </Carousel>
                <div className='flex justify-between m-2'>
                  <Typography.Text ellipsis={{ tooltip: true }} className='title'>
                    {employee?.name}
                  </Typography.Text>
                  <Typography.Text ellipsis={{ tooltip: true }} className='text'>
                    {calculateYearsOfExperience(employee?.positions)} years
                  </Typography.Text>
                </div>
                <Typography.Text ellipsis={{ tooltip: true }} className='text flex flex-column text-start m-2'>
                  {employee?.positions?.[0]?.name}
                </Typography.Text>
                <Typography.Text ellipsis={{ tooltip: true }} className='text flex flex-column text-start m-2'>
                  {employee?.positions?.[0]?.toolLanguages?.[0]?.description}
                </Typography.Text>
                <Button className='delete-btn' onClick={() => deleteEmployee(employee?.id)}>
                  Delete
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </div>
  );
};

export default App;
