import IndexButton from "../islands/BuyButton.tsx";
const Index = () => {
  return (
    <div class="maincontent">
      <div className="liquid-glass2">
        <h1>Bienvenidos a TrenFe</h1>
        <p>
          Somos tu plataforma moderna para viajar en tren de manera rápida, segura
          y cómoda. En <strong>TrenFe</strong>{" "}
          encontrarás todos los servicios que necesitas para planificar tu viaje,
          desde la compra de billetes hasta la gestión de tus reservas, con la
          misma comodidad que ofrecen los grandes servicios ferroviarios.
        </p>
        <p>
          Explora nuestras rutas, consulta horarios en tiempo real y compra tus
          boletos de forma sencilla y segura. ¡Viajar nunca fue tan fácil!
        </p>
        <IndexButton />
      </div>
    </div>
  );
};

export default Index;
