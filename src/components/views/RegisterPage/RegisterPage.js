// eslint-disable-next-line
import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import GoldButton from "../../common/Buttons/GoldButton";
import {
  Form,
  Input,
} from 'antd';
import Home from "../../common/Home/Home";
import { useAlert } from 'react-alert'

function RegisterPage(props) {
  const dispatch = useDispatch();
  const alert = useAlert()

  return (

    <Formik
      initialValues={{
        user_id: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('이름을 입력하세요.'),
        user_id: Yup.string()
          .required('아이디를 입력하세요.'),
        password: Yup.string()
          .min(8, '페스워드는 8자리 이상입니다.')
          .required('비밀번호를 입력하세요.'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
          .required('확인 비밀번호를 입력하세요.')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            user_id: values.user_id,
            password: values.password,
            name: values.name,
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              alert.success("회원가입 되었습니다.")
              props.history.push("/login");
            } else {
              alert.error("중복된 아이디 입니다.")
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app" style={{height: "110vh"}}>
            <Home />
            <div>
              <span style={{fontSize: "72px", fontWeight: "bold", color: "#DE4949"}}>S</span>
              <span style={{fontSize: "72px", fontWeight: "bold", color: "#000000"}}>ign up</span>
            </div>
            <form onSubmit={handleSubmit} style={{ width: '18.75rem' }}>
              <Form.Item required style={{height: "67px"}}>
              <label className="name_lable" for="name">이름</label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="register-input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              <Form.Item required style={{height: "67px"}}>
                <label className="login_lable" for="user_id">아이디</label>
                <Input
                  id="user_id"
                  placeholder="아이디를 입력하세요"
                  type="text"
                  value={values.user_id}
                  onChange={handleChange}
                  className={
                    errors.user_id && touched.user_id ? 'text-input error' : 'text-input'
                  }
                />
                {errors.user_id && touched.user_id && (
                  <div className="register-input-feedback">{errors.user_id}</div>
                )}
              </Form.Item>

              <Form.Item required style={{height: "67px"}}>
                <label className="password_lable" for="password">비밀번호</label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="register-input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              <Form.Item required style={{height: "67px"}}>
                <label className="password_lable" for="password">비밀번호 확인</label>
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="register-input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item  style={{ marginTop: "2rem", textAlign: "center"}}>
                <GoldButton name="My 트리 만들기" onClick={handleSubmit}/>
                {/* <Button type="primary" htmlType="submit" className="login-form-GoldButton" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    My 복주머니 보러가기
                </Button> */}
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
