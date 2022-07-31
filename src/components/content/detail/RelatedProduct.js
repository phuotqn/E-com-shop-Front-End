import { Container, Grid, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";

function RelatedProject() {

    const [relatedProject, setRelatedProject] = useState([]);

    const fetchAPI = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    useEffect(() => {
        fetchAPI("http://localhost:8000/products/?limit=6&skip=4")
            .then((data) => {
                setRelatedProject(data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <Container>
            <Grid container mt={5}>
                {
                    relatedProject.map((product, index) => {
                        return (
                            <Grid item xs={2}>
                                <Button>
                                    <img src={product.imageUrl} style={{ width: "98%" }} />
                                </Button>
                            </Grid>
                        )
                    })
                }

            </Grid>
        </Container>
    )
}

export default RelatedProject;