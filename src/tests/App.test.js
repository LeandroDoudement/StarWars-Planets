import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import testData from "./testData";
import userEvent from "@testing-library/user-event";

describe("Testes do componente table", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testData),
      })
    );
  });

  it("Verifica se foi chamado uma API, e se a tabela possui 13 colunas e uma linha para cada planeta", async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    const planetsTable = screen.getByRole("table");
    expect(planetsTable).toBeInTheDocument();
    const tableHeads = screen.getAllByRole("columnheader");
    expect(tableHeads.length).toBe(13);
    const tableData = await screen.findAllByRole("cell");
    expect(tableData.length).toBe(130);
  });
  it("Deve existir um filtro de nomes para os planetas e funcionar", async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    const nameFilter = screen.getByTestId("name-filter");
    expect(nameFilter).toBeInTheDocument();
    const Dagobah = await screen.findByRole("cell", { name: "Dagobah" });
    userEvent.type(nameFilter, "oo");
    const Tatooine = await screen.findByRole("cell", { name: "Tatooine" });
    expect(Tatooine).toBeInTheDocument();
    const Naboo = await screen.findByRole("cell", { name: "Naboo" });
    expect(Naboo).toBeInTheDocument();
    expect(Dagobah).not.toBeInTheDocument();
  });
  it("Deve existir um filtro numérico e funcionar junto com o filtro de nomes", async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledTimes(1);
    const Dagobah = await screen.findByRole("cell", { name: "Dagobah" });
    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter).toBeInTheDocument();
    expect(columnFilter.value).toBe("population");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    expect(comparisonFilter.value).toBe("maior que");
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId("value-filter");
    expect(valueFilter.value).toBe("0");
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByTestId("button-filter");
    expect(buttonFilter).toBeInTheDocument();
    userEvent.selectOptions(columnFilter, ["surface_water"]);
    userEvent.selectOptions(comparisonFilter, ["igual a"]);
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "100");
    userEvent.click(buttonFilter);
    const Hoth = await screen.findByRole("cell", { name: "Hoth" });
    expect(Hoth).toBeInTheDocument();
    expect(Dagobah).not.toBeInTheDocument();
    const nameFilter = screen.getByTestId("name-filter");
    userEvent.type(nameFilter, "K");
    const tableData = await screen.findAllByRole("cell");
    expect(tableData.length).toBe(13);
    const filterText = screen.getByText("surface_water igual a 100");
    expect(filterText).toBeInTheDocument();
  });
  it('Mesmo teste que o anterior porem para o case "menor que" no comparisonFilter', async () => {
    render(<App />);
    const Hoth = await screen.findByRole("cell", { name: "Hoth" });
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.selectOptions(columnFilter, ["surface_water"]);
    userEvent.selectOptions(comparisonFilter, ["menor que"]);
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "2");
    userEvent.click(buttonFilter);
    const Tatooine = await screen.findByRole("cell", { name: "Tatooine" });
    expect(Tatooine).toBeInTheDocument();
    expect(Hoth).not.toBeInTheDocument();
    const tableData = await screen.findAllByRole("cell");
    expect(tableData.length).toBe(26);
  });
  it('Mesmo teste que o anterior porem para o case "maior que" no comparisonFilter', async () => {
    render(<App />);
    const Dagobah = await screen.findByRole("cell", { name: "Dagobah" });
    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");
    userEvent.selectOptions(columnFilter, ["orbital_period"]);
    userEvent.selectOptions(comparisonFilter, ["maior que"]);
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, "1000");
    userEvent.click(buttonFilter);
    const Bespin = await screen.findByRole("cell", { name: "Bespin" });
    expect(Bespin).toBeInTheDocument();
    expect(Dagobah).not.toBeInTheDocument();
    const tableData = await screen.findAllByRole("cell");
    expect(tableData.length).toBe(26);
  });
});
