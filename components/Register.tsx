import { useState } from "preact/hooks";
import styles from "../assets/Register.module.css";
import AlertIsland from "../islands/Alert.tsx";
import { alertVisible2 } from "../signals.ts";

type Message = {
  message: string;
  visible: boolean;
};

const RegisterPage = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<Message>({ message: "", visible: false });
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  function isPasswordValid(password: string): boolean {
    if (password.length < 8) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    return true;
  }

  function isEmailValid(email: string): boolean {
    if (!email.includes("@")) return false;
    if (!email.includes(".")) return false;
    return true;
  }

  function getEmailErrors(password: string): string {
    if (password.length === 0) return "";
    const errors = [];
    if (!email.includes("@") && !email.includes(".")) errors.push("Email invalido");
    if (errors.length === 0) return "";
    return `❌ ${errors.join(", ")}`;
  }

  function getPasswordErrors(password: string): string {
    if (password.length === 0) return "";
    
    const errors = [];
    if (password.length < 8) errors.push("mínimo 8 caracteres");
    if (!/[A-Z]/.test(password)) errors.push("una mayúscula");
    if (!/[a-z]/.test(password)) errors.push("una minúscula");
    if (!/[0-9]/.test(password)) errors.push("un número");

    if (errors.length === 0) return "";
    return `❌ Requisitos faltantes : ${errors.join(", ")}`;
  }

  function handlePasswordChange(value: string) {
    setPassword(value);
    setPasswordError(getPasswordErrors(value));
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    setEmailError(getEmailErrors(value));
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!isPasswordValid(password)) {
      setMsg({ message: "❌ Contraseña no valida", visible: true });
      alertVisible2.value = true;
      return;
    }
    if (!isEmailValid(email)) {
      setMsg({ message: "❌ Email no valido", visible: true });
      alertVisible2.value = true;
      return;
    }
    const bodyData = { userid: userid, email: email, password: password, name: name };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });
    
    if (res.ok) {
      setMsg({ message: "✅ Registro correcto", visible: true });
      alertVisible2.value = true;
      const bearer = document.cookie
        .split("; ")
        .find((c) => c.startsWith("bearer="))
        ?.split("=")[1];
      if (!bearer) {
        setMsg({ message: "❌ No valid token found", visible: true });
        alertVisible2.value = true;
        return;
      }
      const verifyRes = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bearer, email }),
      });
      if (verifyRes.ok) {
        const verified = await verifyRes.json();
        if (verified.success == "OK") {
          document.cookie = `bearer=${encodeURIComponent(verified.bearer)}; path=/; max-age=${3600}`;
          globalThis.location.href = "/profile";
        } else {
          setMsg({ message: "❌ Invalid Token", visible: true });
          alertVisible2.value = true;
        }
      } else {
        setMsg({ message: "❌ Error Servidor", visible: true });
        alertVisible2.value = true;
      }
    } else {
      setMsg({ message: `❌ Registro incorrecto,asegurate que el email y usuario no esten registrados`, visible: true });
      alertVisible2.value = true;
    }
  }

  const isFormValid = userid && isEmailValid(email) && name && isPasswordValid(password);

  return (
    <div className={styles.container}>
      <div className={styles.glassBox}>
        <h1 className={styles.title}>Registro</h1>
        {msg.visible && alertVisible2.value && (
          <AlertIsland
            type={2}
            message={msg.message}
            error={!msg.message.toLowerCase().includes("✅")}
          />
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>👤</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onInput={(e) => handleEmailChange((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>✉️</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Usuario"
              value={userid}
              onInput={(e) => setUserid((e.target as HTMLInputElement).value)}
              className={styles.input}
            />
            <span className={styles.icon}>🔍</span>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onInput={(e) =>
                handlePasswordChange((e.target as HTMLInputElement).value)
              }
              className={styles.input}
            />
            <span className={styles.icon}>🔒</span>
          </div>

          {passwordError && (
            <div
              style={{
                marginLeft:"40px",
                marginRight:"40px",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                marginTop: "8px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
            >
              {passwordError}
            </div>
          )}
          {emailError.includes("❌") && (
            <div
              style={{
                marginLeft:"40px",
                marginRight:"40px",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                marginTop: "8px",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                color: "#ef4444",
              }}
            >
              {emailError}
            </div>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={!isFormValid}
            style={{
              opacity: isFormValid ? 1 : 0.5,
              cursor: isFormValid ? "pointer" : "not-allowed",
            }}
          >
            Registro
          </button>
        </form>

        <p className={styles.register}>
          Ya tienes una cuenta?{" "}
          <a href="/login" className={styles.registerLink}>
            Iniciar Sesion
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;