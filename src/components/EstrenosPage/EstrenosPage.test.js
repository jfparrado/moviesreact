import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMovies } from "../../actions/movies";
import EstrenosPage from "./EstrenosPage";

jest.mock("../../actions/movies");
jest.mock("react-redux");

describe("EstrenosPage Component", () => {
  const dispatchMock = jest.fn();
  const useSelectorMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) => useSelectorMock(selector()));
    useSelectorMock.mockReturnValue([]);
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    dispatchMock.mockClear();
    useSelectorMock.mockClear();
  });

  it("deberia renderizar el componente sin errores", () => {
    render(
      <MemoryRouter>
        <EstrenosPage />
      </MemoryRouter>
    );
    expect(dispatchMock).toHaveBeenCalledWith(getLatestMovies());
    expect(useSelectorMock).toHaveBeenCalled();
  });

  it("Prueba de renderizado de películas: Comprobar que las películas se rendericen correctamente en el componente TemplateMany cuando latestMovies contiene datos válidos", () => {
    const moviesMock = [
      {
        id: 1,
        original_language: "en",
        original_title: "Pelicula 1",
        overview: "Resumen de la película 1",
        poster_path: "/ruta/a/poster1.jpg",
        release_date: "2023-05-10",
        vote_average: 7.5,
        budget: 10000000,
        genre_names: ["Acción", "Drama"],
      },
      {
        id: 2,
        original_language: "es",
        original_title: "Pelicula 2",
        overview: "Resumen de la película 2",
        poster_path: "/ruta/a/poster2.jpg",
        release_date: "2023-05-11",
        vote_average: 8.0,
        budget: 15000000,
        genre_names: ["Comedia", "Romance"],
      },
    ];

    useSelectorMock.mockReturnValue(moviesMock);

    render(
      <MemoryRouter>
        <EstrenosPage />
      </MemoryRouter>
    );

    moviesMock.forEach((movie) => {
      const movieTitleElement = screen.getByText(movie.original_title);
      expect(movieTitleElement).toBeInTheDocument();
    });
  });
});
