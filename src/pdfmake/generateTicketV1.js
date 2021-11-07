function generateTicketV1(state) {
    const {
        ticket_type,
        logo,
        date,
        company,
        FROM_name,
        FROM_phone,
        FROM_email,
        FROM_address,
        TO_name,
        TO_phone,
        TO_email,
        TO_address,
        items,
        amount,
        tax,
        total,
        notes
    } = state;

    const ITEMS = items.map(item => {
        return [
            {
                text: item.qty || "1",
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'center',
            },
            {
                text: item.description,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'left',
            },
            {
                text: item.unitprice,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'right',
            },
            {
                text: item.tax,
                border: [false, false, false, true],
                margin: [0, 5, 0, 5],
                alignment: 'right',
            },
            {
                border: [false, false, false, true],
                text: item.amount,
                fillColor: '#f5f5f5',
                alignment: 'right',
                margin: [0, 5, 0, 5],
            }]
    })


    const LOGO = logo ? {
        image: logo,
        width: 150,
    } : {
        text: company ? company : FROM_name.toUpperCase(),
        color: '#333333',
        width: '*',
        fontSize: 28,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 0, 15],
    }

    const TICKET_TYPE = {
        text: ticket_type,
        color: '#333333',
        width: '*',
        fontSize: 28,
        bold: true,
        alignment: 'right',
        margin: [0, 0, 0, 15],
    }

    const DATE = {
        text: date,
        bold: true,
        color: '#333333',
        fontSize: 12,
        alignment: 'right',
        width: 100,
    }

    const HEADER = {
        columns: [
            LOGO,
            [
                TICKET_TYPE,
                {
                    stack: [
                        //   {
                        //     columns: [
                        //       {
                        //         text: 'Receipt No.',
                        //         color: '#aaaaab',
                        //         bold: true,
                        //         width: '*',
                        //         fontSize: 12,
                        //         alignment: 'right',
                        //       },
                        //       {
                        //         text: '00001',
                        //         bold: true,
                        //         color: '#333333',
                        //         fontSize: 12,
                        //         alignment: 'right',
                        //         width: 100,
                        //       },
                        //     ],
                        //   },
                        {
                            columns: [
                                {
                                    text: 'Date',
                                    color: '#aaaaab',
                                    bold: true,
                                    width: '*',
                                    fontSize: 12,
                                    alignment: 'right',
                                },
                                DATE,
                            ],
                        },
                        //   {
                        //     columns: [
                        //       {
                        //         text: 'Status',
                        //         color: '#aaaaab',
                        //         bold: true,
                        //         fontSize: 12,
                        //         alignment: 'right',
                        //         width: '*',
                        //       },
                        //       {
                        //         text: 'PAID',
                        //         bold: true,
                        //         fontSize: 14,
                        //         alignment: 'right',
                        //         color: 'green',
                        //         width: 100,
                        //       },
                        //     ],
                        //   },
                    ],
                },
            ],
        ]
    };

    const INFO = [{
        columns: [
            {
                text: 'To',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
            },
            {
                text: 'From',
                color: '#aaaaab',
                bold: true,
                fontSize: 14,
                alignment: 'left',
                margin: [0, 20, 0, 5],
            },

        ],
    },
    {
        columns: [
            {
                text: `${TO_name}\n${TO_phone}\n${TO_email}`,
                bold: true,
                color: '#333333',
                alignment: 'left',
            },
            {
                text: `${FROM_name}\n${FROM_phone}\n${FROM_email}`,
                bold: true,
                color: '#333333',
                alignment: 'left',
            },

        ],
    },
    {
        columns: [
            {
                text: 'Address',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
            },
            {
                text: 'Address',
                color: '#aaaaab',
                bold: true,
                margin: [0, 7, 0, 3],
            },
        ],
    },
    {
        columns: [
            {
                text: TO_address,
                style: 'invoiceBillingAddress',
            },
            {
                text: FROM_address,
                style: 'invoiceBillingAddress',
            },
        ],
    }]

    const HR = {
        nodeName: "HR",
        margin: [
            0,
            12,
            0,
            12
        ],
        canvas: [
            {
                type: "line",
                x1: 0,
                y1: 0,
                x2: 514,
                y2: 0,
                lineWidth: 1,
                lineColor: "#000000"
            }
        ]
    }

    const TABLE_DATA = {
        table: {
            headerRows: 1,
            widths: [40, '*', 80, 80, 80],
            body: [
                [
                    {
                        text: 'QTY',
                        fillColor: '#eaf2f5',
                        border: [false, true, false, true],
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                        alignment: 'center',
                    },
                    {
                        text: 'ITEM DESCRIPTION',
                        fillColor: '#eaf2f5',
                        border: [false, true, false, true],
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                    {
                        text: 'AMOUNT',
                        border: [false, true, false, true],
                        alignment: 'right',
                        fillColor: '#eaf2f5',
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                    {
                        text: 'TAX%',
                        border: [false, true, false, true],
                        alignment: 'right',
                        fillColor: '#eaf2f5',
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                    {
                        text: 'ITEM TOTAL',
                        border: [false, true, false, true],
                        alignment: 'right',
                        fillColor: '#eaf2f5',
                        margin: [0, 5, 0, 5],
                        textTransform: 'uppercase',
                    },
                ],
                ...ITEMS,
            ],
        }
    }

    const docDefinition = {
        content: [
            HEADER,
            ...INFO,
            HR,
            // '\n\n',
            // {
            // text: 'Invoice No. 123',
            //   width: '100%',
            //   alignment: 'center',
            //   bold: true,
            //   margin: [0, 10, 0, 10],
            //   fontSize: 15,
            // },
            {
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        if (i === 1 || i === 0) {
                            return '#bfdde8';
                        }
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 2;
                    },
                    paddingBottom: function (i, node) {
                        return 2;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    },
                },
                ...TABLE_DATA,
            },
            '\n',
            '\n\n',
            {
                layout: {
                    defaultBorder: false,
                    hLineWidth: function (i, node) {
                        return 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1;
                    },
                    hLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    vLineColor: function (i, node) {
                        return '#eaeaea';
                    },
                    hLineStyle: function (i, node) {
                        // if (i === 0 || i === node.table.body.length) {
                        return null;
                        //}
                    },
                    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
                    paddingLeft: function (i, node) {
                        return 10;
                    },
                    paddingRight: function (i, node) {
                        return 10;
                    },
                    paddingTop: function (i, node) {
                        return 3;
                    },
                    paddingBottom: function (i, node) {
                        return 3;
                    },
                    fillColor: function (rowIndex, node, columnIndex) {
                        return '#fff';
                    },
                },
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto'],
                    body: [
                        [
                            {
                                text: 'Total Amount',
                                border: [false, true, false, true],
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                            {
                                border: [false, true, false, true],
                                text: amount,
                                alignment: 'right',
                                fillColor: '#f5f5f5',
                                margin: [0, 5, 0, 5],
                            },
                        ],
                        [
                            {
                                text: 'Total Tax',
                                border: [false, false, false, true],
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                            {
                                text: tax,
                                border: [false, false, false, true],
                                fillColor: '#f5f5f5',
                                alignment: 'right',
                                margin: [0, 5, 0, 5],
                            },
                        ],
                        [
                            {
                                text: 'Total Price',
                                bold: true,
                                fontSize: 14,
                                alignment: 'right',
                                border: [false, false, false, true],
                                margin: [0, 5, 0, 5],
                            },
                            {
                                text: total,
                                bold: true,
                                fontSize: 14,
                                alignment: 'right',
                                border: [false, false, false, true],
                                fillColor: '#f5f5f5',
                                margin: [0, 5, 0, 5],
                            },
                        ],
                    ],
                },
            },
            '\n\n',
            {
                text: 'NOTES',
                style: 'notesTitle',
            },
            {
                text: notes,
                style: 'notesText',
            },
        ],
        styles: {
            notesTitle: {
                fontSize: 10,
                bold: true,
                margin: [0, 50, 0, 3],
            },
            notesText: {
                fontSize: 10,
            },
        },
        defaultStyle: {
            columnGap: 20,
            //font: 'Quicksand',
        },
    };

    return docDefinition;
}

export default generateTicketV1;