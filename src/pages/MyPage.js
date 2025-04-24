import React from "react";
import { Container, Header, Form, Button, Message } from "semantic-ui-react";
import { getAuth, updatePassword } from "firebase/auth";

function MyPage() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChangePassword = () => {
    setErrorMessage("");
    setSuccessMessage("");

    // 驗證：密碼欄位不得為空
    if (!newPassword || !confirmPassword) {
      setErrorMessage("請輸入完整密碼欄位！");
      return;
    }

    // 驗證：密碼長度
    if (newPassword.length < 6) {
      setErrorMessage("密碼至少要 6 個字！");
      return;
    }

    // 驗證：兩次輸入一致
    if (newPassword !== confirmPassword) {
      setErrorMessage("兩次輸入的密碼不一致！");
      return;
    }

    // 更新密碼
    updatePassword(user, newPassword)
      .then(() => {
        setSuccessMessage("密碼修改成功！");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("密碼修改失敗：", error.message);
        setErrorMessage("密碼修改失敗，請重新登入後再試。");
      });
  };

  return (
    <Container text>
      <Header as="h2">會員中心</Header>

      <p>
        <strong>信箱帳號：</strong> {user?.email}
      </p>

      <Form error={!!errorMessage} success={!!successMessage}>
        <Form.Input
          label="新密碼"
          type="password"
          placeholder="請輸入新密碼"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Form.Input
          label="確認新密碼"
          type="password"
          placeholder="請再次輸入新密碼"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage && <Message error content={errorMessage} />}
        {successMessage && <Message success content={successMessage} />}
        <Button onClick={handleChangePassword} primary>
          修改密碼
        </Button>
      </Form>
    </Container>
  );
}

export default MyPage;
