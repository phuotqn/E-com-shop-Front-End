import { Container, Grid, Button, Typography, TextField } from '@mui/material';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function ProductFilter() {

    const dispatch = useDispatch();
    const { nameProduct, minPrice, maxPrice, productTypes, noPage } = useSelector((reduxData) => reduxData.taskReducer);

    const [types, setTypes] = useState([]);

    const onChangeName = (event) => {
        dispatch({
            type: "VALUE_NAME_PRODUCT",
            nameProduct: event.target.value
        })
    }

    const onChangeMinPrice = (event) => {
        dispatch({
            type: "VALUE_MIN_PRICE",
            minPrice: event.target.value
        })
    }

    const onChangeMaxPrice = (event) => {
        dispatch({
            type: "VALUE_MAX_PRICE",
            maxPrice: event.target.value
        })
    }

    const onChangeProductTypes = (event) => {
        dispatch({
            type: "VALUE_PRODUCT_TYPES",
            productTypes: event.target.value
        })
    }

    //CALL API
    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data
    }

    //Load Product Types
    useEffect(() => {
        fetchAPI("http://localhost:8000/producttypes")
            .then((data) => {
                setTypes(data.data)
                console.log(data);
            })
            .catch((error) => {
                console.error(error.message);
            })
    }, [])


    return (
        <Container className="bg-light" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
            <Grid container p={1} mt={1}>
                <Grid item xs={12} lg={2} md={2} sm={3}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><b>Price</b></Typography>
                    </Grid>
                    <Grid container mt={1}>
                        <Grid item xs={5}>
                            <TextField size="small" value={minPrice} label="Min Price" onChange={onChangeMinPrice}></TextField>
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="h5" align="center">-</Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <TextField size="small" value={maxPrice} label="Max Price" onChange={onChangeMaxPrice}></TextField>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={12} lg={5} md={5} sm={6}>

                    <Grid container mt={1} justifyContent="center">
                        <FormControl>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>

                <Grid item xs={12} lg={2} md={2} sm={6}>
                    <Grid item xs={12}>
                        <Typography variant="body1"><b>Search Brand</b></Typography>
                    </Grid>
                    <Grid item xs={12} mt={1}>
                        <TextField label="Brand name" value={nameProduct} size="small" onChange={onChangeName}></TextField>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default ProductFilter;