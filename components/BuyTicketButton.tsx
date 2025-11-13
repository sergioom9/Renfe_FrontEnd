export default function BuyButton() {
  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    const path = globalThis.location?.pathname ?? "";
        const id = path.split("/").pop() ?? null;
        if (!id) {
          globalThis.location.replace("/tickets");
          return;
        }
        const res = await fetch("/api/buy", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketid: id }),
        });
        if (!res.ok) {
          globalThis.location.replace("/tickets");
          return;
        }
        globalThis.location.replace(`/tickets/success/${id}`);
  };

  return (
    <>
    <button onClick={handleClick} className="buybutton">
      🎟️ Buy ticket !
    </button>
    </>
  );
}