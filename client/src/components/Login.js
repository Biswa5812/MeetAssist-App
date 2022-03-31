import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Form, Label, Input, FormGroup} from "reactstrap"
import PropTypes from 'prop-types';

const Login = ({setToken,setType,setUser,setUseId}) =>
{
    const [message, setMessage] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();
        let email = event.target[0].value;
        let pass = event.target[1].value;
        // console.log(pass);
        let res = await fetch("http://localhost:5000/auth",{
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: email,
                pass: pass,
            })
        });
        let resJson = await res.json();
        if(resJson.status===401)
        {
            setMessage("Incorrect mail id or password");
            setTimeout(30*1000);
            window.location.reload(false);
        }
        // console.log(resJson.status);
        else
        {
            setToken(res.status);
            setType(resJson.designation)
            setUser(resJson.username)
            setUseId(resJson.userid)
            window.location.reload(false);
        }
    }

    return(
        <div className="page">
            <h1 className='headin'>MeetAssist</h1>
            <div className="main">
                <Form onSubmit={handleSubmit} className='App'>
                    <h2 className='text-center'>SIGN IN</h2>
                    <FormGroup>
                        <Label>Email ID</Label>
                        <Input name="email" placeholder="abc@company.com" type="email" id='email'></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input name="password" id='password' placeholder="Password" type="password"></Input>
                    </FormGroup>
                    <Button type="submit" className='btn-dark btn-block'>Submit</Button>
                </Form>
            </div>
            <h2>{message}</h2>
            
            {/* <Link to={<Signup/>}>Sign Up</Link> */}
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
  };

export default Login;
