import React from 'react'
import './allInvoice.css'
import {Button} from '../../index'
import logo from '../../../assets/caret-down.svg'
import add from '../../../assets/add-button.svg'
import right from '../../../assets/caret-right.svg'
export default function AllInvoice() {
    
   
    return (
        <div className={`w-full h-full ${'main-container'}`}>
            <div className={`invo-heading`}>
            <div className='invoice-count-container'>
            <h2>Invoices</h2>
            <p>There are total {6} invoices</p>
            </div>
            <div className='filter-container'>
        <h5>Filter by status</h5>
        <img src={logo} alt="svg" className='dropdown-icon' />
        <Button
        className={`${'invoice-button'}`}
        >
            <img src={add} alt="" className='add-button'/>
            New Invoice</Button>
            </div>
            </div>

            <div className='all-invoices-container'>
                <div className='single-invoice-container'>
                    {/* 1 */}
                    <div className='code-date'>
                        <p className='code'><span>#</span>RT3080</p>
                        <p className='date'>Due 19 Aug 2021</p>
                    </div>
                    {/* 2 */}
                    <div className='name'>
                        <p>Roshan Pathak</p>
                    </div>
                    {/* 3 */}
                    <p className='amount'>$1800.67</p>
                    {/* 4 */}
                    <p className='status'><span>•</span>Paid</p>

                    {/* 5 */}
                    <div className='caret-right'>
                        <img src={right} alt="" />
                    </div>
                </div>
                <div className='single-invoice-container'>
                    {/* 1 */}
                    <div className='code-date'>
                        <p className='code'><span>#</span>RT3080</p>
                        <p className='date'>Due 19 Aug 2021</p>
                    </div>
                    {/* 2 */}
                    <div className='name'>
                        <p>Roshan Pathak</p>
                    </div>
                    {/* 3 */}
                    <p className='amount'>$1800.67</p>
                    {/* 4 */}
                    <p className='status'><span>•</span>Paid</p>

                    {/* 5 */}
                    <div className='caret-right'>
                        <img src={right} alt="" />
                    </div>
                </div>
            </div>



        </div>
    )
}
