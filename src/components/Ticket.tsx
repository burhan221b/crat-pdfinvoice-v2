import React, { useEffect, useState } from 'react'
import { FROM, TO, OPEN, DOWNLOAD, PRINT } from '../utils/const';
import UseTicketForm from '../utils/UseTicketForm';
import { v4 as uuidv4 } from 'uuid';
import { handleTotals, validateMath } from '../utils/calculations';
import { updateDate } from '../events/eventListeners';

interface TicketProps {
    id: string,
    prefill: {
        ticket_type: string,
        logo: string,
        date: string,
        company: string,
        FROM_name: string,
        FROM_phone: string,
        FROM_email: string,
        FROM_address: string,
        TO_name: string,
        TO_phone: string,
        TO_email: string,
        TO_address: string,
        items: any[],
        amount: string,
        tax: string,
        total: string,
        notes: string
    }
}

interface TicketFormProps {
    ticket_type: string,
    logo: string,
    company: string,
    FROM_name: string,
    FROM_phone: string,
    FROM_email: string,
    FROM_address: string,
    TO_name: string,
    TO_phone: string,
    TO_email: string,
    TO_address: string,
    items: any[],
    amount: string,
    tax: string,
    total: string,
    notes: string,
    date: string,
    setStateForm: (key: string, value: any) => {},
    handleChangeFormInput: () => {},
    handleChangeItems: (e: React.ChangeEvent<HTMLInputElement>, id: string) => {},
    handleUseEffectChange: (key: string, value: any) => {},
    handleSubmit: (event: any, state: any, btn: string) => {}
}

interface InfoInputProps extends TicketFormProps {
    indicator: string,
}

interface ItemsInputProps extends TicketFormProps {
    item: any,
    updateItemInput: (item: any) => void,
    deleteItemInput: (id: string) => void
}

// interface ItemsTotalsProps {
//     AMOUNT: number,
//     TAX: number,
//     TOTAL: number
// }
interface ItemsTotalsProps {
    AMOUNT: string,
    TAX: string,
    TOTAL: string
}

const Ticket = (props: TicketProps) => {
    const { id, prefill: { ticket_type } } = props;
    return (
        <div id={id} className={ticket_type}>
            <main>
                <TicketHeader {...props} />
                <TicketForm {...props} />
            </main>
        </div>
    )
}

const TicketHeader = (props: TicketProps) => {
    const { prefill: { ticket_type, logo } } = props;
    return (<section className="TicketHeader">
        {logo ? <img src={logo} alt="logo" /> : <h3>No Logo</h3>}
        <h1>{ticket_type}</h1>
    </section>)
}

const TicketForm = (props: TicketProps) => {
    const { id, prefill } = props;
    const { state, handleChangeFormInput, handleChangeItems, handleUseEffectChange, handleSubmit } = UseTicketForm({ id, ...prefill })
    return (<section className="TicketForm">
        <form>
            <fieldset className="DateInput-container">
                <DateInput {...state} handleUseEffectChange={handleUseEffectChange} handleChangeFormInput={handleChangeFormInput} />
            </fieldset>
            <fieldset className="InfoInput-container">
                <InfoInput indicator={TO} {...state} handleChangeFormInput={handleChangeFormInput} />
                <InfoInput indicator={FROM} {...state} handleChangeFormInput={handleChangeFormInput} />
            </fieldset>
            <fieldset className="ItemsTable-container">
                <ItemsTable {...state} handleUseEffectChange={handleUseEffectChange} handleChangeItems={handleChangeItems} />
            </fieldset>
            <fieldset className="ItemsTable-container">
                <NotesInput  {...state} handleChangeFormInput={handleChangeFormInput} />
            </fieldset>
            <fieldset className="SubmitButtons-container">
                <SubmitButtons handleSubmit={handleSubmit} {...state} />
            </fieldset>
        </form>
    </section>)
}

const DateInput = (props: TicketFormProps) => {
    const { handleChangeFormInput, handleUseEffectChange } = props;

    useEffect(() => {
        const dt = new Date();
        handleUseEffectChange("date", dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate());
        updateDate(dt);
        return () => { }
    }, [])

    useEffect(() => {
        return () => { }
    }, [props.date])

    return (<div className="DateInput">
        <input onChange={handleChangeFormInput} name="date" id="datePicker" type="date" />
    </div>)
}

const InfoInput = (props: InfoInputProps) => {
    const propsObject: any = { ...props }; // TypeScript was overly strict in accessing variables that were already required.
    const { handleChangeFormInput } = props;
    const { indicator } = propsObject;
    const name = propsObject[`${indicator}_name`];
    const phone = propsObject[`${indicator}_phone`];
    const email = propsObject[`${indicator}_email`];
    const address = propsObject[`${indicator}_address`];

    return (<div className="InfoInput">
        <header className="InfoInput-header"><h5>{indicator}</h5></header>
        <div>
            <label htmlFor={`${indicator}_name`}>Name/Company</label>
            <input type="text" name={`${indicator}_name`} id={`${indicator}_name`} className={`${indicator}_name`} onChange={handleChangeFormInput} value={name} />
        </div>
        <div>
            <label htmlFor={`${indicator}_phone`}>Phone</label>
            <input type="text" name={`${indicator}_phone`} id={`${indicator}_phone`} className={`${indicator}_phone`} onChange={handleChangeFormInput} value={phone} />
        </div>
        <div>
            <label htmlFor={`${indicator}_email`}>Email</label>
            <input type="text" name={`${indicator}_email`} id={`${indicator}_email`} className={`${indicator}_email`} onChange={handleChangeFormInput} value={email} />
        </div>
        <div>
            <label htmlFor={`${indicator}_address`}>Address</label>
            <input type="text" name={`${indicator}_address`} id={`${indicator}_address`} className={`${indicator}_address`} onChange={handleChangeFormInput} value={address} />
        </div>
    </div>)
}

const ItemsTable = (props: TicketFormProps) => {
    return (<div className="ItemsTable">
        <div className="table-header-container">
            <span className="table-header qty-header">Qty</span>
            <span className="table-header item-header">Item</span>
            <span className="table-header unitprice-header">Unit Price</span>
            <span className="table-header tax-header">Tax</span>
            <span className="table-header amount-header">Amount</span>
        </div>
        <ItemsContainer {...props} />
    </div>)
}

const ItemsContainer = (props: TicketFormProps) => {
    return (<div className="ItemsContainer">
        <ItemsList {...props} />
    </div>);
}


const ItemsList = (props: TicketFormProps) => {
    const { handleUseEffectChange } = props;
    const initialState = { qty: "", description: "", unitprice: "", tax: "", amount: "" };
    const [state, setState] = useState<any[]>([{ ...initialState, id: uuidv4() }]);
    const [Totals, setTotals] = useState({ AMOUNT: "0", TAX: "0", TOTAL: "0" });
    useEffect(() => {
        handleUseEffectChange("items", state);
        setTotal()
        return () => { }
    }, [JSON.stringify(state)])

    const addItemInput = () => {
        setState([...state, { ...initialState, id: uuidv4() }])
    }
    const deleteItemInput = (id: string) => {
        const newState = state.filter(item => item.id !== id)
        setState(newState);
    }
    const updateItemInput = (selected_item: any) => {
        const newState = state.map(item => {
            if (item.id === selected_item.id) return selected_item;
            return item;
        })
        setState(newState);
    }
    const getItemInput = () => {
        return state.map((item: any) => <ItemsInput key={item.id} deleteItemInput={deleteItemInput} updateItemInput={updateItemInput} item={item} {...props} />)
    }

    const setTotal = () => {
        const [AMOUNT, TAX, TOTAL] = handleTotals(state);
        setTotals({ AMOUNT, TAX, TOTAL })
        handleUseEffectChange("amount", AMOUNT);
        handleUseEffectChange("tax", TAX);
        handleUseEffectChange("total", TOTAL);
    }

    return (<>
        {getItemInput()}
        {/* {setTotal()} */}
        <ItemsTotals AMOUNT={Totals.AMOUNT} TAX={Totals.TAX} TOTAL={Totals.TOTAL} />
        <button type="button" onClick={addItemInput}>Add</button>
    </>);
}

const ItemsInput = (props: ItemsInputProps) => {
    const { item, updateItemInput, deleteItemInput } = props;
    const [state, setState] = useState({ ...item });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newState = { ...state, [name]: value };
        newState = validateMath(newState, name)
        setState(newState)
        updateItemInput(newState);
    }

    return (<div className="ItemsInput">
        <input onChange={handleChange} value={state.qty} type="number" name="qty" id="" />
        <input onChange={handleChange} value={state.description} type="text" name="description" id="" />
        <input onChange={handleChange} value={state.unitprice} type="number" name="unitprice" id="" />
        <input onChange={handleChange} value={state.tax} type="number" name="tax" id="" />
        <input onChange={handleChange} value={state.amount} type="number" name="amount" id="" />
        <button type="button" className="delete-button" onClick={() => deleteItemInput(state.id)}>X</button>
    </div>);
}

const ItemsTotals = (props: ItemsTotalsProps) => {
    const { AMOUNT, TAX, TOTAL } = props;
    return (<div className="ItemsTotals">
        <div className="flex">
            <h5>AMOUNT</h5>
            <h5>{AMOUNT}</h5>
        </div>
        <div className="flex">
            <h5>TAX</h5>
            <h5>{TAX}</h5>
        </div>
        <div className="flex">
            <h5>TOTAL</h5>
            <h5>{TOTAL}</h5>
        </div>
    </div>)
}

const NotesInput = (props: TicketFormProps) => {
    const { handleChangeFormInput } = props;
    return (<div className="NotesInput">
        <label htmlFor={`notes`}>Notes</label>
        <textarea onChange={handleChangeFormInput} name="notes" value={props.notes} id="notes" cols={30} rows={10} />
    </div>);
}

const SubmitButtons = (props: TicketFormProps) => {
    const { handleSubmit } = props;
    return (<div className="SubmitButtons">
        <button type="button" onClick={(e) => handleSubmit(e, props, OPEN)} className="submit-btn" id="btn-open">Open New Tab</button>
        <button type="button" onClick={(e) => handleSubmit(e, props, DOWNLOAD)} className="submit-btn" id="btn-download">Download</button>
        <button type="button" onClick={(e) => handleSubmit(e, props, PRINT)} className="submit-btn" id="btn-print">Print</button>
    </div>)
}
export default Ticket