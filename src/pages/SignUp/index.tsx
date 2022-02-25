import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button, Grid, Typography, TextField } from "@mui/material";

import { MainContent } from "./styles";

import { Footer, Header } from "../../components";

import { Alert } from "../../modals";
import { format, validate } from "../../utils/documentTreatment";
import { api } from "../../services/api";

import getFormattedCurrentDateNow from '../../utils/getFormattedCurrentDateNow'

type SignUpRequest = {
  firstname: string;
  lastname: string;
  document: string;
  birth_date: string;
  email: string;
  password: string;
  password_confirmed: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function handleSignUp(data: SignUpRequest) {
    if (data) {
      try {
        if (validate(format(data.document))) {
          if (data.password === data.password_confirmed) {
            const {
              firstname,
              lastname,
              document,
              birth_date,
              email,
              password,
            } = data as SignUpRequest;

            try {
              await api
                .post("users", {
                  fullname: `${firstname} ${lastname}`,
                  document,
                  birth_date,
                  email,
                  password,
                })
                .then(() => {
                  navigate("/");
                });
            } catch (error) {
              handleOpenDbUser();
            }
          } else {
            handleOpenDifferentPasswordsModal();
          }
        } else {
          handleOpenInvalidDocument();
        }
      } catch (error) {
        console.error(`
          It was not possible to execute the document validation function
          due to the error: ${error}.
        `);
      }
    }
  }

  // Different passwords modal
  const [differentPasswordsModal, setDifferentPasswordsModal] = useState(false);

  function handleOpenDifferentPasswordsModal() {
    setDifferentPasswordsModal(true);
  }

  function handleCloseDifferentPasswordsModal() {
    setDifferentPasswordsModal(false);
  }

  // Invalid CPF Modal
  const [invalidDocument, setInvalidDocument] = useState(false);

  function handleOpenInvalidDocument() {
    setInvalidDocument(true);
  }

  function handleCloseInvalidDocument() {
    setInvalidDocument(false);
  }

  // dbUser Modal
  const [dbUser, setDbUser] = useState(false);

  function handleOpenDbUser() {
    setDbUser(true);
  }

  function handleCloseDbUser() {
    setDbUser(false);
  }

  function handleIfAuthRedirect() {
    const user = JSON.parse(localStorage.getItem("user") as string);

    if (user) {
      if (user.isRootUser === "0") {
        console.log(`
          you are a regular user and you are already logged in to the application.
          redirecting...
        `);
        navigate(`/home`);
      } else {
        navigate(`/dashboard`);
      }
    }
  }

  useEffect(() => {
    handleIfAuthRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Alert
        isOpen={differentPasswordsModal}
        message={`
          As senhas informadas são incoerentes entre si.
          Insira-as novamente.
        `}
        onCloseFunc={handleCloseDifferentPasswordsModal}
        title={`Senhas não coincidem`}
        type={`warning`}
      />
      <Alert
        isOpen={invalidDocument}
        message={`
          O documento informado não parece ser um CPF válido.
          Informe-o novamente sem pontuação ou vírgulas.
        `}
        onCloseFunc={handleCloseInvalidDocument}
        title={`Documento inválido`}
        type={`warning`}
      />
      <Alert
        isOpen={dbUser}
        message={`
          Provavelmente alguma das credenciais informadas já pertence a um usuário
          em nossa base de dados.
          Tente novamente, se persistir procure a assistência técnica.
        `}
        onCloseFunc={handleCloseDbUser}
        title={`Erro ao cadastrar-se`}
        type={`warning`}
      />
      <Header />
      <MainContent maxWidth="sm">
        <form className="register" onSubmit={handleSubmit(handleSignUp)}>
          <div className="title_group">
            <Typography variant="h5" gutterBottom component="h5">
              Ainda não possui um login?
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="h6">
              Então faça o seu cadastro agora mesmo!
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                {...register("firstname")}
                id="firstname"
                label="Nome"
                type="text"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                {...register("lastname")}
                id="lastname"
                label="Sobrenome"
                type="text"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                {...register("document")}
                id="document"
                label="CPF"
                helperText="Somente números"
                type="number"
                autoComplete="cpf"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                {...register("birth_date")}
                id="birth_date"
                type="date"
                helperText="Data do seu nascimento"
                variant="outlined"
                defaultValue={getFormattedCurrentDateNow()}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                {...register("email")}
                id="email"
                type="email"
                label="E-mail"
                helperText="Seu endereço de e-mail"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" className="signup_button">
            Continuar
          </Button>
          <Typography variant="body1" gutterBottom>
            Já possui uma conta?&nbsp;
            <span
              id="login_with_existing_account"
              onClick={() => navigate("/")}
            >
              Entrar
            </span>
            .
          </Typography>
        </form>
      </MainContent>
      <Footer />
    </>
  );
}
