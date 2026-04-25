import React, { useState } from 'react'

function ForgotPassword() {
    const [step,setStep] =useState(1);
    const [email,setEmail] =useState("");
    const [otp,setOtp] =useState("");
    const [newPassword,setNewpassword] =useState("");
    const [confirmPassword,setConfirmpassword] =useState("");

    const sendOtp = async (e)=>{
        e.preventDefault();
        const res = await axios.post(`http://localhost:5000/api/otp/send_otp`,(email));
        if(res.data.msg=="Success"){
            toast.success("OTP sent");
            setStep(2);
        }
        else{
            toast.error(res.data.msg || "Otp Not Sent ");
        }
    } 
  return (
   <>
   <div className="row">
    <div className="col-sm-5 my-5  mx-auto">
        <h5>Forget Password</h5><br />
        {
        step ==1 &&(
        <form action="" onSubmit={sendOtp} className='shadow-lg px-4 py-5'>
            Enter Your Email:  <br />
            <input type="email"  value={email} onChange={(e)=>setEmail(e.target.value)} name="" className='w-100' /> <br /><br />
            <button className='btn btn-primary w-100'>Send OTP</button>
        </form>
        )}

        {
        step==2 && (
        // {/* 2nd form  */}
        <form   className='shadow-lg px-4 py-5'>
            Enter Your OTP:  <br />
            <input type="text"  value={otp} onChange={(e)=>setOtp(e.target.value)} name="" className='w-100' /> <br /><br />
            <button className='btn btn-primary w-100'>Verify OTP</button>
        </form>
        )
        }
        {/* 3rd form  */}
        {
        step==3 &&(
        <form action=""  className='shadow-lg px-4 py-5'>
            Enter Your New Password:  <br />
            <input type="password"  value={newPassword} onChange={(e)=>setNewpassword(e.target.value)} name="" className='w-100' /> <br /><br />
            Enter Your con Password:  <br />
            <input type="password" value={confirmPassword} onChange={(e)=>setConfirmpassword(e.target.value)} name="" className='w-100' /> <br /><br />
            <button className='btn btn-primary w-100'>Create Password</button>
        </form>
    )}
    </div>
   </div>
   </>
  )
}

export default ForgotPassword
