import {
  Button,
  Container,
  Grid,
  Box,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import React from "react";
import { characters } from "../../api/characters";
import { CardComponent, HeaderComponent } from "../../components";
import { TypeCharacter } from "./interface/character.interface";
// import { useNotification } from "../../context/notification.context";

export const HomePage: React.FC<{}> = () => {
  // const { getError, getSuccess } = useNotification();
  // const handleClic = () => {
  //   getSuccess("Deberias aprender Macros en Excel");
  // };
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(1);
  const [allCharacters, setAllCharacters] = React.useState<
    TypeCharacter[] | null
  >([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true); // cada que se inicie la modificacion o se recarguen los elementos sera true
    characters
      .getAll({ page: page }) // puedo mandar un objeto vacio, porque el param "page" esta como opcional
      .then((r) => {
        setCount(r.data.info.pages);
        setAllCharacters(r.data.results);
        setTimeout(() => setLoading(false), 1000); // y cada que se resuelva pasara a false con un timeout de 1s
        //console.log(r.data.results);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth="xl">
      {/* <Button onClick={handleClic} fullWidth variant="contained">
      <Button fullWidth variant="contained">Estamos en Home </Button> */}
      <HeaderComponent
        title="Este es el titulo"
        description="Esta es la descripcion"
        // Renderizando un componente dentro de otro componente con ReactNode
        element={
          <Button fullWidth variant="contained">
            Hola mundo
          </Button>
        }
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            {allCharacters?.length !== 0 ? (
              <Grid sx={{ my: 1 }} container spacing={2} direction="row">
                {/* `!` operador de aserción no nulo, significa que allCharacters nunca sera nulo */}
                {allCharacters!.map((character) => (
                  <Grid item xs={3} key={character.id}>
                    <CardComponent
                      key={character.id}
                      image={character.image}
                      name={character.name}
                      species={character.species}
                      status={character.status}
                      id={character.id}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div>No existe data</div>
            )}
          </div>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              sx={{ my: 1 }}
              size="large"
              variant="outlined"
              color="primary"
              count={count}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </>
      )}
    </Container>
  );
};
