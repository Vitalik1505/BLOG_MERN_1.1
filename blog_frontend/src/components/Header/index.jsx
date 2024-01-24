import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { logout, selectIsAuth } from "../../redux/slices/auth";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm("Ви дійсно хочете вийти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ContentWave</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
              <Link to="/my-profile">
                  <Button variant="contained">Профіль</Button>
                </Link>
                <Link to="/add-post">
                  <Button variant="contained">Написати статтю</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Авторизуватись</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити акаунт</Button>
                </Link>
                
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
