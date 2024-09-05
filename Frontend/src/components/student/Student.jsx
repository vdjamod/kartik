import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Modal from "./Modal";

const today = new Date().toISOString().split("T")[0];

function Student() {
  let { id } = useParams();
  // console.log(allProduct);
  const [allEmployee, setAllEmployee] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      setAllEmployee(
        (await axios.get(`/API/owner/${id}/manage/employee`)).data
      );
    }
    getData();
  }, []);

  // Style
  const BUTTON_WRAPPER_STYLES = {
    position: "relative",
    zIndex: 1,
  };

  const OTHER_CONTENT_STYLES = {
    position: "relative",
    zIndex: 2,
    backgroundColor: "gray",
    padding: "10px",
  };

  return (
    <div>
      <form method="get" action={`/home/student/${id}`}>
        <button
          type="submit"
          className="m-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Employee
        </button>
      </form>

      <form method="get" action={`/owner/${id}/manage/employee/`}>
        <label className="ml-8">Select Range: </label>
        <input type="range" min={0} />

        <button className="m-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Range Submit
        </button>
      </form>

      <div style={BUTTON_WRAPPER_STYLES}>
        <button
          onClick={() => setIsOpen(true)}
          type="submit"
          className="m-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Filter
        </button>
        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          {/* Salary */}
          <b>Salary</b>
          <div className="mt-2 ml-5">
            <input type="checkbox" />
            <label className="ml-1">Rs.10000 to Rs.20000</label>
            <br />
            <input type="checkbox" />
            <label className="ml-1">Rs.20000 to Rs.30000</label>
            <br />
            <input type="checkbox" />
            <label className="ml-1">Rs.30000 to Rs.40000</label>
            <br />
            <input type="checkbox" />
            <label className="ml-1">Rs.40000 to Rs.50000</label>
            <br />
            <input type="checkbox" />
            <label className="ml-1">Rs.50000 to Rs.60000</label>
            <br /> <br />
            <input
              type="range"
              min={0}
              max={100000}
              name="vol"
              step={10000}
              // value={50000}
            />
            <br />
            <label>Custom</label>
          </div>

          <br />

          {/* Name */}
          <div>
            <b>Name</b>
            <input
              type="text"
              // onChange={(e) => setSearch(e.target.value)}
              className="mt-4 ml-5 block w-half rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <br />

          {/* Joining Date */}
          <div>
            <b>Joining Date</b>
            <br />
            <input
              type="Date"
              max={today}
              // min={CompanyStartDate}
              className="ml-5 mt-4 px-1.5 py-1.5 rounded-md border-0 ring-1 ring-gray-300"
            />
          </div>

          <br />

          {/* Designation */}
          <div>
            <b>Designation</b>
            <div className="ml-5">
              <input
                type="text"
                // onChange={(e) => setSearch(e.target.value)}
                placeholder="search"
                className="mt-4 mb-4 block w-half rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <label className="ml-1">FrontEnd Developer</label>
              <br />
              <input type="checkbox" />
              <label className="ml-1">Backend Developer</label>
              <br />
              <input type="checkbox" />
              <label className="ml-1">FullStack Developer</label>
              <br />
              <input type="checkbox" />
              <label className="ml-1">Machine Learning</label>
              <br />
              <input type="checkbox" />
              <label className="ml-1">Designer</label>
              <br />
              <input type="checkbox" />
              <label className="ml-1">Android Developer</label>
              <br />
              <input type="checkbox" />
              <label className="ml-1">MAC Developer</label>
              <br />
            </div>
          </div>
        </Modal>
      </div>

      {/* <div style={OTHER_CONTENT_STYLES}>
        Other Content
      </div> */}

      {/* <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        className="block w-half rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      /> */}

      <div>
        <ul role="list" className="divide-y divide-gray-100">
          {allEmployee
            // .filter((employee) => {
            //   return search.toLowerCase() === ""
            //     ? employee
            //     : employee.name.toLowerCase().includes(search);
            // })
            .map((employee) => (
              // eslint-disable-next-line react/jsx-key
              <Link
                className="text-sm font-semibold leading-6 text-gray-900"
                to={`/owner/${id}/manage/employee/${employee._id}`}
              >
                <li
                  key={employee._id}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <div className="flex min-w-0 gap-x-4">
                    {/* </div> */}
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={employee.imgUrl}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      {employee.name}

                      <br></br>
                      <a className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {employee.email}
                      </a>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Student;
