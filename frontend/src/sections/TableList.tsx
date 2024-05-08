import React, { useState } from "react";
import Pagination from "./Pagination";

interface DataType {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface ItemListProps {
  tableData: DataType[];
}

const TableList: React.FC<ItemListProps> = ({ tableData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [keywordValue, setKeywordValue] = useState("");

  const dataFiltered = applyFilter({
    tableData,
    keywordValue,
  });

  const indexOfLastItem = currentPage * 10;
  const indexOfFirstItem = indexOfLastItem - 10;
  const currentItems = dataFiltered.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (keyword: string) => {
    setKeywordValue(keyword);
    setCurrentPage(1);
  };

  return (
    <div style={{ boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", transition: "0.3s", margin: "10px", padding: "30px" }}>
      {dataFiltered.length === 0 ? (
        <h1>No Data</h1>
      ) : (
        <>
          <label>Filter : </label>
          <input type="text" value={keywordValue} onChange={(e) => handleSearch(e.target.value)} />

          <table style={{ margin: "30px 0", borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Post ID</th>
                <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>ID</th>
                <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>Body</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((data) => (
                <tr key={data.id}>
                  <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>{data.postId}</th>
                  <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>{data.id}</th>
                  <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>{data.name}</th>
                  <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>{data.email}</th>
                  <th style={{ border: "1px solid #dddddd", textAlign: "left", padding: "8px" }}>{data.body}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination totalItems={dataFiltered.length} itemsPerPage={10} currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  );
};

export default TableList;

// ----------------------------------------------------------------------
interface filterP {
  tableData: DataType[];
  keywordValue: string;
}

function applyFilter({ tableData, keywordValue }: filterP): DataType[] {
  if (keywordValue.trim()) {
    tableData = tableData.filter(
      (item) =>
        item?.name.toLowerCase().indexOf(keywordValue.trim().toLowerCase()) !== -1 ||
        item?.body.toLowerCase().indexOf(keywordValue.trim().toLowerCase()) !== -1 ||
        item?.postId.toLowerCase().indexOf(keywordValue.trim().toLowerCase()) !== -1 ||
        item?.id.toLowerCase().indexOf(keywordValue.trim().toLowerCase()) !== -1 ||
        item?.email.toLowerCase().indexOf(keywordValue.trim().toLowerCase()) !== -1
    );
  }

  return tableData;
}
