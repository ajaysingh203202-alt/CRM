import React, { useEffect, useState } from 'react'
import bg from '/src/assets/bg.jpeg';
import axios from 'axios';
import { toast } from 'react-toastify';
function Profile() {
    const [user,setuser]=useState('');
    const [check,setCheck]=useState(false);
    const [qua,setQua]=useState("");
    const [skill,setSkill]=useState("");
    const [exp,setExp]=useState("");
    const [add,setAdd]=useState("");

    const getuser = async ()=>{
        const res = await axios.get(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`);
        console.log(res)
        if(res.data.msg=="success"){
            setuser(res.data.adduser);
            setSkill(res.data.setSkill);
            setExp(res.data.setExp);
            setAdd(res.data.setAdd);
            setQua(res.data.setQua);
        }
    }
    async function updateprofile() {
        if(check){
            const datauser = {qua,exp,add,skill};
            const res= await axios.put(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`,datauser)
            if(res.data.msg=="success"){
                toast.success("Update Success");
                getuser();
            }
            else{
                toast.error("Something went wrong")
            }
        }
    }
   async  function uploadpic(p){
        if(p){
            const res = await axios.post(`http://localhost:5000/api/adduser/${localStorage.getItem('Counselor')}`,{"profilePic":p});
        console.log(res);
        if(res.data.msg=="success"){
            toast.successs("Pic Uploaded");
           
        }
         else{
            toast.error("Something went wrong");
        }
        }
        else{
            toast.error("No Image Selected");
        }
    }

    useEffect(()=>{
        getuser();
    },[])

  return (
    <>
        <div className="row p-3" style={{backgroundImage:`url(${bg})`, height:"85vh",backgroundSize:"Cover",overflow:"auto"}}>
            <div className='col-md-5 mx-auto rounded-4 shadow-md p-3 ' style={{backgroundColor:"white"}}>
                <div className='position-relative'>
                    <img src="/src/assets/user.jpg" alt="" className='h-50 w-50 rounded-5 mx-auto d-block p-2'style={{filter:"drop-shadow(5px 5px 10px gray)",}} />
                    <label htmlFor="profilePic" className='bg-danger'><i className='fa fa-pen position-absolute py-2 bg-warning rounded-5 d-block mx-auto' style={{left:"65%", bottom:"18%",width:"30px",boxShadow:"2px 2px 5px inset gray,2px 2px 5px gray"}}></i></label>
                    <input type="file" onChange={(e)=>{uploadpic(e.target.files[0])}} style={{display:"none"}} name='' id='profilePic' />
                    </div>
                <div className="row">
                    <div className="col-md-12"><h6 className='text-muted '>Name : {user.name}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Email : {user.email}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Role : {user.role}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Mobile : {user.mobile}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Center : {user.center}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Qualification : {check ?<input type="text" className='w-100'value={qua} onChange={(e)=>setQua(e.target.value)} />: user.qua || "----" }</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Skills : {check ?<input type="text" className='w-100'value={skill} onChange={(e)=>setSkill(e.target.value)} />: user.skill || "---"}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Expirence : {check ?<input type="text" className='w-100'value={exp} onChange={(e)=>setExp(e.target.value)} />: user.exp || "---"}</h6></div>
                    <div className="col-md-12"><h6 className='text-muted '>Address : {check ?<input type="text" className='w-100'value={add} onChange={(e)=>setAdd(e.target.value)} />: user.add ||"---"}</h6></div>
                    </div>
                    <button onClick={()=>{setCheck(!check);updateprofile()}} className='w-100 btn btn-warning form-control rounded-3 py-2 border-0'>Update</button>
            </div>
            <div className='col-md-6 mt-3 mt-md-0 mx-auto '>
                <div className='row h-50 pb-2'>
                    <div className='col-md-12 rounded-3 shadow-md' style={{backgroundColor:"white"}}>

                    </div>
                </div>
                <div className="row h-50 pt-2">
                    <div className="col-md-12 rounded-3 shadow-md" style={{backgroundColor:"white"}}>

                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}

export default Profile