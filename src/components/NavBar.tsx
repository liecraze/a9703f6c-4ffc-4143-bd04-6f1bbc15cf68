import * as React from "react";
import { Box, Typography, AppBar, IconButton, Toolbar, Container, InputBase } from "@mui/material";
import { Cancel, ShoppingCart, Search } from "@mui/icons-material";
import {alpha, styled} from "@mui/material/styles";
import "../styles/navBar.scss";


const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


interface NavBarProps {
    onSearchChange: (searchKeyword: string) => void;
    emptyCart: () => void;
    itemCount: number;
}

const NavBar = ({
                onSearchChange,
                    emptyCart,
                    itemCount,
                }: NavBarProps) => {

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchKeyword = event.target.value;
        onSearchChange(searchKeyword);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary" className="navbar">
            <Container maxWidth="lg">
                <Toolbar >
                    <Box
                        className="container"
                    >
                        <SearchBar className="searchbar">
                            <SearchIconWrapper>
                                <Search />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{"aria-label": "search"}}
                                onChange={handleSearchChange}
                            />
                        </SearchBar>
                        <span className="title"> Events App </span>
                    </Box>
                    <IconButton
                        color="inherit"
                        aria-label="shopping cart"
                    >
                        <ShoppingCart />
                        <Typography variant="h6">{itemCount}</Typography>
                    </IconButton>
                    <IconButton aria-label="delete" size="small" color='inherit' onClick={() => {emptyCart()}}>
                        <Cancel fontSize="inherit" />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
        </Box>
    );
};

export default NavBar;

