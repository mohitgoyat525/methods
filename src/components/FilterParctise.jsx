import React, { useState, useEffect } from "react";

const FilterPractice = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("data"));
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const newData = [...data, { name, lastName, email }];
    setData(newData);
    localStorage.setItem("data", JSON.stringify(newData));

    setName("");
    setLastName("");
    setEmail("");
  };

  const filteredData = data.filter(
    (item) =>
      item.name.includes(search) ||
      item.lastName.includes(search) ||
      item.email.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 justify-center">
      <form
        className="bg-white shadow-lg rounded-lg p-8 max-w-[600px] w-full mx-auto"
        onSubmit={submit}
      >
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded-lg p-4 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg p-4 outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg p-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-300 rounded-lg p-4 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 ease-linear duration-300 transition-all"
          >
            Submit
          </button>
        </div>
      </form>

      <div className="mt-8 w-full max-w-[600px] mx-auto">
        <h2 className="text-xl text-gray-800 font-semibold mb-4">
          Search Results
        </h2>
        <div className="my-4">
          {search && filteredData.length === 0 ? (
            <p className="text-center text-gray-500">No users found</p>
          ) : (
            filteredData.map((item, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg p-6 flex items-center border border-solid border-black gap-5"
              >
                <p className="text-lg font-semibold text-gray-800 ">
                  First Name:- {item.name}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Last Name:- {item.lastName}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Email:- {item.email}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPractice;
