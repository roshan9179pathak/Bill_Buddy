import React, { useState, useEffect, useRef } from "react";
import "./allInvoice.css";
import { Button, Input, InvoiceCard, Select } from "../../index";
import logo from "../../../assets/caret-down.svg";
import add from "../../../assets/add-button.svg";
import { useForm } from "react-hook-form";
import addInvoiceService from "../../../appwrite/Invoice/invoice";
import { useNavigate, useParams } from "react-router-dom";
import {InvoiceForm} from "../../index";
import { Query } from "appwrite";
export default function AllInvoice() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  const [isOpen, setIsOpen] = useState(false)
  const [allinvoices, setAllInvoices] = useState([]);
  const navigate = useNavigate()
  const common_post_id = JSON.parse(localStorage.getItem('userId'))
  const [isPendingChecked, setIsPendingChecked] = useState(false)
  const [isPaidChecked, setIsPaidChecked] = useState(false)
  const [showpending , setShowPending] = useState(false)
  const [showpaid , setShowPaid] = useState(false)

  useEffect(() => {

      if(showpending && !showpaid){
        addInvoiceService.getInvoices([
        Query.equal('Status',false),
        Query.equal('common_post_id',common_post_id)])
        .then((invoice) => {
          if (invoice) {
            setAllInvoices(invoice.documents);
          } else {
            alert(`Failed to load posts`);
          }
        });
      }
      else if(showpaid && !showpending){
        addInvoiceService.getInvoices([
          Query.equal('Status',true),
          Query.equal('common_post_id',common_post_id)])
          .then((invoice) => {
            if (invoice) {
              setAllInvoices(invoice.documents);
            } else {
              alert(`Failed to load posts`);
            }
          });

      }
else{

    addInvoiceService.getInvoices([Query.equal('common_post_id',common_post_id)]).then((invoice) => {
      if (invoice) {
        setAllInvoices(invoice.documents);
      } else {
        alert(`Failed to load posts`);
      }
    });
  }
  }, [showpending, showpaid]);

  const handleFilter =()=>{
    setIsOpen(!isOpen)
  }

  const handlePending =()=>{
    setShowPending(!showpending)
    setIsPendingChecked(!isPendingChecked)
    setTimeout(()=>{
      setIsOpen(false)
    },200)

  }

  const handlePaid =()=>{
    setShowPaid(!showpaid)
    setIsPaidChecked(!isPaidChecked)
    setTimeout(()=>{
      setIsOpen(false)
    },200)

  }



  return (
    <div className={`w-full h-full ${"main-container"}`}>
      <div className={`invo-heading`}>
        <div className="invoice-count-container">
          <h2>Invoices</h2>
          <p>There are total {allinvoices.length} invoices</p>
        </div>

        <div className="filter-container">
          <div className="status-filter-container">
            <div>
            <h5 onClick={handleFilter}>Filter <span>by status</span></h5>
            <img src={logo} alt="svg" className="dropdown-icon" />
            </div>
          </div>
          
          <Button className={`${"invoice-button"}`} onClick={()=>navigate('/add/new')}>
            <img src={add} alt="" className="add-button" />
            New <span>Invoice</span>
          </Button>
        </div>

      </div>

      <div className="all-invoices-container">
        {allinvoices &&
          allinvoices.map((invoice) => <div key={invoice.$id}><InvoiceCard {...invoice} /></div> )}
      </div>
      {isOpen &&  <div className="status-filter">
             <div><Input type='checkbox' id='pending' defaultChecked={isPendingChecked} onClick={handlePending} />
             <label htmlFor="pending" id="pending">Pending</label></div>

             <div><Input type='checkbox' id='paid' defaultChecked={isPaidChecked} onClick={handlePaid} />
             <label htmlFor="paid" id="paid">Paid</label>
             </div>
             
          </div>}
    </div>
  ) 
}
