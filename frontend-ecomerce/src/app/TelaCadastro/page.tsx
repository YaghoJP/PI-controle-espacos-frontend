export default function Cadastro() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={undefined}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "black" }}>
            Criar Conta
          </h2>
        </div>
        <p className="text-gray-600 mb-6">
          Preencha os dados abaixo para começar
        </p>

        {/* Informações Pessoais */}
        <div className="mb-10">
          <h3 className="font-semibold mb-2" style={{ color: "black" }}>
            Informações Pessoais
          </h3>
          <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
              <label style={{color:"black"}}>Nome</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={undefined}
                onChange={undefined}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col">
              <label style={{color:"black"}}>Sobrenome</label>
              <input
                style={{ color: "black" }}
                type="text"
                name="nome"
                placeholder="Seu nome"
                value={undefined}
                onChange={undefined}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              style={{ color: "black" }}
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              value={undefined}
              onChange={undefined}
              className="border rounded px-3 py-2 w-full"
              required
            />
            <input
              style={{ color: "black" }}
              type="text"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={undefined}
              onChange={undefined}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <input
            style={{ color: "black" }}
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={undefined}
            onChange={undefined}
            className="border rounded px-3 py-2 w-full mt-4"
            required
          />
        </div>

        {/* Tipo de Perfil */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2" style={{ color: "black" }}>
            Tipo de Perfil
          </h3>
          <div className="flex gap-30">
            <label
              className="flex items-center gap-1"
              style={{ color: "black" }}
            >
              <input
                style={{ color: "gray" }}
                type="radio"
                name="perfil"
                value="Associado"
                checked={undefined}
                onChange={undefined}
              />
              Associado
            </label>

            <label
              className="flex items-center gap-1"
              style={{ color: "black" }}
            >
              <input
                style={{ color: "gray" }}
                type="radio"
                name="perfil"
                value="Dependente"
                checked={undefined}
                onChange={undefined}
              />
              Dependente
            </label>
          </div>
        </div>
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

        <div className="mb-6 col-span-2 flex gap-4">
          <button
            type="submit"
            className="bg-gray-500 text-white px-4 py-2 rounded w-50/100 disabled:opacity-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-50/100 disabled:opacity-50"
          >
            Criar Conta
          </button>
        </div>
      </form>
    </div>
  );
}
