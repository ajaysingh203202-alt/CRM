import axios from "axios";
import React, { useEffect, useState } from "react";

function Mviewenq() {
  const [enq, setEnq] = useState([]);
  const [mydata, setMydata] = useState("");
  const [uid, setUid] = useState("");
  const [user, setUser] = useState([]);
  const [rem, setRem] = useState("");
  const [editId, setEditId] = useState(null);
  const [selectedEnq, setSelectedEnq] = useState(null);


  const getenq = async () => {
    const response = await axios.get("http://localhost:5000/api/enq");
    const response2 = await axios.get(
      `http://localhost:5000/api/adduser/${localStorage.getItem("Manager")}`,
    );
    if (response.data.msg == "sucess" && response2.data.msg == "success") {
      setMydata(response2.data.adduser);

      var enquiries = response.data.enq.filter((a) => {
        return a.center == response2.data.adduser.center;
      });
      console.log(enquiries);
      setEnq(enquiries);
      // console.log(res.data.enq);
    }
  };
  //////////////
  const handleRowClick = (data) => {
    setSelectedEnq(data);
    setEditId(data._id);
    const modal = new window.bootstrap.Modal(
      document.getElementById("exampleModal1"),
    );
    modal.show();
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
  useEffect(() => {
    getenq();
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
                  autocomplete="off"
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
                  autocomplete="off"
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
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile No</th>
                  <th scope="col">Course</th>
                  <th scope="col">Role</th>
                  <th scope="col">Center</th>
                  <th scope="col">Action</th>
                  {/* <th scope="col">For Programme</th> */}
                  {/* <th scope="col">Role</th> */}
                </tr>
              </thead>
              <tbody>
                {enq.map((e, i) => (
                  <tr key={i} onClick={() => handleRowClick(e)} style={{ cursor: "pointer" }}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.createdAt.split("T")[0]}</td>
                    <td>{e.fullName}</td>
                    <td>{e.email}</td>
                    <td>{e.contactNumber}</td>
                    <td>{e.course}</td>
                    <td>{e.role}</td>
                    <td>{e.center}</td>
                    <td>
                      <i className="fa fa-edit pe-3"></i>
                      <i className="fa fa-trash ps-3 text-danger"></i>
                    </td>
                    {/* <td>{e.forprogram}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
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

export default Mviewenq;
