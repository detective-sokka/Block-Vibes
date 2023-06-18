import React, {useEffect, useState} from "react";
import "../../Css/services.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../payments/CheckoutForm";
import { UserContext } from "../../App";
import { useContext } from "react";

const stripePromise = loadStripe("pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA");

export var userDetails;

const Service = () => {

  const { state, dispatch } = useContext(UserContext);  

  console.log("service user", state);
  userDetails = state;
  return (
       
          <div className="premium-page">     
          
          <div className="product">
          
        <img
          src={require("../payments/insta.jpg")}
          alt="laptop"
          style={{ width: "100%", height: "auto" }}
        />
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      </div>  
  );
};

export default Service;
