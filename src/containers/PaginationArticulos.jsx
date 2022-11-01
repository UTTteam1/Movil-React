import * as React from 'react';
import { useState } from "react";
import axios from "axios";

import Pagination from '@mui/material/Pagination';

import Swal from 'sweetalert2';
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';

// Grid
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';



// Pagination
import usePagination from "./PaginationCustom";
import { get } from 'react-scroll/modules/mixins/scroller';


export default function PaginationArticulos() {

    const [articulos, setArticulos] = React.useState([]);
    const [page, setPage] = useState(1);
    const PER_PAGE = 12;

    const [list, setList] = useState([]);


    const AddCod = (cod, precio) => {

        var cant = document.getElementById(cod).value;
        if (cant != 0) {
            //var x = '{"cod_barras":"' + cod + '","cantidad":' + cant + ',"precioUnidad":' + precio + '}';
            let x2 = {
                cod_barras: cod,
                cantidad: cant,
                precioUnidad: precio
            }
            //setList(current => [...current, Json.stringify(x)])
            setList(current => [...current, x2])
            alertify.success('Agregado al carrito');
        } else {
            alertify.error("No se puede agregar vacios al carrito");
        }

    };

    const get = () => {
        if (list.length > 0) {
            //window.alert("En su carrito tiene: \n" + list.map(a=>a.cod_barras));
            let FormCar = `<form>`
            list.forEach(articulo => {
                FormCar += `
                    <div class="form-floating">
                        <select class="form-select" id="Cant_${articulo.cod_barras}" aria-label="Floating label select example">
                            <option value="${articulo.cantidad}" selected>${articulo.cantidad}</option>    
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <label for="floatingSelect">Cantidad del producto "${articulo.cod_barras}"</label>
                    </div>
                    <hr>
                `
            });
            FormCar += `
                </form>
            `
            let nList = []

            Swal.fire({
                title: 'Editar carrito',
                html: FormCar,
                showCloseButton: true,
                confirmButtonText: 'Actualizar',
                preConfirm: (login) => {
                    list.forEach(articulo => {
                        let newArt = {
                            cod_barras: articulo.cod_barras,
                            cantidad: document.getElementById('Cant_' + articulo.cod_barras).value,
                            precioUnidad: articulo.cantidad
                        }
                        nList.push(newArt);
                    });
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    var i = 0;
                    nList.forEach(art => {
                        if (i == 0) {
                            setList([art]);
                        } else {
                            setList(current => [...current, art])
                        }
                        i += 1;
                    });
                    nList.length = 0;
                    alertify.success('Carrito Actualizado');
                }
            })
        } else {
            alertify.warning("No hay nada en su carrito");
        }
    };

    const vaciar = () => {
        if (list.length > 0) {
            list.length = 0;
            alertify.warning("Se vacio el carrito");
        } else {
            alertify.warning("No hay nada en su carrito que se pueda eliminar");
        }
    };

    const comprar = () => {
        if (list.length > 0) {
            var data = JSON.stringify(list);

            var config = {
                method: 'post',
                url: 'http://localhost:1921/api/venta',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            console.log(data);
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    list.length = 0;
                    alertify.success("Su compra fue procesada");
                })
                .catch(function (error) {
                    console.log(error);
                    alertify.error("Su compra no pudo ser procesada");
                });

        } else {
            alertify.warning("Primero Agrege al carrito");
        }
    };


    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };


    React.useEffect(() => {
        axios.get('http://localhost:1921/api/articulo').then((response) => {
            setArticulos(response.data);
        });
    }, []);

    if (!articulos) return null;

    const count = Math.ceil(articulos.length / PER_PAGE);
    const _DATA = usePagination(articulos, PER_PAGE);

    return (


        <Grid container spacing={3}>

            <Grid item xs={12} md={12}>
                <div class="col 12">
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand">&nbsp;&nbsp;Articulos</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Integrantes
                                        </a>
                                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><a class="dropdown-item">Alexis Garcia Ramirez</a></li>
                                            <li><a class="dropdown-item">Maria del Rocio Gamboa de Jesus</a></li>
                                            <li><a class="dropdown-item">Shendel Lopez Almaraz</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link disabled" tabindex="-1" aria-disabled="true">10-TIC-DGS-G1-Movil</a>
                                    </li>
                                    <li>
                                        <button type="button" class="btn btn-outline-success" width="25" height="25" onClick={comprar}>
                                            comprar
                                        </button>
                                    </li>
                                    &nbsp;
                                    <li>
                                        <button type="button" class="btn btn-outline-warning" width="5" height="5" onClick={get}>
                                            <img src='https://cdn-icons-png.flaticon.com/512/107/107831.png'
                                                width="25" height="25">
                                            </img>
                                        </button>
                                    </li>
                                    &nbsp;
                                    <li>
                                        <button type="button" class="btn btn-outline-danger" width="25" height="25" onClick={vaciar}>
                                            vaciar Carrito
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </Grid>

            {_DATA.currentData().map((articulo) => {
                return (
                    <Grid item key={articulo.cod_barras} xs={12} sm={4} md={3}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    width: 250,
                                    height: 250,
                                    pt: '5',
                                }}
                                image="https://ih1.redbubble.net/image.3819621713.5565/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg"
                                alt="random"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {articulo.descripcion}
                                </Typography>
                                <Typography>
                                    {articulo.descripcion_corta}
                                </Typography>
                            </CardContent>
                            <select class="form-select col-md-3" aria-label="Default select example" id={articulo.cod_barras}>
                                <option value="0">Seleccione cantidad Producto</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                            <button type="button" class="btn btn-outline-dark"
                                onClick={() => AddCod(articulo.cod_barras, articulo.precio_venta)}>Agregar a Carrito</button>
                        </Card>
                    </Grid>);
            })}

            <Grid item xs={12} md={12}></Grid>
            <Grid item xs>
            </Grid>
            <Grid item xs={5}>
                <Pagination
                    count={count}
                    size="large"
                    page={page}
                    variant="outlined"
                    shape="rounded"
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs>
            </Grid>
            <Grid item xs={12} md={12}></Grid>
        </Grid>
    );
}