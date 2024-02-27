"use client";
import { type Dispatch, type SetStateAction } from "react";
import _ from "lodash";
import {
  Button,
  Stack,
  Typography,
  Drawer,
  Grid,
  Divider,
  Box,
  TextField,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../assets/close-icon.svg";
import { CartItemType } from "../utils/type";

// Interface for Cart Drawer Props
interface CartDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
  cartList: CartItemType[];
  setCartList: Dispatch<SetStateAction<CartItemType[]>>;
  handleAddToCart: Function;
  handleRemoveFromCart: Function;
}

export default function CartDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  cartList,
  setCartList,
  handleAddToCart,
  handleRemoveFromCart
}: CartDrawerProps) {
  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: 420 },
          boxSizing: "border-box",
        },
        bgcolor: "rgba(0, 0, 0, 0.75)",
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        sx={{
          p: 3,
          bgcolor: "#1F1D2B",
          height: "100%",
        }}
      >
        <Stack direction={"column"} spacing={2}>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack direction={"column"} spacing={1}>
              <Typography variant="h5" fontWeight={"600"} color={"white"}>
                Cart
              </Typography>
              <Typography
                variant="body2"
                color={"#ABBBC2"}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => setCartList([])}
              >
                Clear all
              </Typography>
            </Stack>
            <Button
              variant="outlined"
              onClick={() => setIsDrawerOpen(false)}
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
              <CloseIcon style={{ width: "24px" }} />
            </Button>
          </Stack>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="body1" color={"white"}>
                Item
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body1" color={"white"} pl={1}>
                Qty
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" color={"white"} align="right">
                Price
              </Typography>
            </Grid>
            <Grid item xs={12} pt={1}>
              <Divider
                sx={{
                  bgcolor: "#FFFFFF14",
                }}
              />
            </Grid>
            {cartList.length === 0 ? (
              <Stack
                direction={"column"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                  color: "#ABBBC2",
                  width: "100%",
                  height: "100%",
                }}
              >
                No Item
              </Stack>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "430px",
                  overflowX: "hidden",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {cartList.map((e: CartItemType, index) => {
                  return (
                    <Grid container>
                      <Grid item xs={2} pt={2}>
                        <img key={index} src={e.cardImage} width={44} alt="" />
                      </Grid>
                      <Grid item xs={8} pt={2}>
                        <Stack direction={"column"}>
                          <Typography variant="body2" color={"white"}>
                            {e.name}
                          </Typography>
                          <Stack direction={"row"} spacing={0.5}>
                            <Typography variant="body2" color={"#ABBBC2"}>
                              $
                            </Typography>
                            <Typography variant="body2" color={"#ABBBC2"}>
                              {e.cardPrice}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={2} pt={2}>
                        <Stack
                          direction={"row"}
                          spacing={0.5}
                          justifyContent={"flex-end"}
                        >
                          <Typography variant="body2" color={"white"}>
                            $
                          </Typography>
                          <Typography variant="body2" color={"white"}>
                            {e.totalPrice.toFixed(2)}
                          </Typography>
                        </Stack>
                      </Grid>

                      <Grid container spacing={1} pt={1} pb={1}>
                        <Grid item xs={2}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleRemoveFromCart(e)}
                            sx={{
                              minWidth: "54px",
                              minHeight: "54px",
                              background: "#FFFFFF14",
                              color: "white",
                              border: 0,
                              borderRadius: '8px',
                              "&:hover": {
                                background: "#FFFFFF2E",
                                border: 0,
                              },
                            }}
                          >
                            -
                          </Button>
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            id="search"
                            variant="outlined"
                            placeholder="Search By Name"
                            fullWidth
                            value={e.totalCard}
                            sx={{
                              borderRadius: '8px',
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "none",
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
                                height: '54px',
                                bgcolor: "#FFFFFF14",
                                borderRadius: '8px',
                                "& input": {
                                  color: "white",
                                  opacity: 1,
                                  textAlign: "center",
                                },
                                "& input::placeholder": {
                                  bgColor: "white",
                                  opacity: 1,
                                },
                                "&:hover input": {
                                  bgcolor: "#1F1D2B2E",
                                  borderRadius: "8px",
                                },
                                // borderRadius: "8px",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="outlined"
                            fullWidth
                            onClick={() => handleAddToCart(e)}
                            sx={{
                              minWidth: "54px",
                              minHeight: "54px",
                              background: "#FFFFFF14",
                              color: "white",
                              border: 0,
                              borderRadius: '8px',
                              "&:hover": {
                                background: "#FFFFFF2E",
                                border: 0,
                              },
                            }}
                          >
                            +
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
              </Box>
            )}
          </Grid>
        </Stack>

        <Stack direction={"column"} spacing={1} pb={2}>
          <Grid item xs={12}>
            <Divider
              sx={{
                bgcolor: "#FFFFFF14",
              }}
            />
          </Grid>
          <Stack direction={"column"} spacing={2}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="body2" color={"white"}>
                Total card amount
              </Typography>
              ˝
              <Typography variant="body2" fontWeight={600} color={"white"}>
                {_.sumBy(cartList, "totalCard")}
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography variant="body2" color={"white"}>
                Total price
              </Typography>
              <Stack direction={"row"} spacing={1}>
                <Typography variant="body2" fontWeight={600} color={"white"}>
                  $
                </Typography>
                <Typography variant="body2" fontWeight={600} color={"white"}>
                  {_.sumBy(cartList, "totalPrice").toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setIsDrawerOpen(false)}
              sx={{
                background: "#EA7C69",
                color: "white",
                border: 0,
                p: 1,
                boxShadow: "0px 8px 24px 0px #EA7C694D",
                "&:hover": {
                  background: "#d86654",
                  border: 0,
                },
              }}
            >
              Continue to Payment
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Drawer>
  );
}
