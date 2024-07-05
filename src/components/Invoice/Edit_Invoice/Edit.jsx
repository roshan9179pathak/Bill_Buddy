import React, { useEffect, useState } from "react";
import "./edit.css";
import { Button } from "../../index";
import left from "../../../assets/left_caret.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import addInvoiceService from "../../../appwrite/Invoice/invoice";
import { useSelector, useDispatch } from "react-redux";
import { checkStatus } from "../../../store/invoiceSlice";
import { InvoiceForm } from "../../index";
export default function Edit() {
  const [isPaid, setIsPaid] = useState(false);
  const [invoice, setInvoice] = useState();
  const invoiceCode = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(()=>{
    const userData = JSON.parse(localStorage.getItem('userData'))
    return userData? userData: ''
  })

  useEffect(() => {
    if (invoiceCode) {
      addInvoiceService.getInvoice(invoiceCode).then((invoice) => {
        if (invoice) {
          setInvoice(invoice);
          setIsPaid(invoice.Status);
        }
      });
    }
  }, []);

  const handleDelete = () => {
    const response = addInvoiceService.deleteInvoice(invoice.$id);

    if (response) {
      console.log(response);
      navigate(`/invoice/${userData.name}`);
    }
  };

  const dispatch = useDispatch();
  const handlePaid = (e) => {
    e.preventDefault();
    const newData = {
      Status: true,
      ...invoice,
    };
    addInvoiceService
      .updateInvoice(invoice.$id, { Status:true })
      .then((invoice) => {
        if (invoice) {
          dispatch(checkStatus(invoice));
          setIsPaid(true);
        }
      });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/add/${invoice.$id}`);
  };

  return invoice ? (
    <div className="edit-main-container">
      <div className="edit-go-back-cont">
        <Link to={`/invoice/${userData.name}`}>
          <img src={left} alt="" /> <p>Go Back</p>
        </Link>
      </div>

      <div className="edit-status-cont">
        <div className="edit-inner">
          <p>Status</p>
          <p className={`${isPaid ? "paid" : "pending"}`}>
            {isPaid ? "Paid" : "Pending"}
          </p>
        </div>

        <div className="edit-button-cont">
          <Button onClick={handleEdit} className="edit">
            Edit
          </Button>

          <Button onClick={handleDelete} className="delete">
            Delete
          </Button>
          {!isPaid && (
            <Button onClick={handlePaid} className="paid">
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      <div className="edit-main-bill-container">
        <div>
          <div>
            <p>
              <span>#</span>
              {invoice.invoiceCode}
            </p>
            <p>{invoice.project_description}</p>
          </div>

          <div className="senders-address">
            <p>{invoice.street}</p>
            <p>{invoice.city}</p>
            <p>{invoice.post_code}</p>
            <p>{invoice.country}</p>
          </div>
        </div>

        <div className="bill-to">
          <div className="one">
            <div>
              <p>Invoice Date</p>
              <p>{invoice.invoice_date}</p>
            </div>
          </div>

          {/* 2 */}
          <div className="two">
            <p>Bill To</p>
            <p>{invoice.client_name}</p>
            <div className="two-inner">
              <p>{invoice.client_street}</p>
              <p>{invoice.client_city}</p>
              <p>{invoice.client_post_code}</p>
              <p>{invoice.client_country}</p>
            </div>
          </div>

          {/* 3 */}
          <div className="three">
            <p>Sent to</p>
            <p>{invoice.client_email}</p>
          </div>
        </div>

        <div className="total-section">
          <div className="item-details">
            <div>
              <p>Item Name</p>
              <p>{invoice.item_name}</p>
            </div>
            <div>
              <p>QTY.</p>
              <p>{invoice.qyt}</p>
            </div>
            <div>
              <p>Price</p>
              <p>
                <span className="mr-[2px]">₹</span>
                {invoice.item_price}
              </p>
            </div>
            <div>
              <p>Total</p>
              <p>
                <span className="mr-[2px]">₹</span>
                {invoice.total_price}
              </p>
            </div>
          </div>

          <div className="total-amount">
            <p>Amount Due</p>
            <p>
              <span className="mr-[2px]">₹</span>
              {invoice.total_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Not Found</div>
  );
}
