import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

import {Context} from'../store/appContext';

export function CreateContact(){
    const{store,actions}=useContext(Context);
    const [inputNameValue, setNameValue] = useState("");
    const [inputPhoneValue, setPhoneValue] = useState("");
    const [inputEmailValue, setEmailValue] = useState("");
    const [inputAddressValue, setAddressValue] = useState("");

    const navigate=useNavigate();

    const addContact = () => {
		const newContact = {
            name: inputNameValue,
            phone: inputPhoneValue,
            email: inputEmailValue,
            address: inputAddressValue
          };

		fetch('https://playground.4geeks.com/contact/agendas/chchalle/contacts', {
			method: 'POST',
			body: JSON.stringify(newContact),
			headers: { 'Content-Type': 'application/json' }
		})
			.then(() => {
				navigate("/")
			})
			.catch((error) => {
				console.error(error);
			});
	};
    
    useEffect(() => {
		
	}, []);

    console.log({store});
    return(
        <div className="container editpage">
			  <h1 className="col-12 EditPageHeader">Create Contact Page</h1>
            <p>
			<label for="name" class="form-label">Your Name</label>
                <input
					className="col-12"
					type="text"
					value={inputNameValue}
					onChange={(event) => setNameValue(event.target.value)}
					placeholder="Name"
				/>
				 <label for="phone" class="form-label">Your Phone Number</label>
                     <input
					className="col-12"
					type="text"
					value={inputPhoneValue}
					onChange={(event) => setPhoneValue(event.target.value)}
					placeholder="phone Number"
				/>
				  <label for="email" class="form-label">Your Email</label>
                     <input
					className="col-12"
					type="text"
					value={inputEmailValue}
					onChange={(event) => setEmailValue(event.target.value)}
					placeholder="Email Address"
				/>
				  <label for="address" class="form-label">Your Address</label>
                     <input
					className="col-12"
					type="text"
					value={inputAddressValue}
					onChange={(event) => setAddressValue(event.target.value)}
					placeholder="Home Address"
				/>
                <button
			onClick={()=> addContact()}
		>Create New Contact</button>
            </p>
        </div>

    )
}