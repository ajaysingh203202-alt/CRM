import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Clayout() {
  const navigate = useNavigate();
  // function validate() {
  //     if (!localStorage.getItem('admin')) {
  //         navigate('/log');
  //     }

  // }

  // useEffect(() => {
  //     validate();
  // }, [])
  return (
    <>
      <div className="row mt-2">
        <div className="col-lg-2 bg-white h-50 shadow rounded-4 mb-2 ">
          {/* <div className="bg-white h-100 shadow  px-3 rounded-4">
             <Link to='' className='btn  btn-secondary btn-sm my-2'>Dashboard</Link>
                 
                    <br />
                      <Link to='viewenq' className='btn  btn-secondary btn-sm my-2'>Enquries</Link>
                    <br />
                     <Link to='Center' className='btn  btn-secondary btn-sm my-2'><i className="fa-regular fa-building"></i>Center</Link>
                     <br />
                      <Link to='visitor' className='btn  btn-secondary btn-sm my-2'>Visitor</Link>
                      <br />
                       <Link to='user' className='btn  btn-secondary btn-sm my-2'>User</Link>
                       <br />
                    <Link to='addenq' className='btn  btn-secondary btn-sm my-2'>Add Enquiries</Link>
                </div> */}

          <img
            src="/src/assets/spilogo.png"
            height={70}
            alt=""
            className="ms-5"
          />
          <Link to="" className="btn DashLink my-2">
            {" "}
            <i className="fa-solid fa-chart-line"></i> Dashboard
          </Link>
          <Link to="viewenq" className="btn DashLink my-2">
            <i className="fa-regular fa-comment-dots"></i> Enquiries
          </Link>
          {/* <Link to='Center' className='btn DashLink   my-2'><i className="fa-regular fa-building"></i>Center</Link> */}
          <Link to="visitor" className="btn DashLink my-2">
            <i className="fa-solid fa-users"></i> Visitor
          </Link>

          <Link to="addenq" className="btn DashLink  my-2">
            <i className="fa-solid fa-phone-volume"></i>Add Enquiries
          </Link>
          {/* <Link to='user' className='btn  my-2'><i className="fa-regular fa-user"></i> User</Link> */}
        </div>
        <div className="col-lg-10 Asdf">
          <div className="container">
            <div className="row p-0">
              <div className="col-lg-12 p-0">
                <nav className="navbar bg-white rounded-4 shadow ">
                  <div className="container-fluid">
                    <div className="d-flex">
                      <button
                        className="btn"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <i className="fa-solid fa-bars"></i>
                      </button>
                      <span className="pt-1">
                        <i className="fa-regular fa-bell pt-2"></i>
                      </span>
                    </div>
                    <div className="d-flex">
                      <img
                        src="/src/assets/spilogo.png"
                        alt=""
                        height={50}
                        className=" "
                      />
                    </div>
                  </div>
                </nav>
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>

      {/* offcanvas  */}
      

            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Offcanvas right</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
              
            </div>
    </>
  );
}

export default Clayout;
