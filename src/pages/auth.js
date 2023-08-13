import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, CardBody, Card } from 'reactstrap';
import fetchAPI from '../helpers/fetchAPI';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true)

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSwitchLogin =()=>{
    setIsLogin(!isLogin)
  }
  console.warn({isLogin})

let requestBody;
if(!isLogin){
  requestBody = {
    query : `
      mutation{
        createUser(userInput: {email : "${email}", password : "${password}" }){
          _id
          email
        }
      }
    `
  }
}else{
  requestBody ={
    query : `
      query{
        login(email: "${email}", password: "${password}"){
          user_id
          token
          tokenExpiration
        }
      }
    `
  }
}
 

const handleSubmit = async(event) => {
  event.preventDefault();
  if (email.trim().length === 0 || password.trim().length === 0) {
    return
   }
  const responseData = await fetchAPI(requestBody)
  console.warn({responseData})
};

  return (
    <>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <Form onSubmit={handleSubmit} className="w-50">
          <h4>{!isLogin?"Signup":"Login"}</h4>
          <Card className="w-100">
            <CardBody className="w-100">
              <FormGroup className="w-100">
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </FormGroup>
              <Button color="primary">{!isLogin?"Signup":"Login"}</Button>
            </CardBody>
          </Card>
        </Form>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-5">
        <Button color="primary" onClick={()=>{handleSwitchLogin()}}>Switch to {isLogin?"Signup":"Login"}</Button>
      </div>
    </>
  );
};

export default LoginForm;
