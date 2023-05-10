import React from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Estrenos from "./Estrenos";
import { getLatestMoviesPreview } from "../../actions/movies";

jest.mock("../../actions/movies");
jest.mock("react-redux");

describe("Estrenos Component", () => {
  const dispatchMock = jest.fn();
  const useSelectorMock = jest.fn();
  const moviesMock = [];

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((selector) =>
      selector({
        latestMovies: moviesMock,
      })
    );
  });

  afterEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    dispatchMock.mockClear();
  });

  it("deberia renderizar la informacion de la pelicula correctamente", async () => {
    render(
      <MemoryRouter>
        <Estrenos />
      </MemoryRouter>
    );

    await waitFor(() => {
      moviesMock.push({
        id: 1,
        original_language: "en",
        original_title: "Movie 1",
        overview: "Overview of Movie 1",
        poster_path: "/path/to/movie1/poster.jpg",
        release_date: "2023-05-09",
        vote_average: 7.5,
        budget: 10000000,
        genre_names: ["Action", "Thriller"],
      });
      // Verifica que la función simulada del dispatcher haya sido llamada
      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith(getLatestMoviesPreview());
    });

    // Resto del código de prueba...
  });
});
