import React, { useState } from "react";
import styled from './Detail.module.css'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIdProduct, getWhisList, deleteWhisList } from '../../redux/action'
import { BsCart2 } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useRef } from "react";
import {alertConfirm,alertAcept} from '../SweetAlert/SweetAlert'


export const Detail = () => {
    const dispatch = useDispatch();
    const [isInCart, setIsInCart] = useState(false);
    const quantityInputRef = useRef(null); // Crear una referencia
    const { id } = useParams(); //recibimos el params id
    const productDetail = useSelector(state => state.productDetail);

    useEffect(() => {
        dispatch(getIdProduct(id));
        const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
        const existingProduct = products.find((p) => p.id === productDetail.id);
        if (existingProduct) {
            setIsInCart(true)
        } else { setIsInCart(false) }
        // setIsInCart(!!existingProduct);
    }, [dispatch, id])

    const toggleCart = () => {
        if (isInCart) {
            const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
            const updatedProducts = products.filter((p) => p.id !== productDetail.id);
            localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
        } else {
            let quantity = parseInt(quantityInputRef.current.value);
            if (isNaN(quantity) || quantity < 1) {
                quantity = 1;
            }

            const product = {
                id: productDetail.id,
                title: productDetail.name,
                description: productDetail.description,
                unit_price: productDetail.price,
                quantity: quantity,
                currency_id: 'USD',
                picture_url: productDetail.image,
            };

            const products = JSON.parse(localStorage.getItem('cartProducts')) || [];
            const existingProduct = products.find((p) => p.id === productDetail.id);

            if (!existingProduct) {
                products.push(product);
                localStorage.setItem('cartProducts', JSON.stringify(products));
            } else {
                console.log('Este producto ya está en el carrito.');
            }
        }
        setIsInCart(!isInCart);
    };
    // console.log("son todos los productos detail ====>> ", productDetail);

    const [whis, setWhis] = useState(false);

    useEffect(() => {
        const product = JSON.parse(localStorage.getItem('whislist')) || [];
        product.map((prod) => {
            if (prod.id === Number(id)) {
                setWhis(true);
            }
        });
    }, [setWhis]);

    const handleWhisList = async () => {

        const product = JSON.parse(localStorage.getItem('whislist')) || [];
        const existingProduct = product?.find((p) => p.id === productDetail.id);
        if (!whis) { //si false
            if (!existingProduct) {
                product.push(productDetail);
                localStorage.setItem("whislist", JSON.stringify(product));
                setWhis(true)
            }
            else {
                console.log('Este producto ya está en el carrito.');
            }
        }
        else {            
            const resAlert = await alertConfirm('warning', 'Delete Product!','Do you want to remove this product from your wish list?')
            if(resAlert){
                const updatedProducts = product.filter(p => p.id !== productDetail.id);
                localStorage.setItem("whislist", JSON.stringify(updatedProducts));
                setWhis(false)
            }
        }
    }

    return (
        <div className={styled.containner}>

            <div className={styled.detail}>

                <div className={styled.containerImage}>
                    <div className={styled.divImage}>
                        <img src={productDetail.image} alt={productDetail.name}></img>
                    </div>
                </div>

                <div className={styled.containerDetail}>

                    <div className={styled.divname}>
                        <p>{productDetail.name}</p>
                    </div>

                    <div className={styled.divcategoria}>
                        <p>{productDetail.category?.name}</p>
                    </div>

                    <div className={styled.divprice}>
                        {/* <p1 className={styled.title}>price: </p1> */}
                        <p>${productDetail.price}</p>
                    </div>

                    <div className={styled.divStock}>
                        <p className={styled.titles}>stock: </p>
                        <p>{productDetail.stock}</p>
                    </div>

                    <div className={styled.divdescription}>
                        <p className={styled.descriptiontitle}>Description:</p>
                        <p className={styled.descriptionContent}> {productDetail.description}</p>
                    </div>



                    <div className={styled.addBuy}>
                        <div className={styled.continerInputAmount}>
                            <h4>Quantity</h4>
                            <input className={styled.inputQuantity}
                                type="Number"
                                placeholder="0"
                                ref={quantityInputRef}
                                min="0"
                                max={productDetail.stock}
                            ></input>
                            <label>maximium purchase {productDetail.stock}</label>
                        </div>
                        <div className={styled.continerbuttonBuy}>
                            <button className={styled.buttonBuy} >Buy Now</button>
                        </div>
                        <div className={styled.continerbutton2}>
                            <button className={styled.button2} onClick={toggleCart}><BsCart2 /> {isInCart ? "Delete from Cart" : "Add to Cart"}</button>
                            {!whis ?
                                <button className={styled.button2}
                                    onClick={handleWhisList}>
                                    <AiOutlineHeart />
                                    Add to Wishlist
                                </button>
                                :
                                <button className={styled.button2}
                                    onClick={handleWhisList}>
                                    <AiFillHeart />
                                    Delete from Wishlist
                                </button>

                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
