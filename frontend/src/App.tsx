import React, { useState } from "react";
import UploadComponent from "./sections/UploadComponent";
import TableList from "./sections/TableList";

interface DataType {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

const App: React.FC = () => {
  const [tableData, setTableData] = useState<DataType[]>([]);

  return (
    <div>
      <UploadComponent setTableData={setTableData} />
      <TableList tableData={tableData} />
    </div>
  );
};

export default App;
