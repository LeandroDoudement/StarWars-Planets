import { render } from '@testing-library/react'
import App from "../App";


describe('Testes para erro do componente', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.reject(),
          })
        );
      });

    it('Aparece um erro quando a API retorna um erro', () => {
        render(<App />)
        const planetsTable = screen.getByRole("table");
        expect(planetsTable).toBeInTheDocument();
    })
})