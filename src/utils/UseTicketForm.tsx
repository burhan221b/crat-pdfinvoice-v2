import React, { useEffect, useState } from 'react'
import generateTicketV1 from '../pdfmake/generateTicketV1';
import { pdfMakeDownload, pdfMakeOpen, pdfMakePrint } from '../pdfmake/pdfMake';
import { DOWNLOAD, OPEN, PRINT } from './const';

const UseTicketForm = (initialState: any) => {
    const [state, setState] = useState(initialState)

    useEffect(() => {
        console.log("state", state);
        return () => { }
    }, [state])

    const handleSubmit = (event: any, state: any, btn: string) => {
        event.preventDefault();
        const docDefinition = generateTicketV1(state);
        if (btn === OPEN) pdfMakeOpen(docDefinition);
        if (btn === DOWNLOAD) pdfMakeDownload(docDefinition);
        if (btn === PRINT) pdfMakePrint(docDefinition);
    }

    const handleChangeFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

    const handleChangeItems = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const { name, value } = e.target;
        const { items } = state;
        const [item] = items.filter((item: any) => item.id === id);
        const update_item = { ...item, [name]: value };
        const updated_items = items.map((item: any) => {
            if (item.id === id) return update_item;
            return item;
        })
        setState({ ...state, items: updated_items });
    }

    const handleUseEffectChange = (key: string, value: any) => setState((prev: any) => ({ ...prev, [key]: value }))

    return { state, setState, handleChangeFormInput, handleChangeItems, handleUseEffectChange, handleSubmit };
}

export default UseTicketForm;

