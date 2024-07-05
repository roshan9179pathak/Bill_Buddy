import React, { useState, useEffect } from "react";
import right from "../../../assets/caret-right.svg";
import './allInvoice.css'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
export default function InvoiceCard({
  $id,
  invoiceCode,
  invoice_date,
  client_name,
  total_price,
  Status
}) {

    const isPaid = useSelector(state => state.invoiceSlice.paidStatus)

  return (
    <Link to={`/edit/${$id}`}>
    <div className="single-invoice-container">
      {/* 1 */}
      <div className="code-date">
        <p className="code">
          <span>#</span>
          {invoiceCode}
        </p>
        <p className="date">{invoice_date}</p>
      </div>
      
      <div className="name">
        <p>{client_name}</p>
      </div>
      {/* 3 */}
      <p className="amount"><span className="mr-1">₹</span>{total_price}</p>
      {/* 4 */}

      <div className="status">
      <p className={`${Status ? 'paid': 'pending'}`}>
        <span>•</span>
        {Status ? 'Paid': 'Pending'}
      </p>
      
</div>
      {/* 5 */}
      <img src={right} alt="" className="right"/>
    </div>
    </Link>
  );
}
