import { Container, Grid, Breadcrumbs } from "@mui/material";
import { Link } from "react-router-dom";



function BreadCrumb({ breadCrumbs }) {
    return (
        <div style={{ backgroundColor: "#ffffff", marginTop: "80px" }}>
            <Container>
                <Grid container mt={1}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {
                            breadCrumbs.map((page, index) => {
                                return (
                                    <Link to={page.route} underline="hover" color="inherit" key={index}
                                        style={{ textDecoration: "none", color: "black" }}>
                                        <div className="BreadCrumb">{page.name} </div>
                                    </Link>
                                )
                            })
                        }
                    </Breadcrumbs>

                </Grid>
            </Container>
        </div>
    )
}

export default BreadCrumb;