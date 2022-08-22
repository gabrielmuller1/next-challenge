import {
  AppBar,
  Box,
  Container,
  Divider,
  IconButton,
  styled,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { ActionTypes, AppContext } from "../../contexts/AppContext";
import { Page, Pages, PagesEnum } from "../../model";

const HEADER_TITLE = "Blog";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header = () => {
  const { state, dispatch } = useContext(AppContext);

  const router = useRouter();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  useEffect(() => {
    dispatch({
      type: ActionTypes.SET_CURRENT_PAGE,
      page:
        PagesEnum[
          Object.keys(PagesEnum)[
            (Object.values(PagesEnum) as Page[]).indexOf(
              router.pathname as Page
            )
          ] as Pages
        ] || PagesEnum.NotFound,
    });
  }, [router.pathname, dispatch]);

  const handleBackClick = () => {
    switch (state.currentPage) {
      case PagesEnum.Post:
        router.push("/posts");
        break;
      case PagesEnum.ListPosts:
      default:
        router.push("/");
        break;
    }
  };

  return (
    <Box
      sx={{
        position: { xs: "static", md: "sticky" },
        top: 0,
        backgroundColor: "secondary.dark",
      }}
    >
      <Container
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pt: 5,
          }}
        >
          {router.pathname !== "/" && (
            <IconButton size="large" sx={{ mr: 2 }} onClick={handleBackClick}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h1"
            sx={{ textAlign: "center", color: "primary.main" }}
          >
            {HEADER_TITLE}
          </Typography>
        </Box>
        <Divider sx={{ my: 3 }} />
      </Container>
      <AppBar
        elevation={trigger ? 4 : 0}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Toolbar>
          {router.pathname !== "/" && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={handleBackClick}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {HEADER_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <Offset sx={{ display: { xs: "block", md: "none" } }} />
    </Box>
  );
};

export default Header;
