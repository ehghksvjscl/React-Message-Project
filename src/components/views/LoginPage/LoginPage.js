// eslint-disable-next-line
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input } from 'antd';
import { useDispatch } from "react-redux";
import GoldButton from "../../common/Buttons/GoldButton";
import Home from "../../common/Home/Home";
import { useAlert } from 'react-alert'

function LoginPage(props) {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('')

  const alert = useAlert()
  return (
    <Formik
      initialValues={{
        user_id: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        user_id: Yup.string()
          .required('아이디를 입력 하세요.'),
        password: Yup.string()
          .min(8, '최소 8글자 이상입니다.')
          .required('페스워드를 입력하세요'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            user_id: values.user_id,
            password: values.password
          };
          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                alert.success("로그인 되었습니다.")
                props.history.push("/");
              } else {
                alert.error("로그인 정보를 확인 하세요")
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
        } = props;
        return (
          <div className="app" style={{height: "84vh"}}>
            <Home/>
            <div>
              <span style={{fontSize: "72px", fontWeight: "bold", color: "#DE4949"}}>L</span>
              <span style={{fontSize: "72px", fontWeight: "bold", color: "#000000"}}>ogin</span>
            </div>
            <form onSubmit={handleSubmit} style={{ width: '18.75rem' }}>

              <Form.Item style={{ height: '65px', marginBottom: '40px' }} required>
              <label className="login_lable" for="user_id">아이디</label>
                <Input 
                  id="user_id"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your ID"
                  type="text"
                  value={values.user_id}
                  onChange={handleChange}
                  className={
                    errors.user_id && touched.user_id ? 'text-input error' : 'text-input'
                  }
                />
                {errors.user_id && touched.user_id && (
                  <div className="input-feedback">{errors.user_id}</div>
                )}
              </Form.Item>
              <Form.Item required >
              <label className="password_lable" for="password">비밀번호</label>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item  style={{ marginTop: "5rem", textAlign: "center"}}>
                <GoldButton name="My 복주머니 보러가기" onSubmit={handleSubmit}/>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


