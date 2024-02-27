"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.scss";
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as ShoppingBag } from "../assets/shopping-bag.svg";
import { ReactComponent as ArrowDownIcon } from "../assets/arrow-ios-down.svg";
import CartDrawer from "../components/cartDrawer";
import { SetType, PokemonListType, CartItemType } from "../utils/type";

export default function Home() {
  const [pokemonList, setPokemonList] = useState<PokemonListType[] | []>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [pokemonSet, setPokemonSet] = useState<string>("");
  const [pokemonRarity, setPokemonRarity] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<string>("");
  const [pokemonSetList, setPokemonSetList] = useState<SetType[]>([]);
  const [pokemonTypeList, setPokemonTypeList] = useState<string[]>([]);
  const [pokemonRarityList, setPokemonRarityList] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cartList, setCartList] = useState<CartItemType[] | []>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  // for handle Filter Select Value
  const handleSetSelect = (event: SelectChangeEvent) => {
    setPokemonSet(event.target.value as string);
  };

  const handleRaritySelect = (event: SelectChangeEvent) => {
    setPokemonRarity(event.target.value as string);
  };

  const handleTypeSelect = (event: SelectChangeEvent) => {
    setPokemonType(event.target.value as string);
  };

  // Since API return euro currency so we need to convert to dollar before display
  const convertEuroToDollar = (euro: number) => {
    return (euro * 1.09).toFixed(2);
  };

  // Function for handle page change in pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getPokemonList(value, "");
    setPage(value);
    window.scrollTo(0, 0); // Reset user scroll to top page
  };

  // Function for handle add to cart action
  const handleAddToCart = (item: PokemonListType) => {
    const pokemonExist = cartList.find((e) => e.name === item.name);
    if (pokemonExist) {
      setCartList(
        cartList.map((e) =>
          e.name === item.name
            ? {
                ...pokemonExist,
                totalCard: pokemonExist.totalCard + 1,
                totalPrice: pokemonExist.totalPrice + e.cardPrice,
              }
            : e
        )
      );
    } else {
      const cartItem = {
        cardImage: item.images.small,
        name: item.name,
        cardPrice: parseFloat(
          convertEuroToDollar(item.cardmarket.prices.averageSellPrice)
        ),
        totalCard: 1,
        totalPrice: parseFloat(
          convertEuroToDollar(item.cardmarket.prices.averageSellPrice)
        ),
      };

      setCartList([...cartList, cartItem]);
    }
  };

  // Function for handle remove from card action
  const handleRemoveFromCart = (item: PokemonListType) => {
    const pokemonExist = cartList.find((e) => e.name === item.name);
    if (pokemonExist?.totalCard === 1) {
      cartList.map((e, index) =>
        e.totalCard === 1 ? cartList.splice(index, 1) : e
      );
      setCartList([...cartList]);
    } else if (pokemonExist) {
      setCartList(
        cartList.map((e) =>
          e.name === item.name
            ? {
                ...pokemonExist,
                totalCard: pokemonExist.totalCard - 1,
                totalPrice: pokemonExist.totalPrice - e.cardPrice,
              }
            : e
        )
      );
    }
  };

  // Call API to get Pokemon List
  const getPokemonList = (page: number, query: string): void => {
    const url = "https://api.pokemontcg.io/v2/cards";
    let checkLoad = true;
    setIsLoading(true);
    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
        params: {
          page: page,
          pageSize: "20",
          q: query,
        },
      })
      .then((response) => {
        setPokemonList(response.data.data);
        setPage(response.data.page);
        setTotalCount(response.data.totalCount);
        checkLoad = false;
        setIsLoading(checkLoad);
      })
      .catch((error) => {
        console.log("🚀 ~ getPokemonList ~ error:", error);
        setPokemonList([]);
        setPage(1);
        setTotalCount(1);
        checkLoad = false;
        setIsLoading(checkLoad);
      });
  };

  // Handle API function to get Pokemon Type that use in Select Filter
  const getPokemonType = (): void => {
    const url = "https://api.pokemontcg.io/v2/types";

    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
      })
      .then((response) => {
        setPokemonTypeList(response.data.data);
      })
      .catch((error) => {});
  };

  // Handle API function to get Pokemon Set that use in Select Filter
  const getPokemonSet = (): void => {
    const url = "https://api.pokemontcg.io/v2/sets";

    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
      })
      .then((response) => {
        setPokemonSetList(response.data.data);
      })
      .catch((error) => {});
  };

  // Handle API function to get Pokemon Rarity that use in Select Filter
  const getPokemonRarity = (): void => {
    const url = "https://api.pokemontcg.io/v2/rarities";

    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
      })
      .then((response) => {
        setPokemonRarityList(response.data.data);
      })
      .catch((error) => {});
  };

  // Handle OnChange in search bar
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearch(e.target.value);
    setQuery(`name: ${e.target.value}`);
  };

  // Call Pokemon Type, Set and Rarity API
  useEffect(() => {
    getPokemonType();
    getPokemonSet();
    getPokemonRarity();
  }, []);

  // Handle Pokemon List API with query
  useEffect(() => {
    setQuery(
      `${search ? `name:${search}` : ""} ${
        pokemonSet ? `set.name:${pokemonSet}` : ""
      } ${pokemonRarity ? `rarity:${pokemonRarity}` : ""} ${
        pokemonType ? `types:${pokemonType}` : ""
      }`
    );
    getPokemonList(1, query);
  }, [query, pokemonSet, pokemonRarity, pokemonType, search]);

  return (
    <Stack direction="column" className={styles.main}>
      <CartDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        cartList={cartList}
        setCartList={setCartList}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
      />
      <Container>
        <Stack direction="column" spacing={2}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ paddingTop: "16px" }}
          >
            <Typography variant="h5" color="white" fontWeight={"600"}>
              Pokemon market
            </Typography>

            <Stack direction={"row"} spacing={2}>
              <TextField
                id="search"
                variant="outlined"
                placeholder="Search By Name"
                fullWidth
                onChange={handleSearchChange}
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#393C49",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
                InputProps={{
                  sx: {
                    "& input": {
                      color: "white",
                      opacity: 1,
                    },
                    "& input::placeholder": {
                      color: "#ABBBC2",
                      opacity: 1,
                    },
                    borderRadius: "8px",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SearchIcon sx={{ color: "white" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                onClick={() => setIsDrawerOpen(true)}
                sx={{
                  minWidth: "48px",
                  minHeight: "48px",
                  background: "#EA7C69",
                  border: 0,
                  boxShadow: "0px 8px 24px 0px #EA7C6952",
                  "&:hover": {
                    background: "#d86654",
                    border: 0,
                  },
                }}
              >
                <ShoppingBag />
              </Button>
            </Stack>
          </Stack>
          <TextField
            id="search"
            variant="outlined"
            placeholder="Search By Name"
            fullWidth
            onChange={handleSearchChange}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#393C49",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
            InputProps={{
              sx: {
                "& input": {
                  color: "#ABBBC2",
                  opacity: 1,
                },
                "& input::placeholder": {
                  color: "#ABBBC2",
                  opacity: 1,
                },
                borderRadius: "8px",
                borderColor: "red",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon sx={{ color: "white" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Divider sx={{ border: "1px solid #FFFFFF14" }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 0 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
          >
            <Typography variant="body1" color="white" fontWeight={"600"}>
              Choose Card
            </Typography>

            <Stack direction={"row"} spacing={2}>
              <FormControl
                sx={{
                  minWidth: "100px",
                }}
              >
                <InputLabel
                  id="pokemon-set-select-select-label"
                  sx={{
                    color: "white",
                  }}
                >
                  Set
                </InputLabel>
                <Select
                  labelId="pokemon-set-select-select-label"
                  id="pokemon-set-select"
                  value={pokemonSet}
                  label="Set"
                  onChange={handleSetSelect}
                  IconComponent={ArrowDownIcon}
                  autoWidth
                  sx={{
                    fieldset: { borderColor: "#393C49" },
                    color: "white",
                    bgcolor: "#1F1D2B",
                    borderRadius: "8px",
                  }}
                  MenuProps={{
                    MenuListProps: {
                      sx: {
                        bgcolor: "#1F1D2B",
                        color: "white",
                      },
                    },
                    sx: {
                      marginTop: "8px",
                      height: "350px",
                    },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  }}
                >
                  <MenuItem key={"default"} value={""}>
                    -
                  </MenuItem>
                  {pokemonSetList.map((e, index) => {
                    return (
                      <MenuItem key={index} value={e.name}>
                        {e.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  minWidth: "100px",
                }}
              >
                <InputLabel
                  id="pokemon-set-select-select-label"
                  sx={{
                    color: "white",
                  }}
                >
                  Rarity
                </InputLabel>
                <Select
                  labelId="pokemon-set-select-select-label"
                  id="pokemon-set-select"
                  value={pokemonRarity}
                  label="Rarity"
                  onChange={handleRaritySelect}
                  IconComponent={ArrowDownIcon}
                  autoWidth
                  sx={{
                    fieldset: { borderColor: "#393C49" },
                    color: "white",
                    bgcolor: "#1F1D2B",
                    borderRadius: "8px",
                  }}
                  MenuProps={{
                    MenuListProps: {
                      sx: {
                        bgcolor: "#1F1D2B",
                        color: "white",
                      },
                    },
                    sx: {
                      marginTop: "8px",
                      height: "350px",
                    },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  }}
                >
                  <MenuItem key={"default"} value={""}>
                    -
                  </MenuItem>
                  {pokemonRarityList.map((e, index) => {
                    return (
                      <MenuItem key={index} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  minWidth: "100px",
                }}
              >
                <InputLabel
                  id="pokemon-set-select-select-label"
                  sx={{
                    color: "white",
                  }}
                >
                  Type
                </InputLabel>
                <Select
                  labelId="pokemon-set-select-select-label"
                  id="pokemon-set-select"
                  value={pokemonType}
                  label="Type"
                  onChange={handleTypeSelect}
                  IconComponent={ArrowDownIcon}
                  autoWidth
                  sx={{
                    fieldset: { borderColor: "#393C49" },
                    color: "white",
                    bgcolor: "#1F1D2B",
                    borderRadius: "8px",
                  }}
                  MenuProps={{
                    MenuListProps: {
                      sx: {
                        bgcolor: "#1F1D2B",
                        color: "white",
                      },
                    },
                    sx: {
                      marginTop: "8px",
                      height: "350px",
                    },
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "right",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "right",
                    },
                  }}
                >
                  <MenuItem key={"default"} value={""}>
                    -
                  </MenuItem>
                  {pokemonTypeList.map((e, index) => {
                    return (
                      <MenuItem key={index} value={e}>
                        {e}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
          </Stack>

          <Stack
            direction={"column"}
            spacing={1}
            sx={{
              pb: 2,
            }}
          >
            <Grid container>
              {isLoading ? (
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    width: "100%",
                    height: "300px",
                  }}
                >
                  <CircularProgress
                    sx={{
                      color: "#EA7C69",
                    }}
                  />
                </Stack>
              ) : pokemonList.length === 0 ? (
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    width: "100%",
                    height: "300px",
                    color: "#ABBBC2",
                  }}
                >
                  No Data
                </Stack>
              ) : (
                pokemonList.map((e, index) => {
                  return (
                    <Grid key={index} item xs={12} sm={4} md={2} pb={2}>
                      <Stack
                        direction={"column"}
                        alignItems={"center"}
                        spacing={1}
                        sx={{
                          position: "relative",
                          marginTop: "100px",
                        }}
                      >
                        <Card
                          sx={{
                            width: { xs: "90%", sm: "150px" },
                            height: "170px",
                            bgcolor: "#1F1D2B",
                            borderRadius: 3,
                            p: 2,
                          }}
                        >
                          <img
                            key={index}
                            src={e.images.large}
                            width={100}
                            alt=""
                            style={{
                              position: "absolute",
                              top: "-90px",
                              left: 0,
                              right: 0,
                              margin: "0 auto",
                              borderRadius: "4px",
                            }}
                          />
                          <Stack
                            direction={"column"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            spacing={1}
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Typography
                              variant="body2"
                              color={"white"}
                              fontWeight={600}
                              sx={{
                                paddingBottom: 1,
                                marginTop: "50px !important",
                                textAlign: "center",
                              }}
                            >
                              {e.name}
                            </Typography>
                            <Stack
                              direction={"column"}
                              spacing={1}
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Stack
                                direction={"row"}
                                justifyContent={"center"}
                                spacing={0.5}
                                sx={{
                                  width: "100%",
                                }}
                              >
                                <Stack direction={"row"} spacing={0.2}>
                                  <Typography variant="body2" color={"#ABBBC2"}>
                                    $
                                  </Typography>
                                  <Typography variant="body2" color={"#ABBBC2"}>
                                    {convertEuroToDollar(
                                      e?.cardmarket?.prices?.averageSellPrice
                                    )}
                                  </Typography>
                                </Stack>
                                <Typography variant="body2" color={"#312F3C"}>
                                  •
                                </Typography>
                                <Typography variant="body2" color={"#ABBBC2"}>
                                  {e.set.total} Cards
                                </Typography>
                              </Stack>
                              <Button
                                variant="contained"
                                fullWidth
                                startIcon={
                                  <ShoppingBag style={{ width: "16px" }} />
                                }
                                disabled={e.set.total === 0}
                                sx={{
                                  borderRadius: "8px",
                                  bgcolor: "#312F3C",
                                  textTransform: "none",
                                  boxShadow: 0,
                                  "&:disabled": {
                                    bgcolor: "#FFFFFF0A",
                                    color: "#FFFFFF66",
                                  },
                                }}
                                onClick={() => handleAddToCart(e)}
                              >
                                Add to cart
                              </Button>
                            </Stack>
                          </Stack>
                        </Card>
                      </Stack>
                    </Grid>
                  );
                })
              )}
            </Grid>
            {!isLoading && (
              <Grid item xs={12}>
                <Stack direction={"row"} justifyContent={"center"}>
                  <Pagination
                    size="small"
                    count={totalCount < 20 ? 1 : Math.floor(totalCount / 20)}
                    page={page}
                    shape="rounded"
                    onChange={handlePageChange}
                    sx={{
                      button: { color: "#ffffff" },
                      "& .MuiPaginationItem-root": {
                        color: "white",
                        "&.Mui-selected": {
                          background: "#1F1D2B",
                          color: "white",
                        },
                      },
                    }}
                  />
                </Stack>
              </Grid>
            )}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
