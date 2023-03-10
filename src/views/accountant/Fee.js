import React, { useEffect, useState } from "react";

// components

import MapExample from "components/Maps/MapExample.js";
import { Link } from "react-router-dom";

export default function Fee() {
  const [fee, setFee] = useState(null);
  const [donation, setDonation] = useState(null);
  const [createFee, setCreateFee] = useState(false);
  const [createDonation, setCreateDonation] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);
  const [feeId, setFeeId] = useState(null);
  const [updateText, setUpdateText] = useState(null);
  const [inputText, setInputText] = useState({
    name: "",
    required: "",
    memberPayment: "",
  });

  const handleChange = (event) =>
    setInputText({
      ...inputText,
      [event.target.name]: event.target.value,
    });
  const handleUpdate = (event) =>
    setUpdateText({
      ...updateText,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/fee/create", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: inputText.name,
        required: inputText.required,
        memberPayment: inputText.memberPayment === "true" ? true : false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // history.replace("/admin/tables");
        // code here //
        if (data.errors) {
          alert(data.errors[0].message); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitDonation = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/fee/create", {
      method: "POST",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: inputText.name,
        required: 0,
        memberPayment: false,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(inputText.phone, inputText.password);
        // history.replace("/admin/tables");
        // code here //
        if (data.errors) {
          alert(data.errors[0].message); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateSubmit = (id) => {
    fetch(`http://localhost:5000/fee/update/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: updateText.name,
        required: updateText.required,
        memberPayment: updateText.memberPayment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(inputText.phone, inputText.password);
        // code here //
        if (data.errors) {
          alert(data.errors[0].message); /*displays error message*/
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:5000/fee/list", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFee(data.data.list.fee);
        setDonation(data.data.list.donation);
      });
  };

  const fetchDelete = (id) => {
    fetch(`http://localhost:5000/fee/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.text()) // or res.json()
      .then((res) => console.log(res));
  };

  return (
    <>
      {showTable ? (
        <>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                      Danh s??ch c??c kho???n ph??
                    </h3>
                  </div>
                  <button
                    className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => {
                      setCreateFee(true);
                      setShowTable(false);
                    }}
                  >
                    T???o kho???n b???t bu???c
                  </button>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        T??n
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        S??? ti???n
                      </th>

                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fee &&
                      fee.map((fee) => (
                        <tr key={fee._id}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                            {fee.name}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                            {fee.required} VND
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <button
                              className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(e) => {
                                setShowUpdate(true);
                                setFeeId(fee._id);
                                setUpdateText(fee);
                                setShowTable(false);
                              }}
                            >
                              S???a
                            </button>
                            <button
                              className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(e) => {
                                fetchDelete(fee._id);
                                window.location.reload(true);
                              }}
                            >
                              X??a
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className={"font-semibold text-lg text-blueGray-700"}>
                      Danh s??ch c??c ????ng g??p
                    </h3>
                  </div>
                  <button
                    className="text-lightBlue-500 bg-transparent border border-solid border-lightBlue-500 hover:bg-lightBlue-500 hover:text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => {
                      setCreateDonation(true);
                      setShowTable(false);
                    }}
                  >
                    T???o kho???n ????ng g??p
                  </button>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        T??n
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      >
                        S??? ti???n
                      </th>

                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {donation &&
                      donation.map((donation) => (
                        <tr key={donation._id}>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                            {donation.name}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-l whitespace-nowrap p-4">
                            {donation.required} VND
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            <button
                              className="text-teal-500 bg-transparent border border-solid border-teal-500 hover:bg-teal-500 hover:text-white active:bg-teal-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(e) => {
                                setShowUpdate(true);
                                setFeeId(donation._id);
                                setUpdateText(donation);
                                setShowTable(false);
                              }}
                            >
                              S???a
                            </button>
                            <button
                              className="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={(e) => {
                                fetchDelete(fee._id);
                                window.location.reload(true);
                              }}
                            >
                              X??a
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        </>
      ) : null}
      {createFee ? (
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-xl font-bold">
                      T???o kho???n ph??
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="text"
                      >
                        T??n kho???n ph??
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="name"
                        value={inputText.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="text"
                      >
                        S??? ti???n c???n ????ng
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="required"
                        value={inputText.required}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          name="memberPayment"
                          value="true"
                          onChange={handleChange}
                        />{" "}
                        ????ng theo th??nh vi??n{" "}
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          handleSubmit(e);
                          setCreateFee(false);
                          setShowTable(true);
                        }}
                      >
                        T???o
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {createDonation ? (
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-xl font-bold">
                      T???o kho???n ph??
                    </h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="text"
                      >
                        T??n kho???n ph??
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="name"
                        value={inputText.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          handleSubmitDonation(e);
                          setCreateDonation(false);
                          setShowTable(true);
                          window.location.reload(true);
                        }}
                      >
                        T???o
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showUpdate ? (
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-xl font-bold">S???a</h6>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="text"
                      >
                        T??n kho???n ph??
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="name"
                        value={updateText.name}
                        onChange={handleUpdate}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="text"
                      >
                        S??? ti???n c???n ????ng
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        name="required"
                        value={updateText.required}
                        onChange={handleUpdate}
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => {
                          handleUpdateSubmit(feeId);
                          setShowUpdate(false);
                          setShowTable(true);
                          window.location.reload(true);
                        }}
                      >
                        S???a
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
