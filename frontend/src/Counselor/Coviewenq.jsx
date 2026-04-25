import axios from "axios";
// import { set } from 'mongoose';
import React, { useEffect, useState } from "react";

import Carddash from "../Component/Carddash";
import { toast } from "react-toastify";

function Coviewenq() {
  const [enq, setEnq] = useState([]);
  const [user, setUser] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filteruser, setFilteruser] = useState([]);
  const [uid, setUid] = useState("");
  const [d, setd] = useState(false);
  const [rem, setRem] = useState("");
  const [selectedEnq, setSelectedEnq] = useState(null);
  const [filterfollow, setfilterfollow] = useState([]);
  const [status, setstatus] = useState("");
  const [nextdate, setnextdate] = useState("");
  const [program, setprogram] = useState("");
  const [remark, setremark] = useState("");
  // const [allenq ,setAllenq]= useState(0);      \
  // const [assin ,setassink]= useState(0);       Dynmaic Enquiries
  // const [notassin ,setNotassin]= useState(0);  /

  const getenq = async () => {
    const res = await axios.get("http://localhost:5000/api/enq");
    const res2 = await axios.get(
      `http://localhost:5000/api/adduser/${localStorage.getItem("Counselor")}`,
    );
    if (res.data.msg == "sucess" && res2.data.msg == "success") {
      console.log(res.data.enq);
      var enquries = res.data.enq.filter((a) => {
        return a.assignto
          ? a.assignto._id == localStorage.getItem("Counselor")
          : a.center == res2.data.adduser.center;
      });
      console.log(enquries);
      setEnq(enquries);
      console.log(res.data.enq);
    }
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
      assignby: localStorage.getItem("Counselor"),
      assigndate: d,
    };
    const res = await axios.put(
      `http://localhost:5000/api/enq/${editId}`,
      data,
    );
    const assigndata = {
      enqid: editId,
      assignto: uid,
      assignby: localStorage.getItem("Counselor"),
      assignbyModel: "adduser",
      remark: rem,
    };
    const res2 = await axios.post(
      `http://localhost:5000/api/assign`,
      assigndata,
    );
    // console.log(res);
    if (res.data.msg == "Update" && res2.data.msg == "Success") {
      alert("Update successfully");
      setUid("");
      setEditId(null);
      // setEnq("");
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

  const assignfun = (e) => {
    // console.log(e);
    setEditId(e._id);
    var fu = user.filter((u) => {
      if (localStorage.getItem("Counselor") == u._id) {
        return false;
      } else {
        return u.center == e.center;
      }
    });
    setFilteruser(fu);
  };

  // for follow up data 27-03-26

  const addfollowup = async (e) => {
    e.preventDefault();
    const followupdata = {
      enqid: selectedEnq._id,
      uid: localStorage.getItem("Counselor"),
      status,
      nextdate,
      remark,
      program,
    };
    // console.log(followupdata)
    const res = await axios.post(
      "http://localhost:5000/api/followup",
      followupdata,
    );
    if (res.data.msg == "sucess") {
      window.alert("Follow-up added successfully");
      setstatus("");
      setprogram("");
      setremark("");
      setnextdate("");
    } else {
      window.alert("Something went Wrong");
    }
  };

  //  filter for histroy of followup
  const getfollowup = async (id) => {
    const res = await axios.get("http://localhost:5000/api/followup");
    console.log("ajay" + res);
    if (res.data.msg == "sucess") {
      const followupdata = res.data.followup;
      console.log(followupdata[0].enqid._id);
      console.log(id);
      // console.log(JSON.stringify(followupdata));
      const fd = followupdata.filter((f) => {
        return f.enqid._id == id;
      });
      console.log(fd);
      setfilterfollow(fd);
    }
  };

  useEffect(() => {
    getenq();
    getuser();
  }, []);

  const handleRowClick = (data) => {
    setSelectedEnq(data);
    if (
      data.assignto &&
      data.assignto._id == localStorage.getItem("Counselor")
    ) {
      setd(false);
    } else {
      setd(true);
    }
    getfollowup(data._id);

    const offcanvas = new window.bootstrap.Offcanvas(
      document.getElementById("enqOffcanvas"),
    );
    offcanvas.show();
  };

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
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio1">
                  Table
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                />
                <label className="btn btn-outline-primary" htmlFor="btnradio2">
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
                  <tr
                    key={i}
                    onClick={() => {
                      e.status == "u"
                        ? handleRowClick(e)
                        : toast.error("Enquiry is Deactive");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <th scope="row">{i + 1}</th>
                    <td>{e.createdAt.split("T")[0]}</td>
                    <td className="">
                      <a
                        href={`https://api.whatsapp.com/send/?phone=${e.contactNumber}`}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-outline-success d-inline"
                      >
                        WA
                      </a>
                      <a href="" className="btn btn-primary d-inline ms-1">
                        Copy
                      </a>
                    </td>
                    <td>{e.source}</td>
                    <td>
                      <b> {e.fullName}</b>
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
                    htmlFor="recipient-name"
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
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
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

      {/* off canvas start */}

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="enqOffcanvas"
        style={{ width: "420px" }}
      >
        <div className="offcanvas-header border-bottom">
          <div>
            <h5 className="mb-0">Enquiry Details</h5>
            <small className="text-muted">
              {selectedEnq?.course} • {selectedEnq?.center}
            </small>
          </div>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          {selectedEnq && (
            <>
              {/* USER HEADER */}
              <div className="mb-3">
                <span
                  className="badge float-end"
                  style={{ backgroundColor: "#ff7300" }}
                >
                  New
                </span>
                <h6 className="mb-0">{selectedEnq.fullName}</h6>
                <small className="text-muted">
                  {selectedEnq.course} • {selectedEnq.center}
                </small>
              </div>

              <hr />

              {/* DETAILS */}
              <div className="mb-3">
                <p className="mb-1">
                  <b>Mobile:</b> {selectedEnq.contactNumber}
                </p>
                <p className="mb-1">
                  <b>Email:</b> {selectedEnq.email || "-"}
                </p>
                <p className="mb-1">
                  <b>Course:</b> {selectedEnq.course}
                </p>
                <p className="mb-1">
                  <b>Center:</b> {selectedEnq.center}
                </p>
                <p className="mb-1">
                  <b>Assigned:</b>{" "}
                  {selectedEnq.assignto?.name || "Not Assigned"}
                </p>
                <p className="mb-1">
                  <b>Created:</b> {selectedEnq.createdAt?.split("T")[0]}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              {selectedEnq.assignto && (
                <div className="d-flex gap-2 mb-3">
                  <a
                    href={`tel:${selectedEnq.contactNumber}`}
                    className="btn btn-outline-primary w-100"
                  >
                    Call
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send/?phone=${selectedEnq.contactNumber}`}
                    target="_blank"
                    className="btn btn-outline-success w-100"
                  >
                    WhatsApp
                  </a>

                  <button
                    type="button"
                    className="btn btn-outline-warning w-100"
                    disabled
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                    onClick={() => {
                      assignfun(selectedEnq);
                    }}
                  >
                    Transfer
                  </button>
                </div>
              )}

              <hr />

              {/* FOLLOW-UP SECTION */}
              <h6>Add Follow-Up</h6>
              <div className="position-relative">
                {d && (
                  <div
                    style={{ backgroundColor: "rgba(255,0,0,0.3" }}
                    className="d-flex justify-content-center align-items-center display-1 rounded-3 position-absolute w-100 h-100"
                  >
                    <i className="fa-solid fa-lock"></i>
                  </div>
                )}

                <form action="post" onSubmit={addfollowup}>
                  <div className="mb-2">
                    <label>Status</label>
                    <select
                      value={status}
                      onChange={(e) => setstatus(e.target.value)}
                      className="form-control"
                    >
                      <option>Follow Up</option>
                      <option>Hot Enquire</option>
                      <option>Cold Enquire</option>
                      <option>Not Interest</option>
                      <option>Registor</option>
                    </select>
                  </div>

                  <div className="mb-2">
                    <label>Next Follow-Up Date</label>
                    <input
                      value={nextdate}
                      onChange={(e) => setnextdate(e.target.value)}
                      type="date"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-2">
                    <label>For Programme</label>
                    <select
                      value={program}
                      onChange={(e) => setprogram(e.target.value)}
                      className="form-control"
                    >
                      <option>Select Programme</option>
                      <option>Summer Training</option>
                      <option>Vocational Training</option>
                      <option>Industrial Training</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Remark</label>
                    <textarea
                      value={remark}
                      onChange={(e) => setremark(e.target.value)}
                      className="form-control"
                      placeholder="Write exact conversation notes..."
                    ></textarea>
                  </div>

                  {/* button */}
                  <input
                    type="submit"
                    className="btn text-white fw-semibold w-100 mb-3"
                    style={{ backgroundColor: "#ff7300" }}
                    value="Save Follow-up"
                  />
                </form>
              </div>

              <hr />

              {/* TIMELINE */}
              {/* TIMELINE */}
              <div className="d-flex justify-content-between align-items-center">
                <h6>Follow-Up Timeline</h6>
                <button className="btn btn-sm btn-outline-secondary">
                  Refresh
                </button>
              </div>

              {filterfollow.map((f) => (
                <div>
                  <ul className="coview">
                    <li className="">
                      <span className="fw-semibold">{f.status}</span>{" "}
                      <span className="ms-5">{f.createdAt}</span>
                      <p className="text-muted">{f.remark}</p>
                      <p className="text-muted">
                        <span>
                          By :{" "}
                          <span className="fw-semibold">{f.uid.name} </span>|
                          Next : {f.nextdate}
                        </span>
                      </p>
                      <hr />
                    </li>
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Coviewenq;
