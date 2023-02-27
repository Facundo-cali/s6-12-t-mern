import React, { useState } from "react";
import "../../../styles/components/__shopproducts.sass";
import { BiEdit, BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";
import { RiCheckboxBlankFill, RiCheckboxFill } from "react-icons/ri";
import { MdCheckBox } from "react-icons/md";
interface Product {
  title?: string;
  id?: number;
  ref?: string;
  price?: number;
  stock?: number;
  src?: string;
}
const products = [
  {
    title: "Cadence",
    id: 1,
    ref: "1540",
    price: 25,
    stock: 23,
    src: "data:image/jpeg;base64,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"
  },
  {
    title: "Character",
    id: 2,
    ref: "1540",
    price: 25,
    stock: 23,
    src: "data:image/jpeg;base64,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"
  },
  {
    title: "Ballet",
    id: 3,
    ref: "1540",
    price: 25,
    stock: 23,
    src: "https://cdn.shopify.com/s/files/1/2442/9443/files/StelleBallerinaShoesforKidsBalletPink1_480x480.jpg?v=1605113741"
  },
  {
    title: "Pirouette",
    id: 4,
    ref: "1540",
    price: 25,
    stock: 23,
    src: "https://cdn.shopify.com/s/files/1/2442/9443/files/pirouette_shoes_480x480.jpg?v=1606970320"
  }
];

export default function ShopProducts() {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="shop-products">
      <div className="shop-products__content">
        <div className="shop-products__content__header">
          <p className="shop-products__content__header__text">PRODUCTOS DE LA TIENDA</p>
          <button className="shop-products__content__header__btn">Agregar Producto +</button>
        </div>
        <table className="shop-products__content__table">
          <tr className="shop-products__content__table__tr">
            <th>
              {checked ? (
                <RiCheckboxFill onClick={() => setChecked(!checked)} />
              ) : (
                <RiCheckboxBlankFill onClick={() => setChecked(!checked)} />
              )}
            </th>
            <th>ID/REF</th>
            <th>Imagenes</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Stock</th>
            <th></th>
          </tr>
          {products.map((product: Product, index) => {
            return (
              <tr className="shop-products__content__table__tr" key={`shop-product-${product.id}`}>
                <td>
                  {checked ? (
                    <RiCheckboxFill onClick={() => setChecked(!checked)} />
                  ) : (
                    <RiCheckboxBlankFill onClick={() => setChecked(!checked)} />
                  )}
                </td>
                <td>{product.ref}</td>
                <td>
                  <img
                    alt=""
                    className="shop-products__content__table__tr__img"
                    src={product.src}
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <AiOutlineEye className="shop-products__content__table__tr__icon" />{" "}
                  <BiEdit className="shop-products__content__table__tr__icon" />{" "}
                  <BiTrash color="red" className="shop-products__content__table__tr__icon" />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
