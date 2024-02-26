"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./App.module.scss";
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
  Drawer,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ReactComponent as ShoppingBag } from "../src/assets/shopping-bag.svg";
import { ReactComponent as CloseIcon } from "../src/assets/close-icon.svg";
import { ReactComponent as ArrowDownIcon } from "../src/assets/arrow-ios-down.svg";

export interface AbilityType {
  name: string;
  text: string;
  type: string;
}

export interface AttacksType {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface TypeNValue {
  type: string;
  value: string;
}

export interface SetImageType {
  logo: string;
  symbol: string;
}

export interface SetType {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: LegalitiesType;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImageType;
}

export interface ImageType {
  small: string;
  large: string;
}

export interface LegalitiesType {
  expanded: string;
  unlimited: string;
  standard: string;
}

export interface TcgPlayerType {
  url: string;
  updatedAt: string;
  prices: string;
}

export interface CardMarketType {
  url: string;
  updatedAt: string;
  prices: CardMarketPriceType;
}

export interface CardMarketPriceType {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

export interface PokemonListType {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  evolvesTo: string[];
  rules: string[];
  ancientTrait: string;
  abilities: AbilityType;
  attacks: AttacksType;
  weaknesses: TypeNValue;
  resistances: TypeNValue;
  retreatCost: string[];
  convertedRetreatCost: number;
  set: SetType;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumberxs: number[];
  legalities: LegalitiesType;
  regulationMark: string;
  images: ImageType;
  tcgplayer: TcgPlayerType;
  cardmarket: CardMarketType;
}

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

  const handleSetSelect = (event: SelectChangeEvent) => {
    setPokemonSet(event.target.value as string);
  };

  const handleRaritySelect = (event: SelectChangeEvent) => {
    setPokemonRarity(event.target.value as string);
  };

  const handleTypeSelect = (event: SelectChangeEvent) => {
    setPokemonType(event.target.value as string);
  };
  // const [search, setSearch] = useState("");

  const convertEuroToDollar = (euro: number) => {
    return (euro * 1.09).toFixed(2);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getPokemonList(value);
    setPage(value);
  };

  const getPokemonList = (page: number): void => {
    const url = "https://api.pokemontcg.io/v2/cards";

    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
        params: {
          page: page,
          pageSize: "20",
        },
      })
      .then((response) => {
        console.log("POKEMON LIST RESPONSE :", response.data);
        setPokemonList(response.data.data);
        setPage(response.data.page);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {});
  };

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

  const getPokemonSet = (): void => {
    const url = "https://api.pokemontcg.io/v2/sets";

    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
      })
      .then((response) => {
        // console.log("POKEMON SET RESPONSE :", response.data.data);
        setPokemonSetList(response.data.data);
      })
      .catch((error) => {});
  };

  const getPokemonRarity = (): void => {
    const url = "https://api.pokemontcg.io/v2/rarities";

    axios
      .get(url, {
        headers: {
          "X-Api-Key": "Bearer 33898826-0e53-4a20-95d0-0fba1f39b8ec",
        },
      })
      .then((response) => {
        // console.log("POKEMON RARITY RESPONSE :", response.data.data);
        setPokemonRarityList(response.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getPokemonList(1);
    getPokemonType();
    getPokemonSet();
    getPokemonRarity();
  }, []);

  return (
    <Stack direction="column" className={styles.main}>
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        anchor="right"
        sx={{
          // width: 400,
          '& .MuiDrawer-paper': {
            width: { xs: "100%", sm: 400 },
            boxSizing: 'border-box',
          },
          bgcolor: "rgba(0, 0, 0, 0.75)",
        }}
      >
        <Stack
          direction={"column"}
          sx={{
            p: 3,
            bgcolor: "#1F1D2B",
            height: "100%",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h5" fontWeight={"600"} color={"white"}>
                Cart
              </Typography>
              <Typography
                variant="body2"
                color={"#ABBBC2"}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Clear all
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              onClick={() => setIsDrawerOpen(false)}
              sx={{
                width: "48px",
                background: "#EA7C69",
                border: 0,
                "&:hover": {
                  background: "#d86654",
                  border: 0,
                },
              }}
            >
              <IconButton aria-label="delete" size="small">
                <CloseIcon style={{ width: "16px" }} />
              </IconButton>
            </Button>
          </Stack>
        </Stack>
      </Drawer>
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
              <Button
                variant="outlined"
                onClick={() => setIsDrawerOpen(true)}
                sx={{
                  width: "48px",
                  background: "#EA7C69",
                  border: 0,
                  "&:hover": {
                    background: "#d86654",
                    border: 0,
                  },
                }}
              >
                <IconButton aria-label="delete">
                  <ShoppingBag />
                </IconButton>
              </Button>
            </Stack>
          </Stack>
          <TextField
            id="search"
            variant="outlined"
            placeholder="Search By Name"
            fullWidth
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
              {pokemonList.map((e, index) => {
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
                                    e.cardmarket.prices.averageSellPrice
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
                                bgcolor: "#312F3C",
                                textTransform: "none",
                                boxShadow: 0,
                                "&:disabled": {
                                  bgcolor: "#FFFFFF0A",
                                  color: "#FFFFFF66",
                                },
                              }}
                            >
                              Add to cart
                            </Button>
                          </Stack>
                        </Stack>
                      </Card>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
            <Grid xs={12}>
              <Stack direction={"row"} justifyContent={"center"}>
                <Pagination
                  count={Math.floor(totalCount / 20)}
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
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
