import React from "react";
import "./invoiceform.css";
import { useState, useEffect } from "react";
import { Input, Button, Select } from "../../index";
import { useForm } from "react-hook-form";
import addInvoiceService from "../../../appwrite/Invoice/invoice";
import { useNavigate, useParams } from "react-router-dom";
import rightCaret from "../../../assets/caret-right.svg";
import { checkStatus } from "../../../store/invoiceSlice";
import { useDispatch, useSelector } from "react-redux";
export default function InvoiceForm({ post }) {
  const [invoice, setInvoice] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm({});

  const editableInvoiceCode = useParams();

  const [UserId, setUserId] = useState(() => {
    const userId = localStorage.getItem("userId");
    return userId ? JSON.parse(userId) : "";
  });

  const [userData, setUserData] = useState(()=>{
    const userData = localStorage.getItem('userData');
    return userData? JSON.parse(userData): ''
  })

  const dispatch = useDispatch();
  const qyt = watch("qyt", 0);
  const item_price = watch("item_price", 0);

  const [invoiceCode, setInvoiceCode] = useState();
  const navigate = useNavigate();

  const calc = (qyt, item_price) => {
    return eval(qyt * item_price);
  };

  useEffect(() => {
    const total = calc(qyt, item_price);
    setValue("total_price", Number(total));
  }, [qyt, item_price]);

  function generateUniqueCode() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let letterPart = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      letterPart += letters[randomIndex];
    }

    let numberPart = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      numberPart += numbers[randomIndex];
    }
    const uniqueCode = letterPart + numberPart;
    return uniqueCode;
  }

  useEffect(() => {
    if (editableInvoiceCode.invoiceCode !== 'new') {
      addInvoiceService.getInvoice(editableInvoiceCode).then((invoice) => {
        setInvoice(invoice);
        setValue("client_email", invoice?.client_email);
        setValue("client_name", invoice?.client_name);
        setValue("client_street", invoice?.client_street);
        setValue("client_post_code", invoice?.client_post_code);
        setValue("client_street", invoice?.client_street);
        setValue("client_city", invoice?.client_city);
        setValue("client_country", invoice?.client_country);
        setValue("invoice_date", invoice?.invoice_date);
        setValue("project_description", invoice?.project_description);
        setValue("item_name", invoice?.item_name);
        setValue("item_price", invoice?.item_price);
        setValue("qyt", invoice?.qyt);
        setValue("total_price", invoice?.total_price);
        setValue("street", invoice?.street);
        setValue("city", invoice?.city);
        setValue("country", invoice?.country);
        setValue("post_code", invoice?.post_code);
      });
    }
  }, [editableInvoiceCode]);

  const createForm = async (data) => {
    const invoiceCode = generateUniqueCode();
    setInvoiceCode(invoiceCode);
    let Status;
    try {
      if (editableInvoiceCode.invoiceCode === "new") {
        if (UserId) {
          const invoice = await addInvoiceService.addInvoice(
            UserId,
            invoiceCode,
            (Status = false),
            { ...data }
          );
          if (invoice) {
            dispatch(checkStatus(invoice));
            navigate(`/invoice/${userData.name}`);
          }
        }
      } else if (editableInvoiceCode.invoiceCode !== "new") {
        const newData = {
          Status: false,
          ...data,
        };
        addInvoiceService
          .updateInvoice(invoice.$id, { ...newData })
          .then((updated) => navigate(`/invoice/${userData.name}`));
        console.log("coming here");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit(createForm)}>
        <h2>Invoice Form</h2>
        <p>Bill From</p>

        <div className="one">
          <label>Street Address</label>
          <Input
            type="text"
            {...register("street", {
              required: true,
            })}
          />
        </div>

        <div className="many">
          <div>
            <label>City</label>
            <Input
              type="text"
              {...register("city", {
                required: true,
              })}
            />
          </div>
          <div>
            <label>Post Code</label>
            <Input
              type="text"
              {...register("post_code", {
                required: true,
              })}
            />
          </div>

          <div>
            <label>Country</label>
            <Input
              type="text"
              {...register("country", {
                required: true,
              })}
            />
          </div>
        </div>

        <p>Bill To</p>
        <div className="one">
          <label>Client's Name</label>
          <Input
            value="client@gmail.com"
            type="text"
            {...register("client_name", {
              required: true,
            })}
          />
        </div>

        <div className="one">
          <label>Client's Email</label>
          <Input
            type="text"
            {...register("client_email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email is invalid",
              },
            })}
          />
        </div>

        <div className="one">
          <label>Street Address</label>
          <Input
            type="text"
            {...register("client_street", {
              required: true,
            })}
          />
        </div>

        <div className="many">
          <div>
            <label>City</label>
            <Input
              type="text"
              {...register("client_city", {
                required: true,
              })}
            />
          </div>
          <div>
            <label>Post Code</label>
            <Input
              type="text"
              {...register("client_post_code", {
                required: true,
              })}
            />
          </div>

          <div>
            <label>Country</label>
            <Input
              type="text"
              {...register("client_country", {
                required: true,
              })}
            />
          </div>
        </div>

        <div className="one">
          <label>Invoice Date</label>
          <Input
            className="px-3 text-white"
            type="date"
            {...register("invoice_date", {
              required: true,
            })}
          />
        </div>

        <div className="one">
          <label>Product Description</label>
          <Input
            type="text"
            {...register("project_description", {
              required: true,
            })}
          />
        </div>

        <div className="item-list">
          <h3>Item List</h3>

          <div className="many item-many">
            <div className="item-name">
              <label>Item Name</label>
              <Input
                type="text"
                {...register("item_name", {
                  required: true,
                })}
              />
            </div>
            <div className="qty">
              <label>Qty.</label>
              <Input
                type="number"
                {...register("qyt", {
                  required: true,
                })}
              />
            </div>

            <div className="price">
              <label>Price</label>
              <Input
                type="number"
                {...register("item_price", {
                  required: true,
                })}
              />
            </div>

            <div>
              <label>Total</label>
              <Input
                className="total"
                type="number"
                readOnly
                {...register("total_price", {
                  required: true,
                })}
              />
            </div>
          </div>
        </div>

        <div className="button-container">
          <Button onClick={() => navigate("/invoice")}>Discard</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>

      <p onClick={() => navigate(`/invoice/${userData.name}`)} className="go-back">
        Go Back <img src={rightCaret} alt="" />{" "}
      </p>
    </div>
  );
}
