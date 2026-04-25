import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Adlayout() {
  const navigate = useNavigate();
  function validate() {
    if (!localStorage.getItem("admin")) {
      navigate("/log");
    }
  }
  function logout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("role");
    navigate("/log");
  }

  useEffect(() => {
    validate();
  }, []);
  return (
    <>
      <div className="row mt-2 AdminLayout">
        {/* <div className="col-lg-2 col-md-10 d-none d-md-block mx-auto  bg-white h-50 shadow rounded-4 mb-2">
                    <img src="/src/assets/spilogo.png" height={70} alt="" className='ms-5' />
                    <Link to='' className='btn DashLink  my-2'> <i className="fa-solid fa-chart-line"></i> Dashboard</Link>
                    <Link to='viewenq' className='btn DashLink  my-2'><i className="fa-regular fa-comment-dots"></i> Enquiries</Link>
                    <Link to='Center' className='btn DashLink my-2'><i className="fa-regular fa-building"></i>Center</Link>
                    <Link to='visitor' className='btn DashLink my-2'><i className="fa-solid fa-users"></i> Visitor</Link>
                    <Link to='addenq' className='btn DashLink my-2'><i className="fa-solid fa-phone-volume"></i>Add Enquiries</Link>
                     <Link to='user' className='btn DashLink my-2'><i className="fa-regular fa-user"></i> User</Link>
                </div> */}

        <div className="col-lg-12 Asdf">
          <div className="container">
            <div className="row p-0">
              <div className="col-lg-12 p-0">
                <nav className="navbar bg-white rounded-4 shadow ">
                  <div className="container-fluid">
                    <div className="d-flex">
                      {/* <button className="btn d-md-none d-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><i className="fa-solid fa-bars"></i></button> */}
                      <button
                        className="btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasScrolling"
                        aria-controls="offcanvasScrolling"
                      >
                        <i className="fa-solid fa-bars"></i>
                      </button>

                      <span className="pt-1">
                        <i className="fa-regular fa-bell pt-2"></i>
                      </span>
                    </div>
                    <div className="d-flex gap-2">
                      <b className="my-auto">
                        <button className="btn btn-outline-warning text-danger btn-sm fw-bold">
                          {localStorage.getItem("role")}
                        </button>
                      </b>
                      <div className="dropdown">
                        <button
                          style={{ border: "none", borderRadius: "50%" }}
                          type="button"
                          className="bg-white"
                          data-bs-toggle="dropdown"
                        >
                          <img
                            src="/src/assets/manager.png"
                            alt="profile"
                            width={50}
                            style={{ borderRadius: "50%" }}
                          />
                        </button>

                        <ul
                          className="dropdown-menu"
                          style={{
                            left: "auto",
                            right: "0",
                          }}
                        >
                          {/* <li className="dropdown-item"></li> */}
                          {/* <li><button className="dropdown-item">Change Password</button></li> */}

                          <li className="border-top">
                            <button
                              type="submit"
                              className="btn btn-success pe-1 ps-1  mx-2 mt-2"
                              onClick={logout}
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start"
        data-bs-backdrop="false"
        tabindex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <img
            src="/src/assets/spilogo.png"
            height={120}
            alt=""
            className="mx-auto"
          />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <Link to="" className="btn DashLink my-2">
            {" "}
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </Link>
          <Link to="viewenq" className="btn DashLink my-2">
            <i className="fa-regular fa-comment-dots"></i> Enquiries
          </Link>
          <Link to="Center" className="btn DashLink my-2">
            <i className="fa-regular fa-building"></i>Center
          </Link>
          <Link to="visitor" className="btn DashLink my-2">
            <i className="fa-solid fa-users"></i> Visitor
          </Link>
          <Link to="addenq" className="btn DashLink my-2">
            <i className="fa-solid fa-phone-volume"></i>Add Enquiries
          </Link>
          <Link to="user" className="btn DashLink my-2">
            <i className="fa-regular fa-user"></i> User
          </Link>
        </div>
      </div>

      {/* offcanvas 

            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close" data-bs-dilgiss="offcanvas" aria-label="Close"></button>
                </div>
              
            </div> */}
    </>
  );
}

export default Adlayout;
