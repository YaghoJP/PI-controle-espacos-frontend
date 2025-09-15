
export function TermsOfService() {
  return (
    <div
      className="mb-10"
      style={{
        display: "flex",
        alignItems: "center",
        color: "black",
        height: "20px",
      }}
    >
      <input type="checkbox" id="termos" style={{ marginRight: "8px" }} />
      <label htmlFor="termos">
        Li e concordo com os{" "}
        <a href="/termos" style={{ textDecoration: "underline" }}>
          Termos de Serviço
        </a>
        e a{" "}
        <a href="/privacidade" style={{ textDecoration: "underline" }}>
          Política de Privacidade
        </a>
        .
      </label>
    </div>
  );
}
