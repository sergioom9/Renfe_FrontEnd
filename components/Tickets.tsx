import styles from "../assets/Ticket.module.css";
import Loading from "./Loading.tsx";
import TicketCard from "./Ticket.tsx";
import { useEffect, useState } from "preact/hooks";

type Ticket = {
  ticketid: string;
  userid?: string;
  origin: string;
  destination: string;
  date: string;
  price: string;
  coinsGained?: string;
  vendido?: boolean;
};

const TicketPage = () => {
  const [ticket, setTicket] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  const [filterOrigin, setFilterOrigin] = useState("");
  const [filterDestination, setFilterDestination] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [absoluteMaxPrice, setAbsoluteMaxPrice] = useState(1000);

  async function fetchTickets() {
    const res = await fetch("/api/tickets");
    if (res.ok) {
      const data = await res.json();
      const formattedTickets = data.map((item: Ticket) => ({
        ticketid: item.ticketid,
        origin: item.origin,
        destination: item.destination,
        date: item.date,
        price: item.price,
        vendido: item.vendido,
      }));
      setTicket(formattedTickets);

      const prices = formattedTickets.map((t: Ticket) => parseFloat(t.price));
      const max = Math.max(...prices);
      setAbsoluteMaxPrice(Math.ceil(max));
      setMaxPrice(Math.ceil(max));

      setLoading(false);
    } else {
      setTicket([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = ticket.filter((item) => {
    const matchOrigin = filterOrigin === "" ||
      item.origin.toLowerCase().includes(filterOrigin.toLowerCase());

    const matchDestination = filterDestination === "" ||
      item.destination.toLowerCase().includes(filterDestination.toLowerCase());

    const matchDate = filterDate === "" || item.date === filterDate;

    const price = parseFloat(item.price);
    const matchPrice = price >= minPrice && price <= maxPrice;

    return matchOrigin && matchDestination && matchDate && matchPrice;
  });

  const resetFilters = () => {
    setFilterOrigin("");
    setFilterDestination("");
    setFilterDate("");
    setMinPrice(0);
    setMaxPrice(absoluteMaxPrice);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style="max-width:700px" className={styles.maincontent}>
      <div
        className={styles.liquidglass2}
        style={{
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginLeft: "30%",
          }}
        >
          🚆 BILLETES 🚆
        </h1>
      </div>

      <div
        className={styles.liquidglass2}
        style={{
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              marginBottom: "8px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            <span style={{ fontSize: "20px" }}>📍</span>
            Origen
          </label>
          <input
            type="text"
            placeholder="Ej: Madrid"
            value={filterOrigin}
            onInput={(e) =>
              setFilterOrigin((e.target as HTMLInputElement).value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "2px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.border =
                "2px solid rgba(74, 222, 128, 0.5)";
              (e.target as HTMLInputElement).style.background =
                "rgba(255,255,255,0.12)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.border =
                "2px solid rgba(255,255,255,0.2)";
              (e.target as HTMLInputElement).style.background =
                "rgba(255,255,255,0.08)";
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              marginBottom: "8px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            <span style={{ fontSize: "20px" }}>🎯</span>
            Destino
          </label>
          <input
            type="text"
            placeholder="Ej: Barcelona"
            value={filterDestination}
            onInput={(e) =>
              setFilterDestination((e.target as HTMLInputElement).value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "2px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.border =
                "2px solid rgba(74, 222, 128, 0.5)";
              (e.target as HTMLInputElement).style.background =
                "rgba(255,255,255,0.12)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.border =
                "2px solid rgba(255,255,255,0.2)";
              (e.target as HTMLInputElement).style.background =
                "rgba(255,255,255,0.08)";
            }}
          />
        </div>
        <div>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "15px",
              marginBottom: "8px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            <span style={{ fontSize: "20px" }}>📅</span>
            Fecha
          </label>
          <input
            type="date"
            value={filterDate}
            onInput={(e) => setFilterDate((e.target as HTMLInputElement).value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "2px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              fontSize: "15px",
              outline: "none",
              colorScheme: "dark",
              transition: "all 0.2s ease",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.border =
                "2px solid rgba(74, 222, 128, 0.5)";
              (e.target as HTMLInputElement).style.background =
                "rgba(255,255,255,0.12)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.border =
                "2px solid rgba(255,255,255,0.2)";
              (e.target as HTMLInputElement).style.background =
                "rgba(255,255,255,0.08)";
            }}
          />
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#b0b0b0" }}>
                  Mínimo
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#4ade80",
                    fontWeight: "600",
                  }}
                >
                  {minPrice}$
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={absoluteMaxPrice}
                value={minPrice}
                onInput={(e) => {
                  const value = parseInt((e.target as HTMLInputElement).value);
                  if (value <= maxPrice) {
                    setMinPrice(value);
                  }
                }}
                style={{
                  width: "100%",
                  height: "6px",
                  accentColor: "#4ade80",
                  cursor: "pointer",
                }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "12px", color: "#b0b0b0" }}>
                  Máximo
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#4ade80",
                    fontWeight: "600",
                  }}
                >
                  {maxPrice}$
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={absoluteMaxPrice}
                value={maxPrice}
                onInput={(e) => {
                  const value = parseInt((e.target as HTMLInputElement).value);
                  if (value >= minPrice) {
                    setMaxPrice(value);
                  }
                }}
                style={{
                  width: "100%",
                  height: "6px",
                  accentColor: "#4ade80",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            color: "#b0b0b0",
          }}
        >
          📊 Mostrando{" "}
          <span
            style={{
              color: "#4ade80",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            {filteredTickets.length}
          </span>{" "}
          de {ticket.length} billetes
        </p>

        <button
          onClick={resetFilters}
          style={{
            padding: "12px 28px",
            background: "linear-gradient(135deg, #dc2626, #b91c1c)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseOver={(e) => {
            (e.target as HTMLButtonElement).style.transform =
              "translateY(-2px)";
            (e.target as HTMLButtonElement).style.boxShadow =
              "0 6px 16px rgba(220, 38, 38, 0.4)";
          }}
          onMouseOut={(e) => {
            (e.target as HTMLButtonElement).style.transform = "translateY(0)";
            (e.target as HTMLButtonElement).style.boxShadow =
              "0 4px 12px rgba(220, 38, 38, 0.3)";
          }}
        >
          <span style={{ fontSize: "16px" }}>🔄</span>
          Resetear Filtros
        </button>
      </div>

      {filteredTickets.length > 0
        ? (
          filteredTickets.map((item: Ticket) => (
            <TicketCard key={item.ticketid} item={item} />
          ))
        )
        : (
          <div
            className={styles.liquidglass2}
            style={{
              padding: "60px 40px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>😔</div>
            <p
              style={{
                fontSize: "20px",
                color: "#e0e0e0",
                fontWeight: "600",
                margin: "0",
              }}
            >
              No se encontraron billetes con estos filtros
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#b0b0b0",
                marginTop: "8px",
              }}
            >
              Intenta ajustar los criterios de búsqueda
            </p>
          </div>
        )}
    </div>
  );
};

export default TicketPage;
