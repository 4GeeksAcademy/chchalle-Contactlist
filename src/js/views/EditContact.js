import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';
import "../../styles/home.css";

export function EditContact() {
    const { store, actions } = useContext(Context);
    const [inputNameValue, setNameValue] = useState("");
    const [inputPhoneValue, setPhoneValue] = useState("");
    const [inputEmailValue, setEmailValue] = useState("");
    const [inputAddressValue, setAddressValue] = useState("");



    const navigate = useNavigate();
    const { id } = useParams(); 

    const adjustContact = () => {

        const updatedContact = {
            name: inputNameValue,
            phone: inputPhoneValue,
            email: inputEmailValue,
            address: inputAddressValue
        };

        fetch(`https://playground.4geeks.com/contact/agendas/chchalle/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedContact),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(navigate("/"))
        .catch((error) => {
            console.log(error);
        });
    };
/*
    const getUserContacts = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/chchalle/contacts/${id}`)
            .then(response => response.json())
            .then((contact) => {
                setNameValue(contact.name);
                setPhoneValue(contact.phone);
                setEmailValue(contact.email);
                setAddressValue(contact.address);
            })
            .catch((error) => {
                console.error(error);
            });
    };
*/
    useEffect(() => {
        if (id) {
            //find - finds first element of type () in this case contact
            const currentContact=store.contacts.find((contact)=>contact.id==id)
            setNameValue(currentContact.name);
            setPhoneValue(currentContact.phone);
            setEmailValue(currentContact.email);
            setAddressValue(currentContact.address);
 //           getUserContacts();
        }
    }, [id]);

    return (
        <div className="container editpage ">
            <h1 className="col-12 EditPageHeader">Edit Contact Page</h1>
            <p>
            <label for="name" class="form-label">Your Name</label>
                <input
                id="name"
                    className="col-12"
                    type="text"
                    value={inputNameValue}
                    onChange={(event) => setNameValue(event.target.value)}
                    placeholder="Name"
                />
                <label for="phone" class="form-label">Your Phone Number</label>
                <input
                id="phone"
                    className="col-12"
                    type="text"
                    value={inputPhoneValue}
                    onChange={(event) => setPhoneValue(event.target.value)}
                    placeholder="Phone Number"
                />
                     <label for="email" class="form-label">Your Email</label>
                <input
                id="email"
                    className="col-12"
                    type="text"
                    value={inputEmailValue}
                    onChange={(event) => setEmailValue(event.target.value)}
                    placeholder="Email Address"
                />
                 <label for="address" class="form-label">Your Address</label>
                <input
                id="address"
                    className="col-12"
                    type="text"
                    value={inputAddressValue}
                    onChange={(event) => setAddressValue(event.target.value)}
                    placeholder="Home Address"
                />
                <button onClick={adjustContact}>Save Contact Changes</button>
            </p>
        </div>
    );
}
