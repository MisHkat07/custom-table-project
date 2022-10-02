import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [data, setData] = useState([]);
  const [nameField, setNamefield] = useState("");
  const [emailField, setEmailfield] = useState("");

  const getData = async () => {
    const response = await axios.get(URL);
    setData(response.data);
  };
  useEffect(() => {
    getData();
  }, [data]);

  const nameFilter = (event) => {
    setNamefield(event.target.value);
  };
  const emailFilter = (event) => {
    setEmailfield(event.target.value);
  };

  const renderHeader = () => {
    let headerElement = ["id", "name", "email", "Company Name", "Zipcode"];
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
      const filteredData = data.filter((d) => {
        return nameField
          ? d.name.toLowerCase().includes(nameField.toLowerCase())
          : d.email.toLowerCase().includes(emailField.toLowerCase());
      });
    return (
      <>
        {
          filteredData.map(({ id, name, email, company, address }) => {
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
        }
      </>
    );
  };

  return (
    <>
      <h1 id="title">React Table</h1>
      {!data.length ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <span>
            <input
              type="search"
              onChange={nameFilter}
              className="input"
              placeholder="Search by Name"
            />
            <input
              type="search"
              onChange={emailFilter}
              className="input"
              placeholder="Search by Email"
            />
          </span>
            <div className="table-wrapper">
              <table className="fl-table">
            <thead>
              <tr>{renderHeader()}</tr>
            </thead>
            <tbody>{renderBody()}</tbody>
            </table>
            </div>
          
        </div>
      )}
    </>
  );
}

export default App;
