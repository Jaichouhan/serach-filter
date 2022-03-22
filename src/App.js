import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
function App() {
  const [search, setSearch] = useState([]);
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(search);

  const searchItem = (value) => {
    setInput(value);
    if (input !== "") {
      const filterData = search.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(input.toLowerCase());
      });
      setData(filterData);
    } else {
      setData(search);
    }
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              onChange={(e) => searchItem(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container">
        <div style={{ marginTop: 20 }}>
          {input.length > 1 &&
            data.map((item, key) => {
              return (
                <div key={key}>
                  <div>
                    <div>{item.name}</div>
                    <div>{item.email}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
