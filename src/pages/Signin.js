import React from "react";
import { Menu, Form, Container, Message } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import auth from "../utils/firebase";

function Signin() {
  const [activeItem, setActiveItem] = React.useState("register");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const navigate = useNavigate();

  function onSubmit() {
    setErrorMessage("");

    if (!email.trim()) {
      setErrorMessage("請輸入信箱！");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("請輸入密碼！");
      return;
    }

    if (activeItem === "register") {
      if (!confirmPassword.trim()) {
        setErrorMessage("請再次輸入密碼！");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage("兩次輸入的密碼不一致！");
        return;
      }

      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("註冊失敗：", error.message);

          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("這個信箱已註冊！");
              break;
            case "auth/invalid-email":
              setErrorMessage("請輸入正確格式的信箱！");
              break;
            case "auth/weak-password":
              setErrorMessage("密碼強度太弱，至少要 6 個字！");
              break;
            default:
              setErrorMessage("註冊失敗，請稍後再試！");
          }
        });
    } else if (activeItem === "signin") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("登入失敗：", error.message);
          console.log("錯誤代碼：", error.code);

          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("信箱格式錯誤！");
              break;
            case "auth/user-not-found":
            case "auth/wrong-password":
            case "auth/invalid-credential":
              setErrorMessage("帳號或密碼錯誤！");
              break;
            default:
              setErrorMessage("登入失敗，請稍後再試！");
          }
        });
    }
  }

  return (
    <Container>
      <Menu widths="2">
        <Menu.Item
          active={activeItem === "register"}
          onClick={() => {
            setErrorMessage("");
            setActiveItem("register");
          }}
        >
          註冊
        </Menu.Item>
        <Menu.Item
          active={activeItem === "signin"}
          onClick={() => {
            setErrorMessage("");
            setActiveItem("signin");
          }}
        >
          登入
        </Menu.Item>
      </Menu>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Input
          label="信箱"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="請輸入信箱"
        />
        <Form.Input
          label="密碼"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="請輸入密碼"
          icon={{
            name: showPassword ? "eye slash" : "eye",
            link: true,
            onClick: () => setShowPassword(!showPassword)
          }}
        />
        {activeItem === "register" && (
          <Form.Input
            label="確認密碼"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="請再次輸入密碼"
            icon={{
              name: showConfirmPassword ? "eye slash" : "eye",
              link: true,
              onClick: () => setShowConfirmPassword(!showConfirmPassword)
            }}
          />
        )}
        {errorMessage && <Message error content={errorMessage} />}
        <Form.Button>
          {activeItem === "register" ? "註冊" : "登入"}
        </Form.Button>
      </Form>
    </Container>
  );
}

export default Signin;
