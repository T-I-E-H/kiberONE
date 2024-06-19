import { useForm, Controller } from "react-hook-form";
import style from "./style.module.scss";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "./validtionSchemas";
import Select from "../components/Select/Select";
import Field from "../components/Field/Field";
import Button from "../components/Button/Button";
import logo from "../images/logo.jpg"

const defaultValues = {
  userName: "",
  password: "",
};



export default function SignUp() {
  const { handleSignUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(signUpSchema),
  });

  return (
    <form className={style.wrapper} onSubmit={handleSubmit(handleSignUp)}>
      <img src={logo}/>
      <h2>Создать аккаунт</h2>
      <Field
        name="userName"
        register={register}
        autoComplete="off"
        placeholder="Номер телефона"
        error={Boolean(errors.userName)}
        helperText={errors.userName?.message}
      />
      <Field
        name="password"
        register={register}
        autoComplete="off"
        placeholder="Пароль"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Button disabled={isSubmitting} type="submit">
        Зарегистрироваться
      </Button>
    </form>
  );
}
