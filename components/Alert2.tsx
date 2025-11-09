import { alertVisible2 } from "../signals.ts";
type AlertProps = {
    message: string;
    error: boolean;
}

const Alert2 = ({message, error}:AlertProps) => {
     return (
        <div
                className="alertbox"
                style={{
                  marginBottom: "20px",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  position: "relative",
                  marginLeft: "30px",
                  marginRight: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: message.includes("✅")
                    ? "rgba(0, 200, 0, 0.1)"
                    : "rgba(255, 0, 0, 0.1)",
                  border: `1px solid ${
                    message.includes("✅") ? "green" : "red"
                  }`,
                  color: message.includes("✅") ? "green" : "red",
                  fontWeight: "500",
                }}
              >
                <span>
                  <strong>
                    {message.includes("✅") ? "Success" : "Error"}:{" "}
                  </strong>
                  {message.replace("✅ ", "").replace("❌ ", "")}
                </span>
                <button
                  onClick={(e) =>{e.preventDefault();alertVisible2.value=false}}
                  type="button"
                  style={{
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    color: message.includes("✅") ? "green" : "red",
                  }}
                >
                  🗙
                </button>
              </div>
    )
}
export default Alert2;