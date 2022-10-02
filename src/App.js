import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  
  const [data, setData] = useState([]);
const [searchInput, setSearchInput] = useState("");
const [filteredResults, setFilteredResults] = useState([]);
  
  const getData = async () => {
    const response = await axios.get(URL);
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, []);

  const nameFilter = (e) => {
    const keyword = e.target.value;
    setSearchInput(keyword)

    if (keyword !== "") {
      const results = data.filter((user) => {
        return (
          user.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
        );
      });
      setFilteredResults(results);
    } else {
      setFilteredResults(data);
    }
  };
 const emailFilter = (e) => {
   const keyword = e.target.value;
   setSearchInput(keyword)

   if (keyword !== "") {
     const results = data.filter((user) => {
       return (
         user.email.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
       );
     });
     setFilteredResults(results);
   } else {
     setFilteredResults(data)
   }
 };

    const renderHeader = () => {
      let headerElement = ["id", "name", "email", "Company Name", "Zipcode"];

      return headerElement.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    };

    const renderBody = () => {
      return (
        <>{
          searchInput.length > 0 ? (
            filteredResults.map(({ id, name, email, company, address }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{company.name}</td>
                  <td>{address.zipcode}</td>
                </tr>
              );
            })
          ) :
            data.map(({ id, name, email, company, address }) => {
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{company.name}</td>
                  <td>{address.zipcode}</td>
                </tr>
              );
            })}
        </>
        
      );
    };

  
  return (
    <>
      <h1 id="title">React Table</h1>
      <input
        type="search"
        value={data.name}
        onChange={nameFilter}
        className="input"
        placeholder="Search by Name"
      />
      <input
        type="search"
        value={data.email}
        onChange={emailFilter}
        className="input"
        placeholder="Search by Email"
      />

      <table id="employee">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </>
  );
}

export default App;
