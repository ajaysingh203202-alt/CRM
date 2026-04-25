import axios from "axios";
// import { set } from 'mongoose';
import React, { useEffect, useState } from "react";

import Carddash from "../Component/Carddash";

function Adviewenq() {
  const [enq, setEnq] = useState([]);
  const [user, setUser] = useState([]);
  const [editId, setEditId] = useState(null);
  const [uid, setUid] = useState("");
  const [rem, setRem] = useState("");
  const [filteruser, setFilteruser] = useState([]);
  const [selectedEnq, setSelectedEnq] = useState(null);

  const getenq = async () => {
    const res = await axios.get("http://localhost:5000/api/enq");
    console.log(res);
    if (res.data.msg == "sucess") {
      setEnq(res.data.enq);
      console.log(res.data.enq);
    }
  };

  ////////
  const handleRowClick = (data) => {
    setSelectedEnq(data);
    setEditId(data._id);
    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal1"),
    );
    modal.show();
  };
  // assign fun
  const assignfun = (e) => {
    // console.log(e);
    setEditId(e._id);
    var fu = user.filter((u) => {
      if (e.assignto && e.assignto._id == u._id) {
        return false;
      } else {
        return u.center == e.center && u.status == "u";
      }
    });
    setFilteruser(fu);
  };

  const delenq = async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/enq/${id}`);
    if (res.data.msg == "Delete") {
      alert("Delete Enq");
      setEnq(res.data.enq);
      // getenq()
      // console.log(res.data.enq);
    }
  };

  const updateenq = async (e) => {
    e.preventDefault();
    const d = Date();
    const data = {
      assignto: uid,
      assignby: localStorage.getItem("admin"),
      assigndate: d,
    };
    const res = await axios.put(
      `http://localhost:5000/api/enq/${editId}`,
      data,
    );
    // console.log(res);
    if (res.data.msg == "Update") {
      alert("Update successfully");
      setUid("");
      setEditId(null);
      getenq("");
      setRem("");
    }
  };

  const getuser = async () => {
    const res = await axios.get("http://localhost:5000/api/adduser");
    if (res.data.msg == "success") {
      setUser(res.data.adduser);
      // console.log(res.data.adduser);
    }
  };
  useEffect(() => {
    getenq();
    getuser();
  }, []);
  return (
    <>
      <div className="row bg-white mt-2 shadow rounded-3">
        <div className="col-lg-12 shadow rounded-3">
          <div className="row">
            <div className="col-lg-3 mt-5 ">
              <h3 className="">Enquiries</h3>

              <div
                className="btn-group mt-4"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  checked
                />
                <label className="btn btn-outline-primary" for="btnradio1">
                  Table
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                />
                <label className="btn btn-outline-primary" for="btnradio2">
                  Cards
                </label>
              </div>
            </div>
            <div className="col-lg-3 mt-4 mb-5">
              <div className="card">
                <p className="ps-4 pt-4">Total Enquiries</p>
                <h2 className="ps-4">{enq.length}</h2>
              </div>
            </div>
            <div className="col-lg-3 mt-4 mb-5">
              <div className="card">
                <p className="ps-4 pt-4">Assigned</p>
                <h2 className="ps-4 text-success">
                  {enq.filter((e) => e.assignto).length}
                </h2>
              </div>
            </div>
            <div className="col-lg-3 mt-4 mb-5">
              <div className="card">
                <p className="ps-4 pt-4">Not Assigned</p>
                <h2 className="ps-4 text-danger">
                  {enq.filter((e) => !e.assignto).length}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row bg-white mt-3 shadow rounded-3 mb-2 px-2">
        <div className="col-lg-2  mt-4">
          Search <br />
          <input
            type="search"
            placeholder="Name, mobile ,course"
            className="form-control"
          />
        </div>
        <div className="col-lg-2 mt-4">
          Status <br />
          <select className="form-control">
            <option>All</option>
            <option>1</option>
          </select>
        </div>
        <div className="col-lg-2 mt-4">
          Assigned To <br />
          <select className="form-control">
            <option>All</option>
            <option>1</option>
          </select>
        </div>
        <div className="col-lg-2 mt-4">
          Center <br />
          <select className="form-control">
            <option>All</option>

            <option>1</option>
          </select>
        </div>
        <div className="col-lg-2 mt-4">
          Source <br />
          <select className="form-control">
            <option>All</option>
            <option>1</option>
          </select>
        </div>
        <div className="col-lg-2 mt-4">
          Session <br />
          <select className="form-control">
            <option>All</option>
            <option>1</option>
          </select>
        </div>
        <div className="row mb-4 mt-2 ">
          <div className="col-lg-2">
            Next-follow-up
            <br />
            <select className="form-control">
              <option>All</option>
              <option>1</option>
            </select>
          </div>
          <div className="col-lg-2">
            Form <br />
            <input type="date" className="form-control" />
          </div>
          <div className="col-lg-2">
            To <br />
            <input type="date" className="form-control" />
          </div>
          <div className="col-lg-2 mt-4">
            <button className="btn btn-outline-dark ps-2 pe-2 w-100">
              RESET
            </button>
          </div>
        </div>
      </div>

      <div className="row shadow bg-white rounded-3">
        <div className="col-lg-12 mt-3">
          <div className="col-lg-12 d-flex gap-2 flex-wrap">
            <button className="rounded-1  t-btn">Copy</button>
            <button className="rounded-1 t-btn">Excel</button>
            <button className="rounded-1 t-btn">PDF</button>
            <button className="rounded-1 t-btn">Column visibility</button>
            <button className="rounded-1 t-btn">Show 10 rows </button>
            <div className="d-flex ms-md-auto">
              <label htmlFor="" className="ms-auto pt-2 form-label">
                Search:
              </label>
              <input type="search" className="ms-auto px-auto form-control" />
            </div>
          </div>
          <div className="table-responsive">
            <table className="table  mt-2">
              <thead>
                <tr className="table-light">
                  <th scope="col">Sr no</th>
                  <th>Date</th>
                  <th scope="col">Action</th>
                  <th>Source</th>
                  <th scope="col">Name</th>
                  <th scope="col">college</th>

                  <th scope="col">Center</th>
                  <th scope="col">for-Programme</th>
                  <th scope="col">Assigned</th>
                  <th> Status</th>
                  <th>Next Follow-up</th>

                  {/* <th scope="col">Role</th> */}
                </tr>
              </thead>
              <tbody>
                {enq.map((e, i) => (
                  <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.createdAt.split("T")[0]}</td>
                    <td className="">
                      <a
                        href={`https://api.whatsapp.com/send/?phone=${e.contactNumber}`}
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-outline-success d-inline rounded-5"
                        target="_blank"
                      >
                        WA
                      </a>
                      <a
                        href=""
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-outline-primary d-inline rounded-5 ms-1"
                      >
                        Copy
                      </a>

                      <div className="dropdown d-inline ms-1">
                        <button
                          className="btn btn-secondary rounded-5 "
                          onClick={(e) => e.stopPropagation()}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a
                              className="dropdown-item"
                              href="#"
                              onClick={() => delenq(e._id)}
                            >
                              {" "}
                              <i className="fa fa-trash ps-3 text-danger"></i>
                            </a>
                          </li>
                          {e.status == "u" && (
                            <li>
                              <button
                                type="button"
                                className="btn btn-primary ms-3"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                data-bs-whatever="@mdo"
                                onClick={() => {
                                  assignfun(e);
                                }}
                              >
                                Assign
                              </button>
                            </li>
                          )}
                          <li>
                            <button
                              type="button"
                              className="btn btn-primary dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal1"
                            >
                              Launch modal
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td>{e.source}</td>
                    <td>
                    <b>{e.fullName}</b>
                    <br />
                    {e.contactNumber}
                    <br />
                    {e.course}
                    </td>
                    <td>{e.college}</td>
                    <td>{e.center}</td>
                    <td>{e.forprogram || "-"}</td>
                    <td>{e.assignto ? e.assignto.name : "Not Assigned"}</td>
                    <td>{e.status == "u" ? "Active" : "Deactive"}</td>
                    <td>{e.nextfollowupadte || "-"}</td>
                    {/* <td>
                    <i className="fa fa-edit pe-3"></i>
                    <i className="fa fa-trash ps-3 text-danger"></i>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@fat">Open modal for @fat</button> */}
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Open modal for @getbootstrap</button> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Assign Enquriy
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={updateenq}>
              <div className="modal-body">
                <div className="mb-3">
                  {/* <input type="text"  value={editId}/> dekhne ke liye   */}

                  <label
                    for="recipient-name"
                    className="col-form-label text-muted"
                  >
                    Assign/Transfer to
                  </label>
                  <select
                    className="form-control"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                  >
                    <option value="">--Not Assigned--</option>
                    {filteruser.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.name}
                        {e.role == "Manager" ? "{m}" : "{c}"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label for="message-text" className="col-form-label">
                    Note (Optional)
                  </label>
                  <textarea
                    value={rem}
                    onChange={(e) => setRem(e.target.value)}
                    className="form-control"
                    id="message-text"
                    placeholder="Eg: transferred to manager for closure"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                <button
                  type="submit"
                  className="btn btn-primary w-50"
                  data-bs-dismiss="modal"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* modal start  */}
      <div className="modal fade" id="exampleModal1" tabIndex="-1">
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            {/* HEADER */}
            <div className="modal-header">
              <div>
                <h5 className="modal-title">
                  Enquiry #{selectedEnq?._id?.slice(-4)} -{" "}
                  {selectedEnq?.fullName}
                </h5>
                <small className="text-muted">
                  {selectedEnq?.role} • {selectedEnq?.center}
                </small>
              </div>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            {/* FILTER SECTION */}
            <div className="px-3 pt-2 d-flex gap-2">
              <input type="date" className="form-control" />
              <input type="date" className="form-control" />
              <button className="btn btn-warning w-100">
                Apply Date Filter
              </button>
              <button className="btn btn-outline-secondary w-100">Reset</button>
            </div>

            {/* STATUS CARDS */}
            <div className="row px-3 mt-3">
              <div className="col-md-3">
                <div className="card p-2 border-0 shadow">
                  <small>Assigned To</small>
                  <b>{selectedEnq?.assignto?.name || "Not Assigned"}</b>
                </div>
              </div>

              <div className="col-md-3 ">
                <div className="card p-2 border-0 shadow">
                  <small>Status</small>
                  <b>{selectedEnq?.status || "New"}</b>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card p-2 border-0 shadow">
                  <small>Next Follow-up</small>
                  <b>{selectedEnq?.nextfollowupdate || "-"}</b>
                </div>
              </div>

              <div className="col-md-3">
                <div className="card p-2 border-0 shadow">
                  <small>Total Followups</small>
                  <b>0</b>
                </div>
              </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="row p-3">
              {/* LEFT SIDE - USER INFO */}
              <div className="col-md-5">
                <div className="card p-3 border-0 shadow">
                  <h5>
                    {selectedEnq?.fullName}
                    <span className="badge bg-warning ms-2">New</span>
                  </h5>

                  <hr />

                  <p>
                    <b>Mobile:</b> {selectedEnq?.contactNumber}
                  </p>
                  <p>
                    <b>Email:</b> {selectedEnq?.email}
                  </p>
                  <p>
                    <b>Course:</b> {selectedEnq?.course}
                  </p>
                  <p>
                    <b>Center:</b> {selectedEnq?.center}
                  </p>
                  <p>
                    <b>Created:</b> {selectedEnq?.createdAt?.split("T")[0]}
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <a
                      href={`tel:${selectedEnq?.contactNumber}`}
                      className="btn btn-outline-primary w-50"
                    >
                      Call
                    </a>

                    <a
                      href={`https://api.whatsapp.com/send/?phone=${selectedEnq?.contactNumber}`}
                      target="_blank"
                      className="btn btn-outline-success w-50"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - TIMELINE */}
              <div className="col-md-7">
                <div className="card p-3 border-0 shadow h-100">
                  <div className="d-flex justify-content-between">
                    <h6>Follow-up Timeline</h6>
                    <button className="btn btn-sm btn-outline-secondary">
                      Refresh
                    </button>
                  </div>

                  <p className="text-muted mt-3">
                    No follow-ups in selected range.
                  </p>
                </div>
              </div>
            </div>

            {/* ASSIGN SECTION */}
            <form onSubmit={updateenq}>
              <div className="p-3 border-top">
                <div className="row">
                  <div className="col-md-6">
                    <label>Assign To</label>
                    <select
                      className="form-control"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                    >
                      <option value="">-- Not Assigned --</option>
                      {user.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label>Note</label>
                    <textarea
                      className="form-control"
                      value={rem}
                      onChange={(e) => setRem(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="text-end mt-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Assign Enquiry
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* modal End  */}
    </>
  );
}

export default Adviewenq;
